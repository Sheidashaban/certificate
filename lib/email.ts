import nodemailer from 'nodemailer';

// Validate email configuration
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.warn('⚠️  Email configuration missing! SMTP_USER and SMTP_PASS must be set in .env file');
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  debug: true, // Enable debug output
  logger: true, // Log to console
});

export async function sendCertificateEmail(
  to: string,
  studentName: string,
  courseName: string,
  certificateUrl: string,
  certificateBuffer: Buffer
): Promise<void> {
  // Check if email is configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('Email configuration missing. Please set SMTP_USER and SMTP_PASS in .env file');
  }

  console.log(`📧 Attempting to send email to: ${to}`);
  console.log(`📧 Using SMTP: ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`);
  console.log(`📧 From: ${process.env.FROM_EMAIL || process.env.SMTP_USER}`);

  const mailOptions = {
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to,
    subject: `Congratulations! Your ${courseName} Certificate from AI Tech Institute`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #2C3E50;
              color: white;
              padding: 20px;
              text-align: center;
            }
            .content {
              padding: 20px;
              background-color: #f9f9f9;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #0077B5;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #7F8C8D;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>AI Tech Institute</h1>
            </div>
            <div class="content">
              <h2>Congratulations, ${studentName}!</h2>
              <p>We're thrilled to inform you that you have successfully completed the <strong>${courseName}</strong> course.</p>
              <p>Your certificate is attached to this email, and you can also view and share it online using the link below:</p>
              <p style="text-align: center;">
                <a href="${certificateUrl}" class="button">View Your Certificate</a>
              </p>
              <p>You can share this certificate on LinkedIn and other professional networks to showcase your achievement!</p>
            </div>
            <div class="footer">
              <p>AI Tech Institute<br>
              <a href="https://www.aitechinstitute.com.au">www.aitechinstitute.com.au</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
    attachments: [
      {
        filename: `Certificate_${studentName.replace(/\s+/g, '_')}_${courseName.replace(/\s+/g, '_')}.png`,
        content: certificateBuffer,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📧 Response:', info.response);
  } catch (error: any) {
    console.error('❌ Email sending failed!');
    console.error('📧 Error code:', error.code);
    console.error('📧 Error message:', error.message);
    console.error('📧 Full error:', error);
    throw error; // Re-throw to be caught by the API handler
  }
}

