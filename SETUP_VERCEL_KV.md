# 🗄️ Setup Vercel KV for Persistent Storage

## The Problem

Vercel's `/tmp` directory is **ephemeral** - data gets cleared between function invocations. This means certificates are being lost.

## Solution: Use Vercel KV (Redis Database)

Vercel KV is a Redis-based database that persists data permanently.

---

## Step 1: Create Vercel KV Database

1. Go to **Vercel Dashboard** → Your Project (`certificate-zbl2`)
2. Click **Storage** tab (in the top navigation)
3. Click **Create Database**
4. Select **KV** (Key-Value store)
5. Name it: `certificates-kv` (or any name)
6. Click **Create**

---

## Step 2: Get Connection Details

After creating, you'll see:
- **KV_REST_API_URL**
- **KV_REST_API_TOKEN**
- **KV_REST_API_READ_ONLY_TOKEN**

Copy these values - you'll need them!

---

## Step 3: Add Environment Variables

1. Go to **Settings** → **Environment Variables**
2. Add these variables:
   - `KV_REST_API_URL` = (from Step 2)
   - `KV_REST_API_TOKEN` = (from Step 2)

---

## Step 4: Install KV Package

I'll update the code to use Vercel KV instead of the JSON file.

---

## Alternative: Use Vercel Postgres

If you prefer SQL:
1. Go to **Storage** → **Create Database** → **Postgres**
2. Follow the setup wizard
3. I'll update the code to use Postgres

---

**Which do you prefer: KV (Redis) or Postgres (SQL)?**

KV is simpler, Postgres is more powerful. For certificates, **KV is perfect!**

