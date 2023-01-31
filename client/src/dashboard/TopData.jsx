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
      <div className="flex justify-between items-center bg-slate-50 dark:bg-[#2e2d4a] border border-gray-300 dark:border-gray-700  px-6 py-6 rounded-xl">
        <div className="bg-orange-200 p-4 rounded-xl">
          <BsFolder className="text-orange-500 text-3xl" />
        </div>
        <div className="">
          <p className="text-2xl font-semibold font-mono text-right mr-2 text-gray-700 dark:text-gray-200 ">
            {products.length}
            {/* <CountUp d.01} end={products.length} /> */}
          </p>
          <p className="text-base text-gray-600 dark:text-gray-200">
            Total products
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center px-5 border border-gray-300 dark:border-gray-700 rounded-xl bg-slate-50 dark:bg-[#2e2d4a] ">
        <div className="bg-violet-200 p-4 rounded-xl">
          <AiOutlineUser className="text-violet-600 text-3xl" />
        </div>
        <div className="">
          <p className="text-2xl font-semibold font-mono text-right mr-2 text-gray-700 dark:text-gray-200">
            {orders.length}
          </p>
          <p className="text-base text-gray-600 dark:text-gray-200">
            Total Orders
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center px-5 border border-gray-300 dark:border-gray-700 rounded-xl bg-slate-50 dark:bg-[#2e2d4a] ">
        <div className="bg-pink-200 p-4 rounded-xl">
          <AiOutlineShopping className="text-pink-600 text-3xl" />
        </div>
        <div className="">
          <p className="text-2xl font-semibold font-mono text-right mr-2 text-gray-700 dark:text-gray-200">
            {users.length}
          </p>
          <p className="text-base text-gray-600 dark:text-gray-200">
            Total Customers
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center px-5 border border-gray-300 dark:border-gray-700 rounded-xl bg-slate-50 dark:bg-[#2e2d4a] ">
        <div className="bg-green-200 p-4 rounded-xl">
          <MdOutlineAttachMoney className="text-green-600 text-3xl" />
        </div>
        <div className="">
          <p className="text-2xl font-semibold font-mono text-right mr-2 text-gray-700 dark:text-gray-200">
            {"$9745"}
          </p>
          <p className="text-base text-gray-600 dark:text-gray-200">
            Total Revenue
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopData;
