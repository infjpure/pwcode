import { mistralModel } from "@/lib/ai/models";
import { systemPromptForGuide, userPromptForGuide } from "@/lib/prompts/guide";
import { guideSchema } from "@/lib/schemas/guide-schema";
import { streamObject } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const runtime = "edge";

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: mistralModel,
    schema: guideSchema,
    system: systemPromptForGuide,
    prompt: userPromptForGuide(context),
  });

  return result.toTextStreamResponse();
}
