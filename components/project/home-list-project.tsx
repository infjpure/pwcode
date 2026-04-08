import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db/drizzle";
import { codeTable, projectTable } from "@/db/schema";
import { SandpackLayout, SandpackPreview } from "@codesandbox/sandpack-react";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import Link from "next/link";
import SPCommon from "../sandpack/sp-common";
import { Button } from "../ui/button";
import ReCodeButton from "./recode-button";

const originalCodeTable = alias(codeTable, "original_code_table");

const HomeListProject = async () => {
  const publicProjects = await db
    .select()
    .from(projectTable)
    .innerJoin(codeTable, eq(codeTable.id, projectTable.codeId))
    .where(eq(projectTable.shared, true))
    .orderBy(desc(projectTable.updatedAt));
  const session = await auth();
  const email = session?.user?.email as string;
  let userProjects = null;
  if (email) {
    userProjects = await db
      .select()
      .from(projectTable)
      .innerJoin(
        originalCodeTable,
        and(
          eq(originalCodeTable.id, projectTable.originalCodeId),
          isNotNull(projectTable.originalCodeId)
        )
      )
      .where(eq(projectTable.userEmail, email));
  }
  const originalCodeProject = userProjects?.map((p) => {
    return {
      id: p.original_code_table.id,
      projectId: p.project_table.id,
    };
  });
  return (
    <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2">
      {publicProjects.map((project) => {
        const code = project.code_table;
        const pro = project.project_table;
        const isRecoded =
          session && originalCodeProject?.find((o) => o.id === code.id);
        const isMyCode = session && code.userEmail === email;
        return (
          <Card key={pro.id}>
            <CardHeader>
              <CardTitle className="text-base">{pro.name}</CardTitle>
              <CardDescription>{pro.sharedContent}</CardDescription>
            </CardHeader>
            <CardContent>
              <SPCommon code={code}>
                <SandpackLayout>
                  <SandpackPreview showOpenInCodeSandbox={false} />
                </SandpackLayout>
              </SPCommon>
            </CardContent>
            <CardFooter>
              {session && (
                <>
                  {isRecoded && (
                    <Button asChild>
                      <Link href={`/projects/${isRecoded.projectId}`}>
                        Đã viết lại
                      </Link>
                    </Button>
                  )}
                  {isMyCode && (
                    <Button asChild>
                      <Link href={`/projects/${pro.id}`}>Chỉnh sửa</Link>
                    </Button>
                  )}
                  {!isRecoded && !isMyCode && (
                    <ReCodeButton code={code} project={pro} />
                  )}
                </>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default HomeListProject;
