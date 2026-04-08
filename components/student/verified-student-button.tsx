"use client";

import { toast } from "@/hooks/use-toast";
import { verifyOneStudentAction } from "@/lib/action/student";
import { StudentSelect } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  studentId: StudentSelect["id"];
};

const VerifiedStudentButton = ({ studentId }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleVerify = async () => {
    setIsLoading(true);
    const { error } = await verifyOneStudentAction(studentId);
    setIsLoading(false);
    if (error) {
      toast({
        title: "Lỗi",
        description: error,
      });
    } else {
      toast({
        title: "Thành công",
        description: "Xác nhận thành công",
      });
      router.refresh();
    }
  };
  return (
    <Button onClick={handleVerify} disabled={isLoading}>
      {isLoading ? "Đang xác nhận" : "Xác nhận"}
    </Button>
  );
};

export default VerifiedStudentButton;
