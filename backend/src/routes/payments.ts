import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import nodemailer from 'nodemailer';
import { authenticateToken } from '../middleware/auth';
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

export default router;
