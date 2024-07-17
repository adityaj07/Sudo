import { z } from "zod";

export const verifyCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, "Verification code must be 6 digits."),
});
