import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const settings = await prisma.siteSetting.findMany();
    const obj: Record<string, string> = {};
    settings.forEach((s) => { obj[s.key] = s.value; });
    return res.json(obj);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

router.put('/', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const updates = req.body as Record<string, string>;
    await Promise.all(
      Object.entries(updates).map(([key, value]) =>
        prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } })
      )
    );
    return res.json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router;
