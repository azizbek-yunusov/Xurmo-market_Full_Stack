import { Rate } from "antd";
import React from "react";
import { BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";

const ProductCard = ({ _id, name, images, price, ratings }) => {
  return (
    <div className="overflow-hidden flex tranistion_normal hover:shadow-xl flex-col justify-between h-[440px] rounded-2xl p-3">
      <div className="mt-1">
        <Link
          to={`/product/view/${_id}`}
          className="flex justify-center items-center"
        >
          <img className="h-44" src={images[0].url} alt="" />
        </Link>
        <div className="w-full mt-3">
          <h1 className="md:text-base">{name}</h1>
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
      <div className="w-full flex justify-between items-center mb-2 px-5">
        <button className="p-2 rounded-md border-2 mr-2 border-gray-700">
          <BsHeart className=" text-[22px] text-gray-700" />
        </button>
        <button className="border-2 py-[6px] w-full rounded-lg hover:text-red-600 bg-red-600 text-lg text-white hover:bg-white transition_normal  hover:border-red-500">
          add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
