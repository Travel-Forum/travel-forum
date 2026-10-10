import { Button, HStack } from "@chakra-ui/react";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "likes", label: "Most liked" },
  { value: "comments", label: "Most commented" },
];

const PostSortButtons = ({ value, onChange }) => {
  return (
    <HStack gap={2} wrap="wrap">
      {SORT_OPTIONS.map((option) => (
        <Button
          key={option.value}
          size="sm"
          borderRadius="full"
          variant={option.value === value ? "solid": "ghost"}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </HStack>
  );
};

export default PostSortButtons;
