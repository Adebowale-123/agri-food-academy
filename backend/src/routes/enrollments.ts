import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();
const prisma = new PrismaClient();

function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
}

async function sendEnrollmentEmail(toEmail: string, toName: string, courseTitle: string) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
  try {
    await getTransporter().sendMail({
      from: `"AFIA Academy" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: `You're enrolled: ${courseTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1E3A6B; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Enrollment Confirmed!</h1>
            <p style="color: #a0b4d0; margin: 4px 0 0;">Agri-Food Innovation Academy</p>
          </div>
          <div style="padding: 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
            <p style="color: #111827;">Hi <strong>${toName}</strong>,</p>
            <p style="color: #374151;">You have successfully enrolled in:</p>
            <div style="background: white; border-left: 4px solid #4CAF50; padding: 16px; border-radius: 4px; margin: 16px 0;">
              <strong style="color: #1E3A6B; font-size: 16px;">${courseTitle}</strong>
            </div>
            <p style="color: #374151;">Log in to your student portal to access your course materials and start learning.</p>
            <a href="https://agri-food-academy.onrender.com/portal/courses" style="display: inline-block; background: #1E3A6B; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 8px;">Go to My Courses</a>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">Agri-Food Innovation Academy &mdash; Building Competence. Driving Compliance. Inspiring Innovation.</p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error('Enrollment email failed:', err);
  }
}

// Check if current user is enrolled in a course
router.get('/check/:courseId', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: req.user!.id, courseId: req.params.courseId } },
      include: { certificate: true },
    });
    return res.json({ enrolled: !!enrollment, enrollment: enrollment || null });
  } catch {
    return res.status(500).json({ error: 'Failed to check enrollment' });
  }
});

// Enroll in a course (free or after payment)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { courseId, paymentRef, amount, currency } = req.body;
    if (!courseId) return res.status(400).json({ error: 'courseId required' });

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) return res.status(404).json({ error: 'Course not found' });

    if (course.price > 0 && !paymentRef) {
      return res.status(400).json({ error: 'Payment required for paid courses' });
    }

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
        amount: amount ? parseFloat(amount) : 0,
        currency: currency || 'NGN',
        paidAt: paymentRef ? new Date() : null,
      },
      include: { course: true },
    });

    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (user) await sendEnrollmentEmail(user.email, user.name, course.title);

    return res.status(201).json(enrollment);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Enrollment failed' });
  }
});

// Mark course as complete and issue certificate
router.post('/complete/:courseId', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: req.user!.id, courseId: req.params.courseId } },
      include: { user: true, course: true },
    });
    if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });
    if (enrollment.status === 'completed') {
      const certificate = await prisma.certificate.findUnique({ where: { enrollmentId: enrollment.id } });
      return res.json({ enrollment, certificate });
    }

    const certNumber = `AFIA-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

    const [updatedEnrollment, certificate] = await prisma.$transaction([
      prisma.enrollment.update({ where: { id: enrollment.id }, data: { status: 'completed' } }),
      prisma.certificate.create({
        data: {
          userId: req.user!.id,
          courseId: req.params.courseId,
          enrollmentId: enrollment.id,
          certificateNumber: certNumber,
        },
      }),
    ]);

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await getTransporter().sendMail({
          from: `"AFIA Academy" <${process.env.EMAIL_USER}>`,
          to: enrollment.user.email,
          subject: `Certificate Issued: ${enrollment.course.title}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1E3A6B; padding: 24px; border-radius: 8px 8px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 22px;">🎓 Congratulations!</h1>
                <p style="color: #a0b4d0; margin: 4px 0 0;">Certificate of Completion Issued</p>
              </div>
              <div style="padding: 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
                <p>Hi <strong>${enrollment.user.name}</strong>,</p>
                <p>You have successfully completed <strong>${enrollment.course.title}</strong>.</p>
                <p>Your certificate number is: <strong>${certNumber}</strong></p>
                <p>Log in to your student portal to download your certificate.</p>
                <a href="https://agri-food-academy.onrender.com/portal/courses" style="display: inline-block; background: #4CAF50; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Download Certificate</a>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('Completion email failed:', emailErr);
      }
    }

    return res.json({ enrollment: updatedEnrollment, certificate });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to complete course' });
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
        certificate: true,
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
