import { Avatar, Checkbox } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HelmetTitle from "../../utils/HelmetTitle";
import Layout from "../Layout";

const OrdersList = () => {
  const { user, access_token } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);

  const [id, setId] = useState("");
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/orders", {
        headers: { Authorization: access_token },
      });
      setOrders(data.orders);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteBanner = async (e) => {
    e.preventDefault();
    try {
      fetch(`http://localhost:5000/order/${id}`, {
        method: "delete",
        headers: {
          Authorization: access_token,
        },
      }).then((data) => {
        if (data.err) {
        } else {
          fetchOrders();
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  console.log(orders);
  return (
    <>
      <Layout>
        <HelmetTitle title="All categories" />
        <div className="bg-white mx-5 dark:bg-[#2e2d4a] rounded-lg overflow-hidden my-6 border border-gray-300">
          {/* <Link
            to={"/product/create"}
            className="w-full flex items-center justify-end"
          >
            <Tooltip content="Add new category">
              <Button variant="gradient" className="my-2 mx-2">
                create category
              </Button>
            </Tooltip>
          </Link> */}
          <table className="min-w-max w-full table-auto rounded-lg ">
            <thead>
              <tr className="bg-gray-300 dark:bg-[#232338] text-gray-700 dark:text-gray-200 text-sm rounded-t-lg leading-normal global-font">
                <th className="py-3">
                  <Checkbox />
                </th>
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Products</th>
                <th className="py-3 px-6 text-center">Customer</th>
                <th className="py-3 px-6 text-center">Date</th>
                <th className="py-3 px-6 text-center">Payment Method</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-300 text-sm font-light">
              {orders
                .map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 hover:dark:bg-gray-600"
                  >
                    <td className="py-3 flex_center">
                      <Checkbox />
                    </td>
                    <td className="py-3 px-6 text-left">
                      <h1 className="">
                        {"#"}
                        {order._id.slice(-6).toUpperCase()}
                      </h1>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex justify-start items-center">
                        <div className="mr-2">
                          <img
                            className="w-10 h-10 rounded"
                            src={order.image}
                            alt=""
                          />
                        </div>
                        {/* <span className="mr-2">{order.name.slice(0, 40)}</span> */}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex justify-center items-center">
                        <div className="mr-2">
                          <Avatar
                            src="https://www.material-tailwind.com/img/face-2.jpg"
                            alt="avatar"
                            size="sm"
                          />
                        </div>
                        <span className="mr-2">
                          {order.createdBy
                            ? order.createdBy.name
                            : "deleted account"}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center">
                        <span>{moment(order.createdAt).format("lll")}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center">
                        <span>{order.orderStatus}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <Link
                          to={`/order/${order._id}`}
                          className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </Link>
                        <Link to={`/order/update/${order._id}`}>
                          <div className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110">
                            <FiEdit className="text-lg" />
                          </div>
                        </Link>
                        <button
                          onClick={() => deleteBanner(order._id)}
                          className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
                .reverse()}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default OrdersList;
