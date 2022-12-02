import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBox = () => {
  return (
    <form className="flex items-center w-full ">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full min-w-[200px]">
        <input
          type="text"
          id="simple-search"
          className="bg-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 py-[14px] "
          placeholder="Search"
          required
        />
      </div>
      <button
        type="submit"
        className="p-2.5 px-6 text-sm font-medium text-white primary_bg rounded-xl focus:ring-4 focus:outline-none focus:ring-blue-300 "
      >
        <FiSearch className="md:text-2xl font-bold" />
      </button>
    </form>
  );
};

export default SearchBox;
