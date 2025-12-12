# Deploy to Vercel - Automatic LinkedIn Sharing (10 minutes)

## Why Vercel Instead of ngrok?

- ✅ **Free forever**
- ✅ **Permanent URL** (doesn't change)
- ✅ **No authentication needed**
- ✅ **Better for production**
- ✅ **Automatic HTTPS**

---

## Quick Deploy Steps

### Step 1: Push to GitHub (3 minutes)

```powershell
# In your project folder
git init
git add .
git commit -m "Ready for deployment"

# Create a new repo on GitHub.com (go to github.com, click New Repository)
# Then run:
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 2: Deploy to Vercel (5 minutes)

1. **Go to:** https://vercel.com
2. **Click:** "Sign Up" → Sign in with GitHub
3. **Click:** "Add New Project"
4. **Select:** Your repository
5. **Click:** "Import"

### Step 3: Add Environment Variables (2 minutes)

In Vercel, add these (copy from your `.env`):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com
LINKEDIN_CLIENT_ID=86746lh683dkza
LINKEDIN_CLIENT_SECRET=your-client-secret
LINKEDIN_REDIRECT_URI=https://your-app.vercel.app/api/auth/linkedin/callback
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=86746lh683dkza
NEXT_PUBLIC_LINKEDIN_REDIRECT_URI=https://your-app.vercel.app/api/auth/linkedin/callback
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
SECRET_KEY=your-secret-key
```

**Note:** Replace `your-app.vercel.app` with your actual Vercel URL (you'll get it after deployment)

### Step 4: Deploy

Click "Deploy" → Wait 2-3 minutes

### Step 5: Update LinkedIn App

1. Go to: https://www.linkedin.com/developers/apps
2. Your app → "Auth" tab
3. Add redirect URL: `https://your-app.vercel.app/api/auth/linkedin/callback`
4. Save

### Step 6: Update Vercel Environment Variables

1. Vercel → Your project → Settings → Environment Variables
2. Update URLs to your actual Vercel URL
3. Redeploy

### Step 7: Test! 🎉

1. Go to: `https://your-app.vercel.app/admin`
2. Generate certificate
3. Share on LinkedIn
4. **Certificate image appears automatically!**

---

## Alternative: Set Up ngrok Authentication

If you prefer ngrok:

1. **Sign up:** https://dashboard.ngrok.com/signup (free)
2. **Get authtoken:** https://dashboard.ngrok.com/get-started/your-authtoken
3. **Configure:**
   ```powershell
   ngrok config add-authtoken YOUR_AUTHTOKEN
   ```
4. **Start ngrok:**
   ```powershell
   ngrok http 3000
   ```

But Vercel is easier and better for production! 🚀

