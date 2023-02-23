import { Avatar, Checkbox, Rating } from "@mui/material";
import moment from "moment";
import React from "react";
import { BiMoney } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import Price from "../../client-components/Helpers/Price";

const TableBody = ({
  selectedOrderIds,
  filteredOrders,
  handleSelectOne,
  deleteOrder,
}) => {
  return (
    <tbody className="text-gray-600 dark:text-gray-300 text-sm font-light">
      {filteredOrders.length ? (
        filteredOrders
          .map((order, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 font-semibold hover:dark:bg-gray-600 transition_normal"
            >
              <td className="py-3 flex_center">
                <Checkbox
                  checked={selectedOrderIds.indexOf(order._id) !== -1}
                  onChange={(event) => handleSelectOne(event, order._id)}
                  value="true"
                />
              </td>
              <td className="py-3 px-2 whitespace-nowrap">
                <div className="flex justify-start items-center hover:text-purple-600">
                  <Link to={`/dashboard/order/${order._id}`}>
                    {"#"}
                    {order._id.slice(-6).toUpperCase()}
                  </Link>
                </div>
              </td>
              <td className="py-3 px-2 text-left">
                <div className="flex justify-start items-center">
                  {order.orderItems.map((ord) => (
                    <div key={ord._id} className="flex justify-between mx-1">
                      <img
                        src={ord.productId.images[0].url}
                        className="h-10"
                        alt="Order"
                      />
                    </div>
                  ))}
                </div>
              </td>
              <td className="py-3 px-2 text-left">
                <div className="flex justify-start items-center text-blue-500">
                  <div className="flex items-center text-xs px-1 py-[2px] rounded-[4px] bg-blue-200">
                    <BiMoney />
                    <span className="text-xs">{"Cash on Delivery"}</span>
                  </div>
                </div>
              </td>
              <td className="py-3 px-2 text-left">
                <div className="flex justify-start items-center text-sm">
                  <span>{moment(order.createdAt).format("lll")}</span>
                </div>
              </td>
              <td className="py-3 px-2 text-left">
                <div className="flex justify-start items-center">
                  <Price price={order.totalPrice} className="" />
                </div>
              </td>
              <td className="py-3 px-2 text-left">
                <div className="flex justify-start items-center">
                  <span>{order.status}</span>
                </div>
              </td>
              <td className="py-3 px-2 text-left">
                <div className="flex justify-start items-center">
                  <div className="flex items-center text-xs px-1 py-[2px]  bg-blue-500 rounded-[4px] text-blue-50">
                    <span className="text-xs">{"shipped"}</span>
                  </div>
                </div>
              </td>
              <td className="py-3 px-2 text-left">
                <div className="flex justify-start items-center">
                  <div className="mr-2">
                    <Avatar
                      src={
                        order.user.avatar?.url ||
                        "https://www.material-tailwind.com/img/face-2.jpg"
                      }
                      alt="avatar"
                      size="sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Link
                      to={`/user/${order.user?._id}`}
                      className="transition_normal hover:text-purple-500"
                    >
                      {order.user?.name}
                    </Link>
                    <span className="text-gray-500 text-[12px]">
                      {order.user?.email}
                    </span>
                  </div>
                </div>
              </td>
              <td className="py-3 px-2 text-left">
                <div className="flex order-center justify-start">
                  <Link
                    to={`/dashboard/order/${order._id}`}
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
                  <Link to={`/product/update/${order._id}`}>
                    <div className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110">
                      <FiEdit className="text-lg" />
                    </div>
                  </Link>
                  <button
                    onClick={() => deleteOrder(order._id)}
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
          .reverse()
      ) : (
        <tr className="flex_center p-5">
          <td className="w-full">no data</td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
