import { Tooltip, useScrollTrigger } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGlobalApi } from "../../../hooks";

const BottomScoll = ({ product }) => {
  const scroll = useScrollTrigger();
  const { t } = useTranslation(["product"]);
  const { _id } = product;
  const { cart, auth } = useSelector((state) => state);
  const { addToCartHandle, decrementQtyItem } = useGlobalApi(auth.access_token);

  const existItem = cart?.find((x) => x.productId?._id === _id);
  const isCart = existItem === undefined ? false : true;

  return (
    <>
      {scroll && (
        <div className="md:hidden grid grid-cols-2 fixed bottom-0 left-0 w-full py-2 z-50 bg-white shadow-lg px-4 border-t border-t-gray-100">
          <div className="col-span-1 flex items-center">
            <p className="text-gray-800 text-base font-bold">100$</p>
          </div>
          <div className="col-span-1">
            {isCart ? (
              <div className="flex_betwen">
                <div className="flex_betwen md:px-3 border-2 border-[#888888] md:py-[6px] py-[6px] w-full md:rounded-xl rounded-lg md:text-lg text-base transition_normal hover:border-blue-500">
                  <Tooltip title="remove from cart">
                    <button
                      onClick={() => decrementQtyItem(existItem.productId._id)}
                      className="text-gray-800 md:px-1 pl-3 py-1"
                    >
                      <AiOutlineMinus />
                    </button>
                  </Tooltip>
                  <p className="font-mono md:text-lg text-gray-800 text-base">
                    {existItem.quantity}
                  </p>
                  <Tooltip title="Increase by one">
                    <button
                      onClick={() => addToCartHandle(_id)}
                      className=" tranistion_normal text-gray-800 md:px-1 pr-3 py-1"
                    >
                      <AiOutlinePlus />
                    </button>
                  </Tooltip>
                </div>
                <Link
                  to={"/cart"}
                  className="p-[10px] ml-3 hover:border-gray-400 rounded-md text-white bg_secondary"
                >
                  <BsCartCheck className="md:text-xl text-white" />
                </Link>
              </div>
            ) : (
              <button
                onClick={() => addToCartHandle(_id)}
                className="border-2 border-[#ff8800] md:py-2 py-[10px] flex items-center justify-center w-full rounded-lg bg_secondary text-lg text-white transition_normal"
              >
                <FiShoppingCart className="md:text-xl" />
                <span className="ml-2 ms:text-base text-sm">
                  {t("addcart")}
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BottomScoll;
