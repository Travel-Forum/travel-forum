import { Box } from "@chakra-ui/react";

const IconBox = ({ children }) => (
  <Box
    p={3}
    borderRadius="md"
    bg="colorPalette.subtle"
    color="colorPalette.fg"
    fontSize="2xl"
  >
    {children}
  </Box>
);

export default IconBox;
