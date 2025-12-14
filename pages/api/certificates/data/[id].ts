import type { NextApiRequest, NextApiResponse } from 'next';
import { getCertificate } from '@/lib/database';

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

    console.log('🔍 Looking for certificate data with ID:', id);
    const certificate = await getCertificate(id);

    if (!certificate) {
      console.error('❌ Certificate not found for ID:', id);
      return res.status(404).json({ error: 'Certificate not found' });
    }

    console.log('✅ Certificate data found:', {
      student: certificate.student_name,
      course: certificate.course_name,
    });

    return res.status(200).json(certificate);
  } catch (error) {
    console.error('❌ Certificate data retrieval error:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    return res.status(500).json({ error: 'Failed to retrieve certificate data' });
  }
}

