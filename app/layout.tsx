import { SandPackCSS } from "@/components/sandpack-styles";
import BottomBar from "@/components/shared/bottom-bar";
import LeftBar from "@/components/shared/left-bar";
import TopBar from "@/components/shared/top-bar";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import RoleProvider from "../context/tab-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PwCode - Luyện tập lập trình web cơ bản",
  description:
    "Website cung cấp công cụ chạy code web trực tuyến với sự hỗ trợ của Sandpack. Xây dựng tính năng tổ chức lớp học để giúp giáo viên và học sinh dễ dàng quản lý bài tập và chia sẻ code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <SandPackCSS />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-screen`}
      >
        <Toaster />
        <SessionProvider>
          <LeftBar />
          <main className="flex flex-col flex-grow">
            <TopBar />
            <section className="flex flex-col flex-grow overflow-auto bg-zinc-200">
              <RoleProvider>{children}</RoleProvider>
            </section>
            <BottomBar />
          </main>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
