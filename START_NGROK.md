# Quick Guide: Start ngrok for Public URL

## Step 1: Make Sure Your Server is Running

In your FIRST terminal window, make sure you see:
```
✓ Ready in X seconds
○ Local: http://localhost:3000
```

If not running, start it:
```powershell
npm run dev
```

## Step 2: Start ngrok (NEW Terminal Window)

Open a **NEW PowerShell terminal** and run:

```powershell
cd "C:\Users\Sheida\Music\my_cursor_apps\Linked in generatior certificate"
ngrok http 3000
```

## Step 3: Copy the Public URL

ngrok will show you something like:
```
Forwarding   https://abc123.ngrok.io -> http://localhost:3000
```

**Copy the `https://abc123.ngrok.io` URL** (yours will be different)

## Step 4: Update .env File

1. Open your `.env` file
2. Find this line:
   ```
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
3. Change it to:
   ```
   NEXT_PUBLIC_APP_URL=https://abc123.ngrok.io
   ```
   (Replace `abc123.ngrok.io` with YOUR ngrok URL)

## Step 5: Restart Your Server

1. Go back to your FIRST terminal (where `npm run dev` is running)
2. Press `Ctrl + C` to stop it
3. Run `npm run dev` again

## Step 6: Test!

1. Use the ngrok URL instead of localhost:
   - Go to: `https://abc123.ngrok.io/admin`
   - Generate a certificate
   - Click the certificate link (it will use the ngrok URL)
   - Click "Share on LinkedIn"
   - **Certificate image will appear automatically!** 🎉

## Important Notes

- **Keep BOTH terminals open:**
  - Terminal 1: `npm run dev` (your server)
  - Terminal 2: `ngrok http 3000` (the tunnel)

- **ngrok URL changes:** Each time you restart ngrok, you get a new URL. For permanent solution, deploy to Vercel.

- **To stop ngrok:** Press `Ctrl + C` in the ngrok terminal

