import { z } from "zod";

export const signInBodySchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Must be 6 or more characters long" })
    .max(8, { message: "Must be 8 or fewer characters long" }),
});

export const signUpBodySchema = z.object({
  name: z.string({message: "Name is required"}),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be 6 or more characters long" })
    .max(8, { message: "Password must be 8 or fewer characters long" }),
});

export const verifyCodeSchema = z.object({
  userId: z.string(),
  code: z.string().length(6, "Verification code must be 6 digits."),
});

export const CreateBlogSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be greater than 3 characters.")
    .max(256, "Title must be lesser than 256 characters."),
  content: z.any(),
  published: z.boolean().default(false),
});

export const UpdateBlogSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be greater than 3 characters.")
    .max(256, "Title must be lesser than 256 characters."),
  content: z.any(),
  published: z.boolean().default(false),
});

export const QuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z.enum(["publishedAt", "title"]).default("publishedAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
  author: z.string().optional(),
});

export type SigninType = z.infer<typeof signInBodySchema>;
export type SignupType = z.infer<typeof signUpBodySchema>;
export type verifyCodeType = z.infer<typeof verifyCodeSchema>;

export type CreateBlogType = z.infer<typeof CreateBlogSchema>;
export type UpdateBlogType = z.infer<typeof UpdateBlogSchema>;
export type QueryType = z.infer<typeof QuerySchema>;
