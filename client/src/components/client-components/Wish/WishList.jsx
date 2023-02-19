import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import WishProductItem from "./WishProductItem";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { HelmetTitle } from "../../../utils";
import MobileTop from "../Helpers/MobileTop";

const WishList = () => {
  let { t } = useTranslation(["product"]);
  const { favorites } = useSelector((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <HelmetTitle title={t("wish-list")} />
      <div className="">
        <MobileTop name={t("wish")} list={favorites} items={t("items")} />
        <div className="container-full min-h-[600px]">
          {favorites.length ? (
            <div>
              <div className="md:flex hidden md:mt-5">
                <Link to="/">Bosh Sahifa</Link>
                {"/"}
                <Link to="/wishlist">Sevimlilar</Link>
              </div>
              <div className="w-full md:flex hidden justify-between items-center text-lg md:mt-5 border-b pb-3 border-b-gray-200">
                <h1 className="md:text-2xl font-semibold">Sevimlilar</h1>
                <div className="font-semibold">Barchasini o'chirish</div>
              </div>
              <div className="grid md:grid-cols-5 grid-cols-2 md:gap-3 gap-2 md:mt-5 mt-3">
                {favorites.map((item, index) => (
                  <WishProductItem key={index} {...item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="md:min-h-[630px] min-h-[450px] flex justify-center items-start">
              <div className="flex justify-start items-center relative flex-col">
                <img
                  src="/images/wish.png"
                  alt="Shopping bag"
                  className="md:h-80 h-60"
                />
                <h1 className="md:text-2xl text-xl md:mb-5 mb-2 text-gray-600 font-semibold">
                  {t("empty-wish")}
                </h1>
                <h1 className="md:text-lg md:mb-5 mb-3 text-gray-500 text-center">
                  {t("empty-wish-t")}
                </h1>
                <Button
                  onClick={() => navigate("/")}
                  variant="contained"
                  color="secondary"
                >
                  {t("wish-b")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishList;