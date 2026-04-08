"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <div className="icon-wrapper" onClick={() => router.back()}>
      <ArrowLeft />
    </div>
  );
};

export default BackButton;
