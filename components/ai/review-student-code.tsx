"use client";
import { fileNames } from "@/contants/sandpack";
import {} from "@/lib/prompts/review-code";
import { CodeSelect } from "@/lib/types";
import { useChat } from "ai/react";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type Props = {
  studentCode: CodeSelect;
  originalCode: CodeSelect;
};

const ReviewStudentCode = ({ studentCode, originalCode }: Props) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const { messages, input, setInput, handleInputChange, handleSubmit } =
    useChat();
  const data = `Đây là dự án bạn cần đọc, trả lời yêu cầu người dùng:
  Mã nguồn của học sinh: 
  ${fileNames.html}: ${studentCode.html};
  ${fileNames.css}: ${studentCode.css};
  ${fileNames.javascript}: ${studentCode.javascript}
  
  Mã nguồn của giáo viên:
  ${fileNames.html}: ${originalCode?.html || "Không có code giáo viên"};
  ${fileNames.css}: ${originalCode?.css || "Không có code giáo viên"};
  ${fileNames.javascript}: ${
    originalCode?.javascript || "Không có code giáo viên"
  }`;

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message = "Bạn có chắc chắn muốn rời khỏi trang?"; // Thông báo tùy chỉnh
      event.returnValue = message; // Cập nhật message cho trình duyệt (sự kiện chuẩn)
      return message; // Đảm bảo trình duyệt hiển thị thông báo
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-8rem)] p-4 bg-gray-100">
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 bg-white shadow rounded-lg"
      >
        {messages.map((m) => (
          <div key={m.id}>
            <div className="prose prose-base mx-auto">
              {m.role === "user" ? "Bạn: " : "AI: "}
              <Markdown>{m.content}</Markdown>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          handleSubmit(e, {
            data: data,
          });
        }}
        className="my-4 sticky flex gap-4"
      >
        <Textarea
          value={input}
          placeholder="Giúp gì được bạn"
          onChange={handleInputChange}
        />
        <Button>
          <ArrowUp />
        </Button>
      </form>
      <span
        onClick={() => setInput("So sánh code")}
        className="hover:underline cursor-pointer"
      >
        So sánh 2 đoạn code
      </span>
    </div>
  );
};

export default ReviewStudentCode;
