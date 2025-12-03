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
      return res.status(400).json({ error: 'Certificate ID is required' });
    }

    const certificate = getCertificate(id);

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    // Generate certificate image on-the-fly
    const certificateBuffer = await generateCertificate({
      studentName: certificate.student_name,
      courseName: certificate.course_name,
      instructorName: certificate.instructor_name,
      year: certificate.year,
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `inline; filename="certificate-${id}.png"`);
    // Add headers for LinkedIn and social media sharing
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.send(certificateBuffer);
  } catch (error) {
    console.error('Certificate retrieval error:', error);
    return res.status(500).json({ error: 'Failed to retrieve certificate' });
  }
}

