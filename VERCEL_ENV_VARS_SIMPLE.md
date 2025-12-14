# 🔧 Add Environment Variables - Simple Method

## You're on the Right Page! ✅

I can see you're on the Environment Variables page. Here's the easiest way:

---

## Method 1: Use the Fields Already There (Easiest)

**Look for the "Key" and "Value" input fields** - they're already on the page!

1. **In the "Key" field**, type: `SMTP_HOST`
2. **In the "Value" field**, type: `smtp.gmail.com`
3. **Click "Add Another"** button (the + button)
4. **Repeat** for each variable below

---

## Method 2: Import .env File (Fastest!)

**Look for "Import .env" section** - it should be on the page!

1. **Open your `.env` file** on your computer
2. **Copy ALL the contents**
3. **Paste into the text area** in Vercel (where it says "Import .env or paste the .env contents above")
4. **IMPORTANT:** Update the URLs to your Vercel URL:
   - Find: `http://localhost:3000`
   - Replace with: `https://your-vercel-url.vercel.app`
   - Find: `nonanarchically-buckshee-douglas.ngrok-free.dev`
   - Replace with: `your-vercel-url.vercel.app`
5. **Click "Save"**

---

## What's Your Vercel URL?

**Find it here:**
- Look at the top of your browser - the URL shows: `certificate-zbl2`
- Your Vercel URL is probably: `https://certificate-zbl2.vercel.app`
- Or check your deployment page

**Once you have it, replace in these variables:**
- `LINKEDIN_REDIRECT_URI`
- `NEXT_PUBLIC_LINKEDIN_REDIRECT_URI`
- `NEXT_PUBLIC_APP_URL`

---

## Quick Checklist

After adding variables, you should have:

✅ `SMTP_HOST` = `smtp.gmail.com`
✅ `SMTP_PORT` = `587`
✅ `SMTP_USER` = your email
✅ `SMTP_PASS` = your app password
✅ `FROM_EMAIL` = your email
✅ `LINKEDIN_CLIENT_ID` = `86746lh683dkza`
✅ `LINKEDIN_CLIENT_SECRET` = your secret
✅ `LINKEDIN_REDIRECT_URI` = `https://YOUR-URL.vercel.app/api/auth/linkedin/callback`
✅ `NEXT_PUBLIC_LINKEDIN_CLIENT_ID` = `86746lh683dkza`
✅ `NEXT_PUBLIC_LINKEDIN_REDIRECT_URI` = `https://YOUR-URL.vercel.app/api/auth/linkedin/callback`
✅ `NEXT_PUBLIC_APP_URL` = `https://YOUR-URL.vercel.app`
✅ `SECRET_KEY` = any random string

---

## After Adding Variables

1. **Click "Save"** (if using Import method)
2. **Go to "Deployments" tab**
3. **Redeploy** your project
4. **Test!**

---

**What's your Vercel URL? I can help you format the variables correctly!**

