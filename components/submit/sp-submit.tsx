import { CodeSelect } from "@/lib/types";
import {
  SandpackCodeViewer,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import SPCommon from "../sandpack/sp-common";

type Props = {
  code: Pick<CodeSelect, "html" | "css" | "javascript">;
};

const SPSubmit = ({ code }: Props) => {
  return (
    <SPCommon code={code}>
      <SandpackLayout>
        <SandpackCodeViewer showTabs />
        <SandpackPreview />
      </SandpackLayout>
    </SPCommon>
  );
};

export default SPSubmit;
