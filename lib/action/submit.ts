"use server";

import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { codeTable, submitTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  customActionHandler,
  CustomError,
  SubmitInsert,
  SubmitSelect,
} from "../types";

export const createSubmitAction = customActionHandler(
  async (
    data: Omit<SubmitInsert, "codeId">,
    code: { html: string; css: string; javascript: string }
  ) => {
    const session = await auth();
    if (!session) throw new CustomError("Bạn chưa đăng nhập");
    const codes = await db
      .insert(codeTable)
      .values({
        userEmail: session.user?.email as string,
        html: code.html,
        css: code.css,
        javascript: code.javascript,
      })
      .returning();
    return await db
      .insert(submitTable)
      .values({ ...data, codeId: codes[0].id })
      .returning();
  }
);

export const updateSubmitAction = customActionHandler(
  async (
    submitId: SubmitSelect["id"],
    data: Partial<Omit<SubmitSelect, "id">>
  ) => {
    return await db
      .update(submitTable)
      .set(data)
      .where(eq(submitTable.id, submitId))
      .returning();
  }
);
