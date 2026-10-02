import { Center, CloseButton, Dialog, Grid, Portal, Spinner } from "@chakra-ui/react";
import PostMediaViewer from "./PostMediaViewer";
import PostDetailsPanel from "./PostDetailsPanel";

const PostDetailsModal = ({
  open,
  post,
  loading,
  onClose,
  liked,
  likeCount,
  onToggleLike,
  onAddComment,
}) => {
  const hasMedia = post?.media?.length > 0;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => !e.open && onClose()}
      placement="center"
      size={hasMedia ? "cover" : "lg"}
      scrollBehavior="inside"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body p={{ base: 3, lg: 4 }}>
              {loading || !post ? (
                <Center minH="300px">
                  <Spinner color="blue.solid" />
                </Center>
              ) : (
                <Grid
                  templateColumns={{ base: "1fr", lg: hasMedia ? "3fr 2fr" : "1fr" }}
                  gap={4}
                  alignItems="start"
                >
                  {hasMedia && <PostMediaViewer media={post.media} title={post.title} />}
                  <PostDetailsPanel
                    post={post}
                    liked={liked}
                    likeCount={likeCount}
                    onToggleLike={onToggleLike}
                    onAddComment={onAddComment}
                  />
                </Grid>
              )}
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default PostDetailsModal;