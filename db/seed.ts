import { souceCodeDefault } from "@/contants/sandpack";
import { eq } from "drizzle-orm";
import { reset } from "drizzle-seed";
import { ClassSelect, CodeSelect } from "../lib/types";
import { db } from "./drizzle";
import * as schema from "./schema";
import { seedCodeFromFile } from "./seed-pro";

const hieuEmail = "hieuvnkudo040303@gmail.com";
const learnEmail = "learnshullkudo@gmail.com";

const projects = [
  "basic-form",
  "css-preloader",
  "flat-form",
  "magic-card",
  "signin-form",
  "slider",
];

const seedCode = async (email: string) => {
  const randomIndex = Math.floor(Math.random() * 10);
  let code: CodeSelect[] = [
    {
      html: souceCodeDefault.html,
      css: souceCodeDefault.css,
      javascript: souceCodeDefault.javascript,
    },
  ] as CodeSelect[];
  if (randomIndex < projects.length) {
    code = await seedCodeFromFile(projects[randomIndex], email);
  }
  return db
    .insert(schema.codeTable)
    .values({
      userEmail: email,
      html: code[0].html,
      css: code[0].css,
      javascript: code[0].javascript,
    })
    .returning();
};

const seedProject = async () => {
  for (const index of Array.from({ length: 10 }, (_, i) => i + 1)) {
    if (Math.random() < 0.5) {
      const code = await seedCode(hieuEmail);
      await db.insert(schema.projectTable).values([
        {
          userEmail: hieuEmail,
          codeId: code[0].id,
          name: `Dự án ${index} tạo bởi người dùng email ${hieuEmail}`,
          description: `Description of project ${index} created by ${hieuEmail}`,
        },
      ]);
    } else {
      const code = await seedCode(hieuEmail);
      const orginalCode = await seedCode(learnEmail);
      await db.insert(schema.projectTable).values([
        {
          userEmail: learnEmail,
          codeId: orginalCode[0].id,
          name: `Dự án ${index} tạo bởi người dùng email ${learnEmail} `,
          shared: true,
          sharedContent: "Haha cảm ơn bạn đã đọc code của tôi",
          description: `Description of project ${index} created by ${hieuEmail}`,
        },
      ]);
      await db.insert(schema.projectTable).values([
        {
          userEmail: hieuEmail,
          codeId: code[0].id,
          originalCodeId: orginalCode[0].id,
          name: `Dự án recode ${index} created by ${hieuEmail} từ email ${learnEmail}`,
          description: `Description of project ${index} created by ${hieuEmail} with original code from ${learnEmail}`,
        },
      ]);
    }
  }
  return await db.select().from(schema.projectTable);
};

const seedClasses = async () => {
  for (const index of Array.from({ length: 10 }, (_, i) => i + 1)) {
    let classes: ClassSelect[] = [];
    if (Math.random() < 0.5) {
      classes = await db
        .insert(schema.classTable)
        .values([
          {
            teacherEmail: hieuEmail,
            name: `Lớp học ${index} của email ${hieuEmail}`,
            description: `Mô tả cho lớp học ${index}`,
          },
        ])
        .returning();
    } else {
      classes = await db
        .insert(schema.classTable)
        .values([
          {
            teacherEmail: learnEmail,
            name: `Lớp học ${index} của email ${learnEmail}`,
          },
        ])
        .returning();
    }
    await Promise.all(
      Array.from({ length: 10 }, (_, i) => i + 1).map(async (index) => {
        return db.insert(schema.studentTable).values({
          name: `Học sinh ${index} của ${classes[0].name}`,
          classId: classes[0].id,
          verified: Math.random() < 0.5,
          userEmail: "student" + index + "@gmail.com",
        });
      })
    );
    if (classes[0].teacherEmail !== hieuEmail) {
      await db
        .insert(schema.studentTable)
        .values({
          name: `Lê Trung Hiếu`,
          classId: classes[0].id,
          verified: Math.random() < 0.5,
          userEmail: hieuEmail,
        })
        .returning();
    }
    if (classes[0].teacherEmail !== learnEmail) {
      await db
        .insert(schema.studentTable)
        .values({
          name: `Lê Trung Kudo`,
          classId: classes[0].id,
          verified: Math.random() < 0.5,
          userEmail: learnEmail,
        })
        .returning();
    }
    await Promise.all(
      Array.from({ length: 10 }, (_, i) => i + 1).map(async (index) => {
        const haveOriginalCode = Math.random() < 0.5;
        if (haveOriginalCode) {
          const code = await seedCode(classes[0].teacherEmail);
          return db.insert(schema.assignmentTable).values({
            classId: classes[0].id,
            name: `Bài tập ${index} của ${classes[0].name} có code mẫu`,
            description: `Mô tả cho bài tập ${index} của ${classes[0].name}`,
            originalCodeId: code[0].id,
            dueDate:
              Math.random() < 0.5
                ? new Date(Date.now() + 1000 * 60 * 60 * 24)
                : new Date(Date.now() - 1000 * 60 * 60 * 24),
          });
        } else {
          return db.insert(schema.assignmentTable).values({
            classId: classes[0].id,
            name: `Bài tập ${index} của ${classes[0].name} không code mẫu`,
            description: `Mô tả cho bài tập ${index} của ${classes[0].name}`,
            dueDate:
              Math.random() < 0.5
                ? new Date(Date.now() + 1000 * 60 * 60 * 24)
                : new Date(Date.now() - 1000 * 60 * 60 * 24),
          });
        }
      })
    );
  }
};

export const seedSubmit = async (classId: ClassSelect["id"]) => {
  const students = await db
    .select()
    .from(schema.studentTable)
    .where(eq(schema.studentTable.classId, classId));
  const assignments = await db
    .select()
    .from(schema.assignmentTable)
    .where(eq(schema.assignmentTable.classId, classId));
  for (const assignment of assignments) {
    for (const student of students) {
      if (student.verified === true) {
        const code = await seedCode(student.userEmail);
        if (Math.random() < 0.5) {
          const rated = Math.random() < 0.5;
          await db.insert(schema.submitTable).values({
            studentId: student.id,
            assignId: assignment.id,
            rated: rated,
            point: rated ? Math.floor(Math.random() * 10) : undefined,
            feedback: rated ? "Good job" : undefined,
            codeId: code[0].id,
          });
        }
      }
    }
  }
};

export const main = async () => {
  try {
    await reset(db, schema);
    await seedProject();
    await seedClasses();
    const classes = await db.select().from(schema.classTable);
    await Promise.all(classes.map(async (item) => await seedSubmit(item.id)));
  } catch (error) {
    console.log(error);
  }
};

main();
