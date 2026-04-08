"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { recodeProjectAction } from "@/lib/action/project";
import { CodeErrorToMessage, CodeSelect, ProjectSelect } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { ToastAction } from "../ui/toast";

type Props = {
  code: CodeSelect;
  project: ProjectSelect;
};

const ReCodeButton = ({ code, project }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleRecode = async () => {
    setIsLoading(true);
    const { error, data } = await recodeProjectAction(code);
    setIsLoading(false);
    if (error) {
      toast({
        title: "Lỗi",
        description: CodeErrorToMessage[error] || "Đã có lỗi xảy ra",
      });
    } else if (data) {
      toast({
        title: "Thành công",
        description: "Đã tạo dự án viết lại",
        action: (
          <ToastAction
            onClick={() => router.push(`/projects/${data[0].id}`)}
            altText="Go to Project"
          >
            Tiếp tục
          </ToastAction>
        ),
      });
      setOpen(false);
      router.refresh();
    } else {
      console.log("error");
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button asChild>
          <DialogTrigger>Viết lại</DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Viết lại dự án</DialogTitle>
            <DialogDescription>
              Mô tả dự án: {project.description}
            </DialogDescription>
          </DialogHeader>
          <Button disabled={isLoading} onClick={handleRecode}>
            Xác nhận viết lại
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReCodeButton;
