import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { codeTable, projectTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import ProjectCard from "./project-card";

const ListProject = async () => {
  const session = await auth();
  if (!session) return <h3>Bạn chưa đăng nhập</h3>;
  const projects = await db
    .select()
    .from(projectTable)
    .innerJoin(codeTable, eq(projectTable.codeId, codeTable.id))
    .where(eq(projectTable.userEmail, String(session.user?.email)))
    .orderBy(desc(projectTable.updatedAt));
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-2">
      {projects.map((project) => {
        const p = project.project_table;
        const code = project.code_table;
        return (
          <ProjectCard key={p.id} project={project.project_table} code={code} />
        );
      })}
    </div>
  );
};

export default ListProject;
