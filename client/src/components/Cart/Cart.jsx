import { Badge, Space } from "antd";
import React, { useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

const Cart = () => {
  const state = useContext(GlobalState)
  const [cart] = state.userAPI.cart
  return (
    <>
      {cart ? (
        <Link to={"/cart"}>
          <Space size="middle" className="">
            <Badge count={cart.length} showZero>
              <FiShoppingCart
                shape="square"
                className="md:text-2xl cursor-pointer"
              />
            </Badge>
          </Space>
        </Link>
      ) : null}{" "}
    </>
  );
};

export default Cart;
