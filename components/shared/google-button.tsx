"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

const GoogleButton = ({ children }: Props) => {
  return (
    <div>
      <Button onClick={() => signIn("google")} variant={"outline"}>
        {children}
      </Button>
    </div>
  );
};

export default GoogleButton;
