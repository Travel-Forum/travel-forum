import { Text } from "@chakra-ui/react";

const Eyebrow = ({ children, ...props }) => (
  <Text
    color="colorPalette.fg"
    fontWeight="semibold"
    letterSpacing="wider"
    textTransform="uppercase"
    fontSize="sm"
    {...props}
  >
    {children}
  </Text>
);

export default Eyebrow;
