import { useScrollTrigger } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router-dom";
import Price from "../Helpers/Price";


const BottomCheckOut = ({ cart }) => {
  const scroll = useScrollTrigger();
  const { t } = useTranslation(["product"]);
  let totalPrice = cart.reduce((a, c) => a + c.productId.price * c.quantity, 0);
  return (
    <>
      {scroll && (
        <div className="md:hidden flex_betwen fixed bottom-0 left-0 w-full py-2 z-50 bg-white shadow-lg px-4 border-t border-t-gray-100">
          <div className="col-span-1 flex items-center">
            <Price
              price={totalPrice}
              className="text-gray-800 text-base font-bold"
            />
          </div>
          <div className="col-span-1">
            <Link
              to={"/checkout"}
              className="border-2 border-[#ff8800] md:py-2 px-3 py-2 flex items-center justify-center w-full rounded-lg bg_secondary text-lg text-white transition_normal"
            >
              <AiOutlineShopping className="md:text-xl text-xl" />
              <span className="ml-2 ms:text-base text-sm">
                {t("check-out-btn")}
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomCheckOut;
