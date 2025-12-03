# Fix LinkedIn Sharing Error

## The Problem
You're seeing: "The passed in client_id is invalid" with `"your-linkedin-client-id"`

This means your `.env` file still has the placeholder value instead of your actual LinkedIn Client ID.

## The Solution

### Step 1: Check Your .env File

Open your `.env` file and find these lines:

```env
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=your-linkedin-client-id
```

### Step 2: Replace with Your Actual Client ID

From your LinkedIn Developer App, your Client ID is: `86746lh683dkza`

Change it to:
```env
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=86746lh683dkza
```

Also make sure these are set correctly:
```env
LINKEDIN_CLIENT_ID=86746lh683dkza
LINKEDIN_CLIENT_SECRET=your-actual-client-secret-here
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/auth/linkedin/callback
NEXT_PUBLIC_LINKEDIN_REDIRECT_URI=http://localhost:3000/api/auth/linkedin/callback
```

### Step 3: Restart the Server

**Important:** After changing `.env` file, you MUST restart the server:

1. In the PowerShell window running the server, press `Ctrl + C`
2. Run `npm run dev` again
3. Wait for "✓ Ready"

### Step 4: Test Again

1. Go to a certificate page
2. Click "Share on LinkedIn"
3. It should now work!

## Your LinkedIn App Details

- **Client ID:** `86746lh683dkza`
- **Redirect URL:** `http://localhost:3000/api/auth/linkedin/callback` (already configured ✅)

## Common Mistakes

❌ **Wrong:** `NEXT_PUBLIC_LINKEDIN_CLIENT_ID=your-linkedin-client-id`  
✅ **Correct:** `NEXT_PUBLIC_LINKEDIN_CLIENT_ID=86746lh683dkza`

❌ **Wrong:** Forgetting to restart the server after changing .env  
✅ **Correct:** Always restart the server after changing .env

