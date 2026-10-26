-- Fixes the profiles SELECT policy from 013.
--
-- The UPDATE policies on profiles read profiles again (to lock username, email,
-- is_admin and is_blocked). Postgres then applies the profiles SELECT policy
-- inside them, and a SELECT policy that contains subqueries, like
-- (select auth.uid()), makes that "infinite recursion detected in policy".
--
-- So this policy calls the functions directly, without (select ...).
-- is_admin() is security definer, so it reads profiles without RLS
-- and does not recurse.

-- The live database had the 013 policy rolled back to the old one,
-- so drop whichever of the two exists.
drop policy if exists "Users can view their own profile, admins can view all" on profiles;
drop policy if exists "Profiles are viewable by authenticated users" on profiles;

create policy "Users can view their own profile, admins can view all"
  on profiles for select
  to authenticated
  using (id = auth.uid() or public.is_admin());
