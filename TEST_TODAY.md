# 🧪 Testing Today's Changes - Step by Step

## Quick Test Guide

### Step 1: Start the Server

```powershell
cd "C:\Users\Sheida\Music\my_cursor_apps\Linked in generatior certificate"
npm run dev
```

**Wait for:** `✓ Ready in X seconds` and `Local: http://localhost:3000` (or 3004, 3005, etc.)

### Step 2: Check What Port It's Running On

Look at the terminal output - it will show something like:
- `Local: http://localhost:3004`

**Note the port number!**

### Step 3: Start ngrok (if testing with public URL)

If you want to test LinkedIn sharing, you need ngrok:

```powershell
# In a NEW terminal window
cd "C:\Users\Sheida\Music\my_cursor_apps\Linked in generatior certificate"
ngrok http 3004
```

(Replace `3004` with whatever port your server is using)

### Step 4: Update .env with ngrok URL

1. ngrok will show a URL like: `https://abc123.ngrok.io`
2. Copy that URL
3. Update `.env` file:
   ```
   NEXT_PUBLIC_APP_URL=https://your-ngrok-url.ngrok.io
   ```
4. Restart your server (Ctrl+C, then `npm run dev` again)

### Step 5: Test Certificate Generation

1. Open browser: `http://localhost:3004/admin` (or your port)
2. Fill in the form:
   - Student Name
   - Course Name
   - Instructor Name
   - Year
   - Student Email
3. Click "Generate Certificate"
4. Check your email for the certificate

### Step 6: Test LinkedIn Sharing

1. Open the certificate URL from your email
2. Click "Share on LinkedIn"
3. Check if:
   - ✅ LinkedIn dialog opens
   - ⚠️ Certificate image appears (may not work with ngrok free tier)

---

## What to Expect

### ✅ Working:
- Certificate generation
- Email sending
- Certificate page loads
- "Share on LinkedIn" button works
- LinkedIn share dialog opens

### ⚠️ May Not Work:
- Certificate image in LinkedIn post (ngrok free tier limitation)
- **Solution:** Deploy to Vercel for automatic image sharing

---

## Quick Commands

**Start server:**
```powershell
npm run dev
```

**Start ngrok (new terminal):**
```powershell
ngrok http 3004
```

**Check if server is running:**
```powershell
netstat -ano | findstr ":3004"
```

---

## Need Help?

- Server won't start? See `TROUBLESHOOTING.md`
- LinkedIn not working? See `NGROK_FREE_TIER_ISSUE.md`
- Want automatic sharing? See `DEPLOY_TO_VERCEL_NOW.md`

