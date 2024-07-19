import { z } from "zod";

export const UpdateBlogSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be greater than 3 characters.")
    .max(256, "Title must be lesser than 256 characters."),
  content: z.any(),
  published: z.boolean().default(false),
});
