import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useGlobalApi from "../../hooks/useGlobalApi";
import WishProductItem from "./WishProductItem";

const WishList = () => {
  const { access_token } = useSelector((state) => state.auth);
  const { addToCartHandle, decrementQtyItem, deleteHandle } =
    useGlobalApi(access_token);
  const { favorite } = useSelector((state) => state);
  console.log(favorite);
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Helmet>
        <title data-rh="true">Sevimlilar | E-commerce</title>
      </Helmet>

      <div className="">
        <div className="container-full">
          {favorite.length ? (
            <div>
              <div className="flex md:mt-5">
                <Link to="/">Bosh Sahifa</Link>
                {"/"}
                <Link to="/wishlist">Sevimlilar</Link>
              </div>
              <div className="w-full flex justify-between items-center md:text-lg md:mt-5 border-b pb-3 border-b-gray-200">
                <h1 className="md:text-2xl font-semibold">Sevimlilar</h1>
                <div className="font-semibold">Barchasini o'chirish</div>
              </div>
              <div className="grid md:grid-cols-5 gap-3 md:mt-5">
                {favorite.map((item, index) => (
                  <WishProductItem key={index} {...item.productId} />
                ))}
              </div>
            </div>
          ) : (
            <div className="container-full h-96 flex justify-center items-center">
              <h1 className="md:text-2xl">Empty</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishList;
