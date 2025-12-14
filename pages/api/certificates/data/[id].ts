import type { NextApiRequest, NextApiResponse } from 'next';
import { getCertificate } from '@/lib/database';

export default function handler(
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
          const certificates = JSON.parse(data);
          console.error('📊 Total certificates in database:', certificates.length);
          console.error('📋 Certificate IDs:', certificates.map((c: any) => c.id));
        } else {
          console.error('❌ Database file does not exist');
        }
      } catch (e) {
        console.error('❌ Error reading database:', e);
      }
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

