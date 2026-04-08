import {
  assignmentTable,
  classTable,
  codeTable,
  projectTable,
  studentTable,
  submitTable,
} from "@/db/schema";
import { NeonDbError } from "@neondatabase/serverless";

export interface CustomActionResult<T> {
  status: "success" | "error";
  data?: T;
  error?: string;
}

export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}

export const CodeErrorToMessage: { [key: string]: string } = {
  ["23505"]: "Trùng lặp dữ liệu, vui lòng thử lại",
};

export function customActionHandler<I extends unknown[], O>(
  query: (...data: I) => Promise<O>
): (...data: I) => Promise<CustomActionResult<O>> {
  return async (...data: I) => {
    try {
      const result = await query(...data);
      return { status: "success", data: result };
    } catch (error) {
      if (error instanceof NeonDbError) {
        console.error(error);
        return { status: "error", error: error.code };
      }
      if (error instanceof CustomError) {
        return { status: "error", error: error.message };
      }
      console.error(error);
      return { status: "error", error: "Đã có lỗi xảy ra" };
    }
  };
}

export type CodeInsert = typeof codeTable.$inferInsert;
export type CodeSelect = typeof codeTable.$inferSelect;

export type ProjectInsert = typeof projectTable.$inferInsert;
export type ProjectSelect = typeof projectTable.$inferSelect;

export type ClassInsert = typeof classTable.$inferInsert;
export type ClassSelect = typeof classTable.$inferSelect;

export type StudentInsert = typeof studentTable.$inferInsert;
export type StudentSelect = typeof studentTable.$inferSelect;

export type AssignmentInsert = typeof assignmentTable.$inferInsert;
export type AssignmentSelect = typeof assignmentTable.$inferSelect;

export type SubmitInsert = typeof submitTable.$inferInsert;
export type SubmitSelect = typeof submitTable.$inferSelect;
