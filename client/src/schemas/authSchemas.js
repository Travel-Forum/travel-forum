import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

const emailSchema = z
  .string()
  .check(z.minLength(1, "Email is required"))
  .pipe(z.email("Please enter a valid email"));

const phoneSchema = z
  .string()
  .check(z.minLength(1, "Phone number is required"))
  .pipe(
    z
      .string()
      .refine(
        (value) => isValidPhoneNumber(value),
        "Please enter a valid phone number",
      ),
  );

const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password need to be minimum 8 symbols")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character",
  );

const confirmPasswordSchema = z.string().min(1, "Please confirm your password");

const passwordsMatch = (data) => data.password === data.confirmPassword;

const passwordsMismatchError = {
  message: "Passwords do not match",
  path: ["confirmPassword"],
};

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine(passwordsMatch, passwordsMismatchError);

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine(passwordsMatch, passwordsMismatchError);

// First name, last name and username share the same 4–32 rule
// (mirrors the CHECK constraints on the profiles table).
const nameSchema = (label) =>
  z
    .string()
    .min(1, `${label} is required`)
    .min(4, "At least 4 symbols")
    .max(32, "Maximum of 32 characters");

export const profileEditSchema = z.object({
  firstName: nameSchema("First name"),
  lastName: nameSchema("Last name"),
  phone: phoneSchema,
});

export const completeProfileSchema = profileEditSchema.extend({
  username: nameSchema("Username"),
});
