# 🔗 Configure Database Connection

## What You're Seeing

Vercel is asking you to configure the database connection. The connection URL will be **automatically created** for you!

## What to Do

### Step 1: Select Database Branch (Optional)
- Under "Create Database Branch For Deployment"
- **Select "Production"** (since you're using production)
- Or leave it unselected if you prefer

### Step 2: Check Environments
- Make sure **"Production"** is checked (it should be already)
- This makes the database available in production

### Step 3: Custom Prefix (Optional)
- The default is `STORAGE` which will create `STORAGE_URL`
- You can change it to `DATABASE` if you want `DATABASE_URL` instead
- **Or leave it as `STORAGE`** - I can update the code to use either one

### Step 4: Click "Connect"
- This will automatically:
  - Add the connection string to your environment variables
  - Make it available to your project
  - The variable will be named: `STORAGE_URL` (or `DATABASE_URL` if you change the prefix)

## After Clicking "Connect"

1. **Vercel will automatically add the connection string** as an environment variable
2. **The variable name will be:** `STORAGE_URL` (based on the prefix)
3. **You can verify it:**
   - Go to Settings → Environment Variables
   - You should see `STORAGE_URL` with the connection string

## Then I'll Update the Code

Once you click "Connect", I'll update the code to:
- Use `STORAGE_URL` (or `DATABASE_URL` if you change the prefix)
- Connect to Postgres
- Create the certificates table
- Make everything work!

---

**Just click "Connect" and Vercel will handle the rest!**

