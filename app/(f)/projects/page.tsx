import { auth } from "@/auth";
import CreateProjectButton from "@/components/project/create-project-button";
import ListProject from "@/components/project/list-project";
import SPPublicEditor from "@/components/sandpack/sp-editor-public";
import { localFileName } from "@/contants/sandpack";

const page = async () => {
  const session = await auth();
  if (!session) return <SPPublicEditor localFileName={localFileName} />;
  return (
    <div className="p-4">
      <CreateProjectButton />
      <ListProject />
    </div>
  );
};

export default page;
