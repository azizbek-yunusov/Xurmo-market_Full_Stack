import React from "react";
import NavbarD from "./NavbarD";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col bg-slate-200 text-black">
      <NavbarD />

      <div className="grid grid-cols-12 bg-violet-800 gap-0 justify-between w-full">
        <div className="col-span-2">
          <SideBar />
        </div>
        <div className="col-span-10 rounded-3xl my-2 bg-slate-200 mr-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
