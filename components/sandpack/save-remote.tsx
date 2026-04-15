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

  const saveCode = useDebouncedCallback(async (currentFiles: typeof files) => {
    const { error } = await updateCodeByIdAction(codeId, {
      html: currentFiles[fileNames.html].code,
      css: currentFiles[fileNames.css].code,
      javascript: currentFiles[fileNames.javascript].code,
    });
    if (error) {
      console.error(error);
    }
  }, 2000);

  useEffect(() => {
    saveCode(files);
  }, [files, saveCode]);

  return null;
};

export default SaveRemote;
