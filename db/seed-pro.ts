import { CodeSelect } from "@/lib/types";
import { reset } from "drizzle-seed";
import fs from "fs";
import path from "path";
import { db } from "./drizzle";
import * as schema from "./schema";
import {
  assignmentTable,
  classTable,
  codeTable,
  projectTable,
  studentTable,
} from "./schema";

const hieuEmail = "hieuvnkudo040303@gmail.com";
const learnEmail = "learnshullkudo@gmail.com";

const pathFiles = (dirName: string) => {
  return {
    html: path.resolve(__dirname, `./data/${dirName}/index.html`),
    css: path.resolve(__dirname, `./data/${dirName}/styles.css`),
    javascript: path.resolve(__dirname, `./data/${dirName}/index.js`),
  };
};
const readCodeFromDirName = async (dirName: string) => {
  try {
    const { html, css, javascript } = pathFiles(dirName);
    const data = await Promise.all([
      fs.promises.readFile(html, "utf8"),
      fs.promises.readFile(css, "utf8"),
      fs.promises.readFile(javascript, "utf8"),
    ]);
    return data;
  } catch (err) {
    console.error("Lỗi khi đọc file:", err);
  }
};

export const seedCodeFromFile = async (dirName: string, email: string) => {
  const data = (await readCodeFromDirName(dirName)) as string[];
  if (!data) console.log("Không có dữ liệu");
  return await db
    .insert(codeTable)
    .values([
      {
        userEmail: email,
        html: data[0],
        css: data[1],
        javascript: data[2],
      },
    ])
    .returning();
};

const seedProject = async () => {
  const metaData = [
    {
      userEmail: hieuEmail,
      name: "Dự án Form Basic",
      description: "Dự án này xây dựng 1 form cơ bản với HTML, CSS",
      shared: true,
      sharedContent: "Đây là sản phẩm đầu tiên cuả tôi, cảm ơn bạn đã xem",
      dirName: "basic-form",
    },
    {
      userEmail: hieuEmail,
      name: "Dự án CSS Preloader",
      description: "Dự án này xây dựng hiệu ứng với CSS",
      shared: true,
      sharedContent: "Đây là sản phẩm đầu tiên cuả tôi, cảm ơn bạn đã xem",
      dirName: "css-preloader",
    },
    {
      userEmail: hieuEmail,
      name: "Dự án Form đăng kí, đăng nhập",
      description: "Dự án này xây dựng 1 form đăng kí, đăng nhập với HTML, CSS",
      shared: false,
      sharedContent: "",
      dirName: "signin-form",
    },
    {
      userEmail: learnEmail,
      name: "Dự án xây dựng slider ảnh",
      description: "Dự án này xây dựng 1 slider ảnh với HTML, CSS",
      shared: true,
      sharedContent: "Dự án này có hiệu ứng đẹp",
      dirName: "slider",
    },
    {
      userEmail: learnEmail,
      name: "Dự án xây dựng Magic Card",
      description: "Dự án này xây dựng 1 card với hiệu ứng đẹp shadow",
      shared: true,
      sharedContent: "Dự án này có hiệu ứng đẹp, dễ làm",
      dirName: "magic-card",
    },
    {
      userEmail: learnEmail,
      name: "Dự án xây dựng Form Flat",
      description: "Dự án này xây dựng 1 form với hiệu ứng flat",
      shared: false,
      sharedContent: "",
      dirName: "flat-form",
    },
  ];
  await Promise.all(
    metaData.map(async (data) => {
      const code = await seedCodeFromFile(data.dirName, data.userEmail);
      await db.insert(projectTable).values([
        {
          userEmail: data.userEmail,
          codeId: code[0].id,
          name: data.name,
          description: data.description,
          shared: data.shared,
          sharedContent: data.sharedContent,
        },
      ]);
    })
  );
};

const seedClasses = async () => {
  const metaData = [
    {
      name: "Lớp học 12A1",
      description:
        "Lớp học 12A1 dùng để giao bài tập của giáo viên Lê Trung Hiếu",
      teacherEmail: hieuEmail,
    },
    {
      name: "Lớp học 12A2",
      description:
        "Lớp học 12A2 dùng để giao bài tập của giáo viên Lê Trung Hoa",
      teacherEmail: hieuEmail,
    },
  ];
  await Promise.all(
    metaData.map(async (data) => {
      const classes = await db
        .insert(classTable)
        .values([
          {
            teacherEmail: data.teacherEmail,
            name: data.name,
            description: data.description,
          },
        ])
        .returning();
      [
        {
          name: "Bài tập tuần 1",
          description: "Bài tập tuần 1 về HTML, CSS",
          classId: classes[0].id,
          dueDate: new Date(Date.now() - 60 * 60 * 1000),
        },
        {
          name: "Bài tập tuần 2",
          description: "Bài tập tuần 2 về HTML, CSS",
          classId: classes[0].id,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      ].map(async (a, index) => {
        const is = index === 1;
        let code: CodeSelect[] = [];
        if (is) {
          code = await seedCodeFromFile(
            "assign-example",
            classes[0].teacherEmail
          );
        }
        await db.insert(assignmentTable).values([
          {
            name: a.name,
            description: a.description,
            classId: a.classId,
            dueDate: a.dueDate,
            originalCodeId: is ? code[0].id : null,
          },
        ]);
      });
      [
        { name: "Triệu Kim Mạch", email: "machmach@gmail.com", verified: true },
        { name: "Ngô Lỗi", email: "loiloi@gmail.com", verified: true },
        {
          name: "Lê Trung Hiếu",
          email: "learnshullkudo@gmail.com",
          verified: true,
        },
        { name: "Nguyễn Văn A", email: "aa@gmail.com", verified: false },
      ].map(async (s) => {
        await db.insert(studentTable).values([
          {
            classId: classes[0].id,
            userEmail: s.email,
            name: s.name,
            verified: s.verified,
          },
        ]);
      });
    })
  );
};

export const main = async () => {
  await reset(db, schema);
  await seedProject();
  await seedClasses();
  console.log("Seed data success");
};
