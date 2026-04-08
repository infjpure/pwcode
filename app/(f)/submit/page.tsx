import { auth } from "@/auth";
import CustomTable, { CustomTableCell } from "@/components/custom/custom-table";
import { SelectClass } from "@/components/submit/select-class";
import { TableRow } from "@/components/ui/table";
import { db } from "@/db/drizzle";
import {
  assignmentTable,
  classTable,
  studentTable,
  submitTable,
} from "@/db/schema";
import { AssignmentSelect, StudentSelect, SubmitSelect } from "@/lib/types";
import { formatName } from "@/lib/utils";
import { and, desc, eq } from "drizzle-orm";
import Link from "next/link";
type Props = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
};

const page = async (props: Props) => {
  const session = await auth();
  if (!session)
    return (
      <div className="flex justify-center items-center h-96">
        <h1>Bạn chưa đăng nhập</h1>
      </div>
    );
  const email = session.user?.email as string;
  const classes = await db
    .select()
    .from(classTable)
    .innerJoin(
      studentTable,
      and(
        eq(studentTable.userEmail, email),
        eq(studentTable.classId, classTable.id)
      )
    );
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  let submits: Array<{
    submit_table: SubmitSelect;
    assignment_table: AssignmentSelect;
  }> = [];
  let student: Array<StudentSelect> = [];
  if (query === "") {
    submits = await db
      .select({
        submit_table: submitTable,
        assignment_table: assignmentTable,
      })
      .from(submitTable)
      .innerJoin(assignmentTable, eq(assignmentTable.id, submitTable.assignId))
      .innerJoin(
        studentTable,
        and(
          eq(studentTable.id, submitTable.studentId),
          eq(studentTable.userEmail, email)
        )
      )
      .orderBy(desc(submitTable.updatedAt));
  } else {
    student = await db
      .select()
      .from(studentTable)
      .where(
        and(eq(studentTable.userEmail, email), eq(studentTable.classId, query))
      )
      .orderBy(desc(studentTable.createdAt));
    if (student.length === 0)
      return <h1 className="my-4">Bạn chưa là học sinh của lớp này</h1>;
    submits = await db
      .select()
      .from(submitTable)
      .innerJoin(
        assignmentTable,
        and(
          eq(assignmentTable.id, submitTable.assignId),
          eq(assignmentTable.classId, query)
        )
      )
      .where(eq(submitTable.studentId, student[0].id as string))
      .orderBy(desc(submitTable.updatedAt));
  }
  const tableHeads = [
    {
      name: "Thời gian nộp",
      show: true,
    },
    {
      name: "Bài tập",
      show: true,
    },
    {
      name: "Đã chấm",

      show: true,
    },
    {
      name: "Phản hồi",
      show: true,
    },
    {
      name: "Điểm",
      show: true,
    },
  ];
  return (
    <div className="p-4 w-full">
      <SelectClass classes={classes.map((c) => c.class_table)} />
      <div>
        {submits.length > 0 ? (
          <CustomTable tableHeadNames={tableHeads} caption="Danh sách bài nộp">
            {submits.map((submit) => {
              const submit_table = submit.submit_table;
              const assignment_table = submit.assignment_table;
              return (
                <TableRow key={submit.submit_table.id}>
                  <CustomTableCell>
                    {submit_table.updatedAt.toLocaleString()}
                  </CustomTableCell>
                  <CustomTableCell>
                    <Link
                      href={`/assign/${assignment_table.id}`}
                      className="hover:underline"
                    >
                      {formatName(assignment_table.name, 20)}
                    </Link>
                  </CustomTableCell>
                  <CustomTableCell>
                    {submit_table.rated ? "Đã chấm" : "Chưa"}
                  </CustomTableCell>
                  <CustomTableCell>
                    {submit_table.feedback || "Chưa có phản hồi"}
                  </CustomTableCell>
                  <CustomTableCell>{submit_table.point}</CustomTableCell>
                </TableRow>
              );
            })}
          </CustomTable>
        ) : (
          <div className="flex justify-center items-center">
            <h1>Không có dữ liệu</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
