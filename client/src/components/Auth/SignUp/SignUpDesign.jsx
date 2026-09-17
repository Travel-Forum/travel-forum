import { useForm } from "react-hook-form";

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
  Box,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import logo from "../../../assets/icons/Forum logo.svg";

import { PasswordInput } from "../../Ui/PasswordInput";

import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../../schemas/authSchemas";

import { Link as RouterLink } from "react-router-dom";

import { GoogleAuth } from "../../../services/authService/GoogleAuth.js";

const SignUpDesign = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

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
              <Button variant="outline" w="full" onClick={GoogleAuth}>
                <FcGoogle /> Continue with Google
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
                    <Field.Root invalid={!!errors.firstName}>
                      <Field.Label>First Name</Field.Label>
                      <Input {...register("firstName")} />
                      {errors.firstName && (
                        <Text color="red.500" fontSize="sm">
                          {errors.firstName.message}
                        </Text>
                      )}
                    </Field.Root>

                    <Field.Root invalid={!!errors.lastName}>
                      <Field.Label>Last Name</Field.Label>
                      <Input {...register("lastName")} />
                      {errors.lastName && (
                        <Text color="red.500" fontSize="sm">
                          {errors.lastName.message}
                        </Text>
                      )}
                    </Field.Root>

                    <Field.Root invalid={!!errors.username}>
                      <Field.Label>Username</Field.Label>
                      <Input {...register("username")} />
                      {errors.username && (
                        <Text color="red.500" fontSize="sm">
                          {errors.username.message}
                        </Text>
                      )}
                    </Field.Root>

                    <Field.Root invalid={!!errors.email}>
                      <Field.Label>Email address</Field.Label>
                      <Input type="email" {...register("email")} />
                      {errors.email && (
                        <Text color="red.500" fontSize="sm">
                          {errors.email.message}
                        </Text>
                      )}
                    </Field.Root>

                    <Field.Root invalid={!!errors.phone}>
                      <Field.Label>Phone</Field.Label>
                      <Input
                        placeholder="+359888123456"
                        {...register("phone")}
                      />
                      <Field.HelperText>
                        Include country code, no leading zero
                      </Field.HelperText>
                      {errors.phone && (
                        <Text color="red.500" fontSize="sm">
                          {errors.phone.message}
                        </Text>
                      )}
                    </Field.Root>

                    <Field.Root invalid={!!errors.password}>
                      <Field.Label>Password</Field.Label>
                      <PasswordInput {...register("password")} />
                      <Field.HelperText>
                        At least 8 characters, with uppercase, lowercase, number
                        and special character
                      </Field.HelperText>
                      {errors.password && (
                        <Text color="red.500" fontSize="sm">
                          {errors.password.message}
                        </Text>
                      )}
                    </Field.Root>

                    <Field.Root invalid={!!errors.confirmPassword}>
                      <Field.Label>Confirm Password</Field.Label>
                      <PasswordInput {...register("confirmPassword")} />
                      {errors.confirmPassword && (
                        <Text color="red.500" fontSize="sm">
                          {errors.confirmPassword.message}
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
        </form>
      </Card.Root>
    </Box>
  );
};

export default SignUpDesign;
