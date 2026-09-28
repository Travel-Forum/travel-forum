-- Used by the public home page ("latest" and "most commented" posts).
-- security_invoker makes the view respect the caller's RLS policies,
-- so private posts stay hidden here too.
create view posts_with_comment_count
with (security_invoker = on) as
select
  p.id,
  p.title,
  p.content,
  p.created_at,
  p.author_id,
  count(c.id) as comment_count
from posts p
left join comments c on c.post_id = p.id
group by p.id;

-- Home page counters for anonymous visitors.
-- security definer so it can count every row regardless of RLS;
-- it only returns totals, never row data.
create or replace function get_public_stats()
returns table (post_count integer, user_count integer)
language sql
security definer
set search_path = public
as $$
  select
    (select count(*)::int from posts) as post_count,
    (select count(*)::int from profiles) as user_count;
$$;
