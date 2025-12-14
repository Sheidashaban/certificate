# 🔧 Add Environment Variables to Vercel

## Your Deployment is Successful! ✅

But you need to add environment variables so the app works properly.

---

## Step-by-Step: Add Environment Variables

### Step 1: Go to Your Project Settings

1. **Click:** "Continue to Dashboard" (or go to your Vercel dashboard)
2. **Click on your project:** `certificate` (or `certificate-zbl2`)
3. **Click:** "Settings" tab (at the top)
4. **Click:** "Environment Variables" (in the left sidebar)

### Step 2: Add Each Variable

Click "Add New" for each variable below:

#### Email Configuration:
1. **Key:** `SMTP_HOST`
   **Value:** `smtp.gmail.com`

2. **Key:** `SMTP_PORT`
   **Value:** `587`

3. **Key:** `SMTP_USER`
   **Value:** `your-email@gmail.com` (replace with YOUR email)

4. **Key:** `SMTP_PASS`
   **Value:** `your-app-password` (replace with YOUR Gmail app password)

5. **Key:** `FROM_EMAIL`
   **Value:** `your-email@gmail.com` (same as SMTP_USER)

#### LinkedIn OAuth:
6. **Key:** `LINKEDIN_CLIENT_ID`
   **Value:** `86746lh683dkza`

7. **Key:** `LINKEDIN_CLIENT_SECRET`
   **Value:** `your-client-secret` (replace with YOUR LinkedIn client secret)

8. **Key:** `LINKEDIN_REDIRECT_URI`
   **Value:** `https://your-app.vercel.app/api/auth/linkedin/callback`
   (Replace `your-app.vercel.app` with YOUR actual Vercel URL)

9. **Key:** `NEXT_PUBLIC_LINKEDIN_CLIENT_ID`
   **Value:** `86746lh683dkza`

10. **Key:** `NEXT_PUBLIC_LINKEDIN_REDIRECT_URI`
    **Value:** `https://your-app.vercel.app/api/auth/linkedin/callback`
    (Replace with YOUR actual Vercel URL)

#### Application:
11. **Key:** `NEXT_PUBLIC_APP_URL`
    **Value:** `https://your-app.vercel.app`
    (Replace with YOUR actual Vercel URL - find it in your deployment page)

12. **Key:** `SECRET_KEY`
    **Value:** `your-secret-key` (any random string, like `my-secret-key-123`)

### Step 3: Find Your Vercel URL

Your Vercel URL is shown on:
- The deployment success page
- Your project dashboard
- Usually looks like: `https://certificate-zbl2.vercel.app` or similar

**Replace all instances of `your-app.vercel.app` with your actual URL!**

### Step 4: Redeploy

After adding all variables:
1. Go to "Deployments" tab
2. Click the three dots (⋯) on your latest deployment
3. Click "Redeploy"
4. Or push a new commit to auto-redeploy

---

## Quick Method: Import .env File

If you have your `.env` file:
1. Go to Settings → Environment Variables
2. Click "Import .env" button
3. Paste your `.env` file contents
4. **Update the URLs** to your Vercel URL
5. Save

---

## Important: Update URLs

**You MUST replace these with your actual Vercel URL:**
- `LINKEDIN_REDIRECT_URI`
- `NEXT_PUBLIC_LINKEDIN_REDIRECT_URI`
- `NEXT_PUBLIC_APP_URL`

**Your Vercel URL is:** (check your deployment page or dashboard)

---

## After Adding Variables

1. **Redeploy** your project
2. **Update LinkedIn App** with your Vercel redirect URL
3. **Test** - everything should work!

---

**Need help finding your Vercel URL? Check the deployment success page or your project dashboard!**

