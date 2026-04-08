"use client";
import { toast } from "@/hooks/use-toast";
import { deleteStudentAction } from "@/lib/action/student";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  studentId: string;
};

const DeleteStudent = ({ studentId }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true);
    const { error } = await deleteStudentAction(studentId);
    setIsLoading(false);
    if (error) {
      toast({
        title: "Lỗi",
        description: error,
      });
    } else {
      toast({
        title: "Thành công",
        description: "Xóa thành công",
      });
      router.refresh();
    }
  };
  return (
    <Button onClick={handleDelete}>{isLoading ? "Đang xóa" : "Xóa"}</Button>
  );
};

export default DeleteStudent;
