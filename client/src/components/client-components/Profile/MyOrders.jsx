import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LayoutP from "./LayoutP";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Link } from "react-router-dom";
import { getMyOrder } from "../../../redux/order/myOrder";

const MyOrders = () => {
  let { t } = useTranslation(["shop"]);
  const { auth, order } = useSelector((state) => state);
  let { access_token } = auth;
  let { orders } = order;
  const [myOrders, setMyOrders] = useState([]);
  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/myorders", {
        headers: { Authorization: access_token },
      });
      setMyOrders(data.orders);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (access_token) {
      getMyOrder(access_token);
    }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token]);
  console.log(order);
  return (
    <LayoutP>
      <div className="">
        <div className="flex justify-between items-center ">
          {/* <h1 className="md:text-xl font-semibold">{t("myorders")}</h1>
          <h1 className="text-xl">all orders</h1> */}
        </div>
        <div className="">
          {orders.length ? (
            orders.map((item, index) => (
              <div key={index} className="border border_l rounded-xl p-4 my-4">
                <div className="flex justify-between items-center border-b border-b-gray-300 pb-4">
                  <div className="">
                    <p className="text-lg font-bold text-gray-700">
                      {t("order")}
                      {"-"}
                      <span className="">
                        {"#"}
                        {item._id.slice(-6).toUpperCase()}
                      </span>
                      {", "}
                      <span className="">
                        {moment(item.createdAt).format("lll")}
                      </span>{" "}
                    </p>
                  </div>
                  <div className="p-1 bg-purple-400 rounded-md text-white px-2">
                    buyurtma berildi
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="mt-3">
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
                            <p className="mt-3 md:text-lg font-semibold text-gray-7">
                              {ord.productId.price}
                              {"$"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-l mt-3 border-l-gray-300">
                    <div className="grid grid-cols-2">
                      <div className="col-span-1">
                        <ul className="text-gray-500 md:ml-6">
                          <li className="my-3">
                            {t("ordertype")}
                            {":"}
                          </li>
                          <li className="my-3">
                            {t("orderat")}
                            {":"}
                          </li>
                          <li className="my-3">
                            {t("totalpayment")}
                            {":"}
                          </li>
                          <li className="my-3">
                            {t("contact")}
                            {":"}
                          </li>
                          <li className="my-3">
                            {t("address")}
                            {":"}
                          </li>
                        </ul>
                      </div>
                      <div className="col-span-1">
                        <ul className="font-semibold text-zinc-700">
                          <li className="my-3">{item.paymentMethod}</li>
                          <li className="my-3">
                            {moment(item.createdAt).format("lll")}
                          </li>
                          <li className="my-3">
                            {item.totalPrice}
                            {"$"}
                          </li>
                          <li className="my-3">{item.contact || item.email}</li>
                          <li className="my-3">
                            {item.shippingAddress.region} {t("region")}
                            {", "}
                            {item.shippingAddress.district} {t("")}
                            {", "}
                            {item.shippingAddress.street}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img src="/images/order.png" alt="cart" className="h-56" />
              <h1 className="text-2xl font-semibold text-gray-700">
                Order not available
              </h1>
            </div>
          )}
        </div>
      </div>
    </LayoutP>
  );
};

export default MyOrders;
