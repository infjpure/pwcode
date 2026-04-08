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
import { deleteProjectAction } from "@/lib/action/project";
import { ProjectSelect } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Props = {
  project: ProjectSelect;
};

const DeleteProject = ({ project }: Props) => {
  const router = useRouter();
  const handle = async () => {
    const { error } = await deleteProjectAction(project.id);
    if (error) {
      toast({
        title: "Lỗi",
        description: error,
      });
    } else {
      toast({
        title: "Thành công",
        description: "Xóa dự án thành công",
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
          <AlertDialogTitle>Xóa dự án {project.name}</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa dự án này?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handle}>Tiếp tục</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProject;
