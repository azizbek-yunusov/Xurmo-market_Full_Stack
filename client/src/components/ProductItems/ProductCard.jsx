import { Rating } from "@mui/material";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Price from "../Helpers/Price";
import AddCartForCard from "./AddCartForCard";
import AddWishForCard from "./AddWishForCard";
import { toggleLoginModal } from "../../redux/auth";
import { addToFavorite, deleteFromFavorite } from "../../redux/favorite";

const ProductCard = ({ _id, name, slug, images, price, ratings, discount }) => {
  const dispatch = useDispatch();
  const { access_token, isLogged } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { favorites } = useSelector((state) => state.favorite);

  const existItem = cart?.find(
    (x) => x.productId?._id.toString() === _id.toString()
  );
  const isCart = existItem === undefined ? false : true;
  const existItemWish = favorites?.find((x) => x._id === _id);
  const isFavorite = existItemWish === undefined ? false : true;
  const handleAddToWishList = (id) => {
    try {
      dispatch(addToFavorite({ access_token, id }));
      if (isLogged) {
        console.log("add");
      } else {
        dispatch(toggleLoginModal());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveToWishItem = (id) => {
    if (!isLogged) {
      dispatch(toggleLoginModal());
    } else {
      dispatch(deleteFromFavorite({ access_token, id }));
    }
  };
  return (
    <>
      <div className="overflow-hidden bg-white relative flex tranistion_normal md:hover:shadow-xl flex-col justify-between md:h-[400px] h-[330px] md:border border-gray-200 md:hover:border-gray-50 md:rounded-xl rounded-md md:p-3 p-2 md:px-4">
        {discount > 0 && (
          <div className="md:px-2 p-[2px] px-1 md:py-1 absolute top-2 left-2 md:text-sm text-xs font-semibold md:rounded-lg rounded bg-red-600 text-white">
            -{discount}
            {"%"}
          </div>
        )}
        <div className="md:hidden absolute top-1 right-1 z-50 rounded-full">
          {isFavorite ? (
            <button
              onClick={() => handleRemoveToWishItem(_id)}
              className="rounded-full border-none border-gray-400 p-1 flex_center"
            >
              <BsFillHeartFill className="text-3xl text-red-500" />
            </button>
          ) : (
            <button
              onClick={() => handleAddToWishList(id)}
              className="p-1 rounded-full border-none border-gray-400"
            >
              <BsHeart className="text-3xl heart text-gray-400" />
            </button>
          )}
        </div>
        <div className="">
          <Link
            to={`/product/view/${slug}`}
            className="flex justify-center items-center"
          >
            <img
              src={images[0].url}
              alt={name}
              className="md:h-44 h-[140px] object-cover"
            />
          </Link>
          <div className="w-full mt-1 text-gray-800">
            <h1 className="md:text-base text-sm font-semibold global-font">
              {name}
            </h1>
          </div>
        </div>
        <div className="w-full text-gray-800">
          {discount > 0 ? (
            <div className="">
              <Price
                price={price - (price * discount) / 100}
                className="md:text-lg font-semibold"
              />
              <Price
                price={price}
                className="md:text-lg line-through text-gray-400"
              />
            </div>
          ) : (
            <Price price={price} className="md:text-lg font-semibold" />
          )}

          <div className="flex items-center md:mt-2 mt-1">
            <h1 className="text-base text-gray-700 mr-2">
              {ratings?.toFixed(1)}
            </h1>
            <Rating
              icon={<AiFillStar fontSize="20px" />}
              emptyIcon={<AiOutlineStar fontSize="20px" />}
              readOnly
              value={ratings || 0}
            />
          </div>
        </div>
        <div className="w-full flex_betwen xl:px-2">
          <AddWishForCard
            id={_id}
            isFavorite={isFavorite}
            access_token={access_token}
          />
          <AddCartForCard
            isCart={isCart}
            existId={existItem?.productId?._id}
            id={_id}
            quantity={existItem?.quantity}
            access_token={access_token}
          />
        </div>
      </div>
    </>
  );
};
export default ProductCard;
