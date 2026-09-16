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
    .min(8, "Password need to be minimum 8 symbols"),
  confirmPassword: z.string(),

}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const signInSchema = z.object({
  email: z.email("Email is not valid"),
  password: z.string().min(1, "Password is required"),
})