import { Rating, Tooltip } from "@mui/material";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useGlobalApi from "../../../hooks/useGlobalApi";

const WishProductItem = ({ productId }) => {
  const { _id, name, images, price, ratings, discount } = productId;
  const { cart, auth } = useSelector((state) => state);
  const { addToCartHandle, decrementQtyItem, deleteFavoriteItem } =
    useGlobalApi(auth.access_token);

  const existItem = cart?.find((x) => x.productId._id === _id);
  const isCart = existItem === undefined ? false : true;
  return (
    <>
      {typeof productId == "object" ? (
        <div className="overflow-hidden relative flex tranistion_normal hover:shadow-xl flex-col justify-between h-[400px] border border-gray-200 hover:border-gray-50 rounded-xl p-3 px-4">
          {discount > 0 && (
            <div className="md:px-2 md:py-1 absolute top-2 left-2 md:text-sm font-semibold rounded-lg bg-red-600 text-white">
              {discount}
              {"%"}
            </div>
          )}
          <div
            onClick={() => deleteFavoriteItem(_id)}
            className="md:p-2 absolute top-2 right-2 md:text-lg border border-gray-300 cursor-pointer font-semibold rounded-full bg-white transition_normal hover:scale-105 text-gray-700"
          >
            <CgClose />
          </div>
          <div className="">
            <Link
              to={`/product/view/${_id}`}
              className="flex justify-center items-center"
            >
              <img className="h-44" src={images[0]?.url} alt={name} />
            </Link>
            <div className="w-full mt-1">
              <h1 className="md:text-base font-semibold global-font">{name}</h1>
            </div>
          </div>
          <div className="w-full">
            <p className="md:text-lg font-semibold">{price}$</p>
            <div className="flex mt-2">
              <h1 className="text-base text-gray-700 mr-2">
                {ratings?.toFixed(1)}
              </h1>
              <Rating className="text-base" readOnly allowHalf value={ratings} />
            </div>
          </div>
          <div className="w-full flex justify-between items-center px-2">
            {isCart ? (
              <div className="w-full flex justify-between items-center px-2">
                <Link
                  to={"/cart"}
                  className="p-[10px] hover:border-gray-400 rounded-md text-white bg-purple-500"
                >
                  <BsCartCheck className="md:text-xl text-white" />
                </Link>

                <div className="md:ml-2 w-full flex justify-between px-3 items-center border-2 border-gray-400 py-[6px] rounded-lg text-lg transition_normal hover:border-blue-500">
                  <Tooltip title="remove from cart">
                    <button
                      onClick={() => decrementQtyItem(existItem.productId._id)}
                      className="text-gray-600 px-4 py-1"
                    >
                      <AiOutlineMinus />
                    </button>
                  </Tooltip>
                  <p className="font-mono text-lg">{existItem.quantity}</p>
                  <Tooltip title="Increase by one">
                    <button
                      onClick={() => addToCartHandle(_id)}
                      className=" tranistion_normal  px-4 py-1"
                    >
                      <AiOutlinePlus />
                    </button>
                  </Tooltip>
                </div>
              </div>
            ) : (
              <button
                onClick={() => addToCartHandle(_id)}
                className="border-2 border-purple-500 py-2 flex items-center justify-center w-full rounded-lg hover:text-indigo-600 bg-purple-500 text-lg text-white hover:bg-white transition_normal  hover:border-indigo-500"
              >
                <FiShoppingCart className="md:text-xl" />
                <span className="ml-2 text-base">add to cart</span>
              </button>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default WishProductItem;
