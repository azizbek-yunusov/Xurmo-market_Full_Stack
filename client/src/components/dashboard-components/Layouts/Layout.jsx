import React from "react";
import { SettingsIcon } from "../Buttons";
import NavbarD from "./NavbarD";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col bg-slate-100 text-black">
        <div className="grid grid-cols-12 gap-0 justify-between w-full">
          <div className="col-span-3 xl:col-span-2 relative bg-[#7e57c2] dark:bg-[#312d4b] border-r dark:border-r-gray-600 overflow-hidden">
            <SideBar />
          </div>
          <div className="min-h-screen h-full col-span-9 xl:col-span-10 bg-white dark:bg-[#312d4b]">
            <NavbarD />
            <div className="xl:px-6 px-4 xl:my-5 my-4">{children}</div>
          </div>
        </div>
      </div>
      <SettingsIcon />
    </>
  );
};

export default Layout;
