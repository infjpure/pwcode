import { auth } from "@/auth";
import { TableRow } from "@/components/ui/table";
import { db } from "@/db/drizzle";
import { assignmentTable, studentTable, submitTable } from "@/db/schema";
import { formatName, formatTime, isDueDate } from "@/lib/utils";
import { and, desc, eq } from "drizzle-orm";
import Link from "next/link";
import DeleteAssign from "../assign/deleta-assign";
import CustomTable, { CustomTableCell } from "../custom/custom-table";

type Props = {
  classId: string;
  teacherEmail: string;
};

const AssignmentTable = async ({ classId, teacherEmail }: Props) => {
  const session = await auth();
  if (!session) return <h1>Bạn chưa đăng nhập</h1>;
  const email = session.user?.email as string;
  const isTeacher = teacherEmail === email;
  if (isTeacher) {
    const ass = await db
      .select()
      .from(assignmentTable)
      .where(
        and(
          eq(assignmentTable.classId, classId)
          // gte(assignmentTable.dueDate, new Date())
        )
      )
      .orderBy(desc(assignmentTable.updatedAt));
    const tableHeadNames = [
      {
        name: "Tên bài tập",
        show: true,
      },
      {
        name: "Trạng thái",
        show: true,
      },
      {
        name: "Cập nhật lúc",
        show: true,
      },
      {
        name: "Thao tác",
        show: true,
      },
    ];
    return (
      <CustomTable
        tableHeadNames={tableHeadNames}
        caption="Danh sách bài tập đã tạo"
      >
        {ass.map((assignment, index) => {
          const ass = assignment;
          const isDue = isDueDate(ass.dueDate);
          return (
            <TableRow
              key={index}
              className={`${isDue ? "row-due" : "font-bold"}`}
            >
              <CustomTableCell>
                <Link href={`/assign/${ass.id}`} className="hover:underline">
                  {formatName(ass.name, 20)}
                </Link>
              </CustomTableCell>
              <CustomTableCell>{isDue ? "Hết hạn" : "Còn hạn"}</CustomTableCell>
              <CustomTableCell>{formatTime(ass.updatedAt)}</CustomTableCell>
              <CustomTableCell>
                <DeleteAssign assign={ass} />
              </CustomTableCell>
            </TableRow>
          );
        })}
      </CustomTable>
    );
  }
  const student = await db
    .select()
    .from(studentTable)
    .where(
      and(
        eq(studentTable.userEmail, email),
        eq(studentTable.classId, classId),
        eq(studentTable.verified, true)
      )
    );
  if (student.length === 0)
    return <h1>Bạn không phải là học sinh của lớp này</h1>;
  const assignments = await db
    .select()
    .from(assignmentTable)
    .where(eq(assignmentTable.classId, classId))
    .leftJoin(
      submitTable,
      and(
        eq(submitTable.assignId, assignmentTable.id),
        eq(submitTable.studentId, student[0].id)
      )
    )
    .orderBy(desc(assignmentTable.updatedAt));
  const tableHeadNames = [
    {
      name: "Tên bài tập",
      show: true,
    },
    {
      name: "Mô tả",
      show: true,
    },
    {
      name: "Hạn nộp bài",
      show: true,
    },
    {
      name: "Ngày tạo",
      show: true,
    },
    {
      name: "Trạng thái",
      show: true,
    },
  ];
  return (
    <CustomTable tableHeadNames={tableHeadNames} caption="Danh sách bài tập">
      {assignments.map((assignment, index) => {
        const ass = assignment.assignment_table;
        const submit = assignment.submit_table;
        const isDue = isDueDate(ass.dueDate);
        return (
          <TableRow
            key={index}
            className={`${isDue ? "row-due" : "font-bold"}`}
          >
            <CustomTableCell>
              <Link href={`/assign/${ass.id}`} className="hover:underline">
                {formatName(ass.name, 20)}
              </Link>
            </CustomTableCell>
            <CustomTableCell>
              {formatName(ass.description as string, 30)}
            </CustomTableCell>
            <CustomTableCell>{isDue ? "Hết hạn" : "Còn hạn"}</CustomTableCell>
            <CustomTableCell>{ass.createdAt.toLocaleString()}</CustomTableCell>
            <CustomTableCell>{submit ? "Đã nộp" : "Chưa nộp"}</CustomTableCell>
          </TableRow>
        );
      })}
    </CustomTable>
  );
};

export default AssignmentTable;
