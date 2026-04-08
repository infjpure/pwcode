import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { studentTable } from "@/db/schema";
import { AssignmentSelect } from "@/lib/types";
import { and, eq } from "drizzle-orm";
import SPPublicEditor from "../sandpack/sp-editor-public";
import CreateSubmit from "../submit/create-submit";

type Props = {
  assign: AssignmentSelect;
  isDue: boolean;
};

const SPAssign = async ({ assign, isDue }: Props) => {
  const session = await auth();
  if (!session) return <h1>Bạn chưa đăng nhập</h1>;
  const email = session?.user?.email as string;
  const student = await db
    .select()
    .from(studentTable)
    .where(
      and(
        eq(studentTable.userEmail, email),
        eq(studentTable.classId, assign.classId as string)
      )
    );
  if (student.length === 0) return <h1>Bạn không phải học sinh của lớp</h1>;
  return (
    <SPPublicEditor localFileName={assign.id}>
      {!isDue && <CreateSubmit student={student[0]} assign={assign} />}
    </SPPublicEditor>
  );
};

export default SPAssign;
