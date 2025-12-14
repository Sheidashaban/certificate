# Deployment Guide - Production Setup

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is made by the creators of Next.js, so it's the easiest option.

### Step 1: Prepare Your Code

1. **Make sure your code is in Git:**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub:**
   - Create a new repository on GitHub
   - Push your code:
   ```powershell
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit: https://vercel.com
   - Sign up/Login with your GitHub account

2. **Import Your Project:**
   - Click "Add New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables:**
   - In the "Environment Variables" section, add all your `.env` variables:
     - `SMTP_USER`
     - `SMTP_PASS`
     - `SMTP_HOST`
     - `SMTP_PORT`
     - `FROM_EMAIL`
     - `LINKEDIN_CLIENT_ID`
     - `LINKEDIN_CLIENT_SECRET`
     - `LINKEDIN_REDIRECT_URI` (update to your Vercel URL)
     - `NEXT_PUBLIC_LINKEDIN_CLIENT_ID`
     - `NEXT_PUBLIC_LINKEDIN_REDIRECT_URI` (update to your Vercel URL)
     - `NEXT_PUBLIC_APP_URL` (will be your Vercel URL)
     - `SECRET_KEY`

4. **Update LinkedIn Redirect URI:**
   - After deployment, Vercel will give you a URL like: `https://your-app.vercel.app`
   - Update your LinkedIn app redirect URI to: `https://your-app.vercel.app/api/auth/linkedin/callback`
   - Update `LINKEDIN_REDIRECT_URI` and `NEXT_PUBLIC_LINKEDIN_REDIRECT_URI` in Vercel environment variables

5. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)

### Step 3: Update LinkedIn App Settings

1. Go to: https://www.linkedin.com/developers/apps/228357258/auth
2. Add new redirect URL: `https://your-app.vercel.app/api/auth/linkedin/callback`
3. Keep the localhost one for local development

### Step 4: Test Production

- Your app will be live at: `https://your-app.vercel.app`
- Test certificate generation
- Test LinkedIn sharing (image should now show!)

---

## Option 2: Deploy to Netlify

### Step 1: Build Configuration

Create `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Step 2: Deploy

1. Go to: https://netlify.com
2. Sign up/Login
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub
5. Add environment variables (same as Vercel)
6. Deploy

---

## Option 3: Deploy to Your Own Server

### Requirements:
- Node.js installed
- Domain name (optional but recommended)
- SSL certificate (for HTTPS)

### Steps:

1. **Build the app:**
   ```powershell
   npm run build
   ```

2. **Start production server:**
   ```powershell
   npm start
   ```

3. **Use PM2 for process management:**
   ```powershell
   npm install -g pm2
   pm2 start npm --name "certificate-generator" -- start
   pm2 save
   pm2 startup
   ```

4. **Set up reverse proxy (Nginx):**
   - Configure Nginx to forward requests to port 3000
   - Set up SSL with Let's Encrypt

---

## Important: Update Environment Variables for Production

### Update These in Your Production Environment:

```env
# Update URLs to your production domain
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
LINKEDIN_REDIRECT_URI=https://your-app.vercel.app/api/auth/linkedin/callback
NEXT_PUBLIC_LINKEDIN_REDIRECT_URI=https://your-app.vercel.app/api/auth/linkedin/callback

# Keep these the same
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
# ... etc
```

---

## Database Consideration

**Current Setup:** Uses JSON file (`certificates.json`)

**For Production:** Consider upgrading to:
- **Vercel:** Use Vercel Postgres (free tier available)
- **Netlify:** Use a database service like Supabase or PlanetScale
- **Your Server:** Use PostgreSQL or MySQL

The JSON file works for now, but a real database is better for production.

---

## Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel/Netlify account created
- [ ] Environment variables added
- [ ] LinkedIn redirect URI updated
- [ ] Deployed and tested
- [ ] Certificate generation works
- [ ] Email sending works
- [ ] LinkedIn sharing works with image preview

---

## Need Help?

If you get stuck during deployment, let me know and I can help troubleshoot!







