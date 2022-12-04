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
      <div className="flex justify-between items-center bg-slate-50 border border-gray-300  px-6 py-6 rounded-xl">
        <div className="bg-orange-200 p-4 rounded-xl">
          <BsFolder className="text-orange-500 text-3xl" />
        </div>
        <div className="">
          <p className="text-2xl font-semibold font-mono text-right mr-2 text-gray-800 ">
            {products.length}
          </p>
          <p className="text-base text-gray-600">Total products</p>
        </div>
      </div>
      <div className="flex justify-between items-center px-5 border border-gray-300 rounded-xl bg-slate-50 ">
        <div className="bg-violet-200 p-4 rounded-xl">
          <AiOutlineUser className="text-violet-900 text-3xl" />
        </div>
        <div className="">
          <p className="text-2xl font-semibold font-mono text-right mr-2 text-gray-800">
            {products.length}
          </p>
          <p className="text-base text-gray-600">Total products</p>
        </div>
      </div>
      <div className="flex justify-between items-center px-5 border border-gray-300 rounded-xl bg-slate-50 ">
        <div className="bg-green-200 p-4 rounded-xl">
          <AiOutlineShopping className="text-green-700 text-3xl" />
        </div>
        <div className="">
          <p className="text-2xl font-semibold font-mono text-right mr-2 text-gray-800">
            {products.length}
          </p>
          <p className="text-base text-gray-600">Total products</p>
        </div>
      </div>
      <div className="flex justify-between items-center px-5 border border-gray-300 rounded-xl bg-slate-50 ">
        <div className="bg-pink-400 p-4 rounded-xl">
          <BsFolder className="text-white text-3xl" />
        </div>
        <div className="">
          <p className="text-2xl font-semibold font-mono text-right mr-2 text-gray-800">
            {products.length}
          </p>
          <p className="text-base text-gray-600">Total products</p>
        </div>
      </div>
    </div>
  );
};

export default TopData;
