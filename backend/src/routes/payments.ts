import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import nodemailer from 'nodemailer';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();
const prisma = new PrismaClient();

// Verify Paystack payment and create enrollment
router.post('/verify', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { reference, courseId } = req.body;
    if (!reference || !courseId) {
      return res.status(400).json({ error: 'reference and courseId are required' });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({ error: 'Payment system not configured' });
    }

    const paystackRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${secretKey}` } }
    );

    const txn = paystackRes.data?.data;
    if (!txn || txn.status !== 'success') {
      return res.status(400).json({ error: 'Payment not successful' });
    }

    const existing = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: req.user!.id, courseId } },
    });
    if (existing) return res.status(400).json({ error: 'Already enrolled' });

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: req.user!.id,
        courseId,
        status: 'active',
        paymentRef: reference,
        amount: txn.amount / 100,
        currency: txn.currency || 'NGN',
        paidAt: new Date(),
      },
      include: { course: true },
    });

    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (user && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        await transporter.sendMail({
          from: `"AFIA Academy" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: `Payment Confirmed & Enrolled: ${course.title}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1E3A6B; padding: 24px; border-radius: 8px 8px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 22px;">Payment Confirmed!</h1>
                <p style="color: #a0b4d0; margin: 4px 0 0;">Agri-Food Innovation Academy</p>
              </div>
              <div style="padding: 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
                <p>Hi <strong>${user.name}</strong>,</p>
                <p>Your payment was successful and you are now enrolled in:</p>
                <div style="background: white; border-left: 4px solid #4CAF50; padding: 16px; border-radius: 4px; margin: 16px 0;">
                  <strong style="color: #1E3A6B; font-size: 16px;">${course.title}</strong>
                </div>
                <p><strong>Amount Paid:</strong> ${txn.currency} ${(txn.amount / 100).toLocaleString()}</p>
                <p><strong>Reference:</strong> ${reference}</p>
                <a href="https://agri-food-academy.onrender.com/portal/courses" style="display: inline-block; background: #1E3A6B; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Access My Course</a>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('Payment confirmation email failed:', emailErr);
      }
    }

    return res.status(201).json(enrollment);
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return res.status(400).json({ error: 'Payment verification failed with Paystack' });
    }
    return res.status(500).json({ error: err.message || 'Payment verification failed' });
  }
});

// ── BANK TRANSFER FLOW ──────────────────────────────────────────

// Student submits bank transfer proof
router.post('/bank-transfer', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { courseId, bankRef, transferDate, note } = req.body;
    if (!courseId || !bankRef || !transferDate) {
      return res.status(400).json({ error: 'courseId, bankRef and transferDate are required' });
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const alreadyEnrolled = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: req.user!.id, courseId } },
    });
    if (alreadyEnrolled) return res.status(400).json({ error: 'Already enrolled in this course' });

    const existing = await prisma.paymentRequest.findFirst({
      where: { userId: req.user!.id, courseId, status: 'pending' },
    });
    if (existing) return res.status(400).json({ error: 'You already have a pending payment request for this course' });

    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });

    const request = await prisma.paymentRequest.create({
      data: {
        userId: req.user!.id,
        courseId,
        amount: course.price,
        currency: course.currency,
        bankRef: bankRef.trim(),
        transferDate,
        note,
      },
      include: { course: true, user: { select: { name: true, email: true } } },
    });

    // Notify admin by email
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        await transporter.sendMail({
          from: `"AFIA Academy" <${process.env.EMAIL_USER}>`,
          to: 'team.afiacademy@gmail.com',
          subject: `New Payment Request: ${course.title}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1E3A6B; padding: 24px; border-radius: 8px 8px 0 0;">
                <h2 style="color: white; margin: 0;">New Bank Transfer Request</h2>
                <p style="color: #a0b4d0; margin: 4px 0 0;">Action required — approve to grant course access</p>
              </div>
              <div style="padding: 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;"><strong>Student</strong></td><td>${user?.name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Email</strong></td><td>${user?.email}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Course</strong></td><td>${course.title}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Amount</strong></td><td>${course.currency} ${course.price.toLocaleString()}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Bank Ref</strong></td><td><strong>${bankRef}</strong></td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Transfer Date</strong></td><td>${transferDate}</td></tr>
                  ${note ? `<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Note</strong></td><td>${note}</td></tr>` : ''}
                </table>
                <a href="https://agri-food-academy.onrender.com/admin/payment-requests" style="display: inline-block; background: #4CAF50; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 16px;">Review & Approve</a>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('Admin notification email failed:', emailErr);
      }
    }

    return res.status(201).json(request);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to submit payment request' });
  }
});

