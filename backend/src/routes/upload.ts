import { Router, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const folder = (req.query.folder as string) || 'general';
    const dir = path.join(__dirname, '../../uploads', folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const imageFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  if (allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files allowed'));
  }
};

const upload = multer({ storage, fileFilter: imageFilter, limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/image', authenticateToken, requireAdmin, upload.single('image'), (req: AuthRequest, res: Response) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const folder = (req.query.folder as string) || 'general';
  return res.json({ url: `/uploads/${folder}/${req.file.filename}` });
});

router.delete('/image', authenticateToken, requireAdmin, (req: AuthRequest, res: Response) => {
  try {
    const { path: filePath } = req.body as { path: string };
    const fullPath = path.join(__dirname, '../..', filePath);
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    return res.json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Could not delete file' });
  }
});

export default router;
