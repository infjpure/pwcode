import { z } from "zod";

// define a schema for the notifications
export const guideSchema = z.object({
  html: z
    .string()
    .describe("Code HTML bao gồm hướng dẫn dưới dạng comment từng dòng"),
  css: z
    .string()
    .describe("Code CSS bao gồm hướng dẫn dưới dạng comment từng dòng"),
  javascript: z
    .string()
    .describe("Code JS bao gồm hướng dẫn dưới dạng comment từng dòng"),
});
