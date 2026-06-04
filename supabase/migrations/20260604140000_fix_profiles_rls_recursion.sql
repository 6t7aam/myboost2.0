-- Fix infinite recursion in profiles RLS.
--
-- Migration 20260506192600 added a SELECT policy "Admins can read all profiles"
-- whose USING clause runs `SELECT 1 FROM public.profiles ...`. Because that
-- subquery is itself subject to RLS on `profiles`, it recurses infinitely and
-- Postgres aborts every read with error 42P17 ("infinite recursion detected in
-- policy for relation profiles"). This breaks all profile reads, including the
-- Discord identity upsert/read used by the order-sync integration.
--
-- The recursive policy is redundant: admin reads are already covered by
-- "Admins can view all profiles" (migration 20260413195240), which uses the
-- SECURITY DEFINER helper public.has_role() and does NOT recurse. So we simply
-- drop the broken policy.

DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
