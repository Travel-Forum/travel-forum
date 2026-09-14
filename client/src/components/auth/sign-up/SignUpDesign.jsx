import {
  Button,
  Card,
  Field,
  Fieldset,
  Input,
  Stack,
  HStack,
  Separator,
  Text,
} from "@chakra-ui/react";

import { FcGoogle } from "react-icons/fc";

import { Link as RouterLink } from "react-router-dom";


const SignUpDesign = () => {
  return (
    <Card.Root maxW="md" mx="auto">
      <Card.Header>
        <Card.Title textAlign="center">Get started</Card.Title>
      </Card.Header>

      <Card.Body>
        <Stack gap="6">
          <Button variant="outline" w="full">
            <FcGoogle /> Sign up with Google
          </Button>

          <HStack>
            <Separator flex="1" />
            <Text fontSize="sm" color="fg.muted">or</Text>
            <Separator flex="1" />
          </HStack>

          <Fieldset.Root size="lg">
            <Fieldset.Content>
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>First Name</Field.Label>
                  <Input name="firstName" />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Last Name</Field.Label>
                  <Input name="lastName" />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Username</Field.Label>
                  <Input name="username" />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Email address</Field.Label>
                  <Input name="email" type="email" />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Password</Field.Label>
                  <Input name="password" type="password" />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Confirm Password</Field.Label>
                  <Input name="confirmPassword" type="password" />
                </Field.Root>
              </Stack>
            </Fieldset.Content>
          </Fieldset.Root>
        </Stack>
      </Card.Body>

      <Card.Footer justifyContent="center" flexDirection="column" gap="2">
        <Button variant="solid" type="submit" w="full">
          Sign Up
        </Button>
        <Text fontSize="sm">
          Already have an account?{" "}
          <RouterLink to="/signin">
            <Text as="span" color="blue.500" fontWeight="medium">
              Sign in
            </Text>
          </RouterLink>
        </Text>
      </Card.Footer>
    </Card.Root>
  )
}

export default SignUpDesign