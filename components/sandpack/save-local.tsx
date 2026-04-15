"use client";

import { fileNames } from "@/contants/sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  localFileName: string;
};

const SaveLocal = ({ localFileName }: Props) => {
  const { sandpack } = useSandpack();
  const { files } = sandpack;

  const debounced = useDebouncedCallback(
    (currentFiles: typeof files) => {
      localStorage.setItem(
        localFileName,
        JSON.stringify({
          html: currentFiles[fileNames.html].code,
          css: currentFiles[fileNames.css].code,
          javascript: currentFiles[fileNames.javascript].code,
        })
      );
    },
    1000
  );

  useEffect(() => {
    debounced(files);
  }, [debounced, files]);

  return null;
};

export default SaveLocal;
