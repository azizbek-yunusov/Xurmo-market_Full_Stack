import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../reducers/useReducer";
import NavbarD from "./NavbarD";
import ProductsTable from "./ProductsTable";
import SideBar from "./SideBar";
import TopData from "./TopData";

const HomeDashboard = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const signoutHandler = () => {
    dispatch({ type: "CLEAR" });
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    window.location.href = "/signin";
    // navigate("/signin")
  };
  return (
    <div>
      <div className=" flex flex-col bg-white  text-black">
        <NavbarD />

        <div className="grid grid-cols-6 gap-0 justify-between w-full">
          <div className="col-span-1">
            <SideBar />
          </div>
          <div className="col-span-5 md:px-6">
            <TopData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
