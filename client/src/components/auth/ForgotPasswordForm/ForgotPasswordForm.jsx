import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Fieldset, Input, Stack, Text } from "@chakra-ui/react";
import AuthCard from "../../ui/AuthCard/AuthCard";
import FormField from "../../ui/FormField/FormField";
import AuthSwitchLink from "../AuthSwitchLink/AuthSwitchLink";
import { forgotPasswordSchema } from "../../../schemas/authSchemas";

const ForgotPasswordForm = ({ onSubmit, sent }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  if (sent) {
    return (
      <AuthCard
        title="Check your email"
        footer={
          <AuthSwitchLink
            text="Remember your password?"
            linkText="Sign in"
            to="/signin"
          />
        }
      >
        <Text textAlign="center" color="fg.muted">
          If an account exists for this email, we sent a link to reset your
          password. Open it in this browser.
        </Text>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Forgot password"
      onSubmit={handleSubmit(onSubmit)}
      footer={
        <>
          <Button variant="solid" type="submit" w="full">
            Send reset link
          </Button>

          <AuthSwitchLink
            text="Remember your password?"
            linkText="Sign in"
            to="/signin"
          />
        </>
      }
    >
      <Stack gap="6">
        <Text textAlign="center" color="fg.muted">
          Enter the email you signed up with and we will send you a link to
          reset your password.
        </Text>

        <Fieldset.Root size="lg">
          <Fieldset.Content>
            <FormField label="Email address" error={errors.email}>
              <Input type="email" {...register("email")} />
            </FormField>
          </Fieldset.Content>
        </Fieldset.Root>
      </Stack>
    </AuthCard>
  );
};

export default ForgotPasswordForm;
