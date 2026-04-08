"use client";
import { fileNames } from "@/contants/sandpack";
import { toast } from "@/hooks/use-toast";
import { updateCodeOriginalAssignAction } from "@/lib/action/assign";
import { AssignmentSelect } from "@/lib/types";
import { useSandpack } from "@codesandbox/sandpack-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  assignId: AssignmentSelect["id"];
  onSubmit?: () => void;
};

const CreateCodeOriginal = ({ assignId, onSubmit }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const handle = async () => {
    setIsLoading(true);
    const { error } = await updateCodeOriginalAssignAction(assignId, {
      html: files[fileNames.html].code,
      css: files[fileNames.css].code,
      javascript: files[fileNames.javascript].code,
    });
    setIsLoading(false);
    if (error) {
      toast({
        title: "Lỗi",
        description: error,
      });
    } else {
      toast({
        title: "Thành công",
        description: "Hoàn tất cập nhật bài tập",
      });
      localStorage.removeItem(assignId);
      router.refresh();
      setTimeout(() => onSubmit && onSubmit(), 3000);
    }
  };
  return (
    <div className="flex justify-end my-2">
      <Button onClick={handle}>
        {isLoading ? "Đang cập nhật..." : "Cập nhật"}
      </Button>
    </div>
  );
};

export default CreateCodeOriginal;
