import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Fieldset, Stack, Text } from "@chakra-ui/react";

import { resetPasswordSchema } from "../../../schemas/authSchemas";

import AuthCard from "../../ui/AuthCard/AuthCard";
import FormField from "../../ui/FormField/FormField";
import { PasswordInput } from "../../ui/PasswordInput/PasswordInput";

const ResetPasswordForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <AuthCard
      title="Set a new password"
      onSubmit={handleSubmit(onSubmit)}
      footer={
        <Button variant="solid" type="submit" w="full">
          Update password
        </Button>
      }
    >
      <Stack gap="6">
        <Text textAlign="center" color="fg.muted">
          Choose a new password for your account.
        </Text>

        <Fieldset.Root size="lg">
          <Fieldset.Content>
            <Stack gap="4">
              <FormField
                label="New password"
                error={errors.password}
                helperText="At least 8 characters, with uppercase, lowercase, number and special character"
              >
                <PasswordInput {...register("password")} />
              </FormField>

              <FormField
                label="Confirm new password"
                error={errors.confirmPassword}
              >
                <PasswordInput {...register("confirmPassword")} />
              </FormField>
            </Stack>
          </Fieldset.Content>
        </Fieldset.Root>
      </Stack>
    </AuthCard>
  );
};

export default ResetPasswordForm;
