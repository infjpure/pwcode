import { auth } from "@/auth";
import CreateAssign from "@/components/assign/create-assign";
import AssignmentTable from "@/components/classes/assignment-table";
import StudentTable from "@/components/classes/student-table";
import StudentVerified from "@/components/classes/student-verified";
import CustomTabs from "@/components/custom/custom-tabs";
import ExportForClass from "@/components/excel/export-for-class";
import CopyButton from "@/components/shared/copy-button";
import { TabsContent } from "@/components/ui/tabs";
import { db } from "@/db/drizzle";
import { classTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};
const page = async ({ params }: Props) => {
  const id = (await params).id;
  const session = await auth();
  if (!session) return <h1>Bạn chưa đăng nhập</h1>;
  const classrooms = await db
    .select()
    .from(classTable)
    .where(eq(classTable.id, id));
  const isTeacher = classrooms[0].teacherEmail === session.user?.email;
  const tabs = [
    {
      value: "assign",
      content: "Bài tập",
      show: true,
    },
    {
      value: "student",
      content: "Học sinh",
      show: true,
    },
    {
      value: "create-assign",
      content: "Tạo bài tập",
      show: isTeacher,
    },
    {
      value: "verify-student",
      content: "Xác thực học sinh",
      show: isTeacher,
    },
  ];
  return (
    <div className="p-4">
      <div className="flex flex-col items-center gap-2 mb-4">
        <h1>Lớp: {classrooms[0].name}</h1>
        <div className="flex gap-2 items-center">
          <p>Mã lớp: {classrooms[0].classCode}</p>
          <CopyButton text={classrooms[0].classCode as string} />
        </div>
        {isTeacher && (
          <div>
            <ExportForClass classroom={classrooms[0]} />
          </div>
        )}
      </div>
      {classrooms?.map((classroom) => {
        return (
          <CustomTabs key={classroom.id} tabs={tabs} keyName={`class-${id}`}>
            <TabsContent value="assign" className="w-full">
              <Suspense fallback={<div>Loading...</div>}>
                <AssignmentTable
                  classId={id}
                  teacherEmail={classroom.teacherEmail}
                />
              </Suspense>
            </TabsContent>

            <TabsContent value="student" className="w-full">
              <Suspense fallback={<div>Loading...</div>}>
                <StudentTable classId={id} />
              </Suspense>
            </TabsContent>

            {isTeacher && (
              <>
                <TabsContent value="create-assign" className="w-full">
                  <Suspense fallback={<div>Loading...</div>}>
                    <CreateAssign classId={classroom.id} />
                  </Suspense>
                </TabsContent>

                <TabsContent value="verify-student" className="w-full">
                  <Suspense fallback={<div>Loading...</div>}>
                    <StudentVerified classId={id} />
                  </Suspense>
                </TabsContent>
              </>
            )}
          </CustomTabs>
        );
      })}
    </div>
  );
};

export default page;
