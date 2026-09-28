-- Index foreign key columns for joins, lookups ("all comments of a post")
-- and ON DELETE CASCADE checks.
-- post_likes.post_id is already covered by the (post_id, user_id) primary key.

create index posts_author_id_idx on posts (author_id);

create index comments_post_id_idx on comments (post_id);
create index comments_author_id_idx on comments (author_id);
create index comments_parent_comment_id_idx on comments (parent_comment_id);

create index post_likes_user_id_idx on post_likes (user_id);

create index post_media_post_id_idx on post_media (post_id);
