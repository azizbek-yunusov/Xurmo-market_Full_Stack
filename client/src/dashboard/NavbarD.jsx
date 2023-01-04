import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import SearchInput from "./SearchInput";
import FullScreen from "./Buttons/FullScreen";
import ThemeToggle from "./Buttons/ThemeToggle";
import { UserButton } from "./Buttons";

const NavbarD = () => {
  return (
    <div className="sticky top-0 bg-white dark:bg-[#2e2d4a] shadow-md border-b border-b-gray-200 dark:border-b-gray-700 z-50">
      <div className="lg:px-6 px-3 grid grid-cols-8 items-center py-3">
        <div className="w-full col-span-4 flex justify-end items-center">
          <SearchInput />
        </div>
        <div className="col-span-4 flex justify-end items-center">
          <FullScreen />
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default NavbarD;
