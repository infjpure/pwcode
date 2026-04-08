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
import { deleteClassesAction } from "@/lib/action/classes";
import { ClassSelect } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Props = {
  classroom: ClassSelect;
};

const DeleteClass = ({ classroom }: Props) => {
  const router = useRouter();
  const handleDelete = async () => {
    const { error } = await deleteClassesAction(classroom.id);
    if (error) {
      return toast({
        title: "Lỗi",
        description: "Đã có lỗi xảy ra, vui lòng thử lại",
      });
    } else {
      toast({
        title: "Thành công",
        description: "Đã xóa lớp học thành công",
      });
      router.refresh();
    }
  };
  return (
    <AlertDialog>
      <Button asChild className="w-fit">
        <AlertDialogTrigger>Xóa</AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Xóa lớp học có tên: {classroom.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này sẽ xóa tất cả bài tập, danh sách học sinh cũng như bài
            nộp mà không thể hoàn tác
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Tiếp tục</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteClass;
