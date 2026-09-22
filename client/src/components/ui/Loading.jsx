import { Spinner, Text, VStack } from "@chakra-ui/react";


const Loading = () => {
  return (
    <VStack justify="center" minH="100vh">
      <Spinner size="lg" color="blue.solid" />
      <Text color="fg.muted">Loading...</Text>
    </VStack>
  )
}

export default Loading
