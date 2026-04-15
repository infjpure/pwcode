"use client";
import { CodeSelect } from "@/lib/types";
import { useEffect, useState } from "react";
import Loading from "../shared/loading";
import SaveLocal from "./save-local";
import SaveRemote from "./save-remote";
import SPEditor from "./sp-editor";

type Props = {
  code: CodeSelect;
  type: string;
};

const SPProject = ({ code, type }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [codeTemp, setCodeTemp] = useState(code);

  useEffect(() => {
    const local = localStorage.getItem(`my-code-${code.id}`);
    if (local) {
      setCodeTemp(JSON.parse(local));
    } else {
      setCodeTemp(code);
    }
    setIsMounted(true);
  }, [code.id, code]);

  if (!isMounted) return <Loading />;

  return (
    <SPEditor code={codeTemp}>
      {type === "my-code" && <SaveRemote codeId={code.id} />}
      <SaveLocal localFileName={`my-code-${code.id}`} />
    </SPEditor>
  );
};

export default SPProject;
