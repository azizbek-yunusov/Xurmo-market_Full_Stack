import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../reducers/useReducer";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const { userInfo } = state;
  const signoutHandler = () => {
    dispatch({ type: "CLEAR" });
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    // window.location.href = "/signin";
    navigate("/signin")
  };
  // console.log(userInfo);
  const userNavigation = () => {
    if (userInfo) {
      return (
        <>
          <li>
            <Link
              to={"/"}
              className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              aria-current="page"
            >
              Home
            </Link>
          </li>
          {userInfo.admin ? (
            <li>
              <Link
                to={"/dashboard"}
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
              >
                Dashboard
              </Link>
            </li>
          ) : null}
          <li className="bg-red-600 p-1 rounded-sm">
            <button
              onClick={signoutHandler}
              className="block py-2 bg-red-600 pl-3 pr-4 text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white"
              aria-current="page"
            >
              Sign Out
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link
              to={"/signup"}
              className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              aria-current="page"
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              to={"/signin"}
              className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              aria-current="page"
            >
              Sign In
            </Link>
          </li>
        </>
      );
    }
  };
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900 z-[1000]">
      <div className="container-full flex flex-wrap items-center justify-between mx-auto">
        <a href="3d" className="flex items-center">
         
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            e-commerce
          </span>
        </a>
        <button
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {userNavigation()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
