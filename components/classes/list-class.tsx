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
import { classTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Button } from "../ui/button";
import DeleteClass from "./delete-class";
import EditClass from "./edit-class";

const ListClass = async () => {
  const session = await auth();
  if (!session) return <h1>Bạn chưa đăng nhập</h1>;
  const classes = await db
    .select()
    .from(classTable)
    .where(eq(classTable.teacherEmail, String(session.user?.email)))
    .orderBy(desc(classTable.updatedAt));
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
      {classes.map((item) => {
        return (
          <Card key={item.id} className="hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-base">{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Button asChild>
                <Link href={`/classes/${item.id}`}>Đến lớp học</Link>
              </Button>
              <EditClass classroom={item} />
              <DeleteClass classroom={item} />
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">
                Cập nhật lúc: {item.updatedAt.toLocaleString()}
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default ListClass;
