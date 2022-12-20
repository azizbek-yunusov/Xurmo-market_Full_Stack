import { Button, Dropdown } from "antd";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
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
    navigate("/signin");
    toast.success("Successfuly!!");
  };
  const items = [
    {
      key: "1",
      label: <Link to={"/myprofile"}>Profile</Link>,
    },
    {
      key: "2",
      label: (
        <Button type="primary" danger onClick={signoutHandler}>
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
      arrow
      className="flex justify-center items-center"
    >
      <div className="">
        <div className="flex items-center">
          <img
            src="https://www.ihp.ie/wp-content/uploads/profile-img.jpg"
            alt=""
            className="h-7 rounded-full"
          />
          <p className="ml-1">{userInfo.name}</p>
        </div>
      </div>
    </Dropdown>
  );
};

export default AuthButton;