// Admin: list all payment requests
router.get('/requests', authenticateToken, requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const requests = await prisma.paymentRequest.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        course: { select: { id: true, title: true, price: true, currency: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return res.json(requests);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch payment requests' });
  }
});

// Admin: approve a payment request → enroll student
router.post('/requests/:id/approve', authenticateToken, requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const request = await prisma.paymentRequest.findUnique({
      where: { id: _req.params.id },
      include: { user: true, course: true },
    });
    if (!request) return res.status(404).json({ error: 'Request not found' });
    if (request.status !== 'pending') return res.status(400).json({ error: 'Request already reviewed' });

    await prisma.$transaction(async (tx) => {
      await tx.paymentRequest.update({
        where: { id: request.id },
        data: { status: 'approved', reviewedAt: new Date() },
      });

      const alreadyEnrolled = await tx.enrollment.findUnique({
        where: { userId_courseId: { userId: request.userId, courseId: request.courseId } },
      });
      if (!alreadyEnrolled) {
        await tx.enrollment.create({
          data: {
            userId: request.userId,
            courseId: request.courseId,
            status: 'active',
            paymentRef: request.bankRef,
            amount: request.amount,
            currency: request.currency,
            paidAt: new Date(),
          },
        });
      }
    });

    // Email student
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        await transporter.sendMail({
          from: `"AFIA Academy" <${process.env.EMAIL_USER}>`,
          to: request.user.email,
          subject: `Payment Confirmed — You're enrolled in ${request.course.title}!`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1E3A6B; padding: 24px; border-radius: 8px 8px 0 0;">
                <h2 style="color: white; margin: 0;">🎉 Payment Confirmed!</h2>
                <p style="color: #a0b4d0; margin: 4px 0 0;">You now have full access to your course</p>
              </div>
              <div style="padding: 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
                <p>Hi <strong>${request.user.name}</strong>,</p>
                <p>Your bank transfer has been verified and you are now enrolled in:</p>
                <div style="background: white; border-left: 4px solid #4CAF50; padding: 16px; border-radius: 4px; margin: 16px 0;">
                  <strong style="color: #1E3A6B; font-size: 16px;">${request.course.title}</strong>
                </div>
                <a href="https://agri-food-academy.onrender.com/portal/courses" style="display: inline-block; background: #1E3A6B; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Access My Course Now</a>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('Approval email failed:', emailErr);
      }
    }

    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Approval failed' });
  }
});

// Admin: reject a payment request
router.post('/requests/:id/reject', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const request = await prisma.paymentRequest.findUnique({
      where: { id: req.params.id },
      include: { user: true, course: true },
    });
    if (!request) return res.status(404).json({ error: 'Request not found' });
    if (request.status !== 'pending') return res.status(400).json({ error: 'Request already reviewed' });

    const { reviewNote } = req.body;

    await prisma.paymentRequest.update({
      where: { id: request.id },
      data: { status: 'rejected', reviewNote, reviewedAt: new Date() },
    });

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        await transporter.sendMail({
          from: `"AFIA Academy" <${process.env.EMAIL_USER}>`,
          to: request.user.email,
          subject: `Payment Request Update — ${request.course.title}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #dc2626; padding: 24px; border-radius: 8px 8px 0 0;">
                <h2 style="color: white; margin: 0;">Payment Request Update</h2>
              </div>
              <div style="padding: 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
                <p>Hi <strong>${request.user.name}</strong>,</p>
                <p>We were unable to verify your bank transfer for <strong>${request.course.title}</strong>.</p>
                ${reviewNote ? `<p><strong>Reason:</strong> ${reviewNote}</p>` : ''}
                <p>Please contact us at <a href="mailto:team.afiacademy@gmail.com">team.afiacademy@gmail.com</a> for assistance.</p>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('Rejection email failed:', emailErr);
      }
    }

    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Rejection failed' });
  }
});

export default router;
