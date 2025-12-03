// Database initialization script
// This script ensures the database is properly initialized
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '..', 'certificates.db');
const db = new Database(dbPath);

console.log('Initializing database...');

db.exec(`
  CREATE TABLE IF NOT EXISTS certificates (
    id TEXT PRIMARY KEY,
    student_name TEXT NOT NULL,
    course_name TEXT NOT NULL,
    instructor_name TEXT NOT NULL,
    year INTEGER NOT NULL,
    student_email TEXT NOT NULL,
    certificate_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('Database initialized successfully!');
console.log(`Database location: ${dbPath}`);

db.close();

