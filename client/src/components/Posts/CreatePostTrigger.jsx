import { Card, HStack, Avatar, Input, Button, Separator } from "@chakra-ui/react"
import { LuVideo, LuImage } from "react-icons/lu"

const CreatePostTrigger = ({ onOpenModal }) => {
  return (
    <Card.Root p={4}>
      <HStack gap={3}>
        <Avatar.Root>
          <Avatar.Fallback name="User" />
          <Avatar.Image src="https://bit.ly/sage-adebayo" />
        </Avatar.Root>

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
          <LuVideo color="green" /> Video
        </Button>
        <Button variant="ghost" onClick={onOpenModal}>
          <LuImage color="blue" /> Photo
        </Button>
      </HStack>
    </Card.Root>
  )
}

export default CreatePostTrigger