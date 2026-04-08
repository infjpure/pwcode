"use server";

import { auth } from "@/auth";
import { souceCodeDefault } from "@/contants/sandpack";
import { db } from "@/db/drizzle";
import { codeTable, projectTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  CodeSelect,
  customActionHandler,
  CustomError,
  ProjectInsert,
  ProjectSelect,
} from "../types";

export const createProjectAction = customActionHandler(
  async (data: Omit<ProjectInsert, "userEmail" | "codeId">) => {
    const session = await auth();
    if (!session) throw new CustomError("Bạn chưa đăng nhập");
    const email = session.user?.email as string;
    const code = await db
      .insert(codeTable)
      .values([
        {
          userEmail: email,
          html: souceCodeDefault.html,
          css: souceCodeDefault.css,
          javascript: souceCodeDefault.javascript,
        },
      ])
      .returning();
    return await db
      .insert(projectTable)
      .values([{ ...data, userEmail: email, codeId: code[0].id }])
      .returning();
  }
);

export const updateProjectAction = customActionHandler(
  async (
    projectId: ProjectSelect["id"],
    data: Partial<Omit<ProjectSelect, "id">>
  ) => {
    return db
      .update(projectTable)
      .set(data)
      .where(eq(projectTable.id, projectId))
      .returning();
  }
);

export const recodeProjectAction = customActionHandler(
  async (code: CodeSelect) => {
    const session = await auth();
    if (!session) throw new CustomError("Bạn chưa đăng nhập");
    const email = session.user?.email as string;
    if (email === code.userEmail) {
      throw new CustomError("Bạn không thể recode project của chính mình");
    }
    const codes = await db
      .insert(codeTable)
      .values([
        {
          userEmail: email,
          html: souceCodeDefault.html,
          css: souceCodeDefault.css,
          javascript: souceCodeDefault.javascript,
        },
      ])
      .returning();
    return db
      .insert(projectTable)
      .values([
        {
          name: `Dự án viết lại vào lúc ${new Date().toLocaleString()}`,
          description: `Dự án có code tham khảo từ dự án của người dùng có email ${code.userEmail}`,
          shared: false,
          sharedContent: "",
          userEmail: email,
          codeId: codes[0].id,
          originalCodeId: code.id,
        },
      ])
      .returning();
  }
);

export const deleteProjectAction = customActionHandler(
  async (id: ProjectSelect["id"]) => {
    return db.delete(projectTable).where(eq(projectTable.id, id)).returning();
  }
);
