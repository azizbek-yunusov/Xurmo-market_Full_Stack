import React from "react";
import NavbarD from "./NavbarD";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col bg-slate-50 text-black">
      <div className="grid grid-cols-12 gap-0 justify-between w-full">
        <div className="col-span-2 bg-violet-700">
          <SideBar />
        </div>
        <div className="col-span-10 bg-slate-50 ml-3">
          <NavbarD />

          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
