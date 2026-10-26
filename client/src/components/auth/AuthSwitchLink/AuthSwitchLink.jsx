import { Link as RouterLink } from "react-router-dom";
import { Link, Text } from "@chakra-ui/react";

const AuthSwitchLink = ({ text, linkText, to }) => (
  <Text fontSize="sm">
    {text}{" "}
    <Link asChild color="colorPalette.fg" fontWeight="medium">
      <RouterLink to={to}>{linkText}</RouterLink>
    </Link>
  </Text>
);

export default AuthSwitchLink;
