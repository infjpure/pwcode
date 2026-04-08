"use client";
import { fileNames } from "@/contants/sandpack";
import { toast } from "@/hooks/use-toast";
import { createSubmitAction } from "@/lib/action/submit";
import { AssignmentSelect, StudentSelect } from "@/lib/types";
import { useSandpack } from "@codesandbox/sandpack-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  student: StudentSelect;
  assign: AssignmentSelect;
};

const CreateSubmit = ({ student, assign }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const handleCreate = async () => {
    setIsLoading(true);
    const { error } = await createSubmitAction(
      {
        studentId: student.id,
        assignId: assign.id,
      },
      {
        html: files[fileNames.html].code,
        css: files[fileNames.css].code,
        javascript: files[fileNames.javascript].code,
      }
    );
    setIsLoading(false);
    if (error) {
      toast({
        title: "Lỗi",
        description: error,
      });
    } else {
      toast({
        title: "Nộp bài thành công",
        description: "Bài của bạn đã được gửi",
      });
      localStorage.removeItem(assign.id);
      router.refresh();
    }
  };
  return (
    <Button onClick={handleCreate} className="my-4 float-end">
      {isLoading ? "Đang nộp..." : "Nộp"}
    </Button>
  );
};

export default CreateSubmit;
