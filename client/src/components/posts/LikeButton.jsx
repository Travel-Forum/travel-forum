import { HStack, IconButton, Text } from "@chakra-ui/react";
import { LuThumbsUp } from "react-icons/lu";

const LikeButton = ({ liked, count, onToggle, size = "md" }) => (
  <HStack gap={1}>
    <IconButton
      variant="ghost"
      size={size}
      aria-label={liked ? "Unlike" : "Like"}
      aria-pressed={liked}
      color={liked ? "blue.solid" : undefined}
      onClick={onToggle}
    >
      <LuThumbsUp fill={liked ? "currentColor" : "none"} />
    </IconButton>
    <Text fontSize="sm">{count}</Text>
  </HStack>
);

export default LikeButton;