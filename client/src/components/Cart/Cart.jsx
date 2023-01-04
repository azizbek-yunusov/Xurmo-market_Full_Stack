import { Badge, Space } from "antd";
import React, { useContext, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAddCart from "../../hooks/useAddCart";

const Cart = () => {
  const { access_token } = useSelector((state) => state.auth);
  const { cart } = useAddCart(access_token);
  console.log(cart.length);
  console.log(access_token);
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
