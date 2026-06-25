import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();
const prisma = new PrismaClient();

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(__dirname, '../../uploads/materials');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } });

// Public: list published courses
router.get('/', async (req: Request, res: Response) => {
  try {
    const { faculty, level, search, featured } = req.query;
    const where: any = { published: true };
    if (faculty) where.faculty = faculty;
    if (level) where.level = level;
    if (featured === 'true') where.featured = true;
    if (search) where.title = { contains: search as string };

    const courses = await prisma.course.findMany({
      where,
      include: { _count: { select: { enrollments: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return res.json(courses);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Public: single course
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.findUnique({
      where: { slug: req.params.slug },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: { materials: { orderBy: { order: 'asc' }, select: { id: true, title: true, type: true, order: true } } },
        },
        _count: { select: { enrollments: true } },
      },
    });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    return res.json(course);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Get materials for enrolled student
router.get('/:id/materials', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: req.user!.id, courseId: req.params.id } },
    });
    if (!enrollment && req.user!.role !== 'admin') {
      return res.status(403).json({ error: 'Not enrolled in this course' });
    }
    const modules = await prisma.courseModule.findMany({
      where: { courseId: req.params.id },
      orderBy: { order: 'asc' },
      include: { materials: { orderBy: { order: 'asc' } } },
    });
    return res.json(modules);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch materials' });
  }
});

// Admin: create course
router.post('/', authenticateToken, requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const req = _req as any;
    const { title, description, faculty, price, currency, thumbnail, duration, level, published, featured } = req.body;
    const slug = slugify(title);
    const course = await prisma.course.create({
      data: { title, slug, description, faculty, price: parseFloat(price) || 0, currency, thumbnail, duration, level, published: published === 'true' || published === true, featured: featured === 'true' || featured === true },
    });
    return res.status(201).json(course);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to create course' });
  }
});

// Admin: update course
router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, faculty, price, currency, thumbnail, duration, level, published, featured } = req.body;
    const data: any = { description, faculty, currency, thumbnail, duration, level };
    if (title) { data.title = title; data.slug = slugify(title); }
    if (price !== undefined) data.price = parseFloat(price) || 0;
    if (published !== undefined) data.published = published === 'true' || published === true;
    if (featured !== undefined) data.featured = featured === 'true' || featured === true;

    const course = await prisma.course.update({ where: { id: req.params.id }, data });
    return res.json(course);
  } catch {
    return res.status(500).json({ error: 'Failed to update course' });
  }
});

// Admin: delete course
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.course.delete({ where: { id: req.params.id } });
    return res.json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Failed to delete course' });
  }
});

// Admin: add module
router.post('/:id/modules', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { title, order } = req.body;
    const module = await prisma.courseModule.create({
      data: { courseId: req.params.id, title, order: parseInt(order) || 0 },
    });
    return res.status(201).json(module);
  } catch {
    return res.status(500).json({ error: 'Failed to create module' });
  }
});

// Admin: update module
router.put('/modules/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const module = await prisma.courseModule.update({
      where: { id: req.params.id },
      data: { title: req.body.title, order: parseInt(req.body.order) || 0 },
    });
    return res.json(module);
  } catch {
    return res.status(500).json({ error: 'Failed to update module' });
  }
});

// Admin: delete module
router.delete('/modules/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.courseModule.delete({ where: { id: req.params.id } });
    return res.json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Failed to delete module' });
  }
});

// Admin: upload material to module
router.post('/modules/:moduleId/materials', authenticateToken, requireAdmin, upload.single('file'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const { title, type, order } = req.body;
    const fileUrl = `/uploads/materials/${req.file.filename}`;
    const material = await prisma.courseMaterial.create({
      data: {
        moduleId: req.params.moduleId,
        title: title || req.file.originalname,
        type: type || path.extname(req.file.originalname).replace('.', ''),
        fileUrl,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        order: parseInt(order) || 0,
      },
    });
    return res.status(201).json(material);
  } catch {
    return res.status(500).json({ error: 'Failed to upload material' });
  }
});

// Admin: delete material
router.delete('/materials/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const material = await prisma.courseMaterial.findUnique({ where: { id: req.params.id } });
    if (material) {
      const filePath = path.join(__dirname, '../..', material.fileUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      await prisma.courseMaterial.delete({ where: { id: req.params.id } });
    }
    return res.json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Failed to delete material' });
  }
});

export default router;
