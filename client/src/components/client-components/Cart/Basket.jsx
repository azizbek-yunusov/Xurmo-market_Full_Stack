import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Products from "./Products";
import { useTranslation } from "react-i18next";
import { HelmetTitle } from "../../../utils";

const Basket = () => {
  let { t } = useTranslation(["product"]);
  const { cart } = useSelector((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <HelmetTitle title={t("cart")} />
      <div className="md:my-5 my-3">
        {cart.length ? (
          <Products cart={cart} />
        ) : (
          <div className="md:min-h-[630px] min-h-[450px] flex justify-center items-start">
            <div className="flex justify-start items-center relative flex-col">
              <img
                src="/images/shopping-basket.png"
                alt="Shopping bag"
                className="md:h-96 h-64"
              />
              <h1 className="md:text-3xl text-xl md:mb-5 mb-3 text-gray-600 font-semibold">
                {t("empty-cart")}
              </h1>
              <Button
                onClick={() => navigate("/")}
                variant="contained"
                color="primary"
              >
                {t("empty-cart")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Basket;
