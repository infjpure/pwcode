"use server";
import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import {
  assignmentTable,
  classTable,
  studentTable,
  submitTable,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";
import {
  ClassInsert,
  ClassSelect,
  customActionHandler,
  CustomError,
} from "../types";

export const createClassesAction = customActionHandler(
  async ({ name, description }: Pick<ClassInsert, "name" | "description">) => {
    const session = await auth();
    if (!session) throw new CustomError("Bạn chưa đăng nhập");
    return await db
      .insert(classTable)
      .values({
        name: name,
        description: description,
        teacherEmail: session.user?.email as string,
      })
      .returning();
  }
);

export const updateClassesAction = customActionHandler(
  async (id: ClassSelect["id"], data: Partial<Omit<ClassSelect, "id">>) => {
    return await db
      .update(classTable)
      .set(data)
      .where(eq(classTable.id, id))
      .returning();
  }
);

export const deleteClassesAction = customActionHandler(
  async (id: ClassSelect["id"]) => {
    return await db.delete(classTable).where(eq(classTable.id, id)).returning();
  }
);

export const checkClassCodeAction = customActionHandler(
  async (classCode: ClassSelect["classCode"]) => {
    const classroom = await db
      .select()
      .from(classTable)
      .where(eq(classTable.classCode, classCode as string));
    if (classroom.length === 0) throw new CustomError("Mã lớp không tồn tại");
    return classroom[0];
  }
);

type Data = Array<{
  id: string;
  sheetName: string;
  submits: Array<{
    ["Tên học sinh"]: string;
    ["Email"]: string;
    ["Điểm"]: number;
    ["Đánh giá"]: string;
    ["Ngày nộp"]: string;
    ["Ngày chấm"]: string;
  }>;
}>;

export const exportForClassAction = customActionHandler(
  async (classId: ClassSelect["id"]) => {
    const submits = await db
      .select()
      .from(submitTable)
      .innerJoin(
        assignmentTable,
        and(
          eq(assignmentTable.classId, classId),
          eq(submitTable.assignId, assignmentTable.id)
        )
      )
      .innerJoin(studentTable, eq(submitTable.studentId, studentTable.id));
    const data = submits.reduce((acc: Data, submit) => {
      const id = submit.assignment_table.id;
      const sheetName = submit.assignment_table.name;
      const index = acc.findIndex((item) => item.sheetName === sheetName);
      if (index === -1) {
        acc.push({ id, sheetName, submits: [] });
      }
      const i = acc.findIndex((item) => item.sheetName === sheetName);
      acc[i].submits.push({
        ["Tên học sinh"]: submit.student_table.name,
        ["Email"]: submit.student_table.userEmail,
        ["Điểm"]: submit.submit_table.point,
        ["Đánh giá"]: submit.submit_table.feedback as string,
        ["Ngày nộp"]: submit.submit_table.createdAt.toLocaleString(),
        ["Ngày chấm"]: submit.submit_table.updatedAt.toLocaleString(),
      });
      return acc;
    }, [] as Data);
    console.log(data);
    return data;
  }
);
