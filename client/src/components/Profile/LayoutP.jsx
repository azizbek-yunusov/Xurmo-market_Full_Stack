import { Breadcrumbs } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { BiHome } from "react-icons/bi";
import { Link } from "react-router-dom";
import HelmetTitle from "../../utils/HelmetTitle";
import SideBarPf from "./SideBarPf";
import ProfileBg from "../../assets/images/profilebg.png";
import Tabs from "./Tabs";

const LayoutP = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <HelmetTitle title={"My profile"} />

      <div className="container-full min-h-[560px] md:my-3 flex flex-col bg-slate-200 text-black">
        <div className="">
          <img
            src={ProfileBg}
            className="h-[200px] w-full rounded-t-2xl"
            alt=""
          />
        </div>
        <div className="grid grid-cols-12 gap-x-5 justify-between md:my-2 w-full">
          <div className="col-span-3 sticky top-5">
            <SideBarPf />
          </div>
          <div className="col-span-9 block ">
            <Tabs />
            <div className="md:mx-10">

            {children}
            </div>
          </div>
        </div>
        {/* <Breadcrumbs>
          <Link to={"/"} className="flex items-center opacity-80">
            <BiHome className="text-base md:mr-1 mb-1" />
            <span>Home</span>
          </Link>
          <Link to={"/"} className="">
            Profile
          </Link>
        </Breadcrumbs> */}
        {/* <div className="grid grid-cols-12 gap-x-5 justify-between md:my-3 w-full">
          <div className="col-span-3 bg-[#ffffff] dark:bg-[#2e2d4a] border-r dark:border-r-gray-300 overflow-hidden">
            <div className="sticky top-5">
              <SideBarPf />
            </div>
          </div>
          <div className="col-span-9 dark:bg-[#2e2d4a]">{children}</div>
        </div> */}
      </div>
    </>
  );
};

export default LayoutP;
