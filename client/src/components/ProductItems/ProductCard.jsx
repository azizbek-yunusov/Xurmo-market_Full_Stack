import { Rate } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { UserContext } from "../../reducers/useReducer";

const ProductCard = (props) => {
  const { _id, name, images, price, ratings } = props;
  const { state, dispatch } = useContext(UserContext);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === _id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
  };
  return (
    <div className="overflow-hidden flex tranistion_normal hover:shadow-xl flex-col justify-between h-[440px] rounded-2xl p-3 px-4">
      <div className="">
        <Link
          to={`/product/view/${_id}`}
          className="flex justify-center items-center"
        >
          <img className="h-48" src={images[0].url} alt="" />
        </Link>
        <div className="w-full mt-1">
          <h1 className="md:text-base font-semibold">{name}</h1>
        </div>
      </div>
      <div className="w-full">
        <p className="md:text-lg font-semibold">{price}$</p>
        <p className="md:text-xs font-semibold mt-2 max-w-max bg-yellow-300 p-1 px-2 rounded-md">
          330 000 so'm x 12 oy
        </p>
        <div className="flex mt-2">
          <h1 className="text-base text-gray-700 mr-2">
            {ratings?.toFixed(1)}
          </h1>
          <Rate className="text-base" disabled allowHalf value={ratings} />
        </div>
      </div>
      <div className="w-full flex justify-between items-center px-3">
        <button className="p-[6px] rounded-md border-2 mr-2 border-gray-400">
          <BsHeartFill className=" text-[26px] text-gray-400" />
        </button>
        <button
          onClick={() =>
            addToCartHandler({ _id, name, images, price, ratings })
          }
          className="border-2 border-red-600 py-[6px] w-full rounded-lg hover:text-red-600 bg-red-600 text-lg text-white hover:bg-white transition_normal  hover:border-red-500"
        >
          add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
