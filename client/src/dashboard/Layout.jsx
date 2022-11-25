import React from "react";
import NavbarD from "./NavbarD";
import SideBar from "./SideBar";

const Layout = ({children}) => {
  return (
    <>
      <div className=" flex flex-col bg-white text-black">
        <NavbarD />

        <div className="grid grid-cols-6 gap-0 justify-between w-full">
          <div className="col-span-1">
            <SideBar />
          </div>
          <div className="col-span-5">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
