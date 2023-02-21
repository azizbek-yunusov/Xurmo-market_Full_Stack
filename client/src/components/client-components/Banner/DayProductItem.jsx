import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import Price from "../Helpers/Price";

const DayProductItem = ({ _id, name, ratings, discount, images, price }) => {

  return (
    <div className="overflow-hidden md:pt-0 pt-2 bg-white lg:px-3 px-2 rounded-b-lg flex lg:flex-col justify-around flex-row md:items-center items-start lg:h-[300px] md:h-[170px] h-[140px]">
      <img
        src={images[0].url}
        className="md:h-40 h-28 object-cover"
        alt={name}
      />
      <div className="w-full">
        <div className="w-full">
          <p className="md:text-lg rounded-sm text_color">{name}</p>
        </div>
        <div className="w-full flex md:mt-1 mt-4">
          <Price
            price={price}
            className="md:text-2xl text-lg mr-2 font-semibold text-gray-700"
          />
          <p className="md:text-2xl flex items-center font-semibold text-gray-700">
            {ratings}
            <BsFillStarFill className="text-orange-400" />
          </p>
        </div>
        {/* <div className="w-full flex_betwen hidden md:mt-2 mt-3">
          <div className="">
            {isFavorite ? (
              <button
                onClick={() => deleteFavoriteItem(_id)}
                className="p-1 rounded-full border-none mr-4 border-gray-400"
              >
                <BsFillHeartFill className="text-[32px] text-red-500" />
              </button>
            ) : (
              <button
                onClick={() => addToFavorite(_id)}
                className="p-1 rounded-full border-none mr-4 border-gray-400"
              >
                <BsHeart className="text-[32px] text-gray-400" />
              </button>
            )}
          </div>
          {isCart ? (
            <div className="flex justify-between md:px-3 items-center border-2 border-[#888888] md:py-[6px] py-1 w-full md:rounded-xl rounded-lg md:text-lg text-base transition_normal hover:border-blue-500">
              <Tooltip title="remove from cart">
                <button
                  onClick={() => decrementQtyItem(existItem.productId._id)}
                  className="text-gray-800 px-1 py-1"
                >
                  <AiOutlineMinus />
                </button>
              </Tooltip>
              <p className="font-mono md:text-lg text-gray-800 text-base">
                {existItem.quantity}
              </p>
              <Tooltip title="Increase by one">
                <button
                  onClick={() => addToCartHandle(_id)}
                  className=" tranistion_normal text-gray-800 px-1 py-1"
                >
                  <AiOutlinePlus />
                </button>
              </Tooltip>
            </div>
          ) : (
            <button
              onClick={() => addToCartHandle(_id)}
              className="border-2 border-[#ff8800] py-2 flex items-center justify-center w-full rounded-lg bg_secondary text-lg text-white transition_normal"
            >
              <FiShoppingCart className="md:text-xl" />
              <span className="ml-2 text-base">{t("addcart")}</span>
            </button>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default DayProductItem;
