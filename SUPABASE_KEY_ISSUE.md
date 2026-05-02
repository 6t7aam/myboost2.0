# Supabase Configuration Issue - IMPORTANT

**Date:** 2026-05-02  
**Issue:** Invalid API key format

---

## ❌ PROBLEM

The current `VITE_SUPABASE_ANON_KEY` value is:
```
sb_publishable_MUGMCUY8wSxSh30i9HVIGw_fH2HHPlZT
```

This format (`sb_publishable_*`) is **NOT a valid Supabase anon key**.

---

## ✅ SOLUTION

Supabase anon keys must be **JWT tokens** in this format:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11amR2dXRuanh2YXVqemVvdWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAwMDAwMDAsImV4cCI6MTk5NTU3NjAwMH0.SIGNATURE_HERE
```

---

## 🔍 HOW TO GET THE CORRECT KEY

### Option 1: Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project: `mujdvutnjxvaujzeoudn`
3. Go to **Settings** → **API**
4. Copy the **anon/public** key (starts with `eyJ`)

### Option 2: Supabase CLI
```bash
supabase status
```
Look for `anon key` in the output.

---

## 📝 UPDATE .env FILE

Replace the current value with the correct JWT token:

```env
VITE_SUPABASE_URL=https://mujdvutnjxvaujzeoudn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_ACTUAL_TOKEN_HERE
```

---

## ⚠️ CURRENT STATUS

**Auth Status:** ❌ BROKEN  
**Reason:** Invalid API key format  
**Fix Required:** Update `.env` with correct JWT anon key  

---

## 🔧 AFTER FIXING

1. Update `.env` with correct anon key
2. Restart dev server: `npm run dev`
3. Test authentication
4. Verify chat system works

---

**Note:** The `sb_publishable_*` format is not recognized by Supabase client library. You must use the JWT token format.
