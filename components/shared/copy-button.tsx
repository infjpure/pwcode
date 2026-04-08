"use client";
import { CheckCheck, CopyIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  text: string;
};

const CopyButton = ({ text }: Props) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="p-2 rounded-xl hover:bg-slate-400 hover:text-white"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied ? <CheckCheck /> : <CopyIcon />}
    </button>
  );
};

export default CopyButton;
