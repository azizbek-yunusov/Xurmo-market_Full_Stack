import React from "react";
import { useSelector } from "react-redux";
import WishProductItem from "../Wish/WishProductItem";
import LayoutP from "./LayoutP";
import Wish from "../../assets/images/wish.png";

const Favorites = () => {
  const { favorites } = useSelector((state) => state);

  return (
    <LayoutP>
      <div className="">
        <h1 className="text-2xl text-gray-800 font-semibold md:mb-4">
          Sevimlilar
        </h1>
        {favorites.length ? (
          <div className="grid md:grid-cols-4 md:gap-4">
            {favorites.map((item, index) => (
              <WishProductItem key={index} {...item} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col">
            <img src={Wish} className="h-52" alt="" />
            <h1 className="text-2xl text-gray-800 font-semibold md:mb-5">
              Favorites list is empty
            </h1>
          </div>
        )}
      </div>
    </LayoutP>
  );
};

export default Favorites;
