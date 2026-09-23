import { Field, HStack, Text } from "@chakra-ui/react";

export const FormField = ({ label, error, helperText, labelAction, children }) => (
  <Field.Root invalid={!!error}>
    {labelAction ? (
      <HStack justify="space-between" w="full">
        <Field.Label>{label}</Field.Label>
        {labelAction}
      </HStack>
    ) : (
      <Field.Label>{label}</Field.Label>
    )}

    {children}

    {helperText && <Field.HelperText>{helperText}</Field.HelperText>}

    {error && (
      <Text color="fg.error" fontSize="sm">
        {error.message}
      </Text>
    )}
  </Field.Root>
);
