import { auth } from "@/auth";
import ReviewStudentCode from "@/components/ai/review-student-code";
import CustomTabs from "@/components/custom/custom-tabs";
import SPCommon from "@/components/sandpack/sp-common";
import ResultSubmit from "@/components/submit/result-submit";
import { TabsContent } from "@/components/ui/tabs";
import { db } from "@/db/drizzle";
import {
  assignmentTable,
  classTable,
  codeTable,
  studentTable,
  submitTable,
} from "@/db/schema";
import { CodeSelect } from "@/lib/types";
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { and, eq } from "drizzle-orm";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const id = (await params).id;
  const session = await auth();
  if (!session) return <h1>Bạn chưa đăng nhập</h1>;
  const email = session.user?.email as string;
  const submits = await db
    .select()
    .from(submitTable)
    .innerJoin(codeTable, eq(submitTable.codeId, codeTable.id))
    .innerJoin(studentTable, and(eq(submitTable.studentId, studentTable.id)))
    .innerJoin(assignmentTable, eq(submitTable.assignId, assignmentTable.id))
    .where(eq(submitTable.id, id));
  const submit = submits[0].submit_table;
  const studentCode = submits[0].code_table;
  const student = submits[0].student_table;
  const classes = await db
    .select()
    .from(classTable)
    .where(eq(classTable.id, student.classId));
  const isTeacher = classes[0].teacherEmail === email;
  if (!isTeacher) return <h1>Bạn không có quyền truy cập</h1>;
  const originalCode = await db
    .select()
    .from(codeTable)
    .where(
      eq(codeTable.id, submits[0].assignment_table.originalCodeId as string)
    );
  console.log(originalCode);
  const tabs = [
    {
      value: "code-submit",
      content: "So sánh code",
      show: true,
    },
    {
      value: "ui",
      content: "Xem giao diện",
      show: true,
    },
    {
      value: "result",
      content: "Chấm kết quả",
      show: true,
    },
  ];
  return (
    <div className="p-4">
      <h6>{student.name}</h6>
      <CustomTabs tabs={tabs} keyName={`submit-${id}`}>
        <TabsContent value="code-submit" className="w-full">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <h6>Code học sinh</h6>
              {studentCode && (
                <SPCommon code={studentCode}>
                  <SandpackLayout>
                    <SandpackCodeEditor
                      showTabs
                      readOnly={true}
                      style={{
                        height: "calc(100vh - 8rem)",
                      }}
                    />
                  </SandpackLayout>
                </SPCommon>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <h6>Code gốc</h6>
              {originalCode.length > 0 ? (
                <SPCommon
                  code={
                    originalCode[0] as Pick<
                      CodeSelect,
                      "html" | "css" | "javascript"
                    >
                  }
                >
                  <SandpackLayout>
                    <SandpackCodeEditor
                      showTabs
                      readOnly={true}
                      style={{
                        height: "calc(100vh - 8rem)",
                      }}
                    />
                  </SandpackLayout>
                </SPCommon>
              ) : (
                <div>Không có code mẫu</div>
              )}
            </div>
          </div>
          <div>
            <ReviewStudentCode
              studentCode={studentCode}
              originalCode={originalCode[0]}
            />
          </div>
        </TabsContent>
        <TabsContent value="ui" className="w-full">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <h6>Code học sinh</h6>
              {studentCode && (
                <SPCommon code={studentCode}>
                  <SandpackLayout>
                    <SandpackPreview
                      style={{
                        height: "calc(100vh - 8rem)",
                      }}
                    />
                  </SandpackLayout>
                </SPCommon>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <h6>Code gốc</h6>
              {originalCode.length > 0 ? (
                <SPCommon
                  code={
                    originalCode[0] as Pick<
                      CodeSelect,
                      "html" | "css" | "javascript"
                    >
                  }
                >
                  <SandpackLayout>
                    <SandpackPreview
                      style={{
                        height: "calc(100vh - 8rem)",
                      }}
                    />
                  </SandpackLayout>
                </SPCommon>
              ) : (
                <div>Không có code mẫu</div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="result" className="w-full">
          <ResultSubmit submit={submit} student={student} />
        </TabsContent>
      </CustomTabs>
    </div>
  );
};

export default page;
