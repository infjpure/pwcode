"use client";
import {
  FileTabs,
  SandpackStack,
  useActiveCode,
  useSandpack,
} from "@codesandbox/sandpack-react";
import Editor from "@monaco-editor/react";

export function MonacoEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const { activeFile } = sandpack;
  const type = activeFile.split(".")[1];
  const returnLanguage = (type: string) => {
    if (type === "html") return "html";
    if (type === "css") return "css";
    if (type === "js") return "javascript";
    return "javascript";
  };
  return (
    <SandpackStack style={{ height: "100vh", margin: 0 }}>
      <FileTabs />
      <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}>
        <Editor
          width="100%"
          height="100%"
          language={returnLanguage(type)}
          theme="vs-dark"
          key={sandpack.activeFile}
          value={code}
          defaultValue={code}
          onChange={(value) => updateCode(value || "")}
        />
      </div>
    </SandpackStack>
  );
}
