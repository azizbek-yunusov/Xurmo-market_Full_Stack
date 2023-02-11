import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineShopping, AiOutlineUser } from "react-icons/ai";
import { BsFolder } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useSelector } from "react-redux";

const TopData = () => {
  const { access_token } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchProducts = async () => {
    const { data } = await axios.get("/products", {
      headers: { Authorization: access_token },
    });
    setProducts(data.products);
  };
  const fetchOrders = async () => {
    const { data } = await axios.get("/orders", {
      headers: { Authorization: access_token },
    });
    setOrders(data.orders);
  };
  const fetchUsers = async () => {
    const { data } = await axios.get("/users", {
      headers: { Authorization: access_token },
    });
    setUsers(data.users);
  };
  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full px-5 grid grid-cols-4 gap-4 md:my-4">
      <div className="flex justify-start items-center bg-white dark:bg-[#2e2d4a] border border-gray-200 dark:border-gray-700  px-6 py-5 rounded-lg">
        <div className="bg-orange-100 dark:bg-orange-300 p-4 rounded-lg shadow-md shadow-orange-400/50">
          <BsFolder className="text-orange-500 dark:text-orange-600 text-3xl" />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-500 dark:text-gray-200">
            Total products
          </p>
          <p className="text-2xl font-semibold font-mono mr-2 text-gray-700 dark:text-gray-200 ">
            {products.length}
            {/* <CountUp d.01} end={products.length} /> */}
          </p>
        </div>
      </div>
      <div className="flex justify-start items-center px-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#2e2d4a] ">
        <div className="bg-violet-100 dark:bg-violet-300 p-4 rounded-lg shadow-md shadow-violet-400/50">
          <AiOutlineUser className="text-violet-600 dark:text-violet-600 text-3xl" />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-500 dark:text-gray-200">
            Total Customers
          </p>
          <p className="text-2xl font-semibold font-mono mr-2 text-gray-700 dark:text-gray-200">
            {users.length}
          </p>
        </div>
      </div>
      <div className="flex justify-start items-center px-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#2e2d4a] ">
        <div className="bg-pink-100 dark:bg-pink-300 p-4 rounded-lg shadow-md shadow-pink-400/50">
          <AiOutlineShopping className="text-pink-600 dark:text-pink-600 text-3xl" />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-500 dark:text-gray-200">
            Total Orders
          </p>
          <p className="text-2xl font-semibold font-mono mr-2 text-gray-700 dark:text-gray-200">
            {orders.length}
          </p>
        </div>
      </div>
      <div className="flex justify-start items-center px-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#2e2d4a] ">
        <div className="bg-green-100 dark:green-pink-300 p-4 rounded-lg shadow-md shadow-green-400/50">
          <MdOutlineAttachMoney className="text-green-600 dark:green-pink-600 text-3xl" />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-500 dark:text-gray-200">
            Total Revenue
          </p>
          <p className="text-2xl font-semibold font-mono mr-2 text-gray-700 dark:text-gray-200">
            {"$9745"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopData;
