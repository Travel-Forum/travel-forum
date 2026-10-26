import { useMemo, useEffect } from "react";
import { Box, CloseButton, Image, SimpleGrid, chakra } from "@chakra-ui/react";

const thumbnailProps = {
  height: "100px",
  width: "100%",
  objectFit: "cover",
  borderRadius: "md",
};

const PostMediaPreview = ({ mediaFiles, onRemove }) => {
  const mediaPreviews = useMemo(() => {
    return mediaFiles.map((file) => {
      const url = URL.createObjectURL(file);
      const isVideo = file.type.startsWith("video/");
      return { file, url, isVideo };
    });
  }, [mediaFiles]);

  useEffect(() => {
    return () => {
      mediaPreviews.forEach((media) => {
        URL.revokeObjectURL(media.url);
      });
    };
  }, [mediaPreviews]);

  if (mediaPreviews.length === 0) return null;

  return (
    <SimpleGrid columns={3} gap={2}>
      {mediaPreviews.map((media) => (
        <Box key={media.url} position="relative">
          {media.isVideo ? (
            <chakra.video
              src={media.url}
              preload="metadata"
              muted
              {...thumbnailProps}
            />
          ) : (
            <Image src={media.url} alt={media.file.name} {...thumbnailProps} />
          )}

          <CloseButton
            size="2xs"
            variant="solid"
            position="absolute"
            top={1}
            right={1}
            aria-label={`Remove ${media.file.name}`}
            onClick={() => onRemove(media.file)}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default PostMediaPreview;
