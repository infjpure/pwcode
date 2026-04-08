import { sql } from "drizzle-orm";
import {
  AnyPgColumn,
  boolean,
  check,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

import crypto from "crypto";

const timestamps = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
};

export const codeTable = pgTable("code_table", {
  id: uuid().primaryKey().defaultRandom(),
  userEmail: text("user_email").notNull(),
  html: text().notNull(),
  css: text().notNull(),
  javascript: text().notNull(),
  ...timestamps,
});

export const projectTable = pgTable(
  "project_table",
  {
    id: uuid().primaryKey().defaultRandom(),
    userEmail: text("user_email").notNull(),

    name: text().notNull(),
    description: text(),

    shared: boolean().notNull().default(false),
    sharedContent: text("shared_content"),

    originalCodeId: uuid("orginal_code_id").references(
      (): AnyPgColumn => codeTable.id,
      { onDelete: "cascade" }
    ),
    codeId: uuid("code_id")
      .notNull()
      .references(() => codeTable.id, { onDelete: "cascade" }),

    ...timestamps,
  },
  (table) => {
    return [unique("project_unq").on(table.name, table.userEmail)];
  }
);

export const classTable = pgTable(
  "class_table",
  {
    id: uuid().primaryKey().defaultRandom(),
    teacherEmail: text("teacher_email").notNull(),
    classCode: text("class_code")
      .$defaultFn(() => String(crypto.randomInt(100000, 999999)))
      .unique(),

    name: text().notNull(),
    description: text(),

    ...timestamps,
  },
  (table) => {
    return [unique("class_unq").on(table.name, table.teacherEmail)];
  }
);

export const studentTable = pgTable(
  "student_table",
  {
    id: uuid().primaryKey().defaultRandom(),
    classId: uuid("class_id")
      .notNull()
      .references(() => classTable.id, { onDelete: "cascade" }),
    userEmail: text("user_email").notNull(),

    verified: boolean().notNull().default(false),

    name: text().notNull(),

    ...timestamps,
  },
  (table) => {
    return [unique("student_unq").on(table.userEmail, table.classId)];
  }
);

export const assignmentTable = pgTable(
  "assignment_table",
  {
    id: uuid().primaryKey().defaultRandom(),
    classId: uuid("class_id")
      .notNull()
      .references(() => classTable.id, {
        onDelete: "cascade",
      }),
    originalCodeId: uuid("original_code_id").references(() => codeTable.id, {
      onDelete: "cascade",
    }),

    name: text().notNull(),
    description: text().notNull(),
    dueDate: timestamp("due_date").notNull(),

    ...timestamps,
  },
  (table) => {
    return [unique("assignment_unq").on(table.name, table.classId)];
  }
);

export const submitTable = pgTable(
  "submit_table",
  {
    id: uuid().primaryKey().defaultRandom(),
    assignId: uuid("assignment_id")
      .notNull()
      .references(() => assignmentTable.id, { onDelete: "cascade" }),
    studentId: uuid("student_id")
      .notNull()
      .references(() => studentTable.id, { onDelete: "cascade" }),
    codeId: uuid("code_id")
      .notNull()
      .references(() => codeTable.id, { onDelete: "cascade" }),

    rated: boolean().notNull().default(false),
    point: integer().notNull().default(0),
    feedback: text(),

    ...timestamps,
  },
  (table) => {
    return [
      unique("submit_unq").on(table.assignId, table.studentId),
      check("age_check1", sql`${table.point} >= 0 and ${table.point} <= 10`),
    ];
  }
);
