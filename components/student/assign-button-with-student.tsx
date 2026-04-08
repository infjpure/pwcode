"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { getAssignsFromStudentIdAction } from "@/lib/action/assign";
import {
  AssignmentSelect,
  ClassSelect,
  StudentSelect,
  SubmitSelect,
} from "@/lib/types";
import { isDueDate } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type Props = {
  classroom: ClassSelect;
  student: StudentSelect;
};

const AssignButtonWithStudent = ({ classroom, student }: Props) => {
  const [assigns, setAssigns] = useState<
    | Array<{
        submit_table: SubmitSelect;
        assignment_table: AssignmentSelect;
      }>
    | undefined
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getAssignsFromStudentIdAction(
        student.id,
        classroom.id
      );
      if (error) {
        toast({
          title: "Lỗi",
          description: error,
        });
      } else {
        setAssigns(data);
      }
    };
    fetchData();
  }, [classroom.id, student.id]);
  return (
    <Dialog>
      <Button asChild>
        <DialogTrigger>Xem bài làm</DialogTrigger>
      </Button>
      <DialogContent className="h-[calc(100vh-8rem)]">
        <DialogHeader>
          <DialogTitle>{student.name}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bài tập</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Điểm</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-scroll">
            {assigns?.map((assign) => {
              const submit = assign.submit_table;
              const assignment = assign.assignment_table;
              const isdue = isDueDate(assignment.dueDate);
              return (
                <TableRow
                  key={assignment.id}
                  className={isdue ? "row-due" : ""}
                >
                  <TableCell>
                    <Link
                      href={`/submit/${submit.id}`}
                      target="_blank"
                      className="hover:underline"
                    >
                      {assignment.name}
                    </Link>
                  </TableCell>
                  <TableCell
                    className={
                      submit.rated ? "text-green-500" : "text-yellow-500"
                    }
                  >
                    {submit.rated ? "Đã chấm" : "Chưa chấm"}
                  </TableCell>
                  <TableCell>{submit.point}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default AssignButtonWithStudent;
