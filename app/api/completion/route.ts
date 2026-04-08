import { systemPromptForCompletion } from "@/lib/prompts/completion";
import { mistral } from "@ai-sdk/mistral";
import { streamText } from "ai";

export const maxDuration = 30;

export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = streamText({
    model: mistral("mistral-large-latest"),
    system: systemPromptForCompletion,
    prompt: prompt,
  });

  return result.toDataStreamResponse();
}
