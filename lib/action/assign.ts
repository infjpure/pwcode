"use server";
import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { assignmentTable, codeTable, submitTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import {
  AssignmentInsert,
  AssignmentSelect,
  ClassSelect,
  CodeSelect,
  customActionHandler,
  CustomError,
  StudentSelect,
} from "../types";

export const updateAssignByIdAction = customActionHandler(
  async (
    id: AssignmentSelect["id"],
    data: Partial<Omit<AssignmentSelect, "id">>
  ) => {
    return db
      .update(assignmentTable)
      .set(data)
      .where(eq(assignmentTable.id, id))
      .returning();
  }
);

export const createAssignAction = customActionHandler(
  async (data: AssignmentInsert) => {
    return db.insert(assignmentTable).values(data).returning();
  }
);

export const checkAssignNameAction = customActionHandler(
  async (
    name: AssignmentSelect["name"],
    classId: AssignmentInsert["classId"]
  ) => {
    const data = await db
      .select()
      .from(assignmentTable)
      .where(
        and(
          eq(assignmentTable.name, name),
          eq(assignmentTable.classId, classId)
        )
      );
    if (data.length > 0) {
      throw new CustomError("Tên bài tập đã tồn tại");
    } else {
      return data[0];
    }
  }
);

export const updateCodeOriginalAssignAction = customActionHandler(
  async (
    assignId: AssignmentSelect["id"],
    data: Pick<CodeSelect, "html" | "css" | "javascript">
  ) => {
    const session = await auth();
    if (!session) throw new CustomError("Bạn chưa đăng nhập");
    const email = session.user?.email as string;
    const ass = await db
      .select()
      .from(assignmentTable)
      .where(eq(assignmentTable.id, assignId));
    if (ass[0].originalCodeId) {
      return await db
        .update(codeTable)
        .set(data)
        .where(eq(codeTable.id, ass[0].originalCodeId))
        .returning();
    }
    const code = await db
      .insert(codeTable)
      .values({
        ...data,
        userEmail: email,
      })
      .returning();
    return await db
      .update(assignmentTable)
      .set({ originalCodeId: code[0].id })
      .where(eq(assignmentTable.id, assignId))
      .returning();
  }
);

export const getAssignsFromStudentIdAction = customActionHandler(
  async (studentId: StudentSelect["id"], classId: ClassSelect["id"]) => {
    return await db
      .select()
      .from(submitTable)
      .innerJoin(
        assignmentTable,
        and(
          eq(assignmentTable.id, submitTable.assignId),
          eq(assignmentTable.classId, classId)
        )
      )
      .where(eq(submitTable.studentId, studentId));
  }
);

export const deleteAssignAction = customActionHandler(
  async (id: AssignmentSelect["id"]) => {
    return await db
      .delete(assignmentTable)
      .where(eq(assignmentTable, id))
      .returning();
  }
);
