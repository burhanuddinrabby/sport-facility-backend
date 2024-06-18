import { z } from "zod";

const createUserValidation = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    role: z.enum(['user', 'admin']),
    address: z.string()

  })
})
const loginValidation = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email is invalid"
    }).email({
      message: "Email is invalid"
    }),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password is invalid"
    }).min(6, {
      message: "Password must be at least 6 characters"
    }).max(20, {
      message: "Password must be at most 20 characters"
    })
  })
})

export const userValidations = {
  createUserValidation,
  loginValidation
}