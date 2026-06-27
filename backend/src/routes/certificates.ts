import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import PDFDocument from 'pdfkit';
import { authenticateToken } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();
const prisma = new PrismaClient();

// Generate and stream a PDF certificate for a completed course
router.get('/:courseId', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const certificate = await prisma.certificate.findFirst({
      where: { userId: req.user!.id, courseId: req.params.courseId },
      include: { user: true, course: true },
    });

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found. Complete the course first.' });
    }

    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 60 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="AFIA-Certificate-${certificate.certificateNumber}.pdf"`
    );
    doc.pipe(res);

    const W = doc.page.width;
    const H = doc.page.height;

    // Background
    doc.rect(0, 0, W, H).fill('#F4F8F5');

    // Outer border
    doc.rect(24, 24, W - 48, H - 48).lineWidth(3).stroke('#1E3A6B');
    // Inner border
    doc.rect(32, 32, W - 64, H - 64).lineWidth(1).stroke('#4CAF50');

    // Top accent bar
    doc.rect(32, 32, W - 64, 8).fill('#1E3A6B');

    // Academy name
    doc.font('Helvetica-Bold')
      .fontSize(28)
      .fillColor('#1E3A6B')
      .text('AGRI-FOOD INNOVATION ACADEMY', 0, 70, { align: 'center' });

    // Subtitle
    doc.font('Helvetica')
      .fontSize(13)
      .fillColor('#4CAF50')
      .text('Professional Learning, Training & Workforce Development', 0, 106, { align: 'center' });

    // Divider
    doc.moveTo(120, 132).lineTo(W - 120, 132).lineWidth(1).stroke('#1E3A6B');

    // Certificate of Completion
    doc.font('Helvetica')
      .fontSize(14)
      .fillColor('#555')
      .text('C E R T I F I C A T E   O F   C O M P L E T I O N', 0, 148, { align: 'center' });

    // "This is to certify that"
    doc.font('Helvetica')
      .fontSize(13)
      .fillColor('#374151')
      .text('This is to certify that', 0, 178, { align: 'center' });

    // Student name
    doc.font('Helvetica-Bold')
      .fontSize(38)
      .fillColor('#1E3A6B')
      .text(certificate.user.name, 0, 200, { align: 'center' });

    // Underline for name
    const nameWidth = doc.widthOfString(certificate.user.name, { fontSize: 38 });
    const nameX = (W - nameWidth) / 2;
    doc.moveTo(nameX, 248).lineTo(nameX + nameWidth, 248).lineWidth(1).stroke('#4CAF50');

    // "has successfully completed"
    doc.font('Helvetica')
      .fontSize(13)
      .fillColor('#374151')
      .text('has successfully completed the programme', 0, 262, { align: 'center' });

    // Course title
    doc.font('Helvetica-Bold')
      .fontSize(22)
      .fillColor('#1E3A6B')
      .text(certificate.course.title, 60, 288, { align: 'center', width: W - 120 });

    // Faculty
    doc.font('Helvetica')
      .fontSize(12)
      .fillColor('#6b7280')
      .text(certificate.course.faculty, 0, 330, { align: 'center' });

    // Divider
    doc.moveTo(120, 358).lineTo(W - 120, 358).lineWidth(1).stroke('#1E3A6B');

    // Issue date and cert number
    const issueDate = new Date(certificate.issuedAt).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    });

    doc.font('Helvetica')
      .fontSize(11)
      .fillColor('#374151')
      .text(`Date of Issue: ${issueDate}`, 80, 375)
      .text(`Certificate No: ${certificate.certificateNumber}`, 80, 393);

    doc.font('Helvetica')
      .fontSize(11)
      .fillColor('#374151')
      .text('Director, AFIA', W - 200, 375)
      .text('agri-food-academy.onrender.com', W - 250, 393);

    // Bottom accent bar
    doc.rect(32, H - 40, W - 64, 8).fill('#4CAF50');

    doc.end();
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to generate certificate' });
  }
});

export default router;
