import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { testEmail } = req.body;

    if (!testEmail) {
      return res.status(400).json({ error: 'Test email address is required' });
    }

    // Check environment variables
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');

    if (!smtpUser || !smtpPass) {
      return res.status(400).json({
        error: 'Email configuration missing',
        details: {
          SMTP_USER: smtpUser ? 'Set' : 'Missing',
          SMTP_PASS: smtpPass ? 'Set' : 'Missing',
        },
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Verify connection
    await transporter.verify();

    // Send test email
    const mailOptions = {
      from: process.env.FROM_EMAIL || smtpUser,
      to: testEmail,
      subject: 'Test Email from AI Tech Institute Certificate Generator',
      html: `
        <h2>Test Email</h2>
        <p>If you received this email, your email configuration is working correctly!</p>
        <p>From: ${smtpUser}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Test email sent successfully!',
      sentTo: testEmail,
    });
  } catch (error: any) {
    console.error('Test email error:', error);
    return res.status(500).json({
      error: 'Failed to send test email',
      details: error.message,
      code: error.code,
    });
  }
}

