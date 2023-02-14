import React, { useEffect } from "react";
import SideBarPf from "./SideBarPf";
import Tabs from "./Tabs";
import HelmetTitle from "../../../utils/HelmetTitle";
import { useSelector } from "react-redux";
import { MdLocationOn } from "react-icons/md";
import { AiFillCalendar } from "react-icons/ai";
import moment from "moment";

const LayoutP = ({ children }) => {
  const { user, access_token } = useSelector((state) => state.auth);
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <HelmetTitle title={"My profile"} />
      {/* Desktop responsive */}
      <div className="container-full min-h-[560px] md:mb-3 md:flex flex-col hidden text-gray-800">
        <div className="">
          <img
            src="/images/profilebg.png"
            className="md:h-[200px] object-cover w-full rounded-t-2xl"
            alt=""
          />
        </div>
        <div className="grid grid-cols-12 gap-x-5 justify-between md:my-2 w-full">
          <div className="col-span-3 sticky top-5">
            <SideBarPf />
          </div>
          <div className="col-span-9 block md:px-12">
            <Tabs />
            <div className="md:my-5">{children}</div>
          </div>
        </div>
      </div>
      {/* Mobile responsive */}
      <div className="container-full min-h-[460px] my-5 flex flex-col md:hidden text-gray-800">
        <div className="rounded-xl border_primary relative pb-3">
          <img
            src="/images/profilebg.png"
            className="h-[150px] w-full object-cover rounded-t-xl"
            alt="Bg"
          />
          <div className="flex_col items-center">
            <div className="z-40 bg-white dark:bg-purple-800/30 dark:backdrop-blur-sm p-[6px] max-w-max rounded-2xl -mt-14">
              <img
                src={user.avatar?.url || "/images/profile.png"}
                className="h-32 w-32 z-40 object-cover rounded-xl bg-blue-500/50"
                alt=""
              />
            </div>
            <h1 className="text-2xl mt-2 mb-3 text-gray-600 dark:text-gray-200 font-semibold">
              {user.name}
            </h1>
            <p className="flex text-gray-400 mb-1">
              <MdLocationOn className="text-xl" />
              Uzbekistan
            </p>
            <p className="flex text-gray-400 ">
              <AiFillCalendar className="text-xl" />
              {moment(user.createdAt).format("LL")}
            </p>
          </div>
        </div>
        <Tabs />
        <div className="md:my-5 border-t border-t-gray-200">{children}</div>
      </div>
    </>
  );
};

export default LayoutP;
