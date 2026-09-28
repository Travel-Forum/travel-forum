-- Private bucket for post images and videos.
-- Files are read through signed URLs (see client/src/services/mediaService.js).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'post-media',
  'post-media',
  false,
  52428800, -- 50 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']
);

-- Path format: {userId}/{postId}/{file}.
-- Upload only into your own folder and only for a post you authored.
create policy "Users can upload own post media"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'post-media'
    and (storage.foldername(name))[1] = (auth.uid())::text
    and exists (
      select 1 from posts
      where (posts.id)::text = (storage.foldername(objects.name))[2]
        and posts.author_id = auth.uid()
    )
  );

-- Readable when the linked post is public or yours (mirrors posts RLS).
create policy "Users can view allowed post media files"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'post-media'
    and exists (
      select 1 from post_media
      join posts on posts.id = post_media.post_id
      where post_media.storage_path = objects.name
        and (posts.visibility = 'public' or posts.author_id = auth.uid())
    )
  );

-- Deletable only while its post_media row exists,
-- so delete files BEFORE deleting the post (cascade removes the rows).
create policy "Users can delete own post media files"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'post-media'
    and (storage.foldername(name))[1] = (auth.uid())::text
    and exists (
      select 1 from post_media
      join posts on posts.id = post_media.post_id
      where post_media.storage_path = objects.name
        and posts.author_id = auth.uid()
    )
  );
