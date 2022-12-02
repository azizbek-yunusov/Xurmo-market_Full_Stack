import { Badge, Space } from "antd";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const Cart = () => {
  return (
    <Space size="middle">
      <Badge count={0} showZero>
        <FiShoppingCart shape="square" className="md:text-2xl cursor-pointer" />
      </Badge>
    </Space>
  );
};

export default Cart;
