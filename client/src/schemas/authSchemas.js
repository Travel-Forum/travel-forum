import { z } from 'zod'

export const signUpSchema = z.object({

  firstName: z.string()
    .min(4, "Minimum 4 symbols")
    .max(32, "Maximum 32 symbols"),

  lastName: z.string()
    .min(4, "Minimum 4 symbols")
    .max(32, "Maximum 32 symbols"),

  username: z.string()
    .min(4, "Minimum 4 symbols")
    .max(32, "Maximum 32 symbols"),

  email: z.email("Email is not valid"),

  phone: z.e164("Invalid phone number format"),

  password: z.string()
    .min(8, "Password need to be minimum 8 symbols")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),

}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const signInSchema = z.object({
  email: z.email("Email is not valid"),
  password: z.string().min(1, "Password is required"),
})