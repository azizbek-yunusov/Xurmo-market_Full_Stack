import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../reducers/useReducer";
import Layout from "./Layout";
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
    <Layout>
      <TopData />
    </Layout>
  );
};

export default HomeDashboard;
