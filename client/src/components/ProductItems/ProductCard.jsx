import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProductCard = ({_id, name, image, price }) => {
  let summa = price * 11280;
  return (
    <div className="overflow-hidden flex tranistion_normal hover:shadow-xl flex-col justify-between h-[440px] rounded-2xl p-3">
      <div className="mt-1">
        <Link to={`/product/${_id}`} className="flex justify-center items-center">
          <img className="h-44" src={image} alt="" />
        </Link>
        <div className="w-full mt-3">
          <h1 className="md:text-base">{name}</h1>
        </div>
      </div>
      <div className="w-full">
        <p className="md:text-lg font-semibold">{summa}</p>
        <p className="md:text-xs font-semibold mt-2 max-w-max bg-yellow-300 p-1 px-2 rounded-md">
          330 000 so'm x 12 oy
        </p>
      </div>
      <div className="w-full flex justify-between items-center mb-2">
        <button className="p-[6px] rounded-md border-2 border-gray-700">
          <FiShoppingCart className=" text-[22px]" />
        </button>
        <button className="border-2 py-[6px] px-5 rounded-lg text-red-600 border-red-500">
          Muddatli to'lov
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
