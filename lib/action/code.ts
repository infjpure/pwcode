"use server";

import { db } from "@/db/drizzle";
import { codeTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { CodeSelect, customActionHandler } from "../types";

export const updateCodeByIdAction = customActionHandler(
  async (codeId: string, data: Partial<Omit<CodeSelect, "id">>) => {
    return db
      .update(codeTable)
      .set(data)
      .where(eq(codeTable.id, codeId))
      .returning();
  }
);
