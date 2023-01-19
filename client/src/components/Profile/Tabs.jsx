import { Button } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  sidebarProfileEn,
  sidebarProfileRu,
  sidebarProfileUz,
} from "../../data/sidebar";

const Tabs = () => {
  let pathUz =
    localStorage.getItem("i18nextLng") === "uz" ? sidebarProfileUz : false;
  let pathEn =
    localStorage.getItem("i18nextLng") === "en" ? sidebarProfileEn : false;
  let pathRu =
    localStorage.getItem("i18nextLng") === "ru" ? sidebarProfileRu : false;
  const pathname = useLocation().pathname;
  return (
    <div className="w-full flex justify-evenly items-center md:my-1 pb-4 border-b border-b-gray-300">
      {(pathUz || pathEn || pathRu).map((item, index) => (
        <Link key={index} to={`${item.path}`}>
          <Button
            variant={pathname === item.path ? "contained" : "text"}
            className="flex_center w-44"
            size="large"
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
