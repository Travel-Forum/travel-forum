-- Comments and likes follow the visibility of their post.
-- Before this, anyone (even anon) could read comments and likes
-- of private posts through the REST API.
--
-- The subquery on posts is itself filtered by the posts RLS policies,
-- so a comment or like is visible exactly when its post is visible:
-- public posts to everyone, private posts to their author, all posts to admins.

drop policy "Comments are viewable by everyone" on comments;
drop policy "Likes are viewable by everyone" on post_likes;

create policy "Comments are viewable when their post is"
  on comments for select
  to anon, authenticated
  using (
    exists (
      select 1 from posts
      where posts.id = comments.post_id
    )
  );

create policy "Likes are viewable when their post is"
  on post_likes for select
  to anon, authenticated
  using (
    exists (
      select 1 from posts
      where posts.id = post_likes.post_id
    )
  );
