"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const PathContext = createContext<{
  path: { [email: string]: string };
  setPath: (email: string, value: string) => void;
}>({
  path: {},
  setPath: () => {},
});

export default function PathProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [path, setPath] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    const path = localStorage.getItem("path");
    if (path) {
      setPath(JSON.parse(path));
    }
  }, []);
  const setPathContext = (key: string, value: string) => {
    setPath((path) => {
      localStorage.setItem("path", JSON.stringify({ ...path, [key]: value }));
      return {
        ...path,
        [key]: value,
      };
    });
  };
  return (
    <PathContext.Provider value={{ path, setPath: setPathContext }}>
      <SessionProvider>{children}</SessionProvider>
    </PathContext.Provider>
  );
}
