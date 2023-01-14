import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
// import Banner from "../../assets/images/best_banner.png";
import { ProductList } from "../SkeletonLoaders";

const BestProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const { data } = await axios.get("/products");
    setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container-full md:my-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-semibold text-gray-800">Products</h1>
        <Link className="text-red-600 text-lg font-semibold" to={"/products"}>
          all views
        </Link>
      </div>
      <div className="">
        {!loading ? (
          <div className="col-span-12 grid grid-cols-5 gap-4 relative">
            {products.slice(0, 8).map((item) => (
              <ProductCard key={item._id} {...item} />
            ))}
          </div>
        ) : (
          <ProductList />
        )}
      </div>
    </div>
  );
};

export default BestProductsList;
