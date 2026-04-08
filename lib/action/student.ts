"use server";

import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { classTable, studentTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { customActionHandler, CustomError, StudentSelect } from "../types";

export const createStudentAction = customActionHandler(
  async (data: { classCode: string; name: string }) => {
    const session = await auth();
    if (!session) throw new CustomError("Bạn chưa đăng nhập");
    const email = session.user?.email as string;
    const classroom = await db
      .select()
      .from(classTable)
      .leftJoin(studentTable, eq(classTable.id, studentTable.classId))
      .where(eq(classTable.classCode, data.classCode));
    if (classroom[0].class_table.teacherEmail === email) {
      throw new CustomError("Bạn không thể tham gia lớp học của mình");
    }
    if (classroom[0].student_table !== null) {
      throw new CustomError("Bạn đã tham gia lớp học này");
    } else {
      return await db
        .insert(studentTable)
        .values([
          {
            classId: classroom[0].class_table.id,
            userEmail: email,
            name: data.name,
          },
        ])
        .returning();
    }
  }
);

export const deleteStudentAction = customActionHandler(
  async (studentId: StudentSelect["id"]) => {
    return db
      .delete(studentTable)
      .where(eq(studentTable.id, studentId))
      .returning();
  }
);

export const verifyStudentAction = customActionHandler(
  async (classId: StudentSelect["classId"]) => {
    return db
      .update(studentTable)
      .set({ verified: true })
      .where(eq(studentTable.classId, classId))
      .returning();
  }
);

export const verifyOneStudentAction = customActionHandler(
  async (studentId: StudentSelect["id"]) => {
    return await db
      .update(studentTable)
      .set({ verified: true })
      .where(eq(studentTable.id, studentId))
      .returning();
  }
);
