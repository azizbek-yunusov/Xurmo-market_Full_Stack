import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductItems/ProductCard";
import HelmetTitle from "../utils/HelmetTitle";
import SearchIcon from "../assets/images/search.png";

const SearchPage = () => {
  let { t } = useTranslation(["product"]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;
  const [result, setResult] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        setResult(data.products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category, order, page, price, query, rating]);

  const getFilterUrl = (filter, skipPathname) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `${
      skipPathname ? "" : "/search?"
    }category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };
  console.log(query);
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <HelmetTitle title={`${query} - Search`} />
      <div className="container-full md:my-5">
        {result.length ? (
          <h1 className="md:text-2xl font-semibold md:mb-8">
            {query} {t("search-result")}
          </h1>
        ) : null}

        <div className="grid grid-cols-12 min-h-[550px] md:gap-x-5">
          <div className="col-span-3 md:px-5">
            <div className="">
              {/* <Slider
                range={{
                  draggableTrack: true,
                }}
                defaultValue={[0, 500]}
              /> */}
            </div>
          </div>
          <div className="col-span-9">
            {result.length ? (
              <div className="grid grid-cols-4 gap-4">
                {result.map((item, index) => (
                  <ProductCard key={index} {...item} />
                ))}
              </div>
            ) : (
              <div className="flex_center w-full h-full flex-col">
                <img src={SearchIcon} className="h-60 md:mb-5" alt="" />
                <h1 className="md:text-2xl text-gray-800 font-semibold">
                  Hech nima topilmadi
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
