import { createCanvas } from '@napi-rs/canvas';

export interface CertificateData {
  studentName: string;
  courseName: string;
  instructorName: string;
  year: number;
}

export async function generateCertificate(data: CertificateData): Promise<Buffer> {
  console.log('🎨 Starting certificate generation');
  console.log('📋 Data received:', {
    studentName: data.studentName,
    courseName: data.courseName,
    instructorName: data.instructorName,
    year: data.year,
  });
  
  // Validate data
  if (!data.studentName || !data.courseName) {
    console.error('❌ Missing required data:', data);
    throw new Error('Student name and course name are required');
  }
  
  const width = 1200;
  const height = 800;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  console.log('✅ Canvas created:', width, 'x', height);

  // WHITE BACKGROUND
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);
  console.log('✅ White background drawn');

  // Thin black border
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  // Draw geometric pattern
  ctx.fillStyle = '#E8E8E8';
  ctx.globalAlpha = 0.3;
  for (let y = 0; y < height; y += 60) {
    for (let x = 0; x < width; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 40, y);
      ctx.lineTo(x + 20, y + 40);
      ctx.closePath();
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1.0;

  // Top Left - Circular Badge
  const badgeX = 100;
  const badgeY = 100;
  const badgeRadius = 80;
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.arc(badgeX, badgeY, badgeRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#003366';
  ctx.beginPath();
  ctx.arc(badgeX, badgeY, badgeRadius * 0.7, 0, Math.PI * 2);
  ctx.fill();
  
  // Badge text - USE BOTH STROKE AND FILL
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#FFFFFF';
  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 1;
  try {
    ctx.strokeText('AI TECH', badgeX, badgeY - 8);
    ctx.fillText('AI TECH', badgeX, badgeY - 8);
    ctx.font = 'bold 12px sans-serif';
    ctx.strokeText('INSTITUTE', badgeX, badgeY + 8);
    ctx.fillText('INSTITUTE', badgeX, badgeY + 8);
    console.log('✅ Badge text drawn');
  } catch (e) {
    console.error('❌ Error drawing badge text:', e);
  }

  // Top Right - Logo
  const logoX = width - 200;
  const logoY = 100;
  ctx.fillStyle = '#000000';
  ctx.strokeStyle = '#000000';
  ctx.font = 'bold 32px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.lineWidth = 1;
  try {
    ctx.strokeText('AI TECH', logoX, logoY);
    ctx.fillText('AI TECH', logoX, logoY);
    ctx.fillStyle = '#666666';
    ctx.strokeStyle = '#666666';
    ctx.font = '18px sans-serif';
    ctx.strokeText('INSTITUTE', logoX, logoY + 40);
    ctx.fillText('INSTITUTE', logoX, logoY + 40);
    console.log('✅ Logo text drawn');
  } catch (e) {
    console.error('❌ Error drawing logo:', e);
  }

  // CERTIFICATE Title - USE BOTH STROKE AND FILL
  ctx.fillStyle = '#000000';
  ctx.strokeStyle = '#000000';
  ctx.font = 'bold 72px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.lineWidth = 2;
  const titleX = width / 2;
  const titleY = 180;
  try {
    ctx.strokeText('CERTIFICATE', titleX, titleY);
    ctx.fillText('CERTIFICATE', titleX, titleY);
    console.log('✅ CERTIFICATE title drawn at', titleX, titleY);
  } catch (e) {
    console.error('❌ Error drawing CERTIFICATE title:', e);
  }

  // Student Name - CRITICAL - USE BOTH STROKE AND FILL
  const studentNameX = 150;
  const studentNameY = 280;
  const studentName = String(data.studentName || 'STUDENT NAME').trim();
  console.log('🎨 Drawing student name:', studentName, 'at', studentNameX, studentNameY);
  
  ctx.fillStyle = '#0066CC';
  ctx.strokeStyle = '#0066CC';
  ctx.font = 'bold 56px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.lineWidth = 2;
  
  try {
    // Draw text multiple times to ensure visibility
    ctx.strokeText(studentName, studentNameX, studentNameY);
    ctx.fillText(studentName, studentNameX, studentNameY);
    ctx.strokeText(studentName, studentNameX, studentNameY); // Draw again
    ctx.fillText(studentName, studentNameX, studentNameY); // Draw again
    console.log('✅ Student name drawn:', studentName);
  } catch (e) {
    console.error('❌ Error drawing student name:', e);
    // Try with fallback
    ctx.fillStyle = '#000000';
    ctx.fillText(studentName, studentNameX, studentNameY);
  }

  // Descriptive Text
  const descX = studentNameX;
  const descY = 330;
  ctx.fillStyle = '#666666';
  ctx.strokeStyle = '#666666';
  ctx.font = '18px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.lineWidth = 1;
  const description = 'Has been formally evaluated for experience, knowledge, and demonstrated competency at the technical level in Artificial Intelligence as per the industry prerequisites established by AI Tech Institute, and is hereby bestowed the international credential.';
  
  const words = description.split(' ');
  let line = '';
  let currentY = descY;
  const maxWidth = width - 300;
  
  try {
    for (const word of words) {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== '') {
        ctx.strokeText(line, descX, currentY);
        ctx.fillText(line, descX, currentY);
        line = word + ' ';
        currentY += 26;
      } else {
        line = testLine;
      }
    }
    if (line) {
      ctx.strokeText(line, descX, currentY);
      ctx.fillText(line, descX, currentY);
    }
    console.log('✅ Description drawn');
  } catch (e) {
    console.error('❌ Error drawing description:', e);
  }

  // Course Name - CRITICAL - USE BOTH STROKE AND FILL
  const courseY = currentY + 40;
  const courseName = String(data.courseName || 'COURSE NAME').trim().toUpperCase();
  console.log('🎨 Drawing course name:', courseName, 'at', studentNameX, courseY);
  
  ctx.fillStyle = '#0066CC';
  ctx.strokeStyle = '#0066CC';
  ctx.font = 'bold 32px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.lineWidth = 2;
  
  try {
    ctx.strokeText(courseName, studentNameX, courseY);
    ctx.fillText(courseName, studentNameX, courseY);
    ctx.strokeText(courseName, studentNameX, courseY); // Draw again
    ctx.fillText(courseName, studentNameX, courseY); // Draw again
    console.log('✅ Course name drawn:', courseName);
  } catch (e) {
    console.error('❌ Error drawing course name:', e);
    // Try with fallback
    ctx.fillStyle = '#000000';
    ctx.fillText(courseName, studentNameX, courseY);
  }

  // Bottom Section
  const bottomY = height - 120;

  // Certificate Details
  ctx.fillStyle = '#666666';
  ctx.strokeStyle = '#666666';
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.lineWidth = 1;
  const detailsX = 100;
  const certNumber = `${data.year}${Math.floor(Math.random() * 1000000)}`;
  const grantDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const expirationDate = new Date(data.year + 3, 0, 1).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  try {
    ctx.strokeText(`Certificate Number: ${certNumber}`, detailsX, bottomY);
    ctx.fillText(`Certificate Number: ${certNumber}`, detailsX, bottomY);
    ctx.strokeText(`Grant Date: ${grantDate}`, detailsX, bottomY + 25);
    ctx.fillText(`Grant Date: ${grantDate}`, detailsX, bottomY + 25);
    ctx.strokeText(`Expiration Date: ${expirationDate}`, detailsX, bottomY + 50);
    ctx.fillText(`Expiration Date: ${expirationDate}`, detailsX, bottomY + 50);
    console.log('✅ Certificate details drawn');
  } catch (e) {
    console.error('❌ Error drawing details:', e);
  }

  // Signature
  const signatureX = width / 2;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(signatureX - 100, bottomY + 20);
  ctx.lineTo(signatureX + 100, bottomY + 20);
  ctx.stroke();

  ctx.fillStyle = '#666666';
  ctx.strokeStyle = '#666666';
  ctx.font = '18px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.lineWidth = 1;
  
  try {
    ctx.strokeText('Dr Amir Charkhi', signatureX, bottomY - 5);
    ctx.fillText('Dr Amir Charkhi', signatureX, bottomY - 5);
    ctx.font = '16px sans-serif';
    ctx.strokeText('Executive Director', signatureX, bottomY + 35);
    ctx.fillText('Executive Director', signatureX, bottomY + 35);
    console.log('✅ Signature drawn');
  } catch (e) {
    console.error('❌ Error drawing signature:', e);
  }

  // Shield Badge
  const shieldX = width - 150;
  const shieldY = bottomY - 20;
  const shieldHeight = 100;
  const shieldWidth = shieldHeight * 0.7;
  ctx.fillStyle = '#003366';
  ctx.beginPath();
  ctx.moveTo(shieldX, shieldY + shieldHeight * 0.2);
  ctx.lineTo(shieldX + shieldWidth / 2, shieldY);
  ctx.lineTo(shieldX + shieldWidth, shieldY + shieldHeight * 0.2);
  ctx.lineTo(shieldX + shieldWidth, shieldY + shieldHeight * 0.8);
  ctx.lineTo(shieldX + shieldWidth / 2, shieldY + shieldHeight);
  ctx.lineTo(shieldX, shieldY + shieldHeight * 0.8);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#FFFFFF';
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 1;
  
  try {
    ctx.strokeText('AI TECH', shieldX + shieldWidth / 2, shieldY + shieldHeight * 0.4);
    ctx.fillText('AI TECH', shieldX + shieldWidth / 2, shieldY + shieldHeight * 0.4);
    ctx.font = 'bold 12px sans-serif';
    ctx.strokeText('INSTITUTE', shieldX + shieldWidth / 2, shieldY + shieldHeight * 0.6);
    ctx.fillText('INSTITUTE', shieldX + shieldWidth / 2, shieldY + shieldHeight * 0.6);
    console.log('✅ Shield badge drawn');
  } catch (e) {
    console.error('❌ Error drawing shield:', e);
  }

  const buffer = canvas.toBuffer('image/png');
  console.log('✅ Certificate complete - Buffer size:', buffer.length, 'bytes');
  console.log('📋 Final data used:', { studentName, courseName });
  
  return buffer;
}
