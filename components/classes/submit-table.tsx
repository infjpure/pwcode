import { TableRow } from "@/components/ui/table";
import { db } from "@/db/drizzle";
import { studentTable, submitTable } from "@/db/schema";
import { SubmitSelect } from "@/lib/types";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import CustomTable, { CustomTableCell } from "../custom/custom-table";

type Props = {
  assignId?: SubmitSelect["assignId"];
  studentId?: SubmitSelect["studentId"];
};

const SubmitTable = async ({ assignId }: Props) => {
  const submits = await db
    .select()
    .from(submitTable)
    .innerJoin(studentTable, eq(submitTable.studentId, studentTable.id))
    .where(eq(submitTable.assignId, assignId as string))
    .orderBy(desc(submitTable.createdAt));
  const tableHeadNames = [
    { name: "Thời gian nộp", show: true },
    { name: "Phản hồi", show: true },
    { name: "Tên học sinh", show: true },
  ];
  return (
    <CustomTable tableHeadNames={tableHeadNames} caption="Danh sách bài nộp">
      {submits.map((submit) => {
        return (
          <TableRow key={submit.submit_table.id}>
            <CustomTableCell>
              <Link
                href={`/submit/${submit.submit_table.id}`}
                className="hover:underline"
              >
                {submit.submit_table.createdAt.toLocaleString()}
              </Link>
            </CustomTableCell>
            <CustomTableCell>{submit.submit_table.feedback}</CustomTableCell>
            <CustomTableCell>{submit.student_table.name}</CustomTableCell>
          </TableRow>
        );
      })}
    </CustomTable>
  );
};

export default SubmitTable;
