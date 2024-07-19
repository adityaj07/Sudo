import { z } from "zod";

export const QuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z.enum(["publishedAt", "title"]).default("publishedAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
  author: z.string().optional(),
});
