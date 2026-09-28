-- Row Level Security for all public tables.
--
-- Notes:
-- * Permissive policies for the same command are OR-ed, so keep exactly
--   one policy per table/command/role unless the rules are really different.
-- * auth.uid() is wrapped in (select ...) so it is evaluated once per query,
--   not once per row.

alter table profiles enable row level security;
alter table posts enable row level security;
alter table comments enable row level security;
alter table post_likes enable row level security;
alter table post_media enable row level security;

-- profiles --------------------------------------------------------------

create policy "Profiles are viewable by authenticated users"
  on profiles for select
  to authenticated
  using (true);

-- A new profile always starts as a regular, unblocked user.
create policy "Users can insert their own profile"
  on profiles for insert
  to authenticated
  with check ((select auth.uid()) = id and is_admin = false and is_blocked = false);

-- Users edit their own profile but cannot change username, is_admin or is_blocked.
create policy "Users can update their own profile"
  on profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check (
    (select auth.uid()) = id
    and is_admin = (select p.is_admin from profiles p where p.id = (select auth.uid()))
    and is_blocked = (select p.is_blocked from profiles p where p.id = (select auth.uid()))
    and username = (select p.username from profiles p where p.id = (select auth.uid()))
  );

-- Admins block/unblock users and grant admin rights.
create policy "Admins can update any profile"
  on profiles for update
  to authenticated
  using (
    exists (
      select 1 from profiles p
      where p.id = (select auth.uid()) and p.is_admin = true
    )
  );

-- posts -----------------------------------------------------------------

create policy "Public posts are viewable by everyone, private only by author"
  on posts for select
  to anon, authenticated
  using (visibility = 'public' or author_id = (select auth.uid()));

-- Blocked users cannot create posts.
create policy "Logged-in users can create posts"
  on posts for insert
  to authenticated
  with check (
    author_id = (select auth.uid())
    and not exists (
      select 1 from profiles
      where profiles.id = (select auth.uid()) and profiles.is_blocked = true
    )
  );

create policy "Authors can update their own posts"
  on posts for update
  to authenticated
  using (author_id = (select auth.uid()))
  with check (author_id = (select auth.uid()));

create policy "Authors can delete their own posts"
  on posts for delete
  to authenticated
  using (author_id = (select auth.uid()));

-- comments --------------------------------------------------------------

create policy "Comments are viewable by everyone"
  on comments for select
  to public
  using (true);

-- Blocked users cannot create comments.
create policy "Logged-in users can create comments"
  on comments for insert
  to authenticated
  with check (
    author_id = (select auth.uid())
    and not exists (
      select 1 from profiles
      where profiles.id = (select auth.uid()) and profiles.is_blocked = true
    )
  );

create policy "Authors can update their own comments"
  on comments for update
  to authenticated
  using (author_id = (select auth.uid()))
  with check (author_id = (select auth.uid()));

create policy "Authors can delete their own comments"
  on comments for delete
  to authenticated
  using (author_id = (select auth.uid()));

-- post_likes ------------------------------------------------------------

create policy "Likes are viewable by everyone"
  on post_likes for select
  to public
  using (true);

create policy "Logged-in users can like"
  on post_likes for insert
  to authenticated
  with check (user_id = (select auth.uid()));

create policy "Users can remove their own like"
  on post_likes for delete
  to authenticated
  using (user_id = (select auth.uid()));

-- post_media ------------------------------------------------------------

-- Same visibility rule as the parent post.
create policy "Users can view allowed post media"
  on post_media for select
  to authenticated
  using (
    exists (
      select 1 from posts
      where posts.id = post_media.post_id
        and (posts.visibility = 'public' or posts.author_id = (select auth.uid()))
    )
  );

create policy "Users can add media to own posts"
  on post_media for insert
  to authenticated
  with check (
    exists (
      select 1 from posts
      where posts.id = post_media.post_id and posts.author_id = (select auth.uid())
    )
  );

create policy "Users can delete media from own posts"
  on post_media for delete
  to authenticated
  using (
    exists (
      select 1 from posts
      where posts.id = post_media.post_id and posts.author_id = (select auth.uid())
    )
  );
