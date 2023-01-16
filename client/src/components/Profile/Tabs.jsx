import { Button } from "@material-tailwind/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarProfile } from "../../data/sidebar";

const Tabs = () => {
  const pathname = useLocation().pathname;
  return (
    <div className="w-full flex justify-evenly items-center md:my-1 pb-4 border-b border-b-gray-300">
      {sidebarProfile.map((item, index) => (
        <Link key={index} to={`${item.path}`}>
          <Button
            variant={pathname === item.path ? "gradient" : "text"}
            className="flex_center w-52"
          >
            <div
              className={`flex items-center ${
                pathname === item.path ? "" : ""
              }`}
            >
              {item.icon}
              <p className="ml-1">{item.name}</p>
            </div>
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
