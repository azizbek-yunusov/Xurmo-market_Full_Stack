import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../reducers/useReducer";
import { FiLogOut } from "react-icons/fi";
import SearchInput from "./SearchInput";
import FullScreen from "./Buttons/FullScreen";
import ThemeToggle from "./Buttons/ThemeToggle";

const NavbarD = () => {
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
  return (
    <div className="sticky top-0 bg-white dark:bg-[#2e2d4a] shadow-md border-b border-b-gray-200 dark:border-b-gray-700 z-50">
      <div className="lg:px-6 px-3 grid grid-cols-8 items-center py-3">
        <div className="w-full col-span-4 flex justify-end items-center">
          <SearchInput />
        </div>
        <div className="col-span-4 flex justify-end items-center">
          <FullScreen />
          <ThemeToggle />
          <div className="flex justify-between select-none">
            <img
              className="w-9 h-9 rounded-full select-none"
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt=""
            />
            {/* <div className="mx-2">
              <p className="text-sm">{userInfo.name}</p>
              <span className="text-xs -mt-1">{userInfo.admin && "Admin"}</span>
            </div> */}
          </div>
          <button onClick={signoutHandler} className="mx-4">
            <FiLogOut className="text-lg text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarD;
