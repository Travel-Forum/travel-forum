import { Card, HStack, Icon, Input, Button } from "@chakra-ui/react";
import { LuVideo, LuImage } from "react-icons/lu";
import UserAvatar from "../../profile/UserAvatar/UserAvatar";

const CreatePostTrigger = ({ profile, onOpenModal, disabled = false }) => (
  <Card.Root p={4}>
    <HStack gap={3}>
      <UserAvatar profile={profile} />

      <Input
        placeholder="Start a post"
        borderRadius="full"
        onClick={onOpenModal}
        readOnly
        disabled={disabled}
        cursor={disabled ? "not-allowed" : "pointer"}
      />
    </HStack>

    <HStack justify="space-around" mt={4}>
      <Button variant="ghost" onClick={onOpenModal} disabled={disabled}>
        <Icon color="green.fg">
          <LuVideo />
        </Icon>{" "}
        Video
      </Button>
      <Button variant="ghost" onClick={onOpenModal} disabled={disabled}>
        <Icon color="colorPalette.fg">
          <LuImage />
        </Icon>{" "}
        Photo
      </Button>
    </HStack>
  </Card.Root>
);

export default CreatePostTrigger;
