import { Tooltip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  AiOutlineInfoCircle,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsBagCheck, BsCartCheck } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGlobalApi } from "../../../hooks";
import AddToWish from "../Helpers/AddToWish";

const ShopBox = ({ product }) => {
  const { t } = useTranslation(["product"]);
  const { _id } = product;
  const { cart, auth } = useSelector((state) => state);
  const { addToCartHandle, decrementQtyItem } = useGlobalApi(auth.access_token);

  const existItem = cart?.find((x) => x.productId?._id === _id);
  const isCart = existItem === undefined ? false : true;
  return (
    <div className="container-full flex justify-center col-span-1">
      <div className="md:w-auto w-full">
        <div className="sticky top-28 border_primary rounded-xl w-full">
          <div className="flex flex-col md:p-5 p-3 justify-between xl:w-[380px] lg:w-[300px] w-fulll">
            <div className="flex_betwen mb-2">
              <p className="md:text-lg text-gray-600">{product.price}</p>
              <AddToWish productId={product._id} />
            </div>
            <div className="mb-3 border-b border-b-gray-200 pb-5">
              <div className="flex_betwen text-gray-500 mb-3">
                <p className="">{t("cultivation-info")}</p>
                <AiOutlineInfoCircle className="text-xl text-gray-500" />
              </div>
              <div className="flex text-gray-700">
                <TbTruckDelivery className="text-4xl mr-2 -mt-2" />
                <div>
                  <p className="font-semibold mb-1">{t("standard-delivery")}</p>
                  <p className="">{t("standard-delivery-d")}</p>
                </div>
              </div>
            </div>
            <div className="my-3">
              {isCart ? (
                <div className="flex_betwen">
                  <div className="flex_betwen md:px-3 border-2 border-[#888888] md:py-4 py-4 w-full md:rounded-xl rounded-lg md:text-lg text-base transition_normal hover:border-blue-500">
                    <Tooltip title="remove from cart">
                      <button
                        onClick={() =>
                          decrementQtyItem(existItem.productId._id)
                        }
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
                  className="border-2 border-[#ff8800] md:py-3 py-3 flex items-center justify-center w-full rounded-lg bg_secondary text-lg text-white transition_normal"
                >
                  <FiShoppingCart className="md:text-xl" />
                  <span className="ml-2">{t("addcart")}</span>
                </button>
              )}
            </div>
            <button
              onClick={() => addToCartHandle(_id)}
              className="border-2 border-[#ff8800] md:py-3 py-3 flex items-center justify-center w-full rounded-lg text-lg text-gray-700 transition_normal"
            >
              <BsBagCheck className="md:text-xl" />
              <span className="ml-2">{t("buy-now")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopBox;
