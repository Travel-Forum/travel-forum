import { Card, HStack, Input, Button } from "@chakra-ui/react"
import { LuVideo, LuImage } from "react-icons/lu"
import UserAvatar from "../profile/UserAvatar"

const CreatePostTrigger = ({ onOpenModal }) => {
  return (
    <Card.Root p={4}>
      <HStack gap={3}>
        <UserAvatar />

        <Input
          placeholder="Start a post"
          borderRadius="full"
          onClick={onOpenModal}
          readOnly
          cursor="pointer"
        />
      </HStack>

      <HStack justify="space-around" mt={4}>
        <Button variant="ghost" onClick={onOpenModal}>
          <LuVideo color="var(--chakra-colors-green-fg)" /> Video
        </Button>
        <Button variant="ghost" onClick={onOpenModal}>
          <LuImage color="var(--chakra-colors-blue-fg)" /> Photo
        </Button>
      </HStack>
    </Card.Root>
  )
}

export default CreatePostTrigger