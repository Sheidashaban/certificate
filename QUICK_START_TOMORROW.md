# 🚀 Quick Start Tomorrow - 3 Steps

## Step 1: Deploy to Vercel (10 minutes)

1. Go to: **https://vercel.com**
2. Sign up/Login with **GitHub**
3. Click **"Add New Project"**
4. Select: **`Sheidashaban/certificate`**
5. Add environment variables (copy from your `.env`)
6. Click **"Deploy"**

## Step 2: Update LinkedIn App (2 minutes)

1. Go to: **https://www.linkedin.com/developers/apps**
2. Your app → **"Auth"** tab
3. Add redirect URL: `https://your-app.vercel.app/api/auth/linkedin/callback`
4. Save

## Step 3: Update Vercel Environment Variables (2 minutes)

1. Vercel → Your project → **Settings** → **Environment Variables**
2. Update `NEXT_PUBLIC_APP_URL` to your Vercel URL
3. Update `LINKEDIN_REDIRECT_URI` to your Vercel URL
4. Update `NEXT_PUBLIC_LINKEDIN_REDIRECT_URI` to your Vercel URL
5. Redeploy

## ✅ Done!

Test it:
1. Go to: `https://your-app.vercel.app/admin`
2. Generate certificate
3. Share on LinkedIn
4. **Certificate image appears automatically!** 🎉

---

**Need help?** See `DEPLOY_TO_VERCEL_NOW.md` for detailed instructions.

