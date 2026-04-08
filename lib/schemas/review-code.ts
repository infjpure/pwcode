import { z } from "zod";

// define a schema for the notifications
export const reviewSchema = z.object({
  html: z.string().describe("Code HTML đã được đánh giá bằng comment"),
  css: z.string().describe("Code CSS đã được đánh giá bằng comment"),
  javascript: z
    .string()
    .describe("Code Javascript đã được đánh giá bằng comment"),
});
