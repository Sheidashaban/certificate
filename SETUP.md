# Setup Guide for AI Tech Institute Certificate Generator

## Quick Start

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
# On Windows (PowerShell)
Copy-Item .env.example .env

# On Mac/Linux
cp .env.example .env
```

### Step 3: Email Configuration (Gmail)

1. **Enable 2-Step Verification**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Enter "Certificate Generator"
   - Copy the generated 16-character password
   - Use this password in `SMTP_PASS` in your `.env` file

### Step 4: LinkedIn OAuth Setup

1. **Create LinkedIn App**
   - Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
   - Click "Create app"
   - Fill in app details:
     - App name: AI Tech Institute Certificate Generator
     - Company: Your company name
     - Privacy policy URL: Your privacy policy URL
     - App logo: Upload your logo

2. **Configure OAuth Settings**
   - In your app settings, go to "Auth" tab
   - Add redirect URL: `http://localhost:3000/api/auth/linkedin/callback`
   - For production, also add: `https://yourdomain.com/api/auth/linkedin/callback`

3. **Request API Access**
   - Go to "Products" tab
   - Request access to:
     - **Sign In with LinkedIn using OpenID Connect** (for authentication)
     - **Share on LinkedIn** (for posting)
   - Note: LinkedIn may require approval for some products

4. **Get Credentials**
   - Go to "Auth" tab
   - Copy "Client ID" → Use in `LINKEDIN_CLIENT_ID`
   - Copy "Client Secret" → Use in `LINKEDIN_CLIENT_SECRET`

### Step 5: Update Environment Variables

Edit your `.env` file with all the values:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
FROM_EMAIL=your-email@gmail.com

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=your-client-id-here
LINKEDIN_CLIENT_SECRET=your-client-secret-here
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/auth/linkedin/callback
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=your-client-id-here
NEXT_PUBLIC_LINKEDIN_REDIRECT_URI=http://localhost:3000/api/auth/linkedin/callback

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
SECRET_KEY=generate-a-random-secret-key-here

# Database
DATABASE_PATH=./certificates.db
```

### Step 6: Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

### Test Certificate Generation

1. Navigate to `http://localhost:3000/admin`
2. Fill in the form:
   - Student Name: Test Student
   - Course Name: AI Foundations
   - Instructor Name: Dr. Jane Smith
   - Year: 2024
   - Student Email: your-test-email@gmail.com
3. Click "Generate Certificate"
4. Check your email for the certificate

### Test LinkedIn Sharing

1. Open the certificate URL from the email
2. Click "Share on LinkedIn"
3. Authorize the app
4. The certificate should be posted to your LinkedIn feed

## Troubleshooting

### Email Not Sending

- Verify your Gmail app password is correct
- Check that 2-Step Verification is enabled
- Ensure `SMTP_USER` matches your Gmail address
- Check spam folder

### LinkedIn OAuth Not Working

- Verify redirect URL matches exactly in LinkedIn app settings
- Ensure you've requested the correct API products
- Check browser console for errors
- Verify `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET` are correct

### Certificate Not Generating

- Check that all form fields are filled
- Verify database file permissions
- Check server logs for errors

## Production Deployment

Before deploying:

1. **Update Environment Variables**
   - Change all `localhost:3000` URLs to your production domain
   - Use production email service (consider SendGrid, AWS SES, etc.)
   - Set up production database (PostgreSQL recommended)

2. **LinkedIn App Settings**
   - Add production redirect URL
   - Update app settings for production

3. **Security**
   - Use environment variables (never commit `.env`)
   - Set up HTTPS/SSL
   - Use secure session management (consider NextAuth.js)

4. **Database**
   - Migrate from SQLite to PostgreSQL for production
   - Set up database backups

## Support

For issues or questions, please contact AI Tech Institute support.

