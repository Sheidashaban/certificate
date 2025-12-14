# 🔍 Check Vercel Logs to Diagnose Empty Certificate

## Step 1: Check Vercel Logs

1. Go to **Vercel Dashboard** → Your Project (`certificate-zbl2`)
2. Click **Logs** tab (top navigation)
3. Try to view a certificate (go to the certificate URL)
4. Look for these log messages:
   - `🔍 Looking for certificate with ID: ...`
   - `❌ Certificate not found` (if this appears, the database is empty)
   - `✅ Certificate found` (if this appears, the certificate exists)
   - `🎨 Generating certificate image...`
   - `✅ Certificate image generated`

## What to Look For

### If you see "Certificate not found":
- The database is empty or the certificate wasn't saved
- This confirms the `/tmp` directory issue

### If you see "Certificate found" but image is empty:
- The data exists but image generation is failing
- Check for canvas/rendering errors

## Step 2: Check Generation Logs

1. Go to **Logs** tab
2. Generate a new certificate
3. Look for:
   - `🔄 Starting certificate generation...`
   - `✅ Certificate saved to database, ID: ...`
   - `📧 Sending email to: ...`

## Step 3: Share the Logs

Copy the relevant log messages and share them - this will help identify the exact issue!

---

**The logging I added will show exactly what's happening!**

