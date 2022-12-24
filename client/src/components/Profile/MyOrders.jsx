import axios from "axios";
import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const fetchMyOrders = async () => {
    const { data } = await axios.get("/myorders", {
      headers: { Authorization: localStorage.getItem("jwt") },
    });
    setMyOrders(data.orders);
  };
  useEffect(() => {
    fetchMyOrders();
  }, []);
  console.log(myOrders);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">My orders</h1>
        <h1 className="text-2xl">all orders</h1>
      </div>
      <div className="">
        {myOrders.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl p-5 my-4"
          >
            <div className="flex justify-between items-center border-b border-b-gray-300 pb-5">
              <div className="">
                <p className="text-xl font-bold">
                  Order to 17-12-2022 20:06 №310010
                </p>
              </div>
              <div className="">active</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="mt-3">
                {item.orderItems.map((ord) => (
                  <div key={ord._id} className="flex justify-between">
                    <div className="my-2 flex">
                      <img
                        className="h-20"
                        src={ord.productId.images[0].url}
                        alt=""
                      />
                      <div className="ml-2">
                        <p className="">{ord.productId.name}</p>
                        <p className="mt-3">{ord.productId.price}{"$"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-l mt-3 border-l-gray-300">

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
