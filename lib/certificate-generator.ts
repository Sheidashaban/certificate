import { createCanvas } from '@napi-rs/canvas';

export interface CertificateData {
  studentName: string;
  courseName: string;
  instructorName: string;
  year: number;
}

export async function generateCertificate(data: CertificateData): Promise<Buffer> {
  console.log('🎨 Starting certificate generation with data:', JSON.stringify(data));
  
  const width = 1200;
  const height = 800;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  console.log('✅ Canvas created');

  // WHITE BACKGROUND - NOT YELLOW
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Thin black border
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  // Draw geometric pattern (subtle triangles)
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
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('AI TECH', badgeX, badgeY - 8);
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('INSTITUTE', badgeX, badgeY + 8);

  // Top Right - AI Tech Institute Logo
  const logoX = width - 200;
  const logoY = 100;
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 32px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('AI TECH', logoX, logoY);
  ctx.fillStyle = '#666666';
  ctx.font = '18px sans-serif';
  ctx.fillText('INSTITUTE', logoX, logoY + 40);

  // Center - CERTIFICATE Title
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 72px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('CERTIFICATE', width / 2, 180);
  console.log('✅ Drew CERTIFICATE title');

  // Student Name - LARGE BLUE TEXT
  const studentNameX = 150;
  const studentNameY = 280;
  ctx.fillStyle = '#0066CC';
  ctx.font = 'bold 56px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  const studentName = data.studentName || 'STUDENT NAME';
  console.log('🎨 Drawing student name:', studentName);
  ctx.fillText(studentName, studentNameX, studentNameY);
  console.log('✅ Drew student name');

  // Descriptive Text
  const descX = studentNameX;
  const descY = 330;
  ctx.fillStyle = '#666666';
  ctx.font = '18px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  const description = 'Has been formally evaluated for experience, knowledge, and demonstrated competency at the technical level in Artificial Intelligence as per the industry prerequisites established by AI Tech Institute, and is hereby bestowed the international credential.';
  
  // Simple text wrapping
  const words = description.split(' ');
  let line = '';
  let currentY = descY;
  const maxWidth = width - 300;
  
  for (const word of words) {
    const testLine = line + word + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line, descX, currentY);
      line = word + ' ';
      currentY += 26;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, descX, currentY);
  }
  console.log('✅ Drew description');

  // Course Name - BLUE BOLD TEXT
  const courseY = currentY + 40;
  ctx.fillStyle = '#0066CC';
  ctx.font = 'bold 32px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  const courseName = data.courseName ? data.courseName.toUpperCase() : 'COURSE NAME';
  console.log('🎨 Drawing course name:', courseName);
  ctx.fillText(courseName, studentNameX, courseY);
  console.log('✅ Drew course name');

  // Bottom Section
  const bottomY = height - 120;

  // Bottom Left - Certificate Details
  ctx.fillStyle = '#666666';
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  const detailsX = 100;
  const certNumber = `${data.year}${Math.floor(Math.random() * 1000000)}`;
  const grantDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const expirationDate = new Date(data.year + 3, 0, 1).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  ctx.fillText(`Certificate Number: ${certNumber}`, detailsX, bottomY);
  ctx.fillText(`Grant Date: ${grantDate}`, detailsX, bottomY + 25);
  ctx.fillText(`Expiration Date: ${expirationDate}`, detailsX, bottomY + 50);
  console.log('✅ Drew certificate details');

  // Bottom Center - Signature
  const signatureX = width / 2;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(signatureX - 100, bottomY + 20);
  ctx.lineTo(signatureX + 100, bottomY + 20);
  ctx.stroke();

  ctx.fillStyle = '#666666';
  ctx.font = '18px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('Dr Amir Charkhi', signatureX, bottomY - 5);
  ctx.font = '16px sans-serif';
  ctx.fillText('Executive Director', signatureX, bottomY + 35);
  console.log('✅ Drew signature');

  // Bottom Right - Shield Badge
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
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('AI TECH', shieldX + shieldWidth / 2, shieldY + shieldHeight * 0.4);
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('INSTITUTE', shieldX + shieldWidth / 2, shieldY + shieldHeight * 0.6);
  console.log('✅ Drew shield badge');

  console.log('✅ Certificate generation complete - Buffer size:', canvas.toBuffer('image/png').length);
  return canvas.toBuffer('image/png');
}
