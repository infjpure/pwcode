import { auth } from "@/auth";
import LogoutButton from "./logout-button";
import NavList from "./nav-list";

const LeftBar = async () => {
  const session = await auth();
  return (
    <aside className="flex-col items-center justify-between hidden w-16 px-2 py-4 md:flex shadow-inner">
      <div>PW</div>
      <NavList type={"col"} />
      <div>{session?.user && <LogoutButton />}</div>
    </aside>
  );
};

export default LeftBar;
