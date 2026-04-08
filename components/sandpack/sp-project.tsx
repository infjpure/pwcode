"use client";
import { CodeSelect } from "@/lib/types";
import { useEffect, useState } from "react";
import SaveLocal from "./save-local";
import SaveRemote from "./save-remote";
import SPEditor from "./sp-editor";

type Props = {
  code: CodeSelect;
  type: string;
};

const SPProject = ({ code, type }: Props) => {
  const [codeTemp, setCodeTemp] = useState(code);
  useEffect(() => {
    if (localStorage.getItem(`my-code-${code.id}`)) {
      setCodeTemp(
        JSON.parse(localStorage.getItem(`my-code-${code.id}`) as string)
      );
    }
  }, [code.id]);
  return (
    <SPEditor code={codeTemp}>
      {type === "my-code" && <SaveRemote codeId={code.id} />}
      <SaveLocal localFileName={`my-code-${code.id}`} />
    </SPEditor>
  );
};

export default SPProject;
