# 🔧 Restore Environment Variables in Vercel

## What Happened?

If your environment variables disappeared, they might have been:
- Not saved properly
- Deleted accidentally
- Need to be re-added

---

## Quick Fix: Re-add All Variables

### Step 1: Go to Environment Variables

1. Vercel Dashboard → Your Project → **Settings** → **Environment Variables**

### Step 2: Add Each Variable (Click "Add Another" for each)

**Email Configuration (5 variables):**
1. **Key:** `SMTP_HOST` → **Value:** `smtp.gmail.com`
2. **Key:** `SMTP_PORT` → **Value:** `587`
3. **Key:** `SMTP_USER` → **Value:** `sheida.shaban18@gmail.com`
4. **Key:** `SMTP_PASS` → **Value:** `rlvs_wjqx_lnuk_lsrr`
5. **Key:** `FROM_EMAIL` → **Value:** `sheida.shaban18@gmail.com`

**LinkedIn OAuth (5 variables):**
6. **Key:** `LINKEDIN_CLIENT_ID` → **Value:** `86746lh683dkza` (with 'l'!)
7. **Key:** `LINKEDIN_CLIENT_SECRET` → **Value:** `your-client-secret` (get from LinkedIn Developers)
8. **Key:** `LINKEDIN_REDIRECT_URI` → **Value:** `https://certificate-zbl2.vercel.app/api/auth/linkedin/callback`
9. **Key:** `NEXT_PUBLIC_LINKEDIN_CLIENT_ID` → **Value:** `86746lh683dkza` (with 'l'!)
10. **Key:** `NEXT_PUBLIC_LINKEDIN_REDIRECT_URI` → **Value:** `https://certificate-zbl2.vercel.app/api/auth/linkedin/callback`

**Application (2 variables):**
11. **Key:** `NEXT_PUBLIC_APP_URL` → **Value:** `https://certificate-zbl2.vercel.app`
12. **Key:** `SECRET_KEY` → **Value:** `your-secret-key-for-encryption` (or any random string)

### Step 3: Make Sure They're Saved

- Variables should appear in the list
- Check that all 12 variables are there
- If using "Import .env", make sure to click "Save" button

### Step 4: Redeploy

After adding all variables:
1. Go to **Deployments** tab
2. Click three dots (⋯) on latest deployment
3. Click **Redeploy**

---

## Quick Copy-Paste Method

If you see an "Import .env" option, you can paste this (replace YOUR-VERCEL-URL with your actual URL):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com
LINKEDIN_CLIENT_ID=86746lh683dkza
LINKEDIN_CLIENT_SECRET=your-client-secret
LINKEDIN_REDIRECT_URI=https://certificate-zbl2.vercel.app/api/auth/linkedin/callback
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=86746lh683dkza
NEXT_PUBLIC_LINKEDIN_REDIRECT_URI=https://certificate-zbl2.vercel.app/api/auth/linkedin/callback
NEXT_PUBLIC_APP_URL=https://certificate-zbl2.vercel.app
SECRET_KEY=your-secret-key-for-encryption
```

**Then update the URLs to match your actual Vercel URL!**

---

## Check Your Vercel URL

Your URL might be:
- `https://certificate-zbl2.vercel.app`
- Or check your deployment page for the exact URL

Replace `certificate-zbl2` with your actual project name if different.

---

**Don't worry - we can restore them all! Just re-add them one by one or use the import method.**

