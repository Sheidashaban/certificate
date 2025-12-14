import type { NextApiRequest, NextApiResponse } from 'next';
import { getCertificate } from '@/lib/database';
import { generateCertificate } from '@/lib/certificate-generator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      console.error('❌ Certificate ID missing or invalid:', id);
      return res.status(400).json({ error: 'Certificate ID is required' });
    }

    console.log('🔍 Looking for certificate with ID:', id);
    const certificate = getCertificate(id);

    if (!certificate) {
      console.error('❌ Certificate not found for ID:', id);
      // Log database state for debugging
      const dbPath = process.env.VERCEL ? '/tmp/certificates.json' : (process.env.DATABASE_PATH || './certificates.json');
      console.error('📁 Database path:', dbPath);
      try {
        const fs = require('fs');
        if (fs.existsSync(dbPath)) {
          const data = fs.readFileSync(dbPath, 'utf-8');
          console.error('📊 Database contents:', data.substring(0, 500));
        } else {
          console.error('❌ Database file does not exist');
        }
      } catch (e) {
        console.error('❌ Error reading database:', e);
      }
      return res.status(404).json({ error: 'Certificate not found' });
    }

    console.log('✅ Certificate found:', {
      student: certificate.student_name,
      course: certificate.course_name,
      instructor: certificate.instructor_name,
      year: certificate.year,
    });

    // Generate certificate image on-the-fly
    console.log('🎨 Generating certificate image...');
    const certificateBuffer = await generateCertificate({
      studentName: certificate.student_name,
      courseName: certificate.course_name,
      instructorName: certificate.instructor_name,
      year: certificate.year,
    });
    console.log('✅ Certificate image generated, size:', certificateBuffer.length, 'bytes');

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `inline; filename="certificate-${id}.png"`);
    // Add headers for LinkedIn and social media sharing
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.send(certificateBuffer);
  } catch (error) {
    console.error('❌ Certificate retrieval error:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    return res.status(500).json({ error: 'Failed to retrieve certificate' });
  }
}

