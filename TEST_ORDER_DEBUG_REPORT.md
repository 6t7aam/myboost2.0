# DEBUG REPORT - Create Test Order Failure

**Date:** 2026-05-02 12:09:02 UTC  
**Issue:** "Failed to create test order" error

---

## 🔍 STEP 1: CODE THAT CREATES TEST ORDER

**File:** `src/components/DevTestOrderCreator.tsx`  
**Lines:** 32-42

```typescript
const { data, error } = await supabase
  .from("orders")
  .insert({
    user_id: user.id,
    service: "Test Order - Arena Breakout: Infinite Koens Farming",
    price: 99.99,
    status: "pending",
    booster_type: "Test Booster",
  })
  .select()
  .single();
```

---

## 🗄️ STEP 2: SUPABASE TABLE

**Table:** `orders`

---

## 📋 STEP 3: FIELDS IT TRIES TO INSERT

1. `user_id` - UUID (from authenticated user)
2. `service` - TEXT ("Test Order - Arena Breakout: Infinite Koens Farming")
3. `price` - NUMERIC (99.99)
4. `status` - TEXT ("pending")
5. `booster_type` - TEXT ("Test Booster")

---

## 🏗️ STEP 4: CURRENT DATABASE SCHEMA

### Base Table (Migration: 20260409191603)
```sql
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service TEXT NOT NULL,
  price NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

### Additional Columns Added:

**Migration 20260410104142:**
- `payment_id` TEXT
- `pay_currency` TEXT
- `payment_url` TEXT

**Migration 20260411074132:**
- `pay_address` TEXT
- `pay_amount` NUMERIC
- `valid_until` TIMESTAMPTZ

**Migration 20260413201351:**
- `booster_type` TEXT DEFAULT NULL

---

## ✅ STEP 5: MISSING TABLES/COLUMNS

**Result:** ✅ **NO MISSING COLUMNS**

All fields that the test order tries to insert exist in the database:
- ✅ `user_id` - EXISTS (base table)
- ✅ `service` - EXISTS (base table)
- ✅ `price` - EXISTS (base table)
- ✅ `status` - EXISTS (base table)
- ✅ `booster_type` - EXISTS (added in migration 20260413201351)

---

## 🔍 STEP 6: ACTUAL PROBLEM

The schema is correct. The issue is likely one of these:

### A. RLS (Row Level Security) Policy Issue

**Current Policy:**
```sql
CREATE POLICY "Users can insert own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

**Problem:** This policy checks if `auth.uid()` matches `user_id`, which should work.

### B. Migrations Not Applied

**Check if migrations are applied:**
```sql
-- Check if booster_type column exists
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'orders' 
AND column_name = 'booster_type';
```

### C. Auth User Reference Issue

The `user_id` references `auth.users(id)`. If the authenticated user doesn't exist in `auth.users`, the foreign key constraint will fail.

---

## 🔧 STEP 7: SQL TO FIX

### Option 1: Verify Migrations Applied
```sql
-- Check all columns in orders table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'orders'
ORDER BY ordinal_position;
```

### Option 2: Ensure booster_type Column Exists
```sql
-- Add booster_type if missing (safe to run multiple times)
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS booster_type TEXT DEFAULT NULL;
```

### Option 3: Check RLS Policies
```sql
-- View current policies
SELECT policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'orders';
```

### Option 4: Temporarily Disable RLS for Testing (DEV ONLY)
```sql
-- ONLY FOR LOCAL DEVELOPMENT TESTING
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;

-- After testing, re-enable:
-- ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
```

---

## 🎯 RECOMMENDED FIX

Run this SQL in your Supabase SQL Editor:

```sql
-- 1. Verify booster_type column exists
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS booster_type TEXT DEFAULT NULL;

-- 2. Check if all migrations applied
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'orders'
ORDER BY ordinal_position;

-- Expected columns:
-- id, user_id, service, price, status, created_at,
-- payment_id, pay_currency, payment_url,
-- pay_address, pay_amount, valid_until, booster_type
```

---

## 🧪 DEBUGGING STEPS

### 1. Check Browser Console
Open browser DevTools and look for the actual error message when clicking "Create Test Order".

### 2. Check Supabase Logs
Go to Supabase Dashboard → Logs → Check for INSERT errors

### 3. Test Direct Insert
Run this in Supabase SQL Editor:
```sql
INSERT INTO public.orders (user_id, service, price, status, booster_type)
VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'Test Order',
  99.99,
  'pending',
  'Test Booster'
);
```

### 4. Verify User Authentication
```sql
-- Check if current user exists
SELECT id, email FROM auth.users WHERE id = auth.uid();
```

---

## 📊 SUMMARY

**Schema Status:** ✅ CORRECT  
**Missing Columns:** ❌ NONE  
**Likely Issue:** Migrations not applied OR RLS policy blocking  

**Next Steps:**
1. Run `supabase db push` to ensure all migrations applied
2. Check browser console for actual error
3. Verify user is authenticated
4. Check Supabase logs for detailed error

---

**No SQL changes needed to schema - migrations are correct!**  
**Issue is likely runtime/configuration, not schema.**
