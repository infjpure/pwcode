import { fileNames, souceCodeDefault } from "@/contants/sandpack";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { formatDistance } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createFiles(code: {
  html?: string;
  css?: string;
  javascript?: string;
}) {
  return {
    [fileNames.html]: code.html || souceCodeDefault.html,
    [fileNames.css]: code.css || souceCodeDefault.css,
    [fileNames.javascript]: code.javascript || souceCodeDefault.javascript,
  };
}

export const isDueDate = (dueDate: Date) => {
  const today = new Date();
  if (today < dueDate) return false;
  return true;
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString();
};

export const formatName = (name: string, len: number) => {
  const l = name.length > len ? len : name.length;
  return name.slice(0, l) + `${l === len ? "..." : ""}`;
};

export const formatTime = (time: Date) => {
  return formatDistance(time, new Date(), { addSuffix: true });
};
