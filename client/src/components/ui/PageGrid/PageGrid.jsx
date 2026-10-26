import { Grid } from "@chakra-ui/react";

// Three-column page layout (side, main, side) that becomes one column
// below the lg breakpoint. Pages pass their own GridItems as children.
const PageGrid = ({ children, ...props }) => (
  <Grid
    templateColumns={{ base: "1fr", lg: "1fr 2fr 1fr" }}
    templateRows={{ lg: "minmax(0, 1fr)" }}
    gap={{ base: 4, lg: 6 }}
    maxW="1200px"
    w="full"
    mx="auto"
    p={{ base: 2, md: 4 }}
    pt={{ base: 3, md: 6 }}
    flex="1"
    minH="0"
    {...props}
  >
    {children}
  </Grid>
);

export default PageGrid;
