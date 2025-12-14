# 🔍 Check Text Rendering Logs

## The Issue

Colors are showing (yellow/black) but text is not appearing on the certificate.

## What I Just Fixed

1. ✅ Changed `textBaseline` from `'top'` to `'alphabetic'` (more reliable)
2. ✅ Added `strokeText` in addition to `fillText` (double rendering for visibility)
3. ✅ Added more detailed logging

## Check Vercel Logs

1. **Go to:** Vercel Dashboard → Your Project → **Logs** tab
2. **Generate a new certificate**
3. **Look for these messages:**
   - `🎨 Drawing student name: ...`
   - `✅ Drew student name: ...`
   - `❌ Error drawing student name: ...`

## What to Look For

### If you see "✅ Drew" messages:
- Text is being drawn but not visible
- Might be a color/positioning issue

### If you see "❌ Error" messages:
- There's an error with text rendering
- Share the error message

### If you see nothing:
- Text rendering might be failing silently
- Canvas library might not support text in Vercel

---

**Check the logs and share what you see!**

