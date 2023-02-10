import { Breadcrumbs } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HelmetTitle from "../../../utils/HelmetTitle";
import { getFilterProducts } from "../../../redux/actions/productAction";

const ProductsList = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  // const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  // let count = filteredProductsCount;
  const state = useSelector((state) => state);
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(getFilterProducts(currentPage, price, category, ratings));
  }, [dispatch, currentPage, price, category, ratings]);

  console.log(state);

  return (
    <>
      <HelmetTitle title={"Eng yaxshi mahsulotlar"} />
      <div className="container-full md:my-5 min-h-[500px]">
        <Breadcrumbs fullWidth>
          <Link to={"/"} className="">
            Home
          </Link>
          <Link to={"/"} className="">
            Best products
          </Link>
        </Breadcrumbs>
        <h1 className="md:text-2xl text-gray-800 font-semibold md:my-5 border-b border-b-gray-200 md:pb-5">
          Eng ommabop mahsulotlar
        </h1>
        <div className="grid grid-cols-12 gap-x-5">
          <div className="col-span-3 border-r border-r-gray-300 bg-red-300"></div>
          <div className="col-span-9 bg-green-300">s</div>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
