import { Dropdown } from "antd";
import { AiOutlineUser } from "react-icons/ai";

import React from "react";
import { Link } from "react-router-dom";

const UserButton = () => {
  
  const items = [
    {
      key: "1",
      label: <Link to={"/signin"}>Sign In</Link>,
    },
    {
      key: "2",
      label: (
        <Link to={"/signup"}>Sign Up</Link>
      )
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

export default UserButton;
