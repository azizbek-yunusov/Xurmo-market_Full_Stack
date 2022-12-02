import React, { useEffect, useState } from "react";
import { AiOutlineShopping, AiOutlineUser } from "react-icons/ai";
import { BsFolder } from "react-icons/bs";

const TopData = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      fetch("http://localhost:5000/products", {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((data) => setProducts(data.products));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full px-5 grid grid-cols-4 gap-4 md:my-4">
      <div className="flex justify-between items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400  px-5 py-5 border-b-4 border-b-green-400 rounded-xl">
        <div className="bg-pink-400 p-2 rounded-full">
          <BsFolder className="text-white text-3xl" />
        </div>
        <div className="">
          <p className="text-lg text-gray-50">Total products</p>
          <p className="text-xl text-right mr-2 text-gray-50">
            {products.length}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center bg-violet-700 px-5 rounded-xl border-b-4 border-b-green-400 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 ">
        <div className="bg-pink-400 p-2 rounded-full">
          <AiOutlineUser className="text-white text-3xl" />
        </div>
        <div className="">
          <p className="text-lg text-gray-50">Total clients</p>
          <p className="text-xl text-right mr-2 text-gray-50">
            {products.length}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center bg-violet-700 px-5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 ">
        <div className="bg-pink-400 p-2 rounded-full">
          <AiOutlineShopping className="text-white text-3xl" />
        </div>
        <div className="">
          <p className="text-lg text-gray-50">New orders</p>
          <p className="text-xl text-right mr-2 text-gray-50">
            {products.length}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center bg-violet-700 px-5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 ">
        <div className="bg-pink-400 p-2 rounded-full">
          <BsFolder className="text-white text-3xl" />
        </div>
        <div className="">
          <p className="text-lg text-gray-50">Total products</p>
          <p className="text-xl text-right mr-2 text-gray-50">
            {products.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopData;
