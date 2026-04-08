import {
  BookA,
  BookCheck,
  BookOpenIcon,
  CodeIcon,
  HomeIcon,
} from "lucide-react";
export const navigation = [
  {
    title: "Trang chủ",
    href: "/",
    icon: HomeIcon,
    hidden: false,
  },
  {
    title: "Dự án",
    href: "/projects",
    icon: CodeIcon,
    hidden: false,
  },
  {
    title: "Lớp học",
    href: "/classes",
    icon: BookOpenIcon,
    hidden: false,
  },
  {
    title: "Bài tập lớp học",
    href: "/assign",
    icon: BookCheck,
    hidden: true,
  },
  {
    title: "Bài đã nộp",
    href: "/submit",
    icon: BookA,
    hidden: false,
  },
];
