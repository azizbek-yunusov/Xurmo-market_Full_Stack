import React, { useEffect } from "react";
import SideBarPf from "./SideBarPf";
import Tabs from "./Tabs";
import HelmetTitle from "../../../utils/HelmetTitle";

const LayoutP = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <HelmetTitle title={"My profile"} />
      <div className="container-full min-h-[560px] md:mb-3 flex flex-col text-gray-800">
        <div className="">
          <img
            src="/images/profilebg.png"
            className="h-[200px] w-full rounded-t-2xl"
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
    </>
  );
};

export default LayoutP;
