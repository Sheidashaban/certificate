# Email Troubleshooting Guide

## Check Server Terminal for Errors

When you generate a certificate, check the PowerShell window running `npm run dev`. Look for any error messages that start with:
- `Email sending failed:`
- `Error:`

## Common Email Issues

### 1. Gmail App Password Not Set Correctly

**Symptoms:**
- Error: "Invalid login" or "Authentication failed"
- Error code: `EAUTH`

**Solution:**
1. Go to: https://myaccount.google.com/apppasswords
2. Make sure 2-Step Verification is enabled
3. Generate a NEW App Password
4. Copy the 16-character password (remove spaces)
5. Update `SMTP_PASS` in your `.env` file
6. Restart the server

### 2. Email Configuration Missing

**Symptoms:**
- Error: "Email configuration missing"

**Solution:**
Check your `.env` file has:
```env
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
FROM_EMAIL=your-email@gmail.com
```

### 3. Email Going to Spam

**Symptoms:**
- No error, but email not in inbox

**Solution:**
- Check spam/junk folder
- Check "All Mail" folder in Gmail
- Try sending to a different email address

### 4. Port/Security Issues

**Symptoms:**
- Error: "Connection timeout" or "ECONNREFUSED"

**Solution:**
Try changing in `.env`:
```env
SMTP_PORT=465
SMTP_SECURE=true
```

Or keep:
```env
SMTP_PORT=587
SMTP_SECURE=false
```

## Test Your Email Configuration

I've created a test endpoint. To use it:

1. **Open browser console** (F12)
2. **Run this command:**
```javascript
fetch('/api/test-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ testEmail: 'your-email@gmail.com' })
}).then(r => r.json()).then(console.log)
```

Or use a tool like Postman to POST to:
- URL: `http://localhost:3000/api/test-email`
- Body: `{ "testEmail": "your-email@gmail.com" }`

## Check Your .env File

Make sure these are set correctly:
- `SMTP_USER` - Your Gmail address
- `SMTP_PASS` - 16-character App Password (no spaces)
- `FROM_EMAIL` - Usually same as SMTP_USER
- `SMTP_HOST` - `smtp.gmail.com`
- `SMTP_PORT` - `587`

## After Fixing

1. **Restart the server** (Ctrl+C, then `npm run dev`)
2. **Try generating a certificate again**
3. **Check the server terminal** for any errors

