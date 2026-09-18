import { z } from 'zod'
import { isValidPhoneNumber } from 'react-phone-number-input'

const emailSchema = z.string()
  .check(z.minLength(1, "Email is required"))
  .pipe(z.email("Please enter a valid email"))

const phoneSchema = z.string()
  .check(z.minLength(1, "Phone number is required"))
  .pipe(z.string().refine((value) => isValidPhoneNumber(value), "Please enter a valid phone number"))

export const signUpSchema = z.object({

  email: emailSchema,

  password: z.string()
    .min(1, "Password is required")
    .min(8, "Password need to be minimum 8 symbols")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string().min(1, "Please confirm your password"),

}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
})

export const completeProfileSchema = z.object({

  firstName: z.string()
    .min(1, "First name is required")
    .min(4, "At least 4 symbols")
    .max(32, "Maximum of 32 characters"),

  lastName: z.string()
    .min(1, "Last name is required")
    .min(4, "At least 4 symbols")
    .max(32, "Maximum of 32 characters"),

  username: z.string()
    .min(1, "Username is required")
    .min(4, "At least 4 symbols")
    .max(32, "Maximum of 32 characters"),

  phone: phoneSchema,
})
