import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink } from "react-router-dom";
import { Button, Fieldset, Input, Stack, Text } from "@chakra-ui/react";

import { signUpSchema } from "../../../schemas/authSchemas";

import { AuthCard } from "../../Ui/AuthCard";
import { FormField } from "../../Ui/FormField";
import { GoogleAuthSection } from "../../Ui/GoogleAuthSection";
import { PasswordInput } from "../../Ui/PasswordInput";

const SignUpDesign = ({ onSubmit }) => {
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

          <Text fontSize="sm">
            Already have an account?{" "}
            <RouterLink to="/signin">
              <Text as="span" color="blue.500" fontWeight="medium">
                Sign in
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

export default SignUpDesign;
