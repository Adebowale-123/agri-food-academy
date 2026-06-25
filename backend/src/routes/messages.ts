import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();
const prisma = new PrismaClient();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Name, email, subject and message are required' });
    }
    const msg = await prisma.message.create({ data: { name, email, phone, subject, message } });
    return res.status(201).json({ success: true, id: msg.id });
  } catch {
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

router.get('/', authenticateToken, requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
    return res.json(messages);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

router.put('/:id/read', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.message.update({ where: { id: req.params.id }, data: { read: true } });
    return res.json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Failed to update message' });
  }
});

router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.message.delete({ where: { id: req.params.id } });
    return res.json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Failed to delete message' });
  }
});

export default router;
