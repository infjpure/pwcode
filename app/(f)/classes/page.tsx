import { auth, signIn } from "@/auth";
import CreateClass from "@/components/classes/create-class";
import CreateStudent from "@/components/classes/create-student";
import ListClass from "@/components/classes/list-class";
import ListClassRoleStudent from "@/components/classes/list-class-student-role";
import CustomTabs from "@/components/custom/custom-tabs";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@radix-ui/react-tabs";

const page = async () => {
  const session = await auth();
  if (!session)
    return (
      <div className="flex items-center justify-center h-screen">
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button type="submit" variant={"outline"}>
            Đăng nhập với Google
          </Button>
        </form>
      </div>
    );
  const tabs = [
    { content: "Vai trò học sinh", value: "student", show: true },
    { content: "Vai trò giáo viên", value: "teacher", show: true },
  ];
  return (
    <section className="p-4">
      <CustomTabs tabs={tabs} keyName="index-classes">
        <TabsContent value="student">
          <CreateStudent />
          <ListClassRoleStudent />
        </TabsContent>
        <TabsContent value="teacher">
          <CreateClass />
          <ListClass />
        </TabsContent>
      </CustomTabs>
    </section>
  );
};

export default page;
