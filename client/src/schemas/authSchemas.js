import { z } from 'zod'

export const signUpSchema = z.object({

  email: z.email("Email is not valid"),

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

export const completeProfileSchema = z.object({

  firstName: z.string()
    .min(4, "At least 4 symbols")
    .max(32, "Maximum of 32 characters"),

  lastName: z.string()
    .min(4, "At least 4 symbols")
    .max(32, "Maximum of 32 characters"),

  username: z.string()
    .min(4, "At least 4 symbols")
    .max(32, "Maximum of 32 characters"),

  phone: z.e164()
})