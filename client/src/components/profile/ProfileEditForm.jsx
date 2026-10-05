import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Fieldset,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FormField } from "../ui/FormField";
import { profileEditSchema } from "../../schemas/authSchemas";

const ProfileEditForm = ({ profile, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      firstName: profile?.first_name ?? "",
      lastName: profile?.last_name ?? "",
      email: profile?.email ?? "",
      phone: profile?.phone ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root size="lg">
        <Fieldset.Content>
          <Stack gap="4">
            <FormField label="First Name" error={errors.firstName}>
              <Input {...register("firstName")} />
            </FormField>

            <FormField label="Last Name" error={errors.lastName}>
              <Input {...register("lastName")} />
            </FormField>

            <FormField label="Username">
              <Text>{profile?.username || "—"}</Text>
            </FormField>

            <FormField label="Email" error={errors.email}>
              <Input type="email" readOnly {...register("email")} />
            </FormField>

            <FormField label="Phone" error={errors.phone}>
              <Input {...register("phone")} />
            </FormField>

            <Stack direction={{ base: "column", sm: "row" }} gap="3">
              <Button type="submit">Save</Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Fieldset.Content>
      </Fieldset.Root>
    </form>
  );
};

export default ProfileEditForm;
