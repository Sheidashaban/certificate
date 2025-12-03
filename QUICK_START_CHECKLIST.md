# Quick Start Checklist

## ✅ What You Should Have in .env File

Make sure these are all filled in (not left as placeholders):

### Email Configuration
- [ ] `SMTP_HOST=smtp.gmail.com` (or your email provider)
- [ ] `SMTP_PORT=587`
- [ ] `SMTP_USER=your-actual-email@gmail.com` (YOUR email, not student's)
- [ ] `SMTP_PASS=your-16-character-app-password` (Gmail App Password)
- [ ] `FROM_EMAIL=your-actual-email@gmail.com` (same as SMTP_USER)

### LinkedIn OAuth
- [ ] `LINKEDIN_CLIENT_ID=your-client-id` (from LinkedIn Developer App)
- [ ] `LINKEDIN_CLIENT_SECRET=your-client-secret` (from LinkedIn Developer App)
- [ ] `LINKEDIN_REDIRECT_URI=http://localhost:3000/api/auth/linkedin/callback`
- [ ] `NEXT_PUBLIC_LINKEDIN_CLIENT_ID=your-client-id` (same as above)
- [ ] `NEXT_PUBLIC_LINKEDIN_REDIRECT_URI=http://localhost:3000/api/auth/linkedin/callback`

### Application
- [ ] `NEXT_PUBLIC_APP_URL=http://localhost:3000`
- [ ] `SECRET_KEY=any-random-string` (can be anything, just for security)

## 🚀 Starting the Application

1. **Start the server:**
   ```powershell
   npm run dev
   ```

2. **Wait for this message:**
   ```
   ✓ Ready in X seconds
   ○ Local: http://localhost:3000
   ```

3. **Open your browser:**
   - Go to: `http://localhost:3000`
   - Or admin panel: `http://localhost:3000/admin`

## 🧪 Testing Certificate Generation

1. Go to: `http://localhost:3000/admin`
2. Fill in the form:
   - Student Name: Test Student
   - Course Name: AI Foundations
   - Instructor Name: Your Name
   - Year: 2024
   - Student Email: your-test-email@gmail.com (use YOUR email to test)
3. Click "Generate Certificate"
4. Check:
   - ✅ Certificate URL appears
   - ✅ Email sent to student (check inbox/spam)
   - ✅ Click the certificate URL to view it

## 🔍 Common Issues

### Server Won't Start
- Check if port 3000 is already in use
- Make sure all dependencies installed: `npm install`

### Email Not Sending
- Verify Gmail App Password is correct (16 characters, no spaces)
- Check spam folder
- Make sure 2-Step Verification is enabled on Gmail

### LinkedIn Share Not Working
- Verify LinkedIn Client ID and Secret are correct
- Make sure redirect URL matches exactly in LinkedIn app settings
- LinkedIn may require app approval for posting (can take a few days)

### Certificate Not Generating
- Check browser console for errors (F12)
- Verify all form fields are filled
- Check server terminal for error messages

## 📝 Next Steps After Testing

Once everything works:
1. Generate a test certificate
2. Verify email delivery
3. Test LinkedIn sharing (if configured)
4. Start generating real certificates for students!

