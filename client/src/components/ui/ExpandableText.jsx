import { useCallback, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";

const ExpandableText = ({ children, lines = 2 }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const measureRef = useCallback((element) => {
    if (element) {
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, []);

  return (
    <Box>
      <Text
        ref={measureRef}
        whiteSpace="pre-wrap"
        lineClamp={expanded ? undefined : lines}
      >
        {children}
      </Text>

      {isOverflowing && (
        <Button
          variant="plain"
          size="sm"
          px={0}
          color="fg.muted"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "View less" : "View more"}
        </Button>
      )}
    </Box>
  );
};

export default ExpandableText;