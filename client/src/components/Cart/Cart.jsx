import { Badge } from "@mui/material";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  return (
    <>
      <Link to={"/cart"}>
        <Badge showZero badgeContent={cart ? cart.length : 0} color="secondary">
          <FiShoppingCart className="md:text-[26px]  cursor-pointer text-gray-700" />
        </Badge>
      </Link>
    </>
  );
};

export default Cart;
