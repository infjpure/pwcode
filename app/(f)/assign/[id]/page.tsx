import { auth } from "@/auth";
import CreateCodeOriginal from "@/components/assign/create-code-original";
import EditAssign from "@/components/assign/edit-assign";
import InfoAssign from "@/components/assign/info-assign";
import SPAssign from "@/components/assign/sp-assign";
import SubmitTable from "@/components/classes/submit-table";
import CustomTabs from "@/components/custom/custom-tabs";
import { MonacoEditor } from "@/components/monaco/MonacoEditor";
import SPCommon from "@/components/sandpack/sp-common";
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
import { isDueDate } from "@/lib/utils";
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { and, eq } from "drizzle-orm";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};
const page = async ({ params }: Props) => {
  const id = (await params).id;
  const session = await auth();
  if (!session) return <h1>Bạn chưa đăng nhập</h1>;
  const email = session.user?.email as string;
  const assigns = await db
    .select()
    .from(assignmentTable)
    .innerJoin(classTable, eq(assignmentTable.classId, classTable.id))
    .leftJoin(codeTable, eq(assignmentTable.originalCodeId, codeTable.id))
    .where(eq(assignmentTable.id, id));
  if (assigns.length === 0) return <h1>Không tìm thấy bài tập</h1>;
  const submit = await db
    .select()
    .from(submitTable)
    .innerJoin(
      studentTable,
      and(
        eq(submitTable.studentId, studentTable.id),
        eq(studentTable.userEmail, email),
        eq(submitTable.assignId, assigns[0].assignment_table.id)
      )
    )
    .leftJoin(codeTable, eq(submitTable.codeId, codeTable.id));
  const tabs = [
    {
      value: "info",
      content: "Nội dung bài tập",
      show: true,
    },
    {
      value: "submit",
      content: "Bài làm",
      show: true,
    },
    {
      value: "code-example",
      content: "Code ví dụ",
      show: assigns[0].class_table.teacherEmail === email,
    },
  ];
  return (
    <div className="px-4 mb-16">
      {assigns.map((assign) => {
        const ass = assign.assignment_table;
        const classes = assign.class_table;
        const originalCode = assign.code_table;
        const isTeacher = classes.teacherEmail === email;
        const isDue = isDueDate(ass.dueDate);
        return (
          <CustomTabs tabs={tabs} key={ass.id} keyName={`assign-${id}`}>
            <TabsContent value="info" className="w-full">
              {isTeacher ? (
                <>
                  <EditAssign assign={ass} />
                </>
              ) : (
                <>
                  <h1 className="font-bold text-md mt-4 mb-2">
                    Nội dung bài tập
                  </h1>
                  <InfoAssign assign={ass} />
                  {originalCode && (
                    <div className="w-full">
                      <h1 className="font-bold text-md mt-4 mb-2">
                        Sản phẩm mẫu
                      </h1>
                      <SPCommon code={originalCode}>
                        <SandpackLayout>
                          <SandpackPreview
                            style={{
                              height: "100vh",
                            }}
                          />
                        </SandpackLayout>
                      </SPCommon>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="submit" className="w-full">
              {isTeacher ? (
                <Suspense fallback={<div>Loading...</div>}>
                  <SubmitTable assignId={id} />
                </Suspense>
              ) : (
                <Suspense fallback={<div>Loading...</div>}>
                  {submit.length === 0 ? (
                    <SPAssign assign={ass} isDue={isDue} />
                  ) : (
                    <SPCommon
                      code={
                        submit[0].code_table as Pick<
                          CodeSelect,
                          "html" | "css" | "javascript"
                        >
                      }
                    >
                      <SandpackLayout>
                        <SandpackCodeEditor style={{ height: "100vh" }} />
                        <SandpackPreview style={{ height: "100vh" }} />
                      </SandpackLayout>
                    </SPCommon>
                  )}
                </Suspense>
              )}
            </TabsContent>

            {isTeacher && (
              <TabsContent value="code-example" className="w-full">
                {originalCode ? (
                  <SPCommon code={originalCode}>
                    <CreateCodeOriginal assignId={id} />
                    <SandpackLayout>
                      <MonacoEditor />
                      <SandpackPreview style={{ height: "100vh" }} />
                    </SandpackLayout>
                  </SPCommon>
                ) : (
                  <div>
                    <p>Không có code mẫu, hãy bổ sung nếu cần</p>
                    <SPCommon code={{}}>
                      <CreateCodeOriginal assignId={id} />
                      <SandpackLayout>
                        <MonacoEditor />
                        <SandpackPreview style={{ height: "100vh" }} />
                      </SandpackLayout>
                    </SPCommon>
                  </div>
                )}
              </TabsContent>
            )}
          </CustomTabs>
        );
      })}
    </div>
  );
};

export default page;
