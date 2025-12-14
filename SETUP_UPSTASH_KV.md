# 🗄️ Setup Upstash KV (Vercel KV) - Updated Instructions

## Important Change!

**Vercel KV is now available through the Marketplace**, not as a direct option.

## What to Click Instead

1. **In the "Browse Storage" modal**, look for **"Marketplace Database Providers"** section
2. **Click on "Upstash"** (it says "Serverless DB (Redis, Vector, Queue, Search)")
3. This will set up KV/Redis for you!

---

## Step-by-Step

### Step 1: Click "Upstash"
- In the Marketplace Database Providers list
- Look for: **"Upstash"** with description "Serverless DB (Redis, Vector, Queue, Search)"
- **Click on it!**

### Step 2: Follow the Setup Wizard
- Upstash will guide you through creating a Redis database
- This is the same as Vercel KV (it's powered by Upstash)

### Step 3: Get Connection Details
- After setup, you'll get:
  - `UPSTASH_REDIS_REST_URL` (or similar)
  - `UPSTASH_REDIS_REST_TOKEN` (or similar)
- Copy these values

### Step 4: Add Environment Variables
- Go to Settings → Environment Variables
- Add the Upstash connection details
- I'll update the code to use these

---

## Alternative: Click "Redis" Instead

If you see **"Redis"** in the list (says "Serverless Redis"), you can click that too - it's the same thing!

---

**Click "Upstash" or "Redis" in the Marketplace Database Providers section!**

