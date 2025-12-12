# How to Push to GitHub - Step by Step

## ✅ Security Check
- ✅ `.env` file is **NOT** included (your passwords are safe!)
- ✅ `certificates.json` is **NOT** included
- ✅ All sensitive files are protected by `.gitignore`

## Step 1: Create GitHub Repository

1. **Go to GitHub:**
   - Visit: https://github.com/new
   - Or click the "+" icon → "New repository"

2. **Create Repository:**
   - Repository name: `certificate-generator` (or any name you like)
   - Description: "Certificate generation platform for AI Tech Institute"
   - Choose: **Private** (recommended) or Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

3. **Copy the repository URL:**
   - GitHub will show you a URL like: `https://github.com/yourusername/certificate-generator.git`
   - Copy this URL

## Step 2: Push Your Code

**Option A: Using HTTPS (Easier)**

Run these commands in your PowerShell:

```powershell
git remote add origin https://github.com/yourusername/certificate-generator.git
git branch -M main
git push -u origin main
```

When prompted:
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your GitHub password)

**To create a Personal Access Token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: "Certificate Generator"
4. Select scopes: Check "repo"
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)
7. Use this token as your password when pushing

**Option B: Using GitHub Desktop (Easiest)**

1. Download: https://desktop.github.com/
2. Install and sign in
3. File → Add Local Repository
4. Select your project folder
5. Click "Publish repository"
6. Done!

## Step 3: Verify

After pushing, go to your GitHub repository page. You should see all your files there, but **NOT**:
- ❌ `.env` file
- ❌ `certificates.json`
- ❌ `node_modules/`

## Step 4: Deploy to Vercel

Once your code is on GitHub:

1. Go to: https://vercel.com
2. Sign up with GitHub
3. Import your repository
4. Add environment variables (copy from your `.env` file)
5. Deploy!

---

## Important Security Notes

✅ **Safe to push:**
- All code files
- Configuration files (package.json, tsconfig.json, etc.)
- Documentation files

❌ **Never push:**
- `.env` file (contains passwords)
- `certificates.json` (contains student data)
- `node_modules/` (too large, not needed)

Your `.gitignore` file protects these automatically!





