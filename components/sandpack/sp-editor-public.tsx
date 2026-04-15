"use client";
import { useEffect, useState } from "react";
import Loading from "../shared/loading";
import SaveLocal from "./save-local";
import SPEditor from "./sp-editor";

type Props = {
  localFileName: string;
  children?: React.ReactNode;
};

const SPPublicEditor = ({ localFileName, children }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [code, setCode] = useState<{
    html: string;
    css: string;
    javascript: string;
  }>({ html: "", css: "", javascript: "" });

  useEffect(() => {
    const local = localStorage.getItem(localFileName);
    if (local) {
      setCode(JSON.parse(local));
    } else {
      setCode({ html: "", css: "", javascript: "" });
    }
    setIsMounted(true);
  }, [localFileName]);

  if (!isMounted) return <Loading />;

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
