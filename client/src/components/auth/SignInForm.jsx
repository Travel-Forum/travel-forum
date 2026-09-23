import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink } from "react-router-dom";
import { Button, Fieldset, Input, Stack, Text } from "@chakra-ui/react";

import { signInSchema } from "../../schemas/authSchemas";

import { AuthCard } from "../ui/AuthCard";
import { FormField } from "../ui/FormField";
import { GoogleAuthSection } from "../ui/GoogleAuthSection";
import { PasswordInput } from "../ui/PasswordInput";

const SignInForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  return (
    <AuthCard
      title="Find your trip"
      onSubmit={handleSubmit(onSubmit)}
      footer={
        <>
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
        </>
      }
    >
      <Stack gap="6">
        <GoogleAuthSection />

        <Fieldset.Root size="lg">
          <Fieldset.Content>
            <Stack gap="4">
              <FormField label="Email address" error={errors.email}>
                <Input type="email" {...register("email")} />
              </FormField>

              <FormField
                label="Password"
                error={errors.password}
                labelAction={
                  <RouterLink to="/forgot-password">
                    <Text fontSize="sm" color="blue.500">
                      Forgot password?
                    </Text>
                  </RouterLink>
                }
              >
                <PasswordInput {...register("password")} />
              </FormField>
            </Stack>
          </Fieldset.Content>
        </Fieldset.Root>
      </Stack>
    </AuthCard>
  );
};

export default SignInForm;
