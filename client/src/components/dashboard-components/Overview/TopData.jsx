import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineShopping, AiOutlineUser } from "react-icons/ai";
import { BsFolder } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/customer";
import { getProducts } from "../../../redux/product";

const TopData = () => {
  let { t } = useTranslation(["translation"]);

  const { products } = useSelector((state) => state.product);
  const { users } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await axios.get("/orders", {
      headers: { Authorization: access_token },
    });
    setOrders(data.orders);
  };
  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUsers(access_token));
  }, [dispatch]);
  return (
    <div className="w-full xl:px-5 grid grid-cols-4 xl:gap-4 gap-2 md:my-4">
      <div className="flex justify-start items-center bg-white dark:bg-[#2e2d4a] border border-gray-200 dark:border-gray-700  xl:px-6 px-3 xl:py-5 py-3 rounded-lg">
        <div className="bg-orange-100 dark:bg-orange-300 p-3 xl:p-4 rounded-lg shadow-md shadow-orange-400/50">
          <BsFolder className="text-orange-500 dark:text-orange-600 text-3xl" />
        </div>
        <div className="ml-2 xl:ml-4">
          <p className="text-xs font-semibold xl:text-sm text-gray-500 dark:text-gray-200">
            {t("total-products")}
          </p>
          <p className="text-xl xl:text-2xl font-semibold font-mono mr-2 text-gray-700 dark:text-gray-200 ">
            {products.length}
            {/* <CountUp d.01} end={products.length} /> */}
          </p>
        </div>
      </div>
      <div className="flex justify-start items-center px-3 xl:px-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#2e2d4a] ">
        <div className="bg-violet-100 dark:bg-violet-300 p-3 xl:p-4 rounded-lg shadow-md shadow-violet-400/50">
          <AiOutlineUser className="text-violet-600 dark:text-violet-600 text-3xl" />
        </div>
        <div className="ml-2 xl:ml-4">
          <p className="text-xs font-semibold xl:text-sm text-gray-500 dark:text-gray-200">
            {t("total-users")}
          </p>
          <p className="text-xl xl:text-2xl font-semibold font-mono mr-2 text-gray-700 dark:text-gray-200">
            {users.length}
          </p>
        </div>
      </div>
      <div className="flex justify-start items-center px-3 xl:px-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#2e2d4a] ">
        <div className="bg-pink-100 dark:bg-pink-300 p-3 xl:p-4 rounded-lg shadow-md shadow-pink-400/50">
          <AiOutlineShopping className="text-pink-600 dark:text-pink-600 text-3xl" />
        </div>
        <div className="ml-2 xl:ml-4">
          <p className="text-xs font-semibold xl:text-sm text-gray-500 dark:text-gray-200">
            {t("total-orders")}
          </p>
          <p className="text-xl xl:text-2xl font-semibold font-mono mr-2 text-gray-700 dark:text-gray-200">
            {orders.length}
          </p>
        </div>
      </div>
      <div className="flex justify-start items-center px-3 xl:px-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#2e2d4a] ">
        <div className="bg-green-100 dark:green-pink-300 p-3 xl:p-4 rounded-lg shadow-md shadow-green-400/50">
          <MdOutlineAttachMoney className="text-green-600 dark:green-pink-600 text-3xl" />
        </div>
        <div className="ml-2 xl:ml-4">
          <p className="text-xs font-semibold xl:text-sm text-gray-500 dark:text-gray-200">
            {t("total-revenue")}
          </p>
          <p className="text-xl xl:text-2xl font-semibold font-mono mr-2 text-gray-700 dark:text-gray-200">
            {"$9745"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopData;
