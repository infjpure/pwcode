"use client";
import { useEffect, useState } from "react";

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false); // Ví dụ: 768px là ngưỡng mobile

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};

export default useMobile;
