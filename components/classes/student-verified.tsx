import { TableRow } from "@/components/ui/table";
import { db } from "@/db/drizzle";
import { studentTable } from "@/db/schema";
import { formatTime } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import CustomTable, { CustomTableCell } from "../custom/custom-table";
import RefreshButton from "../shared/refresh-button";
import DeleteStudent from "../student/delete-student";
import VerifiedStudentButton from "../student/verified-student-button";
import VerifiedStudentOnClass from "../student/verified-students-on-class";

type Props = {
  classId: string;
};

const StudentVerified = async ({ classId }: Props) => {
  const students = await db
    .select()
    .from(studentTable)
    .where(
      and(eq(studentTable.classId, classId), eq(studentTable.verified, false))
    );
  const tableHeadNames = [
    {
      name: "Tên",
      show: true,
    },
    {
      name: "Tham gia lúc",
      show: true,
    },
    {
      name: "Thao tác",
      show: true,
    },
  ];
  return (
    <div>
      <h1 className="my-4 text-xl font-bold text-center">
        DANH SÁCH HỌC SINH CHỜ DUYỆT
      </h1>
      <div className="flex items-center justify-end">
        <div className="flex gap-2">
          <VerifiedStudentOnClass
            classId={classId}
            studentCount={students.length}
          />
          <RefreshButton />
        </div>
      </div>
      <CustomTable tableHeadNames={tableHeadNames} caption="Danh sách học sinh">
        {students.map((student) => {
          return (
            <TableRow key={student.id}>
              <CustomTableCell>{student.name}</CustomTableCell>
              <CustomTableCell>{formatTime(student.createdAt)}</CustomTableCell>
              <CustomTableCell>
                <div className="flex items-center gap-2">
                  <DeleteStudent studentId={student.id} />
                  <VerifiedStudentButton studentId={student.id} />
                </div>
              </CustomTableCell>
            </TableRow>
          );
        })}
      </CustomTable>
    </div>
  );
};

export default StudentVerified;
