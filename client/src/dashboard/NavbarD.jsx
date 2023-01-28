import React from "react";
import FullScreen from "./Buttons/FullScreen";
import ThemeToggle from "./Buttons/ThemeToggle";
import { UserButton } from "./Buttons";
import SearchInput from "./Search/SearchInput";

const NavbarD = () => {
  return (
    <div className="sticky top-0 bg-white dark:bg-[#2e2d4a] shadow-md border-b border-b-gray-200 dark:border-b-gray-700 z-50">
      <div className="lg:px-6 px-3 grid grid-cols-8 items-center py-1">
        <div className="w-full col-span-6 flex justify-start items-center">
          <div>
            <SearchInput />
          </div>
        </div>
        <div className="col-span-2 flex justify-end items-center">
          <FullScreen />
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default NavbarD;
