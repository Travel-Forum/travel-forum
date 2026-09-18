import { useForm, Controller } from "react-hook-form";

import {
  Button,
  Card,
  Field,
  Fieldset,
  Input,
  Stack,
  HStack,
  Text,
  Box,
} from "@chakra-ui/react";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import logo from "../../../assets/icons/Forum logo.svg";

import { zodResolver } from "@hookform/resolvers/zod";
import { completeProfileSchema} from "../../../schemas/authSchemas.js";

import { Link as RouterLink } from "react-router-dom";

const CompleteProfileDesign = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(completeProfileSchema),
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
                <span>Finish Your Profile</span>
              </HStack>
            </Card.Title>
          </Card.Header>

          <Card.Body>
            <Stack gap="6">

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

                    <Field.Root invalid={!!errors.phone}>
                      <Field.Label>Phone</Field.Label>
                      <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <PhoneInput
                            {...field}
                            defaultCountry="BG"
                            international
                            countryCallingCodeEditable={false}
                            inputComponent={Input}
                          />
                        )}
                      />
                      <Field.HelperText>
                        Pick your country, the code and grouping are added automatically
                      </Field.HelperText>
                      {errors.phone && (
                        <Text color="red.500" fontSize="sm">
                          {errors.phone.message}
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
              Continue
            </Button>
          </Card.Footer>
        </form>
      </Card.Root>
    </Box>
  );
};

export default CompleteProfileDesign;
