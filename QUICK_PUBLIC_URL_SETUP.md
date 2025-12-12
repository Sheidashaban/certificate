# Quick Setup: Make Certificate Images Appear Automatically on LinkedIn

## The Problem
LinkedIn can't access `localhost` URLs, so certificate images don't show automatically in posts.

## Solution: Use a Public URL

You have 2 options:

---

## Option 1: Quick Test with ngrok (5 minutes)

### Step 1: Install ngrok
```powershell
# Download from: https://ngrok.com/download
# Or use chocolatey:
choco install ngrok

# Or use npm:
npm install -g ngrok
```

### Step 2: Start Your Server
```powershell
npm run dev
```

### Step 3: Start ngrok Tunnel
Open a NEW PowerShell window and run:
```powershell
ngrok http 3000
```

### Step 4: Copy the Public URL
ngrok will give you a URL like:
```
https://abc123.ngrok.io
```

### Step 5: Update Your .env File
Add this line to your `.env`:
```env
NEXT_PUBLIC_APP_URL=https://abc123.ngrok.io
```

### Step 6: Restart Your Server
Press `Ctrl+C` and run `npm run dev` again.

### Step 7: Test!
1. Generate a certificate
2. Use the ngrok URL: `https://abc123.ngrok.io/certificate/[id]`
3. Click "Share on LinkedIn"
4. The certificate image will now appear automatically! 🎉

**Note:** ngrok URLs change each time you restart (unless you have a paid plan). This is just for testing.

---

## Option 2: Deploy to Vercel (Permanent Solution - 10 minutes)

### Step 1: Push to GitHub

```powershell
# Initialize git (if not already done)
git init
git add .
git commit -m "Ready for deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to:** https://vercel.com
2. **Sign up/Login** with GitHub
3. **Click "Add New Project"**
4. **Import your GitHub repository**
5. **Add Environment Variables:**
   - Copy all variables from your `.env` file
   - Update `NEXT_PUBLIC_APP_URL` to your Vercel URL (you'll get this after deployment)
   - Update `LINKEDIN_REDIRECT_URI` to: `https://your-app.vercel.app/api/auth/linkedin/callback`
   - Update `NEXT_PUBLIC_LINKEDIN_REDIRECT_URI` to: `https://your-app.vercel.app/api/auth/linkedin/callback`

6. **Click "Deploy"**
7. **Wait 2-3 minutes** for deployment

### Step 3: Update LinkedIn App Settings

1. Go to: https://www.linkedin.com/developers/apps
2. Find your app → "Auth" tab
3. Add redirect URL: `https://your-app.vercel.app/api/auth/linkedin/callback`
4. Save

### Step 4: Update Vercel Environment Variables

1. Go to your Vercel project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_APP_URL` to: `https://your-app.vercel.app`
3. Redeploy (or it will auto-update)

### Step 5: Test!

1. Go to: `https://your-app.vercel.app/admin`
2. Generate a certificate
3. Click "Share on LinkedIn"
4. **Certificate image will appear automatically!** 🎉

---

## Which Option Should You Choose?

- **ngrok:** Quick testing, temporary URL
- **Vercel:** Permanent solution, free hosting, better for production

**Recommendation:** Use ngrok for immediate testing, then deploy to Vercel for production.

---

## After Deployment

Once you have a public URL:

1. ✅ LinkedIn can fetch certificate images automatically
2. ✅ Students don't need to download anything
3. ✅ Certificate appears in LinkedIn post automatically
4. ✅ Professional and seamless experience

The Open Graph meta tags are already configured, so once LinkedIn can access your public URL, everything works automatically!

