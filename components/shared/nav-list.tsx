"use client";
import { navigation } from "@/contants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
type Props = {
  type: "col" | "row";
};
const NavList = ({ type }: Props) => {
  const pathname = usePathname();
  const current = navigation.find((nav) => {
    if (nav.href === "/") {
      return pathname === "/";
    }
    return nav.href !== "/" && pathname.startsWith(nav.href);
  });
  const navClass = `flex items-center justify-between gap-8 ${
    type === "col" ? "flex-col" : ""
  }`;
  return (
    <nav className={navClass}>
      {navigation.map((nav) => {
        const isActive =
          nav.href === current?.href ? "bg-zinc-500 text-white" : "";
        if (nav.hidden) return null;
        return (
          <Link
            key={nav.href}
            href={nav.href}
            className={`icon-wrapper ${isActive}`}
            aria-label={nav.title}
          >
            <nav.icon />
          </Link>
        );
      })}
    </nav>
  );
};

export default NavList;
