import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import PostPreviewCard from "../../cards/PostPreviewCard/PostPreviewCard";
import { usePostsCarousel } from "./usePostsCarousel";

const PostsCarousel = () => {
  const {
    tab,
    switchTab,
    page,
    pageCount,
    hasPosts,
    visiblePosts,
    goToPrevious,
    goToNext,
  } = usePostsCarousel();

  return (
    <Box as="section" py={{ base: 8, md: 12 }}>
      <HStack justify="center" gap={2} mb={6}>
        <Button
          variant={tab === "latest" ? "solid" : "ghost"}
          onClick={() => switchTab("latest")}
        >
          Latest 10 posts
        </Button>
        <Button
          variant={tab === "commented" ? "solid" : "ghost"}
          onClick={() => switchTab("commented")}
        >
          10 most commented
        </Button>
      </HStack>
      {!hasPosts && (
        <Text textAlign="center" color="fg.muted">
          No posts yet.
        </Text>
      )}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {visiblePosts.map((post) => (
          <PostPreviewCard key={post.id} post={post} />
        ))}
      </SimpleGrid>

      <HStack justify="center" gap={4} mt={6}>
        <IconButton
          aria-label="Previous"
          variant="outline"
          onClick={goToPrevious}
          disabled={page === 0}
        >
          <LuChevronLeft />
        </IconButton>

        <HStack gap={2}>
          {Array.from({ length: pageCount }).map((_, i) => (
            <Box
              key={i}
              w={2.5}
              h={2.5}
              borderRadius="full"
              bg={i === page ? "colorPalette.solid" : "bg.emphasized"}
            />
          ))}
        </HStack>

        <IconButton
          aria-label="Next"
          variant="outline"
          onClick={goToNext}
          disabled={page === pageCount - 1}
        >
          <LuChevronRight />
        </IconButton>
      </HStack>
    </Box>
  );
};

export default PostsCarousel;
