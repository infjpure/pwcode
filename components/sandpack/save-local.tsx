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
    // function
    () => {
      localStorage.setItem(
        localFileName,
        JSON.stringify({
          html: files[fileNames.html].code,
          css: files[fileNames.css].code,
          javascript: files[fileNames.javascript].code,
        })
      );
    },
    // delay in ms
    1000
  );
  useEffect(() => {
    debounced();
  }, [debounced, files]);
  return null;
};

export default SaveLocal;
