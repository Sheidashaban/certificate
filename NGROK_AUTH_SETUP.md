# ngrok Authentication Setup

## The Issue
ngrok requires a free account and authtoken to work.

## Quick Setup (2 minutes)

### Step 1: Sign Up (Free)
1. Go to: https://dashboard.ngrok.com/signup
2. Sign up with email or GitHub
3. It's completely free!

### Step 2: Get Your Authtoken
1. After signing up, go to: https://dashboard.ngrok.com/get-started/your-authtoken
2. Copy your authtoken (looks like: `2abc123def456ghi789jkl012mno345pq`)

### Step 3: Configure ngrok
Run this command (replace with YOUR authtoken):
```powershell
ngrok config add-authtoken YOUR_AUTHTOKEN_HERE
```

### Step 4: Start ngrok
```powershell
ngrok http 3000
```

### Step 5: Copy the URL
You'll see:
```
Forwarding   https://abc123.ngrok.io -> http://localhost:3000
```

Copy the `https://abc123.ngrok.io` URL and share it with me - I'll update your .env file!

---

## After Setup

Once you have the ngrok URL, I'll:
1. ✅ Update your `.env` file automatically
2. ✅ Tell you to restart the server
3. ✅ You can test - images appear automatically!

---

**Or skip ngrok and deploy to Vercel instead - it's easier!** See `VERCEL_DEPLOY_NOW.md`

