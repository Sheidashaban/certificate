# Troubleshooting Guide

## Problem: Server Won't Start / "Does Not Work"

### Issue 1: Port 3000 Already in Use

**Symptoms:**
- Error: "Port 3000 is already in use"
- Server won't start

**Solution:**

**Option A: Use the startup script (Easiest)**
```powershell
.\start-server.ps1
```

**Option B: Kill the process manually**
```powershell
# Find the process using port 3000
netstat -ano | findstr :3000

# Kill it (replace PID with the number you see)
taskkill /PID <PID> /F

# Then start server
npm run dev
```

**Option C: Use a different port**
```powershell
# Start on port 3001 instead
$env:PORT=3001; npm run dev
```

---

### Issue 2: Dependencies Not Installed

**Symptoms:**
- Error: "Cannot find module..."
- Missing dependencies

**Solution:**
```powershell
npm install
```

---

### Issue 3: .env File Missing or Not Configured

**Symptoms:**
- Email not sending
- LinkedIn not working
- App runs but features don't work

**Solution:**
1. Copy the template:
   ```powershell
   Copy-Item env.template .env
   ```

2. Edit `.env` file with your actual values:
   - Email credentials (Gmail App Password)
   - LinkedIn OAuth credentials
   - Application URL

3. **Restart the server** after changing `.env`

---

### Issue 4: TypeScript/Compilation Errors

**Symptoms:**
- Build errors
- Type errors

**Solution:**
```powershell
# Clean and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run dev
```

---

### Issue 5: Canvas/Image Generation Not Working

**Symptoms:**
- Certificate images not generating
- Canvas errors

**Solution:**
The `@napi-rs/canvas` package requires native dependencies. If you see errors:

```powershell
# Rebuild native modules
npm rebuild @napi-rs/canvas
```

---

## Quick Diagnostic

Run this to check your setup:
```powershell
node check-setup.js
```

---

## Still Not Working?

1. **Check the terminal output** - Look for error messages
2. **Check browser console** - Press F12 in browser, look at Console tab
3. **Check server logs** - Look at the terminal where `npm run dev` is running

## Common Error Messages

### "EADDRINUSE: address already in use :::3000"
→ Port 3000 is busy. Kill the process or use a different port.

### "Module not found"
→ Run `npm install`

### "Cannot find module '@/lib/...'"
→ Check `tsconfig.json` has the path alias configured (it should)

### "Email sending failed"
→ Check `.env` file has correct SMTP credentials

### "LinkedIn authentication failed"
→ Check `.env` file has correct LinkedIn OAuth credentials

---

## Getting Help

If nothing works:
1. Share the **exact error message** from the terminal
2. Share what happens when you try to access `http://localhost:3000`
3. Check if the server is actually running (look for "Ready" message)

