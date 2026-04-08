"use client";

import { createContext, useEffect, useState } from "react";

export const TabContext = createContext<{
  tab: { [key: string]: string };
  setTab: (key: string, value: string) => void;
}>({
  tab: {},
  setTab: () => {},
});

export default function TabProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tab, setTab] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    const tab = localStorage.getItem("tab");
    if (tab) {
      setTab(JSON.parse(tab));
    }
  }, []);
  const setTabContext = (key: string, value: string) => {
    setTab((tab) => {
      localStorage.setItem("tab", JSON.stringify({ ...tab, [key]: value }));
      return {
        ...tab,
        [key]: value,
      };
    });
  };
  return (
    <TabContext.Provider value={{ tab, setTab: setTabContext }}>
      {children}
    </TabContext.Provider>
  );
}
