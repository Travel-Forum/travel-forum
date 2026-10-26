-- Other users' email and phone are private.
-- Before this, any signed-in user could read every column of every profile
-- through the REST API and through Realtime.
--
-- profiles now returns only your own row (all rows for admins).
-- Everyone else is read through public_profiles, which has only the safe columns.

-- No security_invoker on purpose: the view runs as its owner, so it can read
-- every row past the profiles policy below. It is safe because it exposes
-- only the columns listed here, never email or phone.
create view public_profiles as
select
  id,
  username,
  first_name,
  last_name,
  avatar_url,
  is_admin,
  created_at
from profiles;

-- Read-only: a simple view is updatable, and this one bypasses RLS,
-- so without this anyone could edit any profile through it.
revoke all on public_profiles from anon, authenticated;
grant select on public_profiles to authenticated;

drop policy "Profiles are viewable by authenticated users" on profiles;

create policy "Users can view their own profile, admins can view all"
  on profiles for select
  to authenticated
  using (id = (select auth.uid()) or (select is_admin()));
