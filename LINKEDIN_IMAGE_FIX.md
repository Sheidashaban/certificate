# Fix: Certificate Image Not Showing on LinkedIn

## The Problem

When you share the certificate on LinkedIn:
- ✅ The post appears on LinkedIn
- ✅ Your message is there
- ❌ But the certificate image doesn't show

## Why This Happens

**LinkedIn can't access `localhost` URLs!**

When you share `http://localhost:3000/certificate/...`, LinkedIn's servers try to fetch the page to get the certificate image, but they can't access your local computer.

## Solution: Manual Image Attachment

Since you're using localhost, you need to manually attach the certificate image when posting:

### Method 1: Use the Image URL (Easiest)

1. Click "Share on LinkedIn" button
2. Write your message in the LinkedIn dialog
3. Click the **image icon** (📷) in LinkedIn's share box
4. Paste this URL:
   ```
   http://localhost:3000/api/certificates/[your-certificate-id]
   ```
   (Replace `[your-certificate-id]` with your actual certificate ID)
5. LinkedIn will load the image
6. Click "Post"

### Method 2: Download and Upload

1. Click "Download Certificate" button on the certificate page
2. Click "Share on LinkedIn" button
3. Write your message
4. Click the **image icon** (📷) in LinkedIn's share box
5. Upload the downloaded certificate image
6. Click "Post"

## For Production (Public URL)

When you deploy to a public URL (like Vercel, Netlify, etc.):
- ✅ LinkedIn will automatically fetch the certificate image
- ✅ The image will appear automatically in the post
- ✅ No manual steps needed!

The certificate page already has proper Open Graph meta tags, so once it's on a public URL, everything will work automatically.

## Quick Test

1. **Download the certificate** (click "Download Certificate")
2. **Go to LinkedIn** and create a new post
3. **Upload the certificate image** manually
4. **Write your message** and post

This way you can share your certificate right away, even on localhost!

## Production Deployment

When you deploy to production:
- Update `NEXT_PUBLIC_APP_URL` in `.env` to your production URL
- LinkedIn will automatically show the certificate image
- Everything will work seamlessly!

