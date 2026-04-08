"use client";

import { fileNames } from "@/contants/sandpack";
import { CodeSelect } from "@/lib/types";
import { SandpackLayout } from "@codesandbox/sandpack-react";
import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { MonacoEditor } from "../monaco/MonacoEditor";
import SPCommon from "../sandpack/sp-common";
import { Input } from "../ui/input";

type Props = {
  originalCode: CodeSelect;
};

export const maxDuration = 30;

const OriginalProject = ({ originalCode }: Props) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const data = `Đây là dự án bạn cần đọc, trả lời yêu cầu người dùng
  ${fileNames.html}: ${originalCode.html}
  ${fileNames.css}: ${originalCode.css}
  ${fileNames.javascript}: ${originalCode.javascript}`;
  return (
    <div className="w-full">
      <h1 className="my-4 text-lg font-bold">
        Thông tin của dự án bạn đang viết lại
      </h1>
      <div className="flex gap-4">
        <div className="w-1/2">
          <SPCommon code={originalCode as CodeSelect}>
            <SandpackLayout>
              <MonacoEditor />
            </SandpackLayout>
          </SPCommon>
        </div>
        <div className="h-[100vh] overflow-auto w-1/2">
          <div className="flex flex-col gap-2 overflow-auto mb-8">
            {messages.map((m) => (
              <div key={m.id}>
                {m.role === "user" ? "User: " : "AI: "}
                <Markdown>{m.content}</Markdown>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e, {
                data: data,
              });
            }}
            className="sticky bottom-0 w-full p-2"
          >
            <Input
              value={input}
              placeholder="Bạn muốn biết gì về dự án"
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default OriginalProject;
