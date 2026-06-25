import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { type, featured } = req.query;
    const where: any = { published: true };
    if (type) where.type = type;
    if (featured === 'true') where.featured = true;
    const events = await prisma.event.findMany({ where, orderBy: { date: 'asc' } });
    return res.json(events);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.findUnique({ where: { id: req.params.id } });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    return res.json(event);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch event' });
  }
});

router.post('/', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, date, endDate, location, type, registrationUrl, image, featured, published } = req.body;
    const event = await prisma.event.create({
      data: {
        title, description, date: new Date(date),
        endDate: endDate ? new Date(endDate) : null,
        location, type, registrationUrl, image,
        featured: featured === true || featured === 'true',
        published: published !== false && published !== 'false',
      },
    });
    return res.status(201).json(event);
  } catch {
    return res.status(500).json({ error: 'Failed to create event' });
  }
});

router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, date, endDate, location, type, registrationUrl, image, featured, published } = req.body;
    const event = await prisma.event.update({
      where: { id: req.params.id },
      data: {
        title, description, location, type, registrationUrl, image,
        date: date ? new Date(date) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        featured: featured === true || featured === 'true',
        published: published !== false && published !== 'false',
      },
    });
    return res.json(event);
  } catch {
    return res.status(500).json({ error: 'Failed to update event' });
  }
});

router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.event.delete({ where: { id: req.params.id } });
    return res.json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Failed to delete event' });
  }
});

export default router;
