import { Badge } from "@chakra-ui/react";

const RoleBadge = ({ profile }) =>
  profile?.is_admin ? (
    <Badge colorPalette="ocean">Admin</Badge>
  ) : (
    <Badge>Member</Badge>
  );

export default RoleBadge;
