import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../reducers/useReducer";
import { FiLogOut } from "react-icons/fi";
import SearchInput from "./SearchInput";

const NavbarD = () => {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const signoutHandler = () => {
    dispatch({ type: "CLEAR" });
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    // window.location.href = "/signin";
    navigate("/signin");
  };
  return (
    <div className=" bg-slate-50">
      <div className="container-full grid grid-cols-8 items-center py-3">
        <div className=" w-full col-span-4 grid grid-cols-3 items-center">
          <Link to={"/dashboard"} className="">
            e-commerce
          </Link>
          <div className="col-span-2">
            <SearchInput />
          </div>
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
