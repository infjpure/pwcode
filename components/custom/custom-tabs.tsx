"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabContext } from "@/context/tab-context";
import React, { useContext } from "react";

type Props = {
  tabs: Array<{ content: string; value: string; show: boolean }>;
  children: React.ReactNode;
  keyName: string;
};

const CustomTabs = ({ tabs, children, keyName }: Props) => {
  const { tab, setTab } = useContext(TabContext);
  return (
    <Tabs
      defaultValue={tab[keyName] || tabs[0].value}
      value={tab[keyName]}
      onValueChange={(value) => setTab(keyName, value)}
      className="flex flex-col items-center"
    >
      <TabsList className="w-full my-4 bg-zinc-900 text-white">
        {tabs.map((tab, index) => {
          if (!tab.show) return null;
          return (
            <TabsTrigger key={index} value={tab.value} className="w-full">
              {tab.content}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {children}
    </Tabs>
  );
};

export default CustomTabs;
