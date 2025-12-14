# ✅ Add DATABASE_URL to Vercel

## Step 1: Add to Vercel Environment Variables

1. **Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables
2. **Add new variable:**
   - **Key:** `DATABASE_URL`
   - **Value:** `postgresql://neondb_owner:npg_7cQoIUWw9qMf@ep-floral-dawn-ahl3zvaw-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require`
3. **Click:** Save

## Step 2: Redeploy

After adding the environment variable:
1. Go to **Deployments** tab
2. Click three dots (⋯) on latest deployment
3. Click **Redeploy**

---

**I'll now update the code to use Postgres!**

