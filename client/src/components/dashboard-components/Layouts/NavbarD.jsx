import React from "react";
import { FullScreen, ThemeToggle, UserButton, TransleteD } from "../Buttons";
import SearchInput from "../Search/SearchInput";

const NavbarD = () => {
  return (
    <div className="sticky top-0 bg-white dark:bg-[#312d4b] shadow-mds dark:shadow-none border-b border-b-gray-200 dark:border-b-gray-600 z-50">
      <div className="lg:px-6 px-3 grid grid-cols-8 items-center py-4">
        <div className="w-full col-span-5 flex justify-start items-center">
          <div>
            <SearchInput />
          </div>
        </div>
        <div className="col-span-3 flex justify-end items-center">
          <TransleteD />
          <FullScreen />
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default NavbarD;
