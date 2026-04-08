import { mistralModel } from "@/lib/ai/models";
import { streamText } from "ai";

export const maxDuration = 30;

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, data } = await req.json();
  const initialMessages = messages.slice(0, -1);
  const currentMessage = messages[messages.length - 1];

  const result = streamText({
    model: mistralModel,
    system:
      "Bạn là một chuyên gia lập trình web. Nhiệm vụ của bạn là đọc code do người dùng cung cấp. Sau đó, trả lời câu hỏi của người dùng và giúp họ hoàn thiện dự án của mình.",
    messages: [
      ...initialMessages,
      {
        role: "user",
        content: [
          { type: "text", text: currentMessage.content },
          { type: "text", text: data },
        ],
      },
    ],
  });

  return result.toDataStreamResponse();
}
