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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl outline-none right-0 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 block w-full pl-6 py-[14px] "
          placeholder="Search"
          required
        />
      </div>
      <button
        type="submit"
        className="ml-3 p-3 px-5 text-sm font-medium text-white primary_bg rounded-3xl focus:ring-4 focus:outline-none focus:ring-blue-300 "
      >
        <FiSearch className="md:text-2xl font-bold" />
      </button>
    </form>
  );
};

export default SearchBox;
