"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeSelect, ProjectSelect } from "@/lib/types";
import { formatTime } from "@/lib/utils";
import { SandpackLayout, SandpackPreview } from "@codesandbox/sandpack-react";
import Link from "next/link";
import SPCommon from "../sandpack/sp-common";
import { Button } from "../ui/button";
import DeleteProject from "./delete-project";
import EditProjectButton from "./edit-project-button";

type Props = {
  project: ProjectSelect;
  code: CodeSelect;
};

const ProjectCard = ({ project, code }: Props) => {
  return (
    <Card className="hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-base text-wrap">{project.name}</CardTitle>
        <CardDescription>
          {project.description}
          <br />
          Updated at: {formatTime(project.updatedAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-2">
        <SPCommon code={code}>
          <SandpackLayout>
            <SandpackPreview showOpenInCodeSandbox={false} />
          </SandpackLayout>
        </SPCommon>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/projects/${project.id}`}>Viết mã</Link>
          </Button>
          <EditProjectButton project={project} />
          <DeleteProject project={project} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
