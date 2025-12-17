import { createCanvas } from '@napi-rs/canvas';

export interface CertificateData {
  studentName: string;
  courseName: string;
  instructorName: string;
  year: number;
}

export async function generateCertificate(data: CertificateData): Promise<Buffer> {
  console.log('🎨 Starting certificate generation');
  console.log('📋 Data received:', JSON.stringify(data, null, 2));
  
  // Validate data
  if (!data || !data.studentName || !data.courseName) {
    console.error('❌ Missing required data:', data);
    throw new Error(`Student name and course name are required. Received: ${JSON.stringify(data)}`);
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

  // Subtle geometric pattern (interconnected triangles)
  ctx.fillStyle = '#E8E8E8';
  ctx.globalAlpha = 0.2;
  const patternSize = 50;
  for (let y = 0; y < height; y += patternSize) {
    for (let x = 0; x < width; x += patternSize) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + patternSize, y);
      ctx.lineTo(x + patternSize / 2, y + patternSize);
      ctx.closePath();
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1.0;

  // Top Left - Circular Badge with stars (like CAIE badge)
  const badgeX = 100;
  const badgeY = 100;
  const badgeRadius = 70;
  
  // Outer gold circle
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.arc(badgeX, badgeY, badgeRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Inner dark blue circle
  ctx.fillStyle = '#003366';
  ctx.beginPath();
  ctx.arc(badgeX, badgeY, badgeRadius * 0.75, 0, Math.PI * 2);
  ctx.fill();
  
  // Badge text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  try {
    ctx.fillText('AI TECH', badgeX, badgeY - 10);
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('INSTITUTE', badgeX, badgeY + 10);
    console.log('✅ Badge text drawn');
  } catch (e: any) {
    console.error('❌ Error drawing badge text:', e?.message || e);
  }

  // Top Right - AI Tech Institute Logo (like USAII logo)
  const logoX = width - 250;
  const logoY = 80;
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  try {
    ctx.fillText('AI TECH', logoX, logoY);
    ctx.fillStyle = '#666666';
    ctx.font = '20px sans-serif';
    ctx.fillText('INSTITUTE', logoX, logoY + 45);
    console.log('✅ Logo text drawn');
  } catch (e: any) {
    console.error('❌ Error drawing logo:', e?.message || e);
  }

  // Center Top - CERTIFICATE Title
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 80px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  const titleX = width / 2;
  const titleY = 200;
  try {
    ctx.fillText('CERTIFICATE', titleX, titleY);
    console.log('✅ CERTIFICATE title drawn');
  } catch (e: any) {
    console.error('❌ Error drawing CERTIFICATE title:', e?.message || e);
  }

  // Student Name - LARGE BLUE TEXT (like in the professional certificate)
  const studentNameX = 200;
  const studentNameY = 320;
  const studentName = String(data.studentName || '').trim();
  
  console.log('🎨 Attempting to draw student name:', {
    name: studentName,
    length: studentName.length,
    x: studentNameX,
    y: studentNameY,
    type: typeof studentName
  });
  
  if (!studentName) {
    console.error('❌ Student name is empty!');
  }
  
  ctx.fillStyle = '#0066CC';
  ctx.font = 'bold 60px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  
  try {
    // Try multiple methods to ensure text renders
    ctx.fillText(studentName, studentNameX, studentNameY);
    // Draw again with slight offset to make it thicker
    ctx.fillText(studentName, studentNameX + 1, studentNameY + 1);
    console.log('✅ Student name drawn:', studentName);
  } catch (e: any) {
    console.error('❌ Error drawing student name:', e?.message || e);
    console.error('❌ Error stack:', e?.stack);
    // Fallback: try with black color
    ctx.fillStyle = '#000000';
    ctx.fillText(studentName || 'STUDENT NAME', studentNameX, studentNameY);
  }

  // Descriptive Text (grey, below student name)
  const descX = studentNameX;
  const descY = 380;
  ctx.fillStyle = '#666666';
  ctx.font = '20px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  const description = 'Has been formally evaluated for experience, knowledge, and demonstrated competency at the technical level in Artificial Intelligence as per the industry prerequisites established by AI Tech Institute, and is hereby bestowed the international credential.';
  
  // Text wrapping
  const words = description.split(' ');
  let line = '';
  let currentY = descY;
  const maxWidth = width - 400;
  
  try {
    for (const word of words) {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== '') {
        ctx.fillText(line, descX, currentY);
        line = word + ' ';
        currentY += 28;
      } else {
        line = testLine;
      }
    }
    if (line) {
      ctx.fillText(line, descX, currentY);
    }
    console.log('✅ Description drawn');
  } catch (e: any) {
    console.error('❌ Error drawing description:', e?.message || e);
  }

  // Course Name - BLUE BOLD TEXT
  const courseY = currentY + 50;
  const courseName = String(data.courseName || '').trim().toUpperCase();
  
  console.log('🎨 Attempting to draw course name:', {
    name: courseName,
    length: courseName.length,
    x: studentNameX,
    y: courseY
  });
  
  ctx.fillStyle = '#0066CC';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  
  try {
    ctx.fillText(courseName, studentNameX, courseY);
    ctx.fillText(courseName, studentNameX + 1, courseY + 1);
    console.log('✅ Course name drawn:', courseName);
  } catch (e: any) {
    console.error('❌ Error drawing course name:', e?.message || e);
    ctx.fillStyle = '#000000';
    ctx.fillText(courseName || 'COURSE NAME', studentNameX, courseY);
  }

  // Bottom Section
  const bottomY = height - 100;

  // Bottom Left - Certificate Details
  ctx.fillStyle = '#666666';
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  const detailsX = 100;
  const certNumber = `${data.year}${Math.floor(Math.random() * 1000000)}`;
  const grantDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const expirationDate = new Date(data.year + 3, 0, 1).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  try {
    ctx.fillText(`Certificate Number: ${certNumber}`, detailsX, bottomY);
    ctx.fillText(`Grant Date: ${grantDate}`, detailsX, bottomY + 25);
    ctx.fillText(`Expiration Date: ${expirationDate}`, detailsX, bottomY + 50);
    console.log('✅ Certificate details drawn');
  } catch (e: any) {
    console.error('❌ Error drawing details:', e?.message || e);
  }

  // Bottom Center - Signature Block
  const signatureX = width / 2;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(signatureX - 120, bottomY + 30);
  ctx.lineTo(signatureX + 120, bottomY + 30);
  ctx.stroke();

  ctx.fillStyle = '#666666';
  ctx.font = '20px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  
  try {
    ctx.fillText('Dr Amir Charkhi', signatureX, bottomY);
    ctx.font = '18px sans-serif';
    ctx.fillText('Executive Director', signatureX, bottomY + 45);
    console.log('✅ Signature drawn');
  } catch (e: any) {
    console.error('❌ Error drawing signature:', e?.message || e);
  }

  // Bottom Right - Shield Badge
  const shieldX = width - 180;
  const shieldY = bottomY - 30;
  const shieldHeight = 120;
  const shieldWidth = shieldHeight * 0.75;
  
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
  ctx.font = 'bold 18px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  try {
    ctx.fillText('AI TECH', shieldX + shieldWidth / 2, shieldY + shieldHeight * 0.4);
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('INSTITUTE', shieldX + shieldWidth / 2, shieldY + shieldHeight * 0.65);
    console.log('✅ Shield badge drawn');
  } catch (e: any) {
    console.error('❌ Error drawing shield:', e?.message || e);
  }

  const buffer = canvas.toBuffer('image/png');
  console.log('✅ Certificate complete - Buffer size:', buffer.length, 'bytes');
  console.log('📋 Final verification - Student name:', studentName, 'Course name:', courseName);
  
  return buffer;
}
