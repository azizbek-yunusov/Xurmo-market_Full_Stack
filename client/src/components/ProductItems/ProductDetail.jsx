import React, { useContext, useEffect, useState } from "react";
// import Zoom from 'react-img-zoom';
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiError } from "react-icons/bi";
import axios from "axios";
import Comments from "./Comments";

import { Button, Modal, Rate } from "antd";
import { Helmet } from "react-helmet-async";
import ImageThumbs from "./ImageThumbs";
import { useSelector } from "react-redux";
import { Progress } from "@material-tailwind/react";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const ProductDetail = () => {
  const { auth } = useSelector((state) => state);
  const goback = useNavigate();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const productDetail = async () => {
    try {
      const { data } = await axios.get(`/product/${id}`);
      setProduct(data.product);
    } catch (err) {
      console.log(err);
    }
  };
  const reviewsHandler = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/review", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.access_token,
      },
      body: JSON.stringify({
        productId: product._id,
        rating,
        comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        productDetail();
        if (data.err) {
        } else {
        }
      });
  };
  useEffect(() => {
    productDetail();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signInNavigate = () => navigate("/signin");
  const beshh = product?.reviews?.filter((item) => item.rating === 5);
  const foiz =
    (product?.numOfReviews * 100) / (beshh?.length * product?.numOfReviews);
  console.log(foiz);
  return (
    <>
      <Helmet>
        <title data-rh="true">{`${product.name} | E-commerce`}</title>
      </Helmet>
      <>
        <div className="container-full">
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
              Home
            </Link>{" "}
            {"/"}
            <Link
              to={`/category/${product.category}`}
              className="capitalize lg:px-4 px-2 lg:text-lg text-base text-red-500"
            >
              {product.category}
            </Link>{" "}
            {"/"}
            <Link
              to={`/manufacturer/${product.brandName}`}
              className="lg:px-4 capitalize px-[5px] lg:text-lg text-base text-red-500"
            >
              {product.name}
            </Link>
          </div>

          <h1 className="md:text-4xl text-xl text-left px-2 font-semibold text-zinc-700">
            {product.category} {product.name}
          </h1>
          <div className="lg:flex hidden py-1 items-center">
            <div className="p-2 ml-5 cursor-pointer"></div>
          </div>

          <div className="md:grid grid-cols-1 md:grid-cols-12 md:gap-5 border-t border-r-gray-400 lg:py-5 py-4">
            <div className="col-span-4">
              <ImageThumbs images={product.images} />
            </div>
            <div className="col-span-4 block px-2 text-left">
              <p className="text-3xl lg:font-medium font-semibold mt-4 lg:mt-0">
                {/* {numberWithCommas(product.price)} cум{" "} */}
              </p>
              <div className="">
                <p className="lg:text-xl text-lg leading-6 font-semibold text-zinc-800">
                  Description:
                </p>
                <p className="text-lg leading-6 font-normal lg:mt-4 mt-4 text-zinc-800">
                  {/* Гарантийный срок (месяц): {product.warranty} */}
                </p>
                <h1 className="text-lg leading-6 lg:mt-4 mt-4 text-zinc-600">
                  {product.descr}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container-full md:my-5">
          <h1 className="text-4xl font-semibold md:mb-5">Product reviews</h1>
          <div className="grid grid-cols-12 gap-9">
            <div className="w-full col-span-6">
              {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                  {product.reviews &&
                    product.reviews
                      .map((review) => (
                        <Comments key={review._id} review={review} />
                      ))
                      .reverse()}
                </div>
              ) : (
                <p className="noReviews">No Reviews Yet</p>
              )}
            </div>
            <div className="w-full col-span-6 flex justify-end">
              <div className="max-w-[400px] max-h-[440px] p-6 px-8 rounded-lg flex justify-between flex-col w-full border border-gray-300">
                <div className="flex md:mt-1 items-center justify-between">
                  <div className="">
                    <h1 className="text-5xl font-semibold">
                      {product.ratings?.toFixed(1)}
                    </h1>
                    <p className="text-base text-gray-400 mt-4">
                      Based on {product.numOfReviews} reviews
                    </p>
                  </div>
                  <div className="">
                    <Rate disabled allowHalf value={product.ratings} />
                  </div>
                </div>
                <div className="">
                  {/* <div className="flex items-center justify-between w-full bg-red-600 mt-4">
                    <p className="mr-3">5star</p>
                    <div className="w-full h-4 bg-pink-300">
                      <div
                        style={{ width: `${foiz}%` }}
                        className="bg-cyan-400 h-full"
                      ></div>
                    </div>
                    <p className="">{foiz}%</p>
                  </div> */}
                  <div className="md:my-5">
                    <Progress value={foiz} label="Completed" />
                  </div>
                  <div className="md:my-5">
                    <Progress value={foiz} label="Completed" />
                  </div>
                  <div className="md:my-5">
                    <Progress value={foiz} label="Completed" />
                  </div>
                  <div className="md:my-5">
                    <Progress value={foiz} label="Completed" />
                  </div>
                  <div className="md:my-5">
                    <Progress value={foiz} label="Completed" />
                  </div>
                </div>
                <div className="w-full">
                  {auth.isLogged ? (
                    <>
                      <Button
                        type="primary"
                        size="large"
                        className="rounded-lg w-full primary_bg mt-8"
                        onClick={showModal}
                      >
                        Write review
                      </Button>
                      <Modal
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        okText={null}
                      >
                        <h1 className="w-full text-2xl font-semibold mb-4 text-center">
                          My review
                        </h1>
                        <form onSubmit={reviewsHandler}>
                          <div className="">
                            <label className="text-lg font-semibold text-gray-800">
                              Rate it
                            </label>

                            <div className="mb-5">
                              <Rate
                                tooltips={desc}
                                onChange={setRating}
                                value={rating}
                              />
                              {rating ? (
                                <span className="ant-rate-text font-semibold">
                                  {desc[rating - 1]}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div>
                            <label className="text-lg font-semibold text-gray-800">
                              Description
                            </label>
                            <textarea
                              id="textarea"
                              type="textarea"
                              rows={5}
                              placeholder="Description"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500  focus:outline-none focus:ring"
                            />
                          </div>
                          <div className="flex justify-end items-center mt-3">
                            <p
                              className="py-2 cursor-pointer text-white px-6 text-[16px] tracking-wide font-semibold mx-3 bg-red-600 rounded-lg"
                              onClick={handleCancel}
                            >
                              cancel
                            </p>
                            <button
                              type="submit"
                              className="py-2 text-white px-6 text-[16px] tracking-wide font-semibold bg-indigo-600 rounded-lg"
                              onClick={handleOk}
                            >
                              submit
                            </button>
                          </div>
                        </form>
                      </Modal>
                    </>
                  ) : (
                    <>
                      <Button
                        type="primary"
                        size="large"
                        className="rounded-lg w-full bg-green-600"
                        onClick={showModal}
                      >
                        Write review
                      </Button>
                      <Modal
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        okText={null}
                      >
                        <div className="">
                          <div className="flex p-3 rounded max-w-max pb-5 mb-8 items-center bg-gray-200">
                            <BiError className="text-2xl text-red-600" />
                            <p className="text-lg font-semibold">
                              You must be registered to post a comment
                            </p>
                          </div>
                          <div className="flex justify-end items-center mt-3">
                            <p
                              className="py-2 cursor-pointer text-white px-6 text-[16px] tracking-wide font-semibold mx-3 bg-red-600 rounded-lg"
                              onClick={handleCancel}
                            >
                              cancel
                            </p>
                            <button
                              type="submit"
                              className="py-2 text-white px-6 text-[16px] tracking-wide font-semibold bg-indigo-600 rounded-lg"
                              onClick={signInNavigate}
                            >
                              login
                            </button>
                          </div>
                        </div>
                      </Modal>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ProductDetail;
