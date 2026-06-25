import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();
const prisma = new PrismaClient();

router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { courseId, paymentRef, amount, currency } = req.body;
    if (!courseId) return res.status(400).json({ error: 'courseId required' });

    const existing = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: req.user!.id, courseId } },
    });
    if (existing) return res.status(400).json({ error: 'Already enrolled' });

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: req.user!.id,
        courseId,
        status: 'active',
        paymentRef,
        amount: parseFloat(amount) || 0,
        currency: currency || 'NGN',
        paidAt: paymentRef ? new Date() : null,
      },
      include: { course: true },
    });
    return res.status(201).json(enrollment);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Enrollment failed' });
  }
});

router.get('/my', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.user!.id },
      include: {
        course: {
          include: { modules: { include: { _count: { select: { materials: true } } } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return res.json(enrollments);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

router.get('/', authenticateToken, requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: { user: { select: { id: true, name: true, email: true } }, course: { select: { id: true, title: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return res.json(enrollments);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const enrollment = await prisma.enrollment.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
    });
    return res.json(enrollment);
  } catch {
    return res.status(500).json({ error: 'Failed to update enrollment' });
  }
});

export default router;
