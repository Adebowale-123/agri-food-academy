import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

import authRoutes from './routes/auth';
import coursesRoutes from './routes/courses';
import enrollmentsRoutes from './routes/enrollments';
import eventsRoutes from './routes/events';
import blogRoutes from './routes/blog';
import resourcesRoutes from './routes/resources';
import messagesRoutes from './routes/messages';
import adminRoutes from './routes/admin';
import settingsRoutes from './routes/settings';
import uploadRoutes from './routes/upload';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5001;
const isProd = process.env.NODE_ENV === 'production';

app.use(cors({
  origin: isProd
    ? true
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', name: 'Agri-Food Innovation Academy API' }));

app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/enrollments', enrollmentsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);

// Serve React frontend in production
if (isProd) {
  const frontendDist = path.join(__dirname, '../../frontend/dist');
  app.use(express.static(frontendDist));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

async function seedIfEmpty() {
  const count = await prisma.user.count();
  if (count === 0) {
    const { seedDatabase } = await import('./seed');
    await seedDatabase();
    console.log('Database seeded');
  }
}

app.listen(PORT, async () => {
  console.log(`AFIA API running on port ${PORT}`);
  try {
    await seedIfEmpty();
  } catch (err) {
    console.error('Seed error:', err);
  }
});
