# AI Tech Institute Certificate Generator

Deployed on Vercel - Production Ready

A professional certificate generation platform that allows you to create, email, and share certificates with LinkedIn integration.

## Features

- ✅ Generate professional certificates with customizable fields
- ✅ Email certificates directly to students
- ✅ Unique URL for each certificate
- ✅ LinkedIn OAuth integration for easy sharing
- ✅ Download certificates as PNG images
- ✅ Responsive design

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/auth/linkedin/callback
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=your-linkedin-client-id
NEXT_PUBLIC_LINKEDIN_REDIRECT_URI=http://localhost:3000/api/auth/linkedin/callback

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
SECRET_KEY=your-secret-key-for-encryption

# Database
DATABASE_PATH=./certificates.db
```

### 3. Email Setup (Gmail)

1. Enable 2-Step Verification on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `SMTP_PASS`

### 4. LinkedIn OAuth Setup

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Add the following redirect URL: `http://localhost:3000/api/auth/linkedin/callback`
4. Request access to the following products:
   - **Sign In with LinkedIn using OpenID Connect** (for authentication)
   - **Share on LinkedIn** (for posting certificates)
   - Note: LinkedIn may require approval for these products, which can take a few days
5. In the "Auth" tab, configure OAuth scopes:
   - `openid`
   - `profile`
   - `email`
   - `w_member_social` (for posting)
6. Copy the Client ID and Client Secret to your `.env` file

**Important Notes:**
- LinkedIn API access may require approval, especially for posting capabilities
- For production, add your production redirect URL to LinkedIn app settings
- Update `LINKEDIN_REDIRECT_URI` and `NEXT_PUBLIC_LINKEDIN_REDIRECT_URI` in your `.env` for production
- The UGC Posts API requires your app to be approved by LinkedIn

### 5. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Generating a Certificate

1. Navigate to `/admin`
2. Fill in the form:
   - Student Name
   - Course Name
   - Instructor Name
   - Year
   - Student Email
3. Click "Generate Certificate"
4. The certificate will be:
   - Saved to the database
   - Emailed to the student
   - Available at a unique URL

### Sharing on LinkedIn

1. Students receive an email with their certificate URL
2. They can click the URL to view their certificate
3. Click "Share on LinkedIn" button
4. They'll be redirected to LinkedIn to authorize
5. After authorization, the certificate will be posted to their LinkedIn feed

## Project Structure

```
├── lib/
│   ├── certificate-generator.ts  # Certificate image generation
│   ├── database.ts               # Database operations
│   └── email.ts                  # Email sending
├── pages/
│   ├── api/
│   │   ├── certificates/
│   │   │   ├── generate.ts      # Generate certificate API
│   │   │   ├── [id].ts          # Get certificate image
│   │   │   └── share.ts         # LinkedIn share API
│   │   └── auth/
│   │       └── linkedin/
│   │           └── callback.ts  # LinkedIn OAuth callback
│   ├── admin.tsx                 # Admin form page
│   ├── certificate/
│   │   └── [id].tsx             # Certificate display page
│   └── index.tsx                # Home page
└── styles/
    └── globals.css              # Global styles
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Canvas API** - Certificate image generation
- **SQLite (better-sqlite3)** - Database
- **Nodemailer** - Email sending
- **LinkedIn OAuth** - Social sharing

## Production Deployment

Before deploying to production:

1. Update all URLs in `.env` to your production domain
2. Set up a production database (PostgreSQL recommended)
3. Configure production email service
4. Update LinkedIn app redirect URLs
5. Set up SSL/HTTPS
6. Configure environment variables in your hosting platform

## License

This project is proprietary software for AI Tech Institute.

