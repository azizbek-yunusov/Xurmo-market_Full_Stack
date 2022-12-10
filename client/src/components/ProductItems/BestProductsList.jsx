import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const BestProductsList = () => {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    const { data } = await axios.get("/products");
    setProducts(data.products);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container-full  md:my-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-semibold">Best Products</h1>
        <Link className="text-red-600 text-lg font-semibold" to={"/best"}>
          all views
        </Link>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-2 overflow-hidden">
          <img
            className="rounded-xl w-full h-full"
            src="https://olcha.uz/image/original/homePage/pYZEByQS20XopP4Ac74Ctt8AsN9tIGDCH1KEy2nB5Zzeb0dHJP8mLSodLsej."
            alt=""
          />
          {/* <div className="rounded-xl w-full h-full bg-pink-500 flex justify-center items-center">
            <h1 className="md:text-2xl">Popular</h1>
            <h1 className="">products</h1>
          </div> */}
        </div>
        <div className="col-span-10 grid grid-cols-4 gap-4 relative">
          {products.slice(0, 8).map((item) => (
            <ProductCard key={item._id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestProductsList;
