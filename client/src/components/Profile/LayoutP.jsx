import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HelmetTitle from "../../utils/HelmetTitle";
import SideBarPf from "./SideBarPf";

const LayoutP = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <HelmetTitle title={"My profile"} />

      <div className="container-full min-h-[450px] md:my-3 flex flex-col bg-slate-200 text-black">
        <div className="flex">
          <Link className="mx-2" to={"/"}>
            Home
          </Link>
          <span>/</span>
          <Link className="mx-2" to={"/"}>
            Profile
          </Link>
        </div>
        <div className="grid grid-cols-12 gap-x-5 justify-between md:my-3 w-full">
          <div className="col-span-3 bg-[#ffffff] dark:bg-[#2e2d4a] border-r dark:border-r-gray-300 overflow-hidden">
            <SideBarPf />
          </div>
          <div className="col-span-9 dark:bg-[#2e2d4a]">{children}</div>
        </div>
      </div>
    </>
  );
};

export default LayoutP;
