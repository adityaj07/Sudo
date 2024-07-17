import { z } from "zod";

export const signInBodySchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Must be 6 or more characters long" })
    .max(8, { message: "Must be 8 or fewer characters long" }),
});
