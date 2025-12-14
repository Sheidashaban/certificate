# 🔧 Fix Empty Certificate Issue

## The Problem

The certificate template shows but the content (student name, course, etc.) is empty.

## Root Cause

**Vercel's `/tmp` directory is ephemeral** - data doesn't persist between function invocations. This means:
- When you generate a certificate, it saves to `/tmp/certificates.json` in one function instance
- When you view the certificate, it might be a different function instance with an empty `/tmp/certificates.json`

## Solution Options

### Option 1: Use Vercel KV (Recommended for Production)

Vercel KV is a Redis-based database that persists data. This is the best solution for production.

**Steps:**
1. Go to Vercel Dashboard → Your Project → **Storage** tab
2. Click **Create Database** → Select **KV**
3. Follow the setup wizard
4. Update the code to use Vercel KV instead of JSON file

### Option 2: Use Environment Variables (Quick Fix for Testing)

For a quick test, we can store certificates in environment variables (not ideal for production, but works for testing).

### Option 3: Use External Database (Best for Production)

Use a proper database like:
- **Vercel Postgres** (recommended)
- **Supabase** (free tier available)
- **PlanetScale** (free tier available)

## Immediate Fix: Check Vercel Logs

1. Go to Vercel Dashboard → Your Project → **Logs** tab
2. Try to view a certificate
3. Check the logs for:
   - "Certificate not found" errors
   - Database path issues
   - Certificate generation errors

## What I've Added

I've added extensive logging to help debug:
- Logs when certificate is found/not found
- Logs database path and contents
- Logs certificate generation process

## Next Steps

1. **Check Vercel Logs** - See what errors are happening
2. **Check if certificate was actually saved** - Look at the generate API logs
3. **Consider using Vercel KV or Postgres** - For persistent storage

---

**The logging will help us identify exactly where the issue is!**

