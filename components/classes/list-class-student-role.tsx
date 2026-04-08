import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db/drizzle";
import { classTable, studentTable } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Button } from "../ui/button";
const ListClassRoleStudent = async () => {
  const session = await auth();
  if (!session) return <h1>Bạn chưa đăng nhập</h1>;
  const email = session.user?.email as string;
  const classes = await db
    .select()
    .from(classTable)
    .innerJoin(
      studentTable,
      and(
        eq(studentTable.classId, classTable.id),
        eq(studentTable.userEmail, email)
      )
    )
    .orderBy(desc(studentTable.createdAt));
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-2">
      {classes.map((cl) => {
        const classItem = cl.class_table;
        return (
          <Card key={classItem.id} className="hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-base">{classItem.name}</CardTitle>
              <CardDescription>{classItem.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center">
              <Button asChild>
                <Link href={`/classes/${classItem.id}`}>Đến lớp học</Link>
              </Button>
            </CardContent>
            <CardFooter>
              <p className="text-gray-500 text-sm">
                Cập nhật lúc: {classItem.updatedAt.toLocaleString()}
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default ListClassRoleStudent;
