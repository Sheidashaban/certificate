# ✅ Neon Postgres Setup Guide

## You're on the Right Track!

**Click "Neon"** - it says "Serverless Postgres" with a green 'N' logo.

---

## After Clicking Neon

### Step 1: Follow the Setup Wizard
- Neon will guide you through creating a Postgres database
- It will ask you to:
  - Sign in to Neon (or create account - it's free)
  - Create a new project
  - Get connection details

### Step 2: Get Connection String
After setup, you'll get:
- **Database connection string** (looks like: `postgresql://user:password@host/database`)
- Or separate values:
  - `POSTGRES_URL` or `DATABASE_URL`
  - `POSTGRES_USER`
  - `POSTGRES_PASSWORD`
  - `POSTGRES_HOST`
  - `POSTGRES_DATABASE`

### Step 3: Add to Vercel Environment Variables
1. Go to Vercel → Settings → Environment Variables
2. Add the connection string as:
   - **Key:** `DATABASE_URL` (or `POSTGRES_URL`)
   - **Value:** (paste the connection string from Neon)
3. Save

### Step 4: I'll Update the Code
Once you have the connection details, I'll:
- Update the database code to use Postgres
- Create the certificates table
- Make it work with your existing code

---

## What to Share With Me

After setup, share:
- The connection string (or the individual values)
- I'll update the code to use Postgres!

---

**Click "Neon" now and follow the setup wizard!**

