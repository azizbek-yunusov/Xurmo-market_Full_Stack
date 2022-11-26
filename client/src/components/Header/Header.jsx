import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../reducers/useReducer";

const Header = () => {
  const { state, dispatch } = useContext(UserContext);
  const { userInfo } = state;
  const navigate = useNavigate();
  const signoutHandler = () => {
    dispatch({ type: "CLEAR" });
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    // window.location.href = "/signin";
    navigate("/signin");
  };
  const userNavigation = () => {
    if (userInfo) {
      return (
        <>
          <li>
            <Link to={"/"} className="">
              Home
            </Link>
          </li>
          {userInfo.admin ? (
            <li>
              <Link to={"/dashboard"} className="">
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
            <Link to={"/signup"}>Sign Up</Link>
          </li>
          <li>
            <Link to={"/signin"}>Sign In</Link>
          </li>
        </>
      );
    }
  };
  return (
    <>
      {userInfo && userInfo.admin ? null : (
        <div className="">
          <div className="container-full flex justify-between items-center md:py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-red-600 md:text-4xl font-bold">
                olcha
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                {userNavigation()}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
