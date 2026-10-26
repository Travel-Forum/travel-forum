import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, Input, Stack, Text } from "@chakra-ui/react";
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
      phone: profile?.phone ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Same two-column grid and field order as the read-only view in Profile */}
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={5}>
        <FormField label="First Name" error={errors.firstName}>
          <Input {...register("firstName")} />
        </FormField>

        <FormField label="Last Name" error={errors.lastName}>
          <Input {...register("lastName")} />
        </FormField>

        <FormField label="Username">
          <Text>{profile?.username || "-"}</Text>
        </FormField>

        <FormField label="Email">
          <Text>{profile?.email || "-"}</Text>
        </FormField>

        <FormField label="Phone" error={errors.phone}>
          <Input {...register("phone")} />
        </FormField>
      </Grid>

      <Stack direction={{ base: "column", sm: "row" }} gap="3" mt={6}>
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </Stack>
    </form>
  );
};

export default ProfileEditForm;
