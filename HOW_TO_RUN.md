# How to Run the Certificate Generator

## Quick Start Guide

### Step 1: Check Your Environment Variables

Make sure your `.env` file is configured with:
- ✅ Email settings (SMTP_USER, SMTP_PASS, etc.)
- ✅ LinkedIn OAuth credentials (LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET)
- ✅ Application URL (NEXT_PUBLIC_APP_URL)

**Note:** The app will run without LinkedIn credentials, but LinkedIn sharing won't work.

### Step 2: Start the Development Server

Open PowerShell in your project folder and run:

```powershell
cd "C:\Users\Sheida\Music\my_cursor_apps\Linked in generatior certificate"
npm run dev
```

### Step 3: Wait for Server to Start

You should see:
```
✓ Ready in X seconds
- Local: http://localhost:3000
```

### Step 4: Open Your Browser

Go to: **http://localhost:3000**

### Step 5: Access Admin Panel

To generate certificates, go to: **http://localhost:3000/admin**

---

## Important Notes

### ⚠️ Keep the Server Running
- **Don't close the terminal window** while using the app
- The server must stay running for the app to work
- You can minimize the window, but don't close it

### 🛑 To Stop the Server
- Press `Ctrl + C` in the terminal
- Or close the terminal window

### 🔄 To Restart the Server
1. Stop the server (Ctrl + C)
2. Run `npm run dev` again

---

## Troubleshooting

### Port Already in Use
If you see "Port 3000 is already in use":
```powershell
# Find and kill the process using port 3000
netstat -ano | findstr :3000
# Then kill the process ID (replace PID with the number)
taskkill /PID <PID> /F
```

### Dependencies Not Installed
If you get module errors:
```powershell
npm install
```

### Environment Variables Not Loading
- Make sure `.env` file exists in the root directory
- Restart the server after changing `.env` file
- Check that there are no spaces around `=` in `.env` file

### Email Not Working
- Check your SMTP credentials in `.env`
- Make sure you're using a Gmail App Password (not your regular password)
- See `EMAIL_SETUP_EXPLAINED.md` for detailed instructions

### LinkedIn Not Working
- Check your LinkedIn OAuth credentials in `.env`
- Make sure redirect URI matches: `http://localhost:3000/api/auth/linkedin/callback`
- See `LINKEDIN_SETUP_SIMPLE.md` for setup instructions

---

## What Each Page Does

- **http://localhost:3000** - Home page
- **http://localhost:3000/admin** - Generate certificates (admin form)
- **http://localhost:3000/certificate/[id]** - View a specific certificate
- **http://localhost:3000/api/test-email** - Test email configuration

---

## Next Steps After Starting

1. ✅ Server is running
2. ✅ Open http://localhost:3000/admin
3. ✅ Fill in the certificate form
4. ✅ Click "Generate Certificate"
5. ✅ Check email for the certificate
6. ✅ Click the certificate link to view it
7. ✅ Click "Share on LinkedIn" to post it

---

## Production Build (Optional)

To create a production build:

```powershell
npm run build
npm start
```

This creates an optimized production version.

