import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";

import { signUpSchema } from "../../schemas/authSchemas";

import { AuthCard } from "../ui/AuthCard";
import { FormField } from "../ui/FormField";
import { GoogleAuthSection } from "../ui/GoogleAuthSection";
import { PasswordInput } from "../ui/PasswordInput";
import AuthSwitchLink from "./AuthSwitchLink";

const SignUpForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <AuthCard
      title="Find your trip"
      onSubmit={handleSubmit(onSubmit)}
      footer={
        <>
          <Button variant="solid" type="submit" w="full">
            Sign Up
          </Button>

          <AuthSwitchLink
            text="Already have an account?"
            linkText="Sign in"
            to="/signin"
          />
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
                helperText="At least 8 characters, with uppercase, lowercase, number and special character"
              >
                <PasswordInput {...register("password")} />
              </FormField>

              <FormField label="Confirm Password" error={errors.confirmPassword}>
                <PasswordInput {...register("confirmPassword")} />
              </FormField>
            </Stack>
          </Fieldset.Content>
        </Fieldset.Root>
      </Stack>
    </AuthCard>
  );
};

export default SignUpForm;
