"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

const RefreshButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handle = async () => {
    setIsLoading(true);
    router.refresh();
    setIsLoading(false);
  };
  return (
    <Button onClick={handle} disabled={isLoading}>
      {isLoading ? <div className="animate-spin"></div> : "Làm mới"}
    </Button>
  );
};

export default RefreshButton;
