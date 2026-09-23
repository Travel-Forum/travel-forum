import { Card, VStack, HStack, Avatar, Text, Input, IconButton, Box, Separator } from "@chakra-ui/react"
import { LuSend, LuBot } from "react-icons/lu"

const mockMessages = [
  { id: 1, sender: "bot", text: "Hi! Ask me about destinations, visas, or travel tips." },
  { id: 2, sender: "user", text: "What documents do I need for Japan?" },
  { id: 3, sender: "bot", text: "For most nationalities, a valid passport and a visa are required. Check your embassy for details." },
]

const ChatBotWidget = () => {
  return (
    <Card.Root w="full" h="500px" overflow="hidden">
      <Card.Header p={3}>
        <HStack gap={2} align="center">
          <Box
            bg="blue.solid"
            borderRadius="full"
            p={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <LuBot color="white" size={16} />
          </Box>
          <Text fontWeight="bold">Travel Assistant</Text>
        </HStack>
      </Card.Header>

      <Separator />

      <Card.Body flex="1" minH="0" overflowY="auto" p={3}>
        <VStack align="stretch" gap={3}>
          {mockMessages.map((msg) => (
            <HStack
              key={msg.id}
              justify={msg.sender === "user" ? "flex-end" : "flex-start"}
            >
              {msg.sender === "bot" && (
                <Avatar.Root size="xs">
                  <Avatar.Fallback name="Bot" />
                </Avatar.Root>
              )}
              <Box
                bg={msg.sender === "user" ? "blue.solid" : "bg.muted"}
                color={msg.sender === "user" ? "blue.contrast" : "fg"}
                px={3}
                py={2}
                borderRadius="lg"
                maxW="80%"
              >
                <Text fontSize="sm">{msg.text}</Text>
              </Box>
            </HStack>
          ))}
        </VStack>
      </Card.Body>

      <Separator />

      <Card.Footer p={3}>
        <HStack w="full" gap={2} align="center">
          <Input placeholder="Type a message..." borderRadius="full" size="sm" flex="1" minW="0" />
          <IconButton aria-label="Send message" borderRadius="full" size="sm" flexShrink={0}>
            <LuSend size={14} />
          </IconButton>
        </HStack>
      </Card.Footer>
    </Card.Root>
  )
}

export default ChatBotWidget