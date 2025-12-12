# Fix 405 Error in Production

## The Problem
Getting "405 Method Not Allowed" when trying to generate certificates in production.

## Possible Causes

1. **API Route not deployed correctly**
2. **Missing environment variables**
3. **Vercel function timeout**
4. **File system access issue (certificates.json)**

## Solutions

### Solution 1: Check Vercel Function Logs

1. Go to your Vercel project
2. Click "Logs" tab
3. Look for errors when you try to generate a certificate
4. Check for:
   - Missing environment variables
   - File system errors
   - Timeout errors

### Solution 2: Verify Environment Variables

Make sure ALL these are set in Vercel:
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_HOST`
- `SMTP_PORT`
- `FROM_EMAIL`
- `NEXT_PUBLIC_APP_URL`
- `LINKEDIN_CLIENT_ID`
- `LINKEDIN_CLIENT_SECRET`
- `LINKEDIN_REDIRECT_URI`
- `NEXT_PUBLIC_LINKEDIN_CLIENT_ID`
- `NEXT_PUBLIC_LINKEDIN_REDIRECT_URI`
- `SECRET_KEY`

### Solution 3: Database Issue

The JSON file database might not work in Vercel's serverless environment. We may need to switch to a proper database.

### Solution 4: Check API Route Export

Make sure the API route exports the handler correctly.





