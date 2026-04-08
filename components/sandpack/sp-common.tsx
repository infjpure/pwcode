import { fileNames } from "@/contants/sandpack";
import { createFiles } from "@/lib/utils";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { ecoLight } from "@codesandbox/sandpack-themes";

type Props = {
  children: React.ReactNode;
  code: { html?: string; css?: string; javascript?: string };
};
const SPCommon = ({ children, code }: Props) => {
  const files = createFiles(code);
  return (
    <SandpackProvider
      files={files}
      template="static"
      theme={ecoLight}
      customSetup={{
        entry: fileNames.html,
      }}
      options={{
        visibleFiles: [fileNames.html, fileNames.css, fileNames.javascript],
        activeFile: fileNames.html,
      }}
    >
      {children}
    </SandpackProvider>
  );
};

export default SPCommon;
