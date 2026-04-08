"use client";
import useMobile from "@/hooks/use-mobile";
import { LogInIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import CustomAvatar from "../custom/custom-avatar";
import BackButton from "./back-button";
import GoogleButton from "./google-button";
import LogoutButton from "./logout-button";
import TitlePath from "./title-path";

const TopBar = () => {
  const session = useSession();
  const isMobile = useMobile();
  return (
    <header className="flex items-center justify-between h-16 px-4 py-2">
      <BackButton />
      <TitlePath />
      {session.data ? (
        <>
          <div className="flex gap-2">
            <CustomAvatar
              name={session.data.user?.name as string}
              src={session.data.user?.image as string}
              type="name-left"
            />
            {isMobile && <LogoutButton />}
          </div>
        </>
      ) : (
        <GoogleButton>
          {isMobile ? <LogInIcon /> : "Đăng nhập với Google"}
        </GoogleButton>
      )}
    </header>
  );
};

export default TopBar;
