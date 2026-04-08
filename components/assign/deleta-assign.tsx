"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { deleteAssignAction } from "@/lib/action/assign";
import { AssignmentSelect } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Props = {
  assign: AssignmentSelect;
};

const DeleteAssign = ({ assign }: Props) => {
  const router = useRouter();
  const handle = async () => {
    const { error } = await deleteAssignAction(assign.id);
    if (error) {
      toast({
        title: "Lỗi",
        description: error,
      });
    } else {
      toast({
        title: "Thành công",
        description: "Xóa bài tập thành công",
      });
      router.refresh();
    }
  };
  return (
    <AlertDialog>
      <Button asChild>
        <AlertDialogTrigger>Xóa</AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc sẽ xóa Bài tập {assign.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Bạn không thể hoàn tác hành động này. Nội dung xóa bao gồm cả các
            bài nộp của bài tậptập.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handle}>Tiếp tụctục</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAssign;
