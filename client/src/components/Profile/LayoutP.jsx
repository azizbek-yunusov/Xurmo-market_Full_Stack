import React from "react";
import { Link } from "react-router-dom";
import SideBarPf from "./SideBarPf";

const LayoutP = ({ children }) => {
  return (
    <div className="container-full h-96 md:my-3 flex flex-col bg-slate-200 text-black">

      <div className="flex">
        <Link className="mx-2" to={"/"}>
          Home
        </Link>
        <span>/</span>
        <Link className="mx-2" to={"/"}>
          Profile
        </Link>
      </div>
      <div className="grid grid-cols-12 gap-x-5 justify-between md:my-7 w-full">
        <div className="col-span-3 relative bg-[#ffffff] dark:bg-[#2e2d4a] border-r dark:border-r-gray-300 overflow-hidden">
          <SideBarPf />
        </div>
        <div className="h-full col-span-9 dark:bg-[#2e2d4a]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutP;
