import { Button } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  sidebarProfileEn,
  sidebarProfileRu,
  sidebarProfileUz,
} from "../../../data/sidebar";

const Tabs = () => {
  let pathUz =
    localStorage.getItem("i18nextLng") === "uz" ? sidebarProfileUz : false;
  let pathEn =
    localStorage.getItem("i18nextLng") === "en" ? sidebarProfileEn : false;
  let pathRu =
    localStorage.getItem("i18nextLng") === "ru" ? sidebarProfileRu : false;
  const pathname = useLocation().pathname;
  return (
    <div className="flex justify-center">
      <div className="w-full flex justify-center items-center md:-mt-11 mt-2 rounded-xl bg-[#ffffff4d] backdrop-blur-lg py-3 md:border border-gray-200 md:px-7 px-3">
        <div className="w-full flex justify-between items-center ">
          {(pathUz || pathEn || pathRu).map((item, index) => (
            <Link key={index} to={`${item.path}`}>
              <Button
                variant={pathname === item.path ? "contained" : "text"}
                size="large"
              >
                <div
                  className={`flex items-center ${
                    pathname === item.path ? "" : ""
                  }`}
                >
                  {item.icon}
                  <p className="md:block hidden ml-1">{item.name}</p>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
