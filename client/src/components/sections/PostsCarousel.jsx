import { useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import PostPreviewCard from "../cards/PostPreviewCard";
import {
  getLatestPosts,
  getMostCommentedPosts,
} from "../../services/postsService";

const PAGE_SIZE = 3;

const PostsCarousel = () => {
  const [tab, setTab] = useState("latest");
  const [page, setPage] = useState(0);
  const [latest, setLatest] = useState([]);
  const [commented, setCommented] = useState([]);

  useEffect(() => {
    const load = async () => {
      const latestRes = await getLatestPosts(10);
      if (!latestRes.error) setLatest(latestRes.data);

      const commentedRes = await getMostCommentedPosts(10);
      if (!commentedRes.error) setCommented(commentedRes.data);
    };
    load();
  }, []);

  const posts = tab === "latest" ? latest : commented;
  const pageCount = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const visible = posts.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const switchTab = (next) => {
    setTab(next);
    setPage(0);
  };

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
      {posts.length === 0 && (
        <Text textAlign="center" color="fg.muted">
          No posts yet.
        </Text>
      )}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {visible.map((post) => (
          <PostPreviewCard key={post.id} post={post} />
        ))}
      </SimpleGrid>

      <HStack justify="center" gap={4} mt={6}>
        <IconButton
          aria-label="Previous"
          variant="outline"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
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
          onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          disabled={page === pageCount - 1}
        >
          <LuChevronRight />
        </IconButton>
      </HStack>
    </Box>
  );
}

export default PostsCarousel;
