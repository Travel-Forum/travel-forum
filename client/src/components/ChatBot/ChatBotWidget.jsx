import { Card, VStack, HStack, Avatar, Text, Input, IconButton, Box, Separator } from "@chakra-ui/react"
import { LuSend, LuBot } from "react-icons/lu"

const mockMessages = [
  { id: 1, sender: "bot", text: "Hi! Ask me about destinations, visas, or travel tips." },
  { id: 2, sender: "user", text: "What documents do I need for Japan?" },
  { id: 3, sender: "bot", text: "For most nationalities, a valid passport and a visa are required. Check your embassy for details." },
]

const ChatbotWidget = () => {
  return (
    <Card.Root maxW="sm" h="500px" display="flex" flexDirection="column">
      <Card.Header>
        <HStack gap={2}>
          <Box
            bg="blue.500"
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

      <Card.Body flex="1" overflowY="auto">
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
                bg={msg.sender === "user" ? "blue.500" : "bg.muted"}
                color={msg.sender === "user" ? "white" : "fg"}
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

      <Card.Footer>
        <HStack w="full" gap={2}>
          <Input placeholder="Type a message..." borderRadius="full" size="sm" />
          <IconButton aria-label="Send message" borderRadius="full" size="sm">
            <LuSend size={14} />
          </IconButton>
        </HStack>
      </Card.Footer>
    </Card.Root>
  )
}

export default ChatbotWidget