import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'certificates.json');

// Initialize database file if it doesn't exist
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
}

function readDatabase(): Certificate[] {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeDatabase(data: Certificate[]): void {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export interface Certificate {
  id: string;
  student_name: string;
  course_name: string;
  instructor_name: string;
  year: number;
  student_email: string;
  certificate_url: string;
  created_at?: string;
}

export function createCertificate(data: Omit<Certificate, 'id' | 'created_at'>): Certificate {
  const id = uuidv4();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const certificateUrl = `${appUrl}/certificate/${id}`;
  
  const certificate: Certificate = {
    id,
    ...data,
    certificate_url: certificateUrl,
    created_at: new Date().toISOString(),
  };
  
  const certificates = readDatabase();
  certificates.push(certificate);
  writeDatabase(certificates);
  
  return certificate;
}

export function getCertificate(id: string): Certificate | null {
  const certificates = readDatabase();
  return certificates.find(cert => cert.id === id) || null;
}

export function getAllCertificates(): Certificate[] {
  const certificates = readDatabase();
  return certificates.sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return dateB - dateA; // Most recent first
  });
}
