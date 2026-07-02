import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();
const prisma = new PrismaClient();

function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Name, email, subject and message are required' });
    }
    const msg = await prisma.message.create({ data: { name, email, phone, subject, message } });

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = getTransporter();
        await transporter.sendMail({
          from: `"AFIA Website" <${process.env.EMAIL_USER}>`,
          to: 'team.afiacademy@gmail.com',
          replyTo: email,
          subject: `New Contact Form: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1E3A6B; padding: 24px; border-radius: 8px 8px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Form Submission</h1>
                <p style="color: #a0b4d0; margin: 4px 0 0;">Agri-Food Innovation Academy</p>
              </div>
              <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;"><strong>Name</strong></td><td style="padding: 8px 0;">${name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
                  ${phone ? `<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Phone</strong></td><td style="padding: 8px 0;">${phone}</td></tr>` : ''}
                  <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Subject</strong></td><td style="padding: 8px 0;">${subject}</td></tr>
                </table>
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
                <p style="color: #6b7280; margin: 0 0 8px;"><strong>Message:</strong></p>
                <p style="color: #111827; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br/>')}</p>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('Contact email failed:', emailErr);
      }
    }

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
