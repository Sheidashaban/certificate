# Simple ngrok Setup - 3 Steps

## Step 1: Start ngrok Manually

Open PowerShell and run:
```powershell
cd "C:\Users\Sheida\Music\my_cursor_apps\Linked in generatior certificate"
ngrok http 3000
```

**You'll see output like:**
```
Forwarding   https://abc123.ngrok.io -> http://localhost:3000
```

## Step 2: Copy the URL

Copy the `https://abc123.ngrok.io` part (yours will be different)

## Step 3: Tell Me the URL

Just paste the URL here and I'll update your `.env` file automatically!

**Or run this command yourself:**
```powershell
.\update-env-with-ngrok.ps1 -NgrokUrl "https://your-ngrok-url.ngrok.io"
```

---

## Alternative: Open ngrok Web Interface

1. After starting ngrok, open your browser
2. Go to: **http://localhost:4040**
3. You'll see the ngrok URL there
4. Copy it and share it with me

---

## After I Update .env

1. **Restart your server:**
   - Press `Ctrl + C` in the terminal where `npm run dev` is running
   - Run `npm run dev` again

2. **Test:**
   - Use your ngrok URL: `https://your-url.ngrok.io/admin`
   - Generate a certificate
   - Share on LinkedIn
   - ✅ Image appears automatically!

