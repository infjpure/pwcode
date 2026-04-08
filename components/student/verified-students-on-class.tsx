"use client";

import { toast } from "@/hooks/use-toast";
import { verifyStudentAction } from "@/lib/action/student";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  classId: string;
  studentCount: number;
};

const VerifiedStudentOnClass = ({ classId, studentCount }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleVerify = async () => {
    setIsLoading(true);
    const { error } = await verifyStudentAction(classId);
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
    <Button onClick={handleVerify} disabled={isLoading || studentCount === 0}>
      {isLoading ? "Đang xác nhận" : "Xác nhận toàn bộ"}
    </Button>
  );
};

export default VerifiedStudentOnClass;
