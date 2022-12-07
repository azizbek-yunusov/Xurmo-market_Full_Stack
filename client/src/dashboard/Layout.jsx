import React from "react";
import NavbarD from "./NavbarD";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col bg-slate-50 text-black">
      <div className="grid grid-cols-12 gap-0 justify-between w-full">
        <div className="col-span-2 relative bg-[#7e57c2] dark:bg-[#2e2d4a] border-r dark:border-r-gray-700">
          <SideBar />
        </div>
        <div className="min-h-screen h-full col-span-10 bg-slate-50 dark:bg-[#2e2d4a]">
          <NavbarD />

          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
