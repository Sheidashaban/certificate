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
      return res.status(400).json({ error: 'Certificate ID is required' });
    }

    const certificate = getCertificate(id);

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    return res.status(200).json(certificate);
  } catch (error) {
    console.error('Certificate data retrieval error:', error);
    return res.status(500).json({ error: 'Failed to retrieve certificate data' });
  }
}

