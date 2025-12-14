import type { NextApiRequest, NextApiResponse } from 'next';
import { generateCertificate } from '@/lib/certificate-generator';
import { createCertificate } from '@/lib/database';
import { sendCertificateEmail } from '@/lib/email';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { studentName, courseName, instructorName, year, studentEmail } = req.body;

    // Validate input
    if (!studentName || !courseName || !instructorName || !year || !studentEmail) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    console.log('🔄 Starting certificate generation...');
    console.log('📋 Student:', studentName);
    console.log('📚 Course:', courseName);
    console.log('📧 Email:', studentEmail);

    // Generate certificate image
    const certificateBuffer = await generateCertificate({
      studentName,
      courseName,
      instructorName,
      year: parseInt(year),
    });
    console.log('✅ Certificate image generated, size:', certificateBuffer.length, 'bytes');

    // Save to database
    const certificate = await createCertificate({
      student_name: studentName,
      course_name: courseName,
      instructor_name: instructorName,
      year: parseInt(year),
      student_email: studentEmail,
      certificate_url: '', // Will be set by createCertificate
    });
    console.log('✅ Certificate saved to database, ID:', certificate.id);
    console.log('🔗 Certificate URL:', certificate.certificate_url);

    // Send email with certificate
    let emailError: any = null;
    try {
      console.log('📧 Sending email to:', studentEmail);
      await sendCertificateEmail(
        studentEmail,
        studentName,
        courseName,
        certificate.certificate_url,
        certificateBuffer
      );
      console.log('✅ Email sent successfully');
    } catch (err: any) {
      emailError = err;
      console.error('❌ Email sending failed:', err);
      // Continue even if email fails - certificate is still created
    }

    return res.status(200).json({
      success: true,
      certificate: {
        id: certificate.id,
        url: certificate.certificate_url,
      },
      emailSent: !emailError,
      emailError: emailError ? emailError.message : null,
    });
  } catch (error: any) {
    console.error('Certificate generation error:', error);
    const errorMessage = error?.message || 'Unknown error';
    const errorStack = error?.stack || '';
    console.error('Error details:', errorMessage);
    console.error('Error stack:', errorStack);
    return res.status(500).json({ 
      error: 'Failed to generate certificate',
      details: errorMessage,
      message: errorMessage
    });
  }
}

