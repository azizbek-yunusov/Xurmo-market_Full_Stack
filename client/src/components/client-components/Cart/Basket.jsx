import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Products from "./Products";

const Basket = () => {
  const { cart } = useSelector((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Helmet>
        <title data-rh="true">Shopping Cart | E-commerce</title>
      </Helmet>

      <div className="md:my-5">
        {cart.length ? (
          <Products cart={cart} />
        ) : (
          <div className="min-h-[630px] flex justify-center items-start">
            <div className="flex justify-start items-center relative flex-col">
              <img src="/images/shopping-basket.png" alt="Shopping bag" className="h-96" />
              <h1 className="text-3xl md:mb-5 text-gray-600 font-semibold">
                The shopping cart is empty
              </h1>
              <Button
                onClick={() => navigate("/")}
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Basket;
