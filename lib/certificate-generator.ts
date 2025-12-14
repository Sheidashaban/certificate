import { createCanvas, SKRSContext2D } from '@napi-rs/canvas';

export interface CertificateData {
  studentName: string;
  courseName: string;
  instructorName: string;
  year: number;
}

export async function generateCertificate(data: CertificateData): Promise<Buffer> {
  console.log('🎨 Starting certificate generation with data:', {
    studentName: data.studentName,
    courseName: data.courseName,
    instructorName: data.instructorName,
    year: data.year,
  });
  
  const width = 1200;
  const height = 800;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  console.log('✅ Canvas created, size:', width, 'x', height);

  // AI Tech Institute Brand Colors
  const YELLOW = '#FFD700'; // Bright yellow
  const BLACK = '#000000';  // Black
  const DARK_YELLOW = '#FFC107'; // Slightly darker yellow for accents
  const LIGHT_YELLOW = '#FFF9C4'; // Light yellow for background

  // Background - Yellow gradient effect
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, YELLOW);
  gradient.addColorStop(0.5, LIGHT_YELLOW);
  gradient.addColorStop(1, YELLOW);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Border - Bold black border
  ctx.strokeStyle = BLACK;
  ctx.lineWidth = 8;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Inner border - Yellow accent
  ctx.strokeStyle = DARK_YELLOW;
  ctx.lineWidth = 4;
  ctx.strokeRect(50, 50, width - 100, height - 100);

  // Corner decorations - Black geometric shapes
  const cornerSize = 60;
  ctx.fillStyle = BLACK;
  ctx.strokeStyle = BLACK;
  ctx.lineWidth = 3;
  
  // Top-left corner
  drawCornerDecoration(ctx, 80, 80, cornerSize, 'top-left');
  // Top-right corner
  drawCornerDecoration(ctx, width - 80, 80, cornerSize, 'top-right');
  // Bottom-left corner
  drawCornerDecoration(ctx, 80, height - 80, cornerSize, 'bottom-left');
  // Bottom-right corner
  drawCornerDecoration(ctx, width - 80, height - 80, cornerSize, 'bottom-right');

  // Main Title - AI Tech Institute Style
  // Set text properties BEFORE drawing
  ctx.fillStyle = BLACK;
  ctx.strokeStyle = BLACK;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic'; // Changed from 'top' to 'alphabetic'
  
  const titleY = 120;
  
  // Draw CERTIFICATE with stroke for visibility
  ctx.font = 'bold 64px sans-serif';
  ctx.lineWidth = 2;
  try {
    // Draw with both fill and stroke to ensure visibility
    ctx.strokeText('CERTIFICATE', width / 2, titleY);
    ctx.fillText('CERTIFICATE', width / 2, titleY);
    console.log('✅ Drew CERTIFICATE text at', width / 2, titleY);
  } catch (e) {
    console.error('❌ Error drawing CERTIFICATE:', e);
  }
  
  ctx.font = 'bold 52px sans-serif';
  try {
    ctx.strokeText('OF COMPLETION', width / 2, titleY + 70);
    ctx.fillText('OF COMPLETION', width / 2, titleY + 70);
    console.log('✅ Drew OF COMPLETION text at', width / 2, titleY + 70);
  } catch (e) {
    console.error('❌ Error drawing OF COMPLETION:', e);
  }

  // Decorative line under title
  ctx.strokeStyle = BLACK;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 200, titleY + 130);
  ctx.lineTo(width / 2 + 200, titleY + 130);
  ctx.stroke();

  // Student name section
  ctx.fillStyle = BLACK;
  ctx.strokeStyle = BLACK;
  ctx.textBaseline = 'alphabetic';
  
  ctx.font = 'normal 28px sans-serif';
  ctx.lineWidth = 1;
  try {
    ctx.strokeText('THIS IS TO CERTIFY THAT', width / 2, 280);
    ctx.fillText('THIS IS TO CERTIFY THAT', width / 2, 280);
    console.log('✅ Drew THIS IS TO CERTIFY THAT at', width / 2, 280);
  } catch (e) {
    console.error('❌ Error drawing THIS IS TO CERTIFY THAT:', e);
  }

  ctx.font = 'bold 48px sans-serif';
  ctx.lineWidth = 2;
  const studentNameText = data.studentName ? data.studentName.toUpperCase() : 'STUDENT NAME';
  console.log('🎨 Drawing student name:', studentNameText, 'at', width / 2, 330);
  try {
    ctx.strokeText(studentNameText, width / 2, 330);
    ctx.fillText(studentNameText, width / 2, 330);
    console.log('✅ Drew student name:', studentNameText);
  } catch (e) {
    console.error('❌ Error drawing student name:', e, e.message);
  }

  // Course section
  ctx.font = 'normal 28px sans-serif';
  ctx.lineWidth = 1;
  try {
    ctx.strokeText('HAS SUCCESSFULLY COMPLETED', width / 2, 400);
    ctx.fillText('HAS SUCCESSFULLY COMPLETED', width / 2, 400);
    console.log('✅ Drew HAS SUCCESSFULLY COMPLETED at', width / 2, 400);
  } catch (e) {
    console.error('❌ Error drawing HAS SUCCESSFULLY COMPLETED:', e);
  }

  ctx.font = 'bold 40px sans-serif';
  ctx.lineWidth = 2;
  const courseNameText = data.courseName ? data.courseName.toUpperCase() : 'COURSE NAME';
  console.log('🎨 Drawing course name:', courseNameText, 'at', width / 2, 450);
  try {
    ctx.strokeText(courseNameText, width / 2, 450);
    ctx.fillText(courseNameText, width / 2, 450);
    console.log('✅ Drew course name:', courseNameText);
  } catch (e) {
    console.error('❌ Error drawing course name:', e, e.message);
  }

  // Year
  ctx.font = 'normal 24px sans-serif';
  ctx.lineWidth = 1;
  const yearText = `Year: ${data.year}`;
  console.log('🎨 Drawing year:', yearText, 'at', width / 2, 510);
  try {
    ctx.strokeText(yearText, width / 2, 510);
    ctx.fillText(yearText, width / 2, 510);
    console.log('✅ Drew year:', yearText);
  } catch (e) {
    console.error('❌ Error drawing year:', e, e.message);
  }

  // AI Tech Institute Logo Area (top center)
  drawAITechLogo(ctx, width / 2, 60, 100);

  // Signature lines
  const signatureY = height - 100;
  const leftSignatureX = 250;
  const rightSignatureX = width - 250;

  ctx.strokeStyle = BLACK;
  ctx.lineWidth = 2;
  
  // Left signature
  ctx.beginPath();
  ctx.moveTo(leftSignatureX - 120, signatureY);
  ctx.lineTo(leftSignatureX + 120, signatureY);
  ctx.stroke();
  
  ctx.fillStyle = BLACK;
  ctx.font = 'normal 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  try {
    ctx.fillText('SIGNATURE', leftSignatureX, signatureY + 10);
    ctx.fillText(data.instructorName || 'Instructor', leftSignatureX, signatureY - 25);
    console.log('✅ Drew left signature');
  } catch (e) {
    console.error('❌ Error drawing left signature:', e);
  }

  // Right signature
  ctx.beginPath();
  ctx.moveTo(rightSignatureX - 120, signatureY);
  ctx.lineTo(rightSignatureX + 120, signatureY);
  ctx.stroke();
  
  try {
    ctx.fillText('SIGNATURE', rightSignatureX, signatureY + 10);
    ctx.fillText('AI TECH INSTITUTE', rightSignatureX, signatureY - 25);
    console.log('✅ Drew right signature');
  } catch (e) {
    console.error('❌ Error drawing right signature:', e);
  }

  // Bottom decorative element
  ctx.fillStyle = BLACK;
  ctx.font = 'bold 20px sans-serif';
  try {
    ctx.fillText('AI TECH INSTITUTE', width / 2, height - 40);
    console.log('✅ Drew bottom text');
  } catch (e) {
    console.error('❌ Error drawing bottom text:', e);
  }

  console.log('✅ Certificate generation complete');
  return canvas.toBuffer('image/png');
}

