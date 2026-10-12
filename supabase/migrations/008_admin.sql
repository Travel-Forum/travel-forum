create or replace function is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from profiles
    where id = (select auth.uid()) and is_admin = true
  );
$$;

create policy "Admins can view all posts"
  on posts for select
  to authenticated
  using ((select public.is_admin()));

create policy "Admins can delete any post"
  on posts for delete
  to authenticated
  using ((select public.is_admin()));

create policy "Admins can view all post media"
  on post_media for select
  to authenticated
  using ((select public.is_admin()));

create policy "Admins can delete any post media files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'post-media' and (select public.is_admin()));
