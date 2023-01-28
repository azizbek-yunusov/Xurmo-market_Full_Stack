import React from "react";
import NavbarD from "./NavbarD";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col bg-slate-100 text-black">
      <div className="grid grid-cols-12 gap-0 justify-between w-full">
        <div className="col-span-2 relative bg-[#7e57c2] dark:bg-[#2e2d4a] overflow-hidden">
          <SideBar />
        </div>
        <div className="min-h-screen h-full col-span-10 bg-[#f5f5f5] dark:bg-[#2e2d4a]">
          <NavbarD />
          <div className="px-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
