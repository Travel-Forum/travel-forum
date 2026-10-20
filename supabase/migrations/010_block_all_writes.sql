create or replace function is_blocked()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from profiles
    where id = (select auth.uid()) and is_blocked = true
  );
$$;

-- Blocked users can still read everything, but every write is denied.
-- Restrictive policies are AND-ed with the existing permissive ones,
-- so they add the rule without touching the policies from 004–008.

create policy "Blocked users cannot create posts"
  on posts
  as restrictive
  for insert
  to authenticated
  with check (not (select public.is_blocked()));

create policy "Blocked users cannot update posts"
  on posts
  as restrictive
  for update
  to authenticated
  using (not (select public.is_blocked()));

create policy "Blocked users cannot delete posts"
  on posts
  as restrictive
  for delete
  to authenticated
  using (not (select public.is_blocked()));

create policy "Blocked users cannot create comments"
  on comments
  as restrictive
  for insert
  to authenticated
  with check (not (select public.is_blocked()));

create policy "Blocked users cannot update comments"
  on comments
  as restrictive
  for update
  to authenticated
  using (not (select public.is_blocked()));

create policy "Blocked users cannot delete comments"
  on comments
  as restrictive
  for delete
  to authenticated
  using (not (select public.is_blocked()));

create policy "Blocked users cannot like posts"
  on post_likes
  as restrictive
  for insert
  to authenticated
  with check (not (select public.is_blocked()));

create policy "Blocked users cannot unlike posts"
  on post_likes
  as restrictive
  for delete
  to authenticated
  using (not (select public.is_blocked()));

create policy "Blocked users cannot upload media"
  on post_media
  as restrictive
  for insert
  to authenticated
  with check (not (select public.is_blocked()));

create policy "Blocked users cannot delete media"
  on post_media
  as restrictive
  for delete
  to authenticated
  using (not (select public.is_blocked()));

create policy "Blocked users cannot update their profile"
  on profiles
  as restrictive
  for update
  to authenticated
  using (not (select public.is_blocked()));

-- storage.objects holds every bucket, so these cover post media and avatars.

create policy "Blocked users cannot upload files"
  on storage.objects
  as restrictive
  for insert
  to authenticated
  with check (not (select public.is_blocked()));

create policy "Blocked users cannot update files"
  on storage.objects
  as restrictive
  for update
  to authenticated
  using (not (select public.is_blocked()));

create policy "Blocked users cannot delete files"
  on storage.objects
  as restrictive
  for delete
  to authenticated
  using (not (select public.is_blocked()));