function drawCornerDecoration(
  ctx: SKRSContext2D,
  x: number,
  y: number,
  size: number,
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
) {
  ctx.save();
  ctx.translate(x, y);
  
  if (position === 'top-right' || position === 'bottom-left') {
    ctx.scale(-1, position === 'bottom-left' ? -1 : 1);
  } else if (position === 'bottom-right') {
    ctx.scale(-1, -1);
  }
  
  // Draw geometric corner pattern
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.lineTo(size * 0.6, size * 0.4);
  ctx.lineTo(size * 0.4, size * 0.6);
  ctx.lineTo(0, size);
  ctx.closePath();
  ctx.stroke();
  
  ctx.restore();
}

function drawAITechLogo(
  ctx: SKRSContext2D,
  x: number,
  y: number,
  size: number
) {
  ctx.save();
  ctx.translate(x, y);

  // Black circle background
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
  ctx.fill();

  // Yellow "AI" text
  ctx.fillStyle = '#FFD700';
  ctx.font = `bold ${size / 3}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  try {
    ctx.fillText('AI', 0, -size / 8);
    console.log('✅ Drew AI logo text');
  } catch (e) {
    console.error('❌ Error drawing AI logo:', e);
  }

  // Yellow "INSTITUTE TECH" text below
  ctx.font = `bold ${size / 5}px sans-serif`;
  try {
    ctx.fillText('INSTITUTE', 0, size / 6);
    ctx.fillText('TECH', 0, size / 3);
    console.log('✅ Drew INSTITUTE TECH text');
  } catch (e) {
    console.error('❌ Error drawing INSTITUTE TECH:', e);
  }

  ctx.restore();
}
