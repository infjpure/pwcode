import { auth } from "@/auth";
import ProjectDetail from "@/components/project/project-detail";
import { db } from "@/db/drizzle";
import { codeTable, projectTable } from "@/db/schema";
import { CodeSelect } from "@/lib/types";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

const originalCodeTable = alias(codeTable, "original_code_table");

const page = async ({ params }: Props) => {
  const id = (await params).id;
  const session = await auth();
  if (!session) return redirect("/projects");
  const email = session?.user?.email as string;
  const projects = await db
    .select()
    .from(projectTable)
    .innerJoin(codeTable, eq(projectTable.codeId, codeTable.id))
    .leftJoin(
      originalCodeTable,
      eq(projectTable.originalCodeId, originalCodeTable.id)
    )
    .where(eq(projectTable.id, id));
  if (projects.length === 0) return redirect("/projects");
  if (projects[0].project_table.userEmail !== email)
    return redirect("/projects");
  return (
    <div className="p-4">
      {projects?.map((project) => {
        const pro = project.project_table;
        const code = project.code_table;
        const originalCode = project.original_code_table;
        const isRecode = originalCode ? true : false;
        return (
          <div key={pro.id} className="flex- flex-col items-start">
            <ProjectDetail
              id={id}
              isRecode={isRecode}
              code={code}
              originalCode={originalCode as CodeSelect}
            />
          </div>
        );
      })}
    </div>
  );
};

export default page;
