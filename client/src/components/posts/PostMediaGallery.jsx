import { Image, SimpleGrid, chakra } from "@chakra-ui/react";

const PostMediaGallery = ({ media, title }) => {
  if (!media?.length) return null;

  const isSingle = media.length === 1;
  const mediaProps = {
    width: "100%",
    maxHeight: isSingle ? "480px" : "240px",
    objectFit: "cover",
    borderRadius: "md",
  };

  return (
    <SimpleGrid columns={isSingle ? 1 : 2} gap={2} mt={3}>
      {media.map((item, index) =>
        item.type === "video" ? (
          <chakra.video
            key={item.id}
            src={item.url}
            controls
            preload="metadata"
            bg="black"
            {...mediaProps}
          />
        ) : (
          <Image
            key={item.id}
            src={item.url}
            alt={`${title} — image ${index + 1}`}
            loading="lazy"
            {...mediaProps}
          />
        ),
      )}
    </SimpleGrid>
  );
};

export default PostMediaGallery;
