import React from "react";
import { useTranslation } from "react-i18next";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useGlobalApi } from "../../../hooks";

const AddToWish = ({ productId }) => {
  const { t } = useTranslation(["product"]);
  const { favorites, auth } = useSelector((state) => state);
  const { addToFavorite, deleteFavoriteItem } = useGlobalApi(auth.access_token);

  const existItemWish = favorites?.find((x) => x.productId._id === productId);
  const isFavorite = existItemWish === undefined ? false : true;
  return (
    <div className="">
      {isFavorite ? (
        <button
          onClick={() => deleteFavoriteItem(productId)}
          className="p-1 rounded-full border-none md:mr-4 border-gray-400"
        >
          <BsFillHeartFill className="text-3xl text-red-500" />
        </button>
      ) : (
        <button
          onClick={() => addToFavorite(productId)}
          className="p-1 rounded-full border-none md:mr-4 border-gray-400"
        >
          <BsHeart className="text-3xl text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default AddToWish;
