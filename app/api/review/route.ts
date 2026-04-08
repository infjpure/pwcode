import { mistralModel } from "@/lib/ai/models";
import {
  systemReviewCodePrompt,
  userReviewCodePrompt,
} from "@/lib/prompts/review-code";
import { reviewSchema } from "@/lib/schemas/review-code";
import { generateObject } from "ai";

export const maxDuration = 30;

export const runtime = "edge";

export async function POST(req: Request) {
  const context = await req.json();

  const result = await generateObject({
    model: mistralModel,
    schema: reviewSchema,
    system: systemReviewCodePrompt,
    prompt: userReviewCodePrompt({
      html: context.html,
      css: context.css,
      javascript: context.javascript,
    }),
  });

  return result.toJsonResponse();
}
