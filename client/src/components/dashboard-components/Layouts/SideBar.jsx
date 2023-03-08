import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { sidebarAdmin } from "../../../data/sidebar";
import Logo from "../../client-components/Helpers/Logo";

const SideBar = () => {
  let { t } = useTranslation(["user"]);
  const pathname = useLocation().pathname;
  return (
    <div className="min-h-screen fixed top-0 left-0 flex flex-col w-14 hover:w-64 md:w-64 h-full text-white transition-all duration-300 border-none z-10 sidebar px-3">
      <div className="flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1 overflow-hidden">
          <li className="my-4 px-4 text-xl font-bold global-font">
            <Link to={"/dashboard"}>
              <Logo className="text-2xl dark:text-gray-100" />
            </Link>
          </li>
          <li className="px-5 hidden md:block overflow-hidden">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-400 uppercase"></div>
            </div>
          </li>
          {sidebarAdmin.map((item, index) => (
            <li key={index}>
              <Link to={`${item.path}`}>
                <div
                  className={`${
                    pathname === item.path
                      ? "sidebar_link-active"
                      : "sidebar-link"
                  }`}
                >
                  {item.icon}
                  <span className="ml-2 text-sm tracking-wide truncate">
                    {t(item.name)}
                  </span>
                </div>
              </Link>
            </li>
          ))}

          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center mt-5 h-8">
              <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                {t("settings")}
              </div>
            </div>
          </li>
          <li>
            <Link to={"/dashboard/cabinet"}>
              <div
                className={`${
                  pathname === "/dashboard/cabinet"
                    ? "sidebar_link-active"
                    : "sidebar-link"
                }`}
              >
                <AiOutlineUser className="md:text-xl ml-4" />
                <span className="ml-2 text-sm tracking-wide truncate">
                  {t("personal")}
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link to={"/cabinet/settings"}>
              <div
                className={`${
                  pathname === "/cabinet/settings"
                    ? "sidebar_link-active"
                    : "sidebar-link"
                }`}
              >
                <AiOutlineSetting className="md:text-xl ml-4" />
                <span className="ml-2 text-sm tracking-wide truncate">
                  {t("settings")}
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
