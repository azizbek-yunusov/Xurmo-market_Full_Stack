import React, { useEffect, useState } from "react";
// import Zoom from 'react-img-zoom';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import Reviews from "./Reviews";
import Comments from "./Comments";

const ProductDetail = () => {
  const goback = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const productDetail = async () => {
    try {
      const { data } = await axios.get(`/product/${id}`);
      setProduct(data.product);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    productDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // scroll to top
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <div className="h-full min-h-[500px] animated-show overflow-x-hidden">
        <div className="container-full block details overflow-x-hidden">
          <div className="flex items-center my-2">
            <button
              onClick={() => goback(-1)}
              className="lg:px-4 px-2 text-md  rounded-full mr-4 py-2 flex font-medium border border-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <p className="hidden lg:block">Назад</p>
            </button>{" "}
            {"/"}
            <Link
              to={"/"}
              className="lg:px-4 px-2 lg:text-lg text-base capitalize text-red-500"
            >
              Главная
            </Link>{" "}
            {"/"}
            <Link
              // to={`/category/${product.category}`}
              className="capitalize lg:px-4 px-2 lg:text-lg text-base text-red-500"
            >
              {product.category}
            </Link>{" "}
            {"/"}
            <Link
              // to={`/manufacturer/${product.brandName}`}
              className="lg:px-4 capitalize px-[5px] lg:text-lg text-base text-red-500"
            >
              {/* {product.brandName} */}
            </Link>
          </div>

          <h1 className="md:text-3xl text-xl text-left px-2 font-normal text-zinc-700 mb-3">
            {product.category} {product.name}
          </h1>
          <div className="lg:flex hidden py-1 items-center">
            <div className="lg:flex text-zinc-400 ">
              {/* <p className="p-[1px]">{StarSolidIcon}</p>
              <p className="p-[1px]">{StarSolidIcon}</p>
              <p className="p-[1px]">{StarSolidIcon}</p>
              <p className="p-[1px]">{StarSolidIcon}</p>
              <p className="p-[1px]">{StarSolidIcon}</p> */}
            </div>
            <h1 className="ml-4 font-medium text-lg text-zinc-700">
              0 отзывов
            </h1>
            <div className="p-2 ml-5 cursor-pointer">
              {/* {!copyUrl ? (
                  <div
                    onClick={copy}
                    className="flex text-blue-600 font-medium text-lg items-center py-1"
                  >
                    {ShareIcon} <p className="ml-1">Скопировать ссылку</p>{" "}
                  </div>
                ) : (
                  <div className="text-green-500 flex text-lg py-1">
                    {" "}
                    {CheckIcon} <p className="ml-1">Ссылка скопирована</p>
                  </div>
                )} */}
            </div>
          </div>

          <div className="lg:grid grid-cols-1 lg:grid-cols-3  lg:gap-6 border-t border-r-gray-400 lg:py-5 py-4">
            <div className="">
              <div className="border flex items-center justify-center lg:my-2 lg:rounded-lg border-gray-200 hover:border-zinc-300 ease-in duration-200">
                {/* <Zoom
                  ref={imgDiv}
                  img={product.imgUrl[selectedImg]}
                  // src={product.imgUrl[selectedImg]}
                  zoomScale={1.5}
                  width={400}
                  height={400}
                  transitionTime={.5}
                /> */}
                <img
                  src={product.image}
                  className="transition-colors ease-in-out duration-300"
                  width={400}
                  height={400}
                  alt=""
                />
              </div>
              <div className="flex overflow-x-scroll scrollMobile">
                {/* {product.imgUrl.map((img, index) => (
                    <img
                      src={img}
                      alt="img"
                      // style={{
                      //   border:
                      //     product.imgUrl[selectedImg] === img
                      //       ? "2px solid #ffd500"
                      //       : " ",
                      // }}
                      width={70}
                      className="cursor-pointer m-1 p-1 border hover:scale-105 border-gray-200 transition ease-in-out duration-300 rounded"
                      height={70}
                      key={index}
                      onClick={() => setSelectedImg(index)}
                    />
                  ))} */}
              </div>
            </div>
            <div className="block px-2 text-left">
              <p className="text-3xl lg:font-medium font-semibold mt-2 lg:mt-0">
                {/* {numberWithCommas(product.price)} cум{" "} */}
              </p>
              <div className="">
                <p className="lg:text-xl text-lg leading-6 font-semibold mt-5 text-zinc-800">
                  Коротко о товаре:
                </p>
                <p className="text-lg leading-6 font-normal lg:mt-4 mt-3 text-zinc-800">
                  {/* Гарантийный срок (месяц): {product.warranty} */}
                </p>
                <h1 className="text-lg leading-6 lg:mt-3 mt-2 text-zinc-600">
                  {product.descr}
                </h1>
              </div>
            </div>
            <div className="border border-zinc-300 rounded-lg lg:m-0 mt-3 p-5">
              <Link
                // to={`/manufacturer/${product.brandName}`}
                className="flex items-center flex-col align-middle"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="align-middle"
                  width={80}
                  height={80}
                />
              </Link>
              <p className="text-2xl lg:m-0 mt-2 font-medium">
                {/* {numberWithCommas(product.price)} cум */}
              </p>
              <button
                // onClick={() => dispatch(addToBasket(product))}
                className="mt-5 text-2xl font-normal rounded-lg flex items-center justify-center lg:py-4 py-3 w-full bg-yellow-400 active:opacity-80 transition-opacity"
              >
                {/* {CartIcon} <p className="ml-3 font-semibold">в корзину</p> */}
              </button>
              <div className="lg:py-2 py-1 font-normal flex justify-center bg-gray-200 rounded-lg lg:my-4 text-zinc-800 my-3">
                Рассрочка от{" "}
                <p className="font-semibold lg:ml-[5px] ml-[2px]">
                  {/* {numberWithCommas(Math.floor(product.price / 24))} cум / 24 */}
                  мес.
                </p>
              </div>
              <button className="text-xl font-normal rounded-lg flex items-center justify-center lg:py-4 py-3 w-full bg-zinc-700 active:opacity-80 transition-opacity text-white">
                Купить в рассрочку
              </button>
            </div>
          </div>
        </div>
        <div className="container-full flex items-center justify-between">
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <Comments key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
          {/* {product.reviews.map((item, index) => (
            <div key={item._id} className="">
              <div className="flex justify-between items-center">
                <div className="flex">
                  <img src="" className="w-9 h-9" alt="" />
                  <p className="">{item.user.name}</p>
                  <span className="">08.12.2022</span>
                </div>
                <div className="">
                  <Rate disabled value={item.rating} />
                </div>
              </div>
              <div className="">
                <p className="">{item.comment}</p>
              </div>
            </div>
          ))} */}
          <Reviews productId={product._id} />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
