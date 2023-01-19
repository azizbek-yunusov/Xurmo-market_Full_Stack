import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import WishProductItem from "./WishProductItem";
import Wish from "../../assets/images/wish.png";
import { Button } from "@mui/material";

const WishList = () => {
  const { favorites } = useSelector((state) => state);
  const navigate = useNavigate();
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
        <div className="container-full min-h-[600px]">
          { favorites.length ? (
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
                {favorites.map((item, index) => (
                  <WishProductItem key={index} {...item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col">
              <img src={Wish} className="h-96" alt="" />
              <h1 className="text-3xl text-gray-700 font-semibold md:mb-5">
                Favorites list is empty
              </h1>
              <Button
                onClick={() => navigate("/")}
                size="lg"
                variant="gradient"
                className="tracking-wide"
              >
                continue shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishList;
