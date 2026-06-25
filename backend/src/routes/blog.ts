import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();
const prisma = new PrismaClient();

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
}

router.get('/', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const where: any = { published: true };
    if (category) where.category = category;
    const posts = await prisma.blogPost.findMany({
      where,
      include: { author: { select: { id: true, name: true } } },
      orderBy: { publishedAt: 'desc' },
    });
    return res.json(posts);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: req.params.slug },
      include: { author: { select: { id: true, name: true } } },
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    return res.json(post);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch post' });
  }
});

router.post('/', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, excerpt, thumbnail, category, published } = req.body;
    const slug = slugify(title);
    const isPublished = published === true || published === 'true';
    const post = await prisma.blogPost.create({
      data: {
        title, slug, content, excerpt, thumbnail, category,
        authorId: req.user!.id,
        published: isPublished,
        publishedAt: isPublished ? new Date() : null,
      },
    });
    return res.status(201).json(post);
  } catch {
    return res.status(500).json({ error: 'Failed to create post' });
  }
});

router.put('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, excerpt, thumbnail, category, published } = req.body;
    const isPublished = published === true || published === 'true';
    const post = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: {
        title, content, excerpt, thumbnail, category,
        published: isPublished,
        publishedAt: isPublished ? new Date() : null,
      },
    });
    return res.json(post);
  } catch {
    return res.status(500).json({ error: 'Failed to update post' });
  }
});

router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.blogPost.delete({ where: { id: req.params.id } });
    return res.json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Failed to delete post' });
  }
});

export default router;
