"use client";

import { navigation } from "@/contants/navigation";
import { usePathname } from "next/navigation";

const TitlePath = () => {
  const pathname = usePathname();
  const currentPath = navigation.find((nav) => {
    if (nav.href === "/") {
      return pathname === nav.href;
    }
    return nav.href !== "/" && pathname.startsWith(nav.href);
  });
  return (
    <h1 className="text-xl font-bold">{currentPath?.title || "NO PATH"}</h1>
  );
};

export default TitlePath;
