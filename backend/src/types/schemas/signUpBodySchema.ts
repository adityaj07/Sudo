import { z } from "zod";

export const signUpBodySchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be 6 or more characters long" })
    .max(8, { message: "Password must be 8 or fewer characters long" }),
});
