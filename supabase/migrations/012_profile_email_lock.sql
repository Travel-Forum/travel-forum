-- The email in a profile always belongs to the signed-in account.
-- Before this, anyone could call the API and create a profile with someone else's email,
-- or change their email afterwards.

drop policy "Users can insert their own profile" on profiles;

create policy "Users can insert their own profile"
  on profiles for insert
  to authenticated
  with check (
    (select auth.uid()) = id
    and email = (select auth.jwt() ->> 'email')
    and is_admin = false
    and is_blocked = false
  );

-- It cannot change after the profile is created.
drop policy "Users can update their own profile" on profiles;

create policy "Users can update their own profile"
  on profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check (
    (select auth.uid()) = id
    and is_admin = (select p.is_admin from profiles p where p.id = (select auth.uid()))
    and is_blocked = (select p.is_blocked from profiles p where p.id = (select auth.uid()))
    and username = (select p.username from profiles p where p.id = (select auth.uid()))
    and email = (select p.email from profiles p where p.id = (select auth.uid()))
  );
