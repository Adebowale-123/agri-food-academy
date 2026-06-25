import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(__dirname, '../../uploads/resources');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, featured } = req.query;
    const where: any = { published: true };
    if (category) where.category = category;
    if (featured === 'true') where.featured = true;
    const resources = await prisma.resource.findMany({ where, orderBy: { createdAt: 'desc' } });
    return res.json(resources);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

router.get('/:id/download', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const resource = await prisma.resource.findUnique({ where: { id: req.params.id } });
    if (!resource) return res.status(404).json({ error: 'Resource not found' });

    await prisma.resource.update({ where: { id: req.params.id }, data: { downloads: { increment: 1 } } });

    const filePath = path.join(__dirname, '../..', resource.fileUrl);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found on server' });

    return res.download(filePath, resource.fileName);
  } catch {
    return res.status(500).json({ error: 'Download failed' });
  }
});

router.post('/', authenticateToken, requireAdmin, upload.single('file'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'File required' });
    const { title, description, category, featured } = req.body;
    const fileUrl = `/uploads/resources/${req.file.filename}`;
    const fileType = path.extname(req.file.originalname).replace('.', '').toLowerCase();
    const resource = await prisma.resource.create({
      data: {
        title, description, category: category || 'General',
        fileUrl, fileName: req.file.originalname,
        fileSize: req.file.size, fileType,
        featured: featured === 'true' || featured === true,
      },
    });
    return res.status(201).json(resource);
  } catch {
    return res.status(500).json({ error: 'Failed to create resource' });
  }
});

router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const resource = await prisma.resource.update({
      where: { id: req.params.id },
      data: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        featured: req.body.featured === 'true' || req.body.featured === true,
        published: req.body.published !== false && req.body.published !== 'false',
      },
    });
    return res.json(resource);
  } catch {
    return res.status(500).json({ error: 'Failed to update resource' });
  }
});

router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const resource = await prisma.resource.findUnique({ where: { id: req.params.id } });
    if (resource) {
      const filePath = path.join(__dirname, '../..', resource.fileUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      await prisma.resource.delete({ where: { id: req.params.id } });
    }
    return res.json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Failed to delete resource' });
  }
});

export default router;
