import { Button, Dropdown } from "antd";
import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../redux/actions/authAction";

const AuthButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOutHandle = () => {
    dispatch(signOut());
    navigate("/signin")
    toast.success("Sign out ")
  };
  const items = [
    {
      key: "1",
      label: <Link to={"/myprofile"}>Profile</Link>,
    },
    {
      key: "2",
      label: (
        <Button type="primary" danger onClick={signOutHandle}>
          Sign Out
        </Button>
      ),
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomRight"
      trigger={["click"]}
      className="flex_center cursor-pointer"
    >
      <div className="">
        <div className="flex items-center">
          <img
            src="https://www.ihp.ie/wp-content/uploads/profile-img.jpg"
            alt=""
            className="h-7 rounded-full"
          />
          <p className="ml-1">{"aziz"}</p>
        </div>
      </div>
    </Dropdown>
  );
};

export default AuthButton;
