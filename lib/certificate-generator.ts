import { createCanvas, SKRSContext2D } from '@napi-rs/canvas';

export interface CertificateData {
  studentName: string;
  courseName: string;
  instructorName: string;
  year: number;
}

export async function generateCertificate(data: CertificateData): Promise<Buffer> {
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
  
  // Top-left corner
  drawCornerDecoration(ctx, 50, 50, cornerSize, 'top-left');
  // Top-right corner
  drawCornerDecoration(ctx, width - 50, 50, cornerSize, 'top-right');
  // Bottom-left corner
  drawCornerDecoration(ctx, 50, height - 50, cornerSize, 'bottom-left');
  // Bottom-right corner
  drawCornerDecoration(ctx, width - 50, height - 50, cornerSize, 'bottom-right');

  // Main Title
  ctx.fillStyle = '#2C3E50';
  ctx.font = 'bold 56px "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CERTIFICATE', width / 2, 150);
  
  ctx.font = 'bold 48px "Times New Roman", serif';
  ctx.fillText('OF COMPLETION', width / 2, 210);

  // Student name section
  ctx.fillStyle = '#34495E';
  ctx.font = 'normal 24px Arial, sans-serif';
  ctx.fillText('COMPLETED THE', width / 2, 280);

  ctx.fillStyle = '#2C3E50';
  ctx.font = 'bold 42px "Times New Roman", serif';
  ctx.fillText(data.studentName.toUpperCase(), width / 2, 330);

  // Course section
  ctx.fillStyle = '#34495E';
  ctx.font = 'normal 24px Arial, sans-serif';
  ctx.fillText('ATTENDED THE', width / 2, 390);

  ctx.fillStyle = '#2C3E50';
  ctx.font = 'bold 36px "Times New Roman", serif';
  ctx.fillText(data.courseName.toUpperCase(), width / 2, 440);

  // Year
  ctx.fillStyle = '#7F8C8D';
  ctx.font = 'normal 20px Arial, sans-serif';
  ctx.fillText(`Year: ${data.year}`, width / 2, 490);

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
  ctx.font = 'normal 14px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SIGNATURE', leftSignatureX, signatureY + 20);
  ctx.fillText('Dr Amir Charkhi', leftSignatureX, signatureY - 15);
  ctx.font = 'normal 12px Arial, sans-serif';
  ctx.fillText('Executive Director', leftSignatureX, signatureY - 30);

  // Right signature
  ctx.beginPath();
  ctx.moveTo(rightSignatureX - 100, signatureY);
  ctx.lineTo(rightSignatureX + 100, signatureY);
  ctx.stroke();
  
  ctx.fillText('SIGNATURE', rightSignatureX, signatureY + 20);
  ctx.fillText('AI TECH INSTITUTE', rightSignatureX, signatureY - 15);

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
  
  // Draw decorative corner pattern
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

  // Serrated edge effect
  ctx.strokeStyle = '#7F8C8D';
  ctx.lineWidth = 1;
  const serrations = 24;
  for (let i = 0; i < serrations; i++) {
    const angle = (i / serrations) * Math.PI * 2;
    const outerRadius = radius + 3;
    const innerRadius = radius - 2;
    ctx.beginPath();
    ctx.moveTo(
      Math.cos(angle) * outerRadius,
      Math.sin(angle) * outerRadius
    );
    ctx.lineTo(
      Math.cos(angle) * innerRadius,
      Math.sin(angle) * innerRadius
    );
    ctx.stroke();
  }

  // Crown decoration on top
  ctx.fillStyle = '#95A5A6';
  ctx.beginPath();
  ctx.moveTo(-8, -radius - 5);
  ctx.lineTo(0, -radius - 15);
  ctx.lineTo(8, -radius - 5);
  ctx.lineTo(6, -radius - 3);
  ctx.lineTo(-6, -radius - 3);
  ctx.closePath();
  ctx.fill();

  // Text
  ctx.fillStyle = '#2C3E50';
  ctx.font = 'bold 14px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text1, 0, -8);
  
  ctx.font = 'bold 12px Arial, sans-serif';
  ctx.fillText(text2, 0, 8);

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
