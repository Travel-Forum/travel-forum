import { useState } from "react";
import { Box, IconButton, Image, Text, chakra } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const PostMediaViewer = ({ media, title }) => {
  const [index, setIndex] = useState(0);
  const current = media[index];
  const hasMany = media.length > 1;

  const showPrevious = () =>
    setIndex((prev) => (prev - 1 + media.length) % media.length);
  const showNext = () => setIndex((prev) => (prev + 1) % media.length);

  const mediaProps = { maxW: "100%", maxH: "100%", objectFit: "contain" };
  const arrowProps = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    rounded: "full",
    size: "sm",
    variant: "subtle",
  };

  return (
    <Box
      position="relative"
      bg="black"
      borderRadius="lg"
      overflow="hidden"
      h={{ base: "50vh", lg: "65vh" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {current.type === "video" ? (
        <chakra.video key={current.id} src={current.url} controls {...mediaProps} />
      ) : (
        <Image
          key={current.id}
          src={current.url}
          alt={`${title} — image ${index + 1}`}
          {...mediaProps}
        />
      )}

      {hasMany && (
        <>
          <IconButton aria-label="Previous" onClick={showPrevious} left={2} {...arrowProps}>
            <LuChevronLeft />
          </IconButton>
          <IconButton aria-label="Next" onClick={showNext} right={2} {...arrowProps}>
            <LuChevronRight />
          </IconButton>
          <Text
            position="absolute"
            bottom={2}
            color="white"
            fontSize="sm"
            bg="blackAlpha.600"
            px={2}
            rounded="md"
          >
            {index + 1} / {media.length}
          </Text>
        </>
      )}
    </Box>
  );
};

export default PostMediaViewer;