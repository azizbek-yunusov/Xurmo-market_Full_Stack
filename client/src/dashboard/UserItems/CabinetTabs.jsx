import { Button } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarAdminUz } from "../../data/sidebar";

const CabinetTabs = () => {
  const pathname = useLocation().pathname;

  return (
      <div className="flex my-4 rounded-xl bg-white shadow-lg">
        <div className="flex justify-center items-center rounded-xl py-3 md:px-7">
          <div className="w-full flex justify-between items-center ">
            {sidebarAdminUz.map((item, index) => (
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
        </div>
      </div>
  );
};

export default CabinetTabs;
