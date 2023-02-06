import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { ProductList } from "../SkeletonLoaders";
import { useTranslation } from "react-i18next";

const BestProductsList = () => {
  const { t } = useTranslation(["product"]);
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
        <h1 className="lg:text-4xl text-2xl font-semibold text-gray-800">{t("bestp")}</h1>
        <Link className="text-red-600 text-lg font-semibold" to={"/products"}>
        {t("allviews")}
        </Link>
      </div>
      <div className="">
        {!loading ? (
          <div className="col-span-12 grid lg:grid-cols-5 md:grid-cols-3 lg:gap-4 grid-cols-2 gap-3 relative">
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
