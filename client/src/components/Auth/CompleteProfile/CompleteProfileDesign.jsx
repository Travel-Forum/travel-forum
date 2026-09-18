import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import PhoneInput from "react-phone-number-input";

import { completeProfileSchema } from "../../../schemas/authSchemas.js";

import { AuthCard } from "../../Ui/AuthCard";
import { FormField } from "../../Ui/FormField";

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
    <AuthCard
      title="Finish Your Profile"
      onSubmit={handleSubmit(onSubmit)}
      footer={
        <Button variant="solid" type="submit" w="full">
          Continue
        </Button>
      }
    >
      <Fieldset.Root size="lg">
        <Fieldset.Content>
          <Stack gap="4">
            <FormField label="First Name" error={errors.firstName}>
              <Input {...register("firstName")} />
            </FormField>

            <FormField label="Last Name" error={errors.lastName}>
              <Input {...register("lastName")} />
            </FormField>

            <FormField label="Username" error={errors.username}>
              <Input {...register("username")} />
            </FormField>

            <FormField
              label="Phone"
              error={errors.phone}
              helperText="Pick your country, the code and grouping are added automatically"
            >
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
            </FormField>
          </Stack>
        </Fieldset.Content>
      </Fieldset.Root>
    </AuthCard>
  );
};

export default CompleteProfileDesign;
