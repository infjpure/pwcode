"use client";

import { fileNames } from "@/contants/sandpack";
import { updateCodeByIdAction } from "@/lib/action/code";
import { CodeSelect } from "@/lib/types";
import { useSandpack } from "@codesandbox/sandpack-react";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  codeId: CodeSelect["id"];
};

const SaveRemote = ({ codeId }: Props) => {
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const saveCode = useDebouncedCallback(async () => {
    const { error } = await updateCodeByIdAction(codeId, {
      html: files[fileNames.html].code,
      css: files[fileNames.css].code,
      javascript: files[fileNames.javascript].code,
    });
    if (error) {
      console.error(error);
    }
  }, 2000);
  useEffect(() => {
    saveCode();
  }, [files, saveCode]);
  return null;
};

export default SaveRemote;
