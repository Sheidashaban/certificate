# 🗄️ Setup Vercel KV - Step by Step

## The Problem (Confirmed by Logs)

Your logs show **404 errors** - certificates are being lost because Vercel's `/tmp` directory is ephemeral.

## Solution: Vercel KV (Redis Database)

Vercel KV stores data permanently - perfect for certificates!

---

## Step 1: Create Vercel KV Database

1. **In your Vercel dashboard**, click **"Storage"** tab (top navigation)
2. **Click:** "Create Database" button
3. **Select:** "KV" (Key-Value store)
4. **Name it:** `certificates-kv` (or any name you like)
5. **Click:** "Create"

---

## Step 2: Get Connection Details

After creating, you'll see:
- **KV_REST_API_URL** (something like `https://xxx.upstash.io`)
- **KV_REST_API_TOKEN** (a long token string)
- **KV_REST_API_READ_ONLY_TOKEN** (optional, for read-only access)

**Copy these values!** You'll need them in the next step.

---

## Step 3: Add Environment Variables

1. **Go to:** Settings → Environment Variables
2. **Add these two variables:**
   - **Key:** `KV_REST_API_URL` → **Value:** (paste the URL from Step 2)
   - **Key:** `KV_REST_API_TOKEN` → **Value:** (paste the token from Step 2)
3. **Save**

---

## Step 4: Install KV Package

I'll update your code to use Vercel KV. The package is already available in Vercel, but I need to update the database code.

---

## Step 5: Redeploy

After I update the code:
1. **Push to GitHub** (I'll do this)
2. **Vercel will auto-deploy**
3. **Test** - certificates will now persist!

---

## What This Fixes

✅ Certificates saved permanently  
✅ No more 404 errors  
✅ Certificates work forever  
✅ Professional solution  

---

**Once you create the KV database and add the environment variables, let me know and I'll update the code!**

