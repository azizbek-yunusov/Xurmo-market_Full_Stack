import { Badge, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const fetchCart = async () => {
    try {
      const { data } = await axios.get("/mycart", {
        headers: { Authorization: localStorage.getItem("jwt") },
      });
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <Link to={"/cart"}>
        <Space size="middle">
          <Badge count={cart ? cart.length : "0"} showZero>
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
