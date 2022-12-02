import { Button, Dropdown } from "antd";
import React, { useContext } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../reducers/useReducer";

const AuthButton = () => {
  const { state, dispatch } = useContext(UserContext);
  const { userInfo } = state;
  const navigate = useNavigate();
  const signoutHandler = () => {
    dispatch({ type: "CLEAR" });
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    // window.location.href = "/signin";
    toast.error("Sign out");
    navigate("/signin");
  };
  const items = [
    {
      key: "1",
      label: <Link to={"/profile"}>Profile</Link>,
    },
    {
      key: "2",
      label: <Button type="primary" danger onClick={signoutHandler}>Sign Out</Button>,
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomRight"
      arrow
    >
      <div className="">
        <AiOutlineUser className="md:text-2xl cursor-pointer" />
      </div>
    </Dropdown>
  );
};

export default AuthButton;
