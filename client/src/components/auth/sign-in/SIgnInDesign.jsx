import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, Card, Field, Fieldset, Input, Stack, HStack, Separator, Text, Box, } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import logo from "../../../assets/icons/Forum logo.svg";

import { PasswordInput } from "../../ui/password-input";

import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '../../../schemas/authSchemas';



import { Link as RouterLink } from "react-router-dom";

const SignInDesign = ({onSubmit}) => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signInSchema)
  })

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p="4"
    >
      <Card.Root maxW="lg" w="full" mx="auto" asChild>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card.Header>
            <Card.Title textAlign="center">
              <HStack justify="center" gap="2">
                <RouterLink to="/" style={{ display: "inline-flex" }}>
                  <img
                    src={logo}
                    alt="Travel Forum logo"
                    width="24"
                    height="24"
                  />
                </RouterLink>
                <span>Find your trip</span>
              </HStack>
            </Card.Title>
          </Card.Header>

          <Card.Body>
            <Stack gap="6">
              <Button variant="outline" w="full">
                <FcGoogle /> Sign in with Google
              </Button>

              <HStack>
                <Separator flex="1" />
                <Text fontSize="sm" color="fg.muted">
                  or
                </Text>
                <Separator flex="1" />
              </HStack>

              <Fieldset.Root size="lg">
                <Fieldset.Content>
                  <Stack gap="4">
                    <Field.Root invalid={!!errors.email}>
                      <Field.Label>Email address</Field.Label>
                      <Input type="email" {...register("email")} />
                      {errors.email && (
                        <Text color="red.500" fontSize="sm">
                          {errors.email.message}
                        </Text>
                      )}
                    </Field.Root>

                    <Field.Root invalid={!!errors.password}>
                      <HStack justify="space-between" w="full">
                        <Field.Label>Password</Field.Label>
                        <RouterLink to="/forgot-password">
                          <Text fontSize="sm" color="blue.500">
                            Forgot password?
                          </Text>
                        </RouterLink>
                      </HStack>
                      <PasswordInput {...register("password")} />
                      {errors.password && (
                        <Text color="red.500" fontSize="sm">
                          {errors.password.message}
                        </Text>
                      )}
                    </Field.Root>
                  </Stack>
                </Fieldset.Content>
              </Fieldset.Root>
            </Stack>
          </Card.Body>

          <Card.Footer justifyContent="center" flexDirection="column" gap="2">
            <Button variant="solid" type="submit" w="full">
              Sign In
            </Button>

            <Text fontSize="sm">
              Don't have an account?{" "}
              <RouterLink to="/signup">
                <Text as="span" color="blue.500" fontWeight="medium">
                  Sign up
                </Text>
              </RouterLink>
            </Text>
          </Card.Footer>
        </form>
      </Card.Root>
    </Box>
  );
};

export default SignInDesign;
