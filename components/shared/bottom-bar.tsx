import NavList from "./nav-list";

const BottomBar = async () => {
  return (
    <aside className="sticky bottom-0 left-0 right-0 z-50 flex items-center justify-around h-16 py-2 bg-white md:hidden shadow-inner">
      <NavList type={"row"} />
    </aside>
  );
};

export default BottomBar;
