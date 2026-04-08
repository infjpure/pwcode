"use client";
import SPProject from "@/components/sandpack/sp-project";
import { fileNames } from "@/contants/sandpack";
import { CodeSelect } from "@/lib/types";
import { useChat } from "ai/react";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import CustomTabs from "../custom/custom-tabs";
import { Button } from "../ui/button";
import { TabsContent } from "../ui/tabs";
import { Textarea } from "../ui/textarea";

type Props = {
  id: string;
  isRecode: boolean;
  code: CodeSelect;
  originalCode?: CodeSelect;
};

const ProjectDetail = ({ id, isRecode, code, originalCode }: Props) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const data = `Đây là dự án bạn cần đọc, trả lời yêu cầu người dùng
  ${fileNames.html}: ${originalCode?.html}
  ${fileNames.css}: ${originalCode?.css}
  ${fileNames.javascript}: ${originalCode?.javascript}`;
  const { messages, input, handleInputChange, handleSubmit } = useChat();
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
  const tabs = [
    {
      value: "my-project",
      content: "Code hiện tại",
      show: true,
    },
    {
      value: "chat",
      content: "Chat",
      show: isRecode,
    },
    {
      value: "original-code",
      content: "Code gốc",
      show: isRecode,
    },
  ];
  return (
    <CustomTabs tabs={tabs} keyName={id}>
      <TabsContent value="my-project" className="w-full">
        <SPProject code={code} type="my-code" />
      </TabsContent>
      {isRecode && (
        <>
          <TabsContent value="chat" className="w-full">
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
                  placeholder="Bạn muốn biết gì về dự án"
                  onChange={handleInputChange}
                />
                <Button>
                  <ArrowUp />
                </Button>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="original-code" className="w-full">
            <h1 className="my-2">
              Mọi thay đổi trong code gốc sẽ không được lưu, chỉ có tab Code
              hiện tại mới được lưu
            </h1>
            <SPProject code={originalCode as CodeSelect} type="original" />
          </TabsContent>
        </>
      )}
    </CustomTabs>
  );
};

export default ProjectDetail;
