import { Badge, Space } from "antd";
import React, { useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { UserContext } from "../../reducers/useReducer";

const Cart = () => {
  const { state } = useContext(UserContext);
  const {
    cart: { cartItems },
  } = state;
  return (
    <>
      <Link to={"/cart"}>
        <Space size="middle" className="">
          <Badge count={cartItems.length} showZero>
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
