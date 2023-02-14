import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import WishProductItem from "../Wish/WishProductItem";
import LayoutP from "./LayoutP";

const Favorites = () => {
  const { favorites } = useSelector((state) => state);
  const { t } = useTranslation(["product"]);

  return (
    <LayoutP>
      <div className="">
        {favorites.length ? (
          <div className="grid md:grid-cols-4 md:gap-4">
            {favorites.map((item, index) => (
              <WishProductItem key={index} {...item} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col">
            <img src="/images/wish.png" className="h-52" alt="" />
            <h1 className="text-2xl text-gray-800 font-semibold md:mb-5">
              {t("empty-wish")}
            </h1>
          </div>
        )}
      </div>
    </LayoutP>
  );
};

export default Favorites;
