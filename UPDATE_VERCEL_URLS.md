# 🔧 Update URLs in Vercel Environment Variables

## ✅ You've Imported Your .env File!

Now you need to **update the URLs** to use your Vercel URL instead of localhost/ngrok.

---

## 🔍 What Needs to Be Updated

I can see you have these variables that need updating:

### ❌ Currently Set To (WRONG):
- `LINKEDIN_REDIRECT_URI` = `http://localhost:3000/api/auth/linkedin/callback`
- `NEXT_PUBLIC_LINKEDIN_REDIRECT_URI` = `http://localhost:3000/api/auth/linkedin/callback`
- `NEXT_PUBLIC_APP_URL` = `https://nonanarchically-buckshee-douglas.ngrok-free.dev`

### ✅ Should Be (CORRECT):
- `LINKEDIN_REDIRECT_URI` = `https://certificate-zbl2.vercel.app/api/auth/linkedin/callback`
- `NEXT_PUBLIC_LINKEDIN_REDIRECT_URI` = `https://certificate-zbl2.vercel.app/api/auth/linkedin/callback`
- `NEXT_PUBLIC_APP_URL` = `https://certificate-zbl2.vercel.app`

---

## 📝 How to Update

### Step 1: Find Your Vercel URL

Your Vercel URL is: **`https://certificate-zbl2.vercel.app`**

(Check your deployment page or dashboard to confirm)

### Step 2: Update Each Variable

For each variable below, **click on the value field** and update it:

1. **Click on `LINKEDIN_REDIRECT_URI` value field**
   - Change from: `http://localhost:3000/api/auth/linkedin/callback`
   - Change to: `https://certificate-zbl2.vercel.app/api/auth/linkedin/callback`

2. **Click on `NEXT_PUBLIC_LINKEDIN_REDIRECT_URI` value field**
   - Change from: `http://localhost:3000/api/auth/linkedin/callback`
   - Change to: `https://certificate-zbl2.vercel.app/api/auth/linkedin/callback`

3. **Click on `NEXT_PUBLIC_APP_URL` value field**
   - Change from: `https://nonanarchically-buckshee-douglas.ngrok-free.dev`
   - Change to: `https://certificate-zbl2.vercel.app`

### Step 3: Also Check LinkedIn Client ID

I noticed: `LINKEDIN_CLIENT_ID` = `867461h683dkza`

**Should be:** `86746lh683dkza` (with an 'l' after 86746)

If it's wrong, update it too!

### Step 4: Save

After updating all three variables, the changes should auto-save, or look for a "Save" button.

---

## 🚀 After Updating

1. **Go to "Deployments" tab**
2. **Click the three dots (⋯) on your latest deployment**
3. **Click "Redeploy"**
4. **Wait for deployment to finish**

---

## ✅ Then Update LinkedIn App

1. Go to: https://www.linkedin.com/developers/apps
2. Your app → **"Auth"** tab
3. Add redirect URL: `https://certificate-zbl2.vercel.app/api/auth/linkedin/callback`
4. Save

---

## 🎯 Quick Checklist

- [ ] Updated `LINKEDIN_REDIRECT_URI` to Vercel URL
- [ ] Updated `NEXT_PUBLIC_LINKEDIN_REDIRECT_URI` to Vercel URL
- [ ] Updated `NEXT_PUBLIC_APP_URL` to Vercel URL
- [ ] Fixed `LINKEDIN_CLIENT_ID` if needed (should be `86746lh683dkza`)
- [ ] Redeployed project
- [ ] Updated LinkedIn app redirect URL

---

**Once you update these 3 variables and redeploy, everything will work permanently! 🎉**

