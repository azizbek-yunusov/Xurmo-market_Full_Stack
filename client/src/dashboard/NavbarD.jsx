import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../reducers/useReducer";
import { FiLogOut } from "react-icons/fi";
import SearchInput from "./SearchInput";

const NavbarD = () => {
  const { dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const signoutHandler = () => {
    dispatch({ type: "CLEAR" });
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    // window.location.href = "/signin";
    navigate("/signin");
  };
  return (
    <div className="sticky top-0 bg-slate-50 shadow-md border-b border-b-gray-200 z-50">
      <div className="lg:px-6 px-3 grid grid-cols-8 items-center py-3">
        <div className="w-full col-span-4 flex justify-end items-center">
          <SearchInput />
        </div>
        <div className="col-span-4 flex justify-end items-center">
          <div className="flex items-center">
            <img
              className="w-8 h-8 rounded-full"
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt=""
            />
            <p className=""></p>
          </div>
          <button onClick={signoutHandler} className="mx-4">
            <FiLogOut className="text-xl text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarD;
