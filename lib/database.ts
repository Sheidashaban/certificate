import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

// Initialize Postgres connection pool
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    
    if (!connectionString) {
      throw new Error('DATABASE_URL or POSTGRES_URL environment variable is not set');
    }

    pool = new Pool({
      connectionString,
      ssl: connectionString.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
    });

    // Initialize database table on first connection
    initializeDatabase();
  }
  
  return pool;
}

async function initializeDatabase(): Promise<void> {
  try {
    const client = await getPool().connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS certificates (
        id TEXT PRIMARY KEY,
        student_name TEXT NOT NULL,
        course_name TEXT NOT NULL,
        instructor_name TEXT NOT NULL,
        year INTEGER NOT NULL,
        student_email TEXT NOT NULL,
        certificate_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    client.release();
    console.log('✅ Database table initialized');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    // Don't throw - allow app to continue
  }
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

export async function createCertificate(data: Omit<Certificate, 'id' | 'created_at'>): Promise<Certificate> {
  const id = uuidv4();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const certificateUrl = `${appUrl}/certificate/${id}`;
  
  const certificate: Certificate = {
    id,
    ...data,
    certificate_url: certificateUrl,
    created_at: new Date().toISOString(),
  };

  try {
    const client = await getPool().connect();
    await client.query(
      `INSERT INTO certificates (id, student_name, course_name, instructor_name, year, student_email, certificate_url, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        certificate.id,
        certificate.student_name,
        certificate.course_name,
        certificate.instructor_name,
        certificate.year,
        certificate.student_email,
        certificate.certificate_url,
        certificate.created_at,
      ]
    );
    client.release();
    console.log('✅ Certificate saved to database, ID:', certificate.id);
    return certificate;
  } catch (error) {
    console.error('❌ Error creating certificate:', error);
    throw error;
  }
}

export async function getCertificate(id: string): Promise<Certificate | null> {
  try {
    const client = await getPool().connect();
    const result = await client.query(
      'SELECT * FROM certificates WHERE id = $1',
      [id]
    );
    client.release();
    
    if (result.rows.length === 0) {
      console.log('❌ Certificate not found for ID:', id);
      return null;
    }
    
    const certificate = result.rows[0] as Certificate;
    console.log('✅ Certificate found:', {
      student: certificate.student_name,
      course: certificate.course_name,
    });
    return certificate;
  } catch (error) {
    console.error('❌ Error getting certificate:', error);
    return null;
  }
}

export async function getAllCertificates(): Promise<Certificate[]> {
  try {
    const client = await getPool().connect();
    const result = await client.query(
      'SELECT * FROM certificates ORDER BY created_at DESC'
    );
    client.release();
    return result.rows as Certificate[];
  } catch (error) {
    console.error('❌ Error getting all certificates:', error);
    return [];
  }
}
