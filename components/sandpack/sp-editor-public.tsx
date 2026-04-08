"use client";
import { useEffect, useState } from "react";
import SaveLocal from "./save-local";
import SPEditor from "./sp-editor";

type Props = {
  localFileName: string;
  children?: React.ReactNode;
};

const SPPublicEditor = ({ localFileName, children }: Props) => {
  const [code, setCode] = useState<{
    html: string;
    css: string;
    javascript: string;
  }>({ html: "", css: "", javascript: "" });
  useEffect(() => {
    setCode(JSON.parse(localStorage.getItem(localFileName) || "{}"));
  }, [localFileName]);
  return (
    <div className="p-4 w-full">
      <SPEditor code={code}>
        <SaveLocal localFileName={localFileName} />
        {children}
      </SPEditor>
    </div>
  );
};

export default SPPublicEditor;
