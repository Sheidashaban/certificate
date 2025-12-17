import { createCanvas, SKRSContext2D } from '@napi-rs/canvas';

export interface CertificateData {
  studentName: string;
  courseName: string;
  instructorName: string;
  year: number;
}

export async function generateCertificate(data: CertificateData): Promise<Buffer> {
  console.log('🎨 Starting certificate generation');
  console.log('📋 Data:', { 
    studentName: data.studentName, 
    courseName: data.courseName,
    studentNameLength: data.studentName?.length || 0,
    courseNameLength: data.courseName?.length || 0
  });
  
  const width = 1200;
  const height = 800;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background - white with subtle pattern
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Add subtle background pattern (guilloche-like effect)
  ctx.strokeStyle = '#E8F4F8';
  ctx.lineWidth = 1;
  for (let i = 0; i < width; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.quadraticCurveTo(i + 10, height / 2, i, height);
    ctx.stroke();
  }

  // Border - decorative multi-layer border
  ctx.strokeStyle = '#2C3E50';
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  ctx.strokeStyle = '#34495E';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  ctx.strokeStyle = '#7F8C8D';
  ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // Corner decorations
  const cornerSize = 50;
  ctx.strokeStyle = '#2C3E50';
  ctx.lineWidth = 2;
  
  drawCornerDecoration(ctx, 50, 50, cornerSize, 'top-left');
  drawCornerDecoration(ctx, width - 50, 50, cornerSize, 'top-right');
  drawCornerDecoration(ctx, 50, height - 50, cornerSize, 'bottom-left');
  drawCornerDecoration(ctx, width - 50, height - 50, cornerSize, 'bottom-right');

  // Main Title - USE SIMPLE FONTS THAT WORK IN SERVERLESS
  ctx.fillStyle = '#2C3E50';
  ctx.font = 'bold 56px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  console.log('🎨 Drawing CERTIFICATE title');
  try {
    ctx.fillText('CERTIFICATE', width / 2, 150);
    console.log('✅ CERTIFICATE drawn');
  } catch (e) {
    console.error('❌ Error drawing CERTIFICATE:', e);
  }
  
  ctx.font = 'bold 48px serif';
  try {
    ctx.fillText('OF COMPLETION', width / 2, 210);
    console.log('✅ OF COMPLETION drawn');
  } catch (e) {
    console.error('❌ Error drawing OF COMPLETION:', e);
  }

  // Student name section - CRITICAL - USE SIMPLE FONTS
  ctx.fillStyle = '#34495E';
  ctx.font = 'normal 24px sans-serif';
  try {
    ctx.fillText('COMPLETED THE', width / 2, 280);
    console.log('✅ COMPLETED THE drawn');
  } catch (e) {
    console.error('❌ Error:', e);
  }

  ctx.fillStyle = '#2C3E50';
  ctx.font = 'bold 42px serif';
  const studentName = data.studentName ? data.studentName.toUpperCase() : 'STUDENT NAME';
  console.log('🎨 CRITICAL - Drawing student name:', studentName, 'at', width / 2, 330);
  try {
    // Draw multiple times to ensure it appears
    ctx.fillText(studentName, width / 2, 330);
    ctx.fillText(studentName, width / 2 + 1, 330 + 1); // Slight offset for thickness
    console.log('✅✅✅ Student name SUCCESSFULLY drawn:', studentName);
  } catch (e: any) {
    console.error('❌❌❌ CRITICAL ERROR drawing student name:', e?.message || e);
    // Try fallback
    try {
      ctx.fillStyle = '#000000';
      ctx.font = '42px serif';
      ctx.fillText(studentName, width / 2, 330);
      console.log('✅ Fallback: Student name drawn');
    } catch (e2) {
      console.error('❌ Even fallback failed:', e2);
    }
  }

  // Course section - CRITICAL
  ctx.fillStyle = '#34495E';
  ctx.font = 'normal 24px sans-serif';
  try {
    ctx.fillText('ATTENDED THE', width / 2, 390);
  } catch (e) {
    console.error('❌ Error:', e);
  }

  ctx.fillStyle = '#2C3E50';
  ctx.font = 'bold 36px serif';
  const courseName = data.courseName ? data.courseName.toUpperCase() : 'COURSE NAME';
  console.log('🎨 CRITICAL - Drawing course name:', courseName, 'at', width / 2, 440);
  try {
    ctx.fillText(courseName, width / 2, 440);
    ctx.fillText(courseName, width / 2 + 1, 440 + 1); // Slight offset
    console.log('✅✅✅ Course name SUCCESSFULLY drawn:', courseName);
  } catch (e: any) {
    console.error('❌❌❌ CRITICAL ERROR drawing course name:', e?.message || e);
    try {
      ctx.fillStyle = '#000000';
      ctx.font = '36px serif';
      ctx.fillText(courseName, width / 2, 440);
      console.log('✅ Fallback: Course name drawn');
    } catch (e2) {
      console.error('❌ Even fallback failed:', e2);
    }
  }

  // Year
  ctx.fillStyle = '#7F8C8D';
  ctx.font = 'normal 20px sans-serif';
  try {
    ctx.fillText(`Year: ${data.year}`, width / 2, 490);
  } catch (e) {
    console.error('❌ Error:', e);
  }

  // Decorative seal on top-left
  drawSeal(ctx, 150, 120, 80, 'CERTIFY', 'THE COMPLETION');

  // Company seal on bottom-center
  drawSeal(ctx, width / 2, height - 150, 70, 'AI TECH', 'INSTITUTE');

  // Signature lines
  const signatureY = height - 80;
  const leftSignatureX = 200;
  const rightSignatureX = width - 200;

  ctx.strokeStyle = '#2C3E50';
  ctx.lineWidth = 1;
  
  // Left signature
  ctx.beginPath();
  ctx.moveTo(leftSignatureX - 100, signatureY);
  ctx.lineTo(leftSignatureX + 100, signatureY);
  ctx.stroke();
  
  ctx.fillStyle = '#7F8C8D';
  ctx.font = 'normal 14px sans-serif';
  ctx.textAlign = 'center';
  try {
    ctx.fillText('SIGNATURE', leftSignatureX, signatureY + 20);
    ctx.fillText('Dr Amir Charkhi', leftSignatureX, signatureY - 15);
    ctx.font = 'normal 12px sans-serif';
    ctx.fillText('Executive Director', leftSignatureX, signatureY - 30);
  } catch (e) {
    console.error('❌ Error drawing signature:', e);
  }

  // Right signature
  ctx.beginPath();
  ctx.moveTo(rightSignatureX - 100, signatureY);
  ctx.lineTo(rightSignatureX + 100, signatureY);
  ctx.stroke();
  
  try {
    ctx.fillText('SIGNATURE', rightSignatureX, signatureY + 20);
    ctx.fillText('AI TECH INSTITUTE', rightSignatureX, signatureY - 15);
  } catch (e) {
    console.error('❌ Error:', e);
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
  
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.lineTo(size * 0.7, size * 0.3);
  ctx.lineTo(size * 0.3, size * 0.7);
  ctx.lineTo(0, size);
  ctx.closePath();
  ctx.stroke();
  
  ctx.restore();
}

function drawSeal(
  ctx: SKRSContext2D,
  x: number,
  y: number,
  radius: number,
  text1: string,
  text2: string
) {
  ctx.save();
  ctx.translate(x, y);

  // Outer circle
  ctx.strokeStyle = '#95A5A6';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Inner circle
  ctx.strokeStyle = '#BDC3C7';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, radius - 5, 0, Math.PI * 2);
  ctx.stroke();

  // Serrated edge
  ctx.strokeStyle = '#7F8C8D';
  ctx.lineWidth = 1;
  const serrations = 24;
  for (let i = 0; i < serrations; i++) {
    const angle = (i / serrations) * Math.PI * 2;
    const outerRadius = radius + 3;
    const innerRadius = radius - 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius);
    ctx.lineTo(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius);
    ctx.stroke();
  }

  // Crown
  ctx.fillStyle = '#95A5A6';
  ctx.beginPath();
  ctx.moveTo(-8, -radius - 5);
  ctx.lineTo(0, -radius - 15);
  ctx.lineTo(8, -radius - 5);
  ctx.lineTo(6, -radius - 3);
  ctx.lineTo(-6, -radius - 3);
  ctx.closePath();
  ctx.fill();

  // Text - USE GENERIC FONTS
  ctx.fillStyle = '#2C3E50';
  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  try {
    ctx.fillText(text1, 0, -8);
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(text2, 0, 8);
  } catch (e) {
    console.error('❌ Error drawing seal text:', e);
  }

  // Stars
  ctx.fillStyle = '#F39C12';
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const starRadius = radius - 20;
    const starX = Math.cos(angle) * starRadius;
    const starY = Math.sin(angle) * starRadius;
    drawStar(ctx, starX, starY, 3);
  }

  // Ribbons
  ctx.fillStyle = '#BDC3C7';
  ctx.beginPath();
  ctx.ellipse(0, radius + 10, 15, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(-8, radius + 18, 8, 4, -0.3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(8, radius + 18, 8, 4, 0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawStar(ctx: SKRSContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const px = Math.cos(angle) * size;
    const py = Math.sin(angle) * size;
    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
