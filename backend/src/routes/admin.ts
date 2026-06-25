import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();
const prisma = new PrismaClient();

router.get('/dashboard', authenticateToken, requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const [totalStudents, totalCourses, totalEnrollments, allEnrollments, recentEnrollments] = await Promise.all([
      prisma.user.count({ where: { role: 'student' } }),
      prisma.course.count({ where: { published: true } }),
      prisma.enrollment.count(),
      prisma.enrollment.findMany({ select: { amount: true, currency: true } }),
      prisma.enrollment.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true } },
          course: { select: { title: true } },
        },
      }),
    ]);

    const totalRevenue = allEnrollments.reduce((sum, e) => sum + (e.amount || 0), 0);

    const popularCourses = await prisma.course.findMany({
      include: { _count: { select: { enrollments: true } } },
      orderBy: { enrollments: { _count: 'desc' } },
      take: 5,
    });

    return res.json({ totalStudents, totalCourses, totalEnrollments, totalRevenue, recentEnrollments, popularCourses });
  } catch {
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

router.get('/students', authenticateToken, requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: 'student' },
      include: { _count: { select: { enrollments: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return res.json(students);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch students' });
  }
});

router.put('/students/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { name: req.body.name, phone: req.body.phone, country: req.body.country },
    });
    return res.json(user);
  } catch {
    return res.status(500).json({ error: 'Failed to update student' });
  }
});

router.delete('/students/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    return res.json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Failed to delete student' });
  }
});

export default router;
