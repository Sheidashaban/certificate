# Email Configuration Explained

## Email Settings - These are YOUR Email (AI Tech Institute's Email)

### SMTP_USER and FROM_EMAIL
- **These should be YOUR email address** (the institute's email)
- This is the email account that will **SEND** certificates to students
- **NOT** the student's email
- Example: `SMTP_USER=info@aitechinstitute.com.au` or `SMTP_USER=yourname@gmail.com`

### SMTP_PASS - Gmail App Password

This is **NOT** your regular Gmail password. You need to create a special "App Password":

#### How to Get Gmail App Password:

1. **Go to your Google Account**: https://myaccount.google.com/
2. **Click "Security"** (left sidebar)
3. **Enable 2-Step Verification** (if not already enabled)
   - This is required to create App Passwords
4. **After enabling 2-Step Verification**:
   - Go back to Security
   - Look for "App passwords" (or search for it)
   - Click "App passwords"
   - Select "Mail" as the app
   - Select "Other (Custom name)" as device
   - Type "Certificate Generator"
   - Click "Generate"
   - **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)
   - Use this password in `SMTP_PASS` (remove spaces: `abcdefghijklmnop`)

### Example Configuration:

```env
SMTP_USER=info@aitechinstitute.com.au
SMTP_PASS=abcdefghijklmnop  # Your 16-character App Password
FROM_EMAIL=info@aitechinstitute.com.au  # Same as SMTP_USER
```

## Student Emails

- Student emails are entered in the **admin form** when generating certificates
- The system will automatically send certificates to whatever email you enter for each student
- You don't need to configure student emails in the `.env` file

## LinkedIn Setup - You Don't Need Student LinkedIn Info!

### What LinkedIn OAuth Does:

- When a **student** clicks "Share on LinkedIn" on their certificate page
- They will be asked to **log in with their own LinkedIn account**
- They authorize your app to post on their behalf
- The certificate gets shared to **their LinkedIn profile**

### What YOU Need to Do:

1. **Create a LinkedIn Developer App** (one-time setup):
   - Go to: https://www.linkedin.com/developers/
   - Create a new app
   - Get your Client ID and Client Secret
   - Add redirect URL: `http://localhost:3000/api/auth/linkedin/callback`

2. **Put YOUR LinkedIn App credentials in `.env`**:
   ```env
   LINKEDIN_CLIENT_ID=your-app-client-id
   LINKEDIN_CLIENT_SECRET=your-app-client-secret
   ```

### Students Don't Need to Give You Their LinkedIn Info:

- Each student logs in with their own LinkedIn when they want to share
- You never see or store their LinkedIn passwords
- It's secure OAuth authentication

## Summary

| Setting | What It Is | Example |
|---------|-----------|---------|
| SMTP_USER | **Your** email (sends certificates) | `info@aitechinstitute.com.au` |
| SMTP_PASS | **Your** Gmail App Password (16 chars) | `abcdefghijklmnop` |
| FROM_EMAIL | **Your** email (sender address) | `info@aitechinstitute.com.au` |
| Student Email | Entered per certificate in admin form | Not in .env file |
| LinkedIn Credentials | **Your** LinkedIn Developer App | Not student's LinkedIn |

