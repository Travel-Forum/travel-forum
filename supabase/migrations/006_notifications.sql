-- Notifications for likes, comments and replies.
-- Rows are created only by the triggers below, never by the client.

create table notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references profiles (id) on delete cascade,
  actor_id uuid not null references profiles (id) on delete cascade,
  type text not null,
  post_id uuid not null references posts (id) on delete cascade,
  comment_id uuid references comments (id) on delete cascade,
  is_read boolean not null default false,
  created_at timestamptz not null default now(),

  constraint notifications_type_check
    check (type in ('post_like', 'post_comment', 'comment_reply'))
);

create index notifications_recipient_id_idx on notifications (recipient_id, created_at desc);
create index notifications_actor_id_idx on notifications (actor_id);
create index notifications_post_id_idx on notifications (post_id);
create index notifications_comment_id_idx on notifications (comment_id);

-- Users see only their own notifications and can only mark them as read.

alter table notifications enable row level security;

create policy "Users can view their own notifications"
  on notifications for select
  to authenticated
  using (recipient_id = (select auth.uid()));

create policy "Users can mark their own notifications as read"
  on notifications for update
  to authenticated
  using (recipient_id = (select auth.uid()))
  with check (recipient_id = (select auth.uid()));

revoke update on notifications from authenticated;
grant update (is_read) on notifications to authenticated;

-- Like: notify the post author (not when liking your own post).

create or replace function notify_post_like()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  post_author_id uuid;
begin
  select author_id into post_author_id from posts where id = new.post_id;

  if post_author_id is not null and post_author_id <> new.user_id then
    insert into notifications (recipient_id, actor_id, type, post_id)
    values (post_author_id, new.user_id, 'post_like', new.post_id);
  end if;

  return new;
end;
$$;

create trigger on_post_like_created
  after insert on post_likes
  for each row execute function notify_post_like();

-- Unlike: remove the like notification, so liking twice doesn't spam.

create or replace function remove_post_like_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from notifications
  where type = 'post_like'
    and post_id = old.post_id
    and actor_id = old.user_id;

  return old;
end;
$$;

create trigger on_post_like_deleted
  after delete on post_likes
  for each row execute function remove_post_like_notification();

-- Comment: notify the post author. Reply: notify the author of the parent comment.

create or replace function notify_comment()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  recipient uuid;
  notification_type text;
begin
  if new.parent_comment_id is null then
    select author_id into recipient from posts where id = new.post_id;
    notification_type := 'post_comment';
  else
    select author_id into recipient from comments where id = new.parent_comment_id;
    notification_type := 'comment_reply';
  end if;

  if recipient is not null and recipient <> new.author_id then
    insert into notifications (recipient_id, actor_id, type, post_id, comment_id)
    values (recipient, new.author_id, notification_type, new.post_id, new.id);
  end if;

  return new;
end;
$$;

create trigger on_comment_created
  after insert on comments
  for each row execute function notify_comment();

-- Send new notifications to the browser in real time.

alter publication supabase_realtime add table notifications;