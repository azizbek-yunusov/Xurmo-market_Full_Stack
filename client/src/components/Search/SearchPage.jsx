import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsGrid, BsViewStacked } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import HelmetTitle from "../../utils/HelmetTitle";
import ListProductCard from "../ProductItems/ListProductCard";
import ProductCard from "../ProductItems/ProductCard";
import Filter from "./Filter";

const SearchPage = () => {
  let { t } = useTranslation(["product"]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get("category") || "all";
  const brand = sp.get("brand") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;
  const [result, setResult] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isList, setIsList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/search?page=${page}&query=${query}&category=${category}&price=${price}&brand=${brand}&rating=${rating}&order=${order}`
        );
        setResult(data.products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category, brand, order, page, price, query, rating]);

  const getFilterUrl = (filter, skipPathname) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterBrand = filter.brand || brand;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `${
      skipPathname ? "" : "/search?"
    }category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&brand=${filterBrand}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };
  const fetchCategory = async () => {
    const { data } = await axios.get("/categories");
    setCategories(data.categories);
  };
  const fetchBrand = async () => {
    const { data } = await axios.get("/brands");
    setBrands(data.brands);
  };
  useEffect(() => {
    fetchCategory();
    fetchBrand();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <HelmetTitle title={`${query} - Search`} />
      <div className="container-full md:my-5">
        {result.length ? (
          <h1 className="md:text-[26px] md:mb-5 font-semibold text-gray-700">
            <span className="text-orange-500">"{query}"</span>{" "}
            {t("search-result")}
          </h1>
        ) : null}
        <div className="grid grid-cols-12 min-h-[550px] md:gap-x-5">
          <div className="col-span-3 xl:block hidden px-2 overflow-y-scroll max-h-screen">
            <Filter
              categories={categories}
              brands={brands}
              getFilterUrl={getFilterUrl}
            />
          </div>
          <div className="col-span-9">
            <div className="flex_betwen md:mb-6">
              <div className="">
                <FormControl size="small" sx={{ minWidth: "150px" }}>
                  <InputLabel _id="demo-simple-select-label">
                    Sort By
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                    value={"all"}
                    // onChange={(e) => setCategory(e.target.value)}
                    label="Sort By"
                  >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"user"}>products</MenuItem>
                    <MenuItem value={"admin"}>Admins</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="flex_betwen">
                <div className="">
                  <div className="border ml-3 border-gray-300 md:rounded-lg">
                    <IconButton
                      onClick={() => setIsList(false)}
                      aria-label="Table"
                      color={!isList ? "warning" : "default"}
                    >
                      <BsViewStacked className="text-xl" />
                    </IconButton>
                    <IconButton
                      onClick={() => setIsList(true)}
                      aria-label="Table"
                      color={isList ? "warning" : "default"}
                    >
                      <BsGrid className="text-xl" />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
            {result.length ? (
              <>
                {!isList ? (
                  <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:gap-4">
                    {result.map((item, index) => (
                      <ProductCard key={index} {...item} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    {result.map((item, index) => (
                      <ListProductCard key={index} {...item} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex_center w-full h-full flex-col">
                <img src="/images/search.png" className="h-60 md:mb-5" alt="" />
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
