import { z } from "zod";

export const signInBodySchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Must be 6 or more characters long" })
    .max(8, { message: "Must be 8 or fewer characters long" }),
});

export type SigninType = z.infer<typeof signInBodySchema>;

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

export type SignupType = z.infer<typeof signUpBodySchema>;

export const verifyCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, "Verification code must be 6 digits."),
});

export type verifyCodeType = z.infer<typeof verifyCodeSchema>;
