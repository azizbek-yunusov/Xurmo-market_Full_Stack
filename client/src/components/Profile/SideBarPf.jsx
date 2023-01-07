import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { sidebarProfile } from "../../data/sidebar";

const SideBarPf = () => {
  return (
    <div className="">
      <div className="col-span-4">
        <div className="flex flex-col justify-between">
          {sidebarProfile.map((item, index) => (
            <Link key={index} to={`${item.path}`} >
              <div className="flex items-center md:my-5">
                {item.icon}
                <p className="ml-2 md:text-xl">{item.name}</p>
              </div>
            </Link>
          ))}
          <div className="flex items-center md:my-5 text-red-500 cursor-pointer">
            <FiLogOut className="md:text-2xl ml-4" />
            <p className="ml-2 md:text-xl">Sign out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarPf;
