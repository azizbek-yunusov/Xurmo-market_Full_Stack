import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutP from "./LayoutP";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Price from "../Helpers/Price";
import { getMyOrders } from "../../../redux/order";
import { HelmetTitle } from "../../../utils";
import { datePicker } from "../Helpers/datePicker";
import OrderStatus from "../Helpers/OrderStatus";
import PaymentTypeText from "../Helpers/PaymentTypeText";

const MyOrders = () => {
  let { t } = useTranslation();
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const { isLoading, myOrders } = useSelector((state) => state.order);
  useEffect(() => {
    if (access_token) {
      dispatch(getMyOrders(access_token));
    }
  }, [access_token, dispatch]);
  console.log(myOrders);
  return (
    <LayoutP>
      <HelmetTitle
        title={`${t("profile:my-orders")} - ${t("profile:personal")}`}
      />
      <div className="flex justify-between items-center ">
        {/* <h1 className="md:text-xl font-semibold">{t("shop:myorders")}</h1>
          <h1 className="text-xl">all orders</h1> */}
      </div>
      {!isLoading ? (
        <div className="">
          {myOrders?.length ? (
            myOrders.map((item, index) => (
              <div
                key={index}
                className="border border_l rounded-xl md:p-4 p-3"
              >
                <div className="sm:flex justify-between items-center block border-b border-b-gray-200 md:pb-4 pb-2">
                  <div className="">
                    <p className="md:text-lg font-bold text-gray-700">
                      {t("shop:order")}
                      {"-"}
                      <span className="">
                        {"#"}
                        {item._id.slice(-6).toUpperCase()}
                      </span>
                      {", "}
                      <span className="">
                        {/* {moment(item.createdAt).format("lll")} */}
                        {datePicker(item.createdAt)}
                      </span>{" "}
                    </p>
                  </div>
                  <OrderStatus status={item.orderStatus} />
                </div>
                <div className="grid lg:grid-cols-12 grid-cols-1 gap-2">
                  <div className="mt-3 lg:col-span-5">
                    {item.orderItems.map((ord) => (
                      <div key={ord._id} className="flex justify-between">
                        <div className="my-2 flex">
                          <img
                            className={
                              item.orderItems.length >= 2 ? "h-20" : "h-44"
                            }
                            src={ord.productId.images[0].url}
                            alt=""
                          />
                          <div className="ml-2">
                            <Link
                              to={`/product/view/${ord.productId._id}`}
                              className="md:text-lg font-semibold text-gray-7"
                            >
                              {ord.productId.name}
                            </Link>
                            <Price
                              price={ord.productId.price}
                              className="mt-3 md:text-lg font-semibold text-gray-700"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 lg:col-span-7 lg:text-base text-sm">
                    <table className="border-none w-full">
                      <tbody>
                        <tr className="flex text-sm w-full">
                          <td className="w-full p-3 md:p-1 xl:p-2 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                            {t("shop:ordertype")}
                            {":"}
                          </td>
                          <td className="w-full p-3 md:p-1 xl:p-2 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                            <PaymentTypeText
                              paymentMethod={item.paymentMethod}
                            />
                          </td>
                        </tr>
                        <tr className="flex text-sm w-full">
                          <td className="w-full p-3 md:p-1 xl:p-2 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                            {t("shop:orderat")}
                          </td>
                          <td className="w-full p-3 md:p-1 xl:p-2 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                            {datePicker(item.createdAt)}
                          </td>
                        </tr>
                        <tr className="flex text-sm w-full">
                          <td className="w-full p-3 md:p-1 xl:p-2 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                            {t("shop:total-payment")}
                            {":"}
                          </td>
                          <td className="w-full p-3 md:p-1 xl:p-2 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                            <Price price={item.totalPrice} />
                          </td>
                        </tr>
                        <tr className="flex text-sm w-full">
                          <td className="w-full p-3 md:p-1 xl:p-2 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                            {t("shop:contact")}
                          </td>
                          <td className="w-full p-3 md:p-1 xl:p-2 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                            {item.contact || item.email}
                          </td>
                        </tr>
                        <tr className="flex text-sm w-full">
                          <td className="w-full p-3 md:p-1 xl:p-2 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                            {t("shop:address")}
                          </td>
                          <td className="w-full p-3 md:p-1 xl:p-2 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                            {item.shippingAddress.region.slice(0, -5)}
                            {", "}
                            {item.shippingAddress.district.slice(0, -3)}
                            {", "}
                            {item.shippingAddress.street}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img src="/images/order.png" alt="cart" className="h-56" />
              <h1 className="text-2xl font-semibold text-gray-700">
                {t("shop:empty-order")}
              </h1>
            </div>
          )}
        </div>
      ) : (
        <CircularProgress />
      )}
    </LayoutP>
  );
};
export default MyOrders;
