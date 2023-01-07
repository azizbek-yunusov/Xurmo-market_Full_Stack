import { Badge, Space } from "antd";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  return (
    <>
      <Link to={"/cart"}>
        <Space size="middle" className="">
          <Badge count={cart ? cart.length : 0} showZero>
            <FiShoppingCart
              shape="square"
              className="md:text-2xl cursor-pointer"
            />
          </Badge>
        </Space>
      </Link>
    </>
  );
};

export default Cart;
