import { fileNames } from "@/contants/sandpack";
import { CodeSelect } from "@/lib/types";
import { createFiles } from "@/lib/utils";
import {
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { ecoLight } from "@codesandbox/sandpack-themes";
import { MonacoEditor } from "../monaco/MonacoEditor";

type Props = {
  topChildren?: React.ReactNode;
  bottomchildren?: React.ReactNode;
  children?: React.ReactNode;
  code: Pick<CodeSelect, "html" | "css" | "javascript">;
};

const SPEditor = ({ topChildren, bottomchildren, code, children }: Props) => {
  const files = createFiles(code);
  return (
    <SandpackProvider
      files={files}
      theme={ecoLight}
      template="static"
      customSetup={{
        entry: fileNames.html,
      }}
      options={{
        visibleFiles: [fileNames.html, fileNames.css, fileNames.javascript],
        activeFile: fileNames.html,
      }}
    >
      <div>{topChildren}</div>
      <SandpackLayout>
        <MonacoEditor />
        <SandpackPreview style={{ height: "100vh" }} />
      </SandpackLayout>
      {bottomchildren}
      {children}
    </SandpackProvider>
  );
};

export default SPEditor;
