# 🔧 Update Existing DATABASE_URL

## The Error

"A variable with the name 'DATABASE_URL' already exists"

This means `DATABASE_URL` is already in your environment variables, but it might have the wrong value.

## Solution: Update the Existing Variable

### Step 1: Find the Existing Variable

1. **Scroll down** on the Environment Variables page
2. **Look for** `DATABASE_URL` in the list of existing variables
3. **Click on it** to edit

### Step 2: Update the Value

1. **Click the value field** for `DATABASE_URL`
2. **Replace** the existing value with:
   ```
   postgresql://neondb_owner:npg_7cQoIUWw9qMf@ep-floral-dawn-ahl3zvaw-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
3. **Save**

---

## Alternative: Delete and Recreate

If you can't find it to edit:

1. **Find** `DATABASE_URL` in the list
2. **Click the delete/trash icon** next to it
3. **Confirm deletion**
4. **Add it again** with the correct value

---

**Scroll down to find the existing DATABASE_URL and update its value!**

