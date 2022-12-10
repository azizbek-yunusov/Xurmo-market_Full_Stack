import React, { useContext, useEffect, useState } from "react";
// import Zoom from 'react-img-zoom';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BiError } from "react-icons/bi";
import axios from "axios";
import Comments from "./Comments";
import { toast } from "react-toastify";
import { Button, Modal, Rate } from "antd";
import { Helmet } from "react-helmet-async";
import { UserContext } from "../../reducers/useReducer";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const ProductDetail = () => {
  const goback = useNavigate();
  const navigate = useNavigate();
  const { state } = useContext(UserContext);
  const { userInfo } = state;
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
    // await axios.put("/review", {
    //   headers: headers,
    //   productId,
    //   comment,
    //   rating,
    // });
    // toast.success("reviews");

    fetch("http://localhost:5000/review", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
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
          toast.error(data.error);
        } else {
          toast.success("reviews");
        }
      });
  };
  useEffect(() => {
    productDetail();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // scroll to top
  // const location = useLocation();
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location]);
  const signInNavigate = () => navigate("/signin");
  return (
    <>
      <Helmet>
        <title data-rh="true">{`${product.name} | E-commerce`}</title>
      </Helmet>
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

          <h1 className="md:text-3xl text-xl text-left px-2 font-normal text-zinc-700 mb-3">
            {product.category} {product.name}
          </h1>
          <div className="lg:flex hidden py-1 items-center">
            <div className="lg:flex items-center text-zinc-400 ">
              <h1 className="text-xl text-gray-700 mr-2">
                {product.ratings?.toFixed(1)}
              </h1>
              <Rate disabled allowHalf value={product.ratings} />
            </div>
            <h1 className="ml-4 font-medium text-lg text-zinc-700">
              {product.numOfReviews} reviews
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
              <p className="text-3xl lg:font-medium font-semibold mt-4 lg:mt-0">
                {/* {numberWithCommas(product.price)} cум{" "} */}
              </p>
              <div className="">
                <p className="lg:text-xl text-lg leading-6 font-semibold mt-5 text-zinc-800">
                  Коротко о товаре:
                </p>
                <p className="text-lg leading-6 font-normal lg:mt-4 mt-4 text-zinc-800">
                  {/* Гарантийный срок (месяц): {product.warranty} */}
                </p>
                <h1 className="text-lg leading-6 lg:mt-4 mt-4 text-zinc-600">
                  {product.descr}
                </h1>
              </div>
            </div>
            <div className="border border-zinc-300 rounded-lg lg:m-0 mt-4 p-5">
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
              <p className="text-2xl lg:m-0 mt-4 font-medium">
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
                  <div className="flex items-center mt-4">
                    <div className=" w-1/5 text-indigo-500 tracking-tighter">
                      <span>5 star</span>
                    </div>
                    <div className="w-3/5">
                      <div className="bg-gray-300 w-full rounded-lg h-2">
                        <div className=" w-7/12 bg-indigo-600 rounded-lg h-2"></div>
                      </div>
                    </div>
                    <div className="w-1/5 text-gray-700 pl-3">
                      <span className="text-sm">51%</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="w-1/5 text-indigo-500 tracking-tighter">
                      <span>4 star</span>
                    </div>
                    <div className="w-3/5">
                      <div className="bg-gray-300 w-full rounded-lg h-2">
                        <div className="w-1/5 bg-indigo-600 rounded-lg h-2"></div>
                      </div>
                    </div>
                    <div className="w-1/5 text-gray-700 pl-3">
                      <span className="text-sm">17%</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="w-1/5 text-indigo-500 tracking-tighter">
                      <span>3 star</span>
                    </div>
                    <div className="w-3/5">
                      <div className="bg-gray-300 w-full rounded-lg h-2">
                        <div className=" w-3/12 bg-indigo-600 rounded-lg h-2"></div>
                      </div>
                    </div>
                    <div className="w-1/5 text-gray-700 pl-3">
                      <span className="text-sm">19%</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className=" w-1/5 text-indigo-500 tracking-tighter">
                      <span>2 star</span>
                    </div>
                    <div className="w-3/5">
                      <div className="bg-gray-300 w-full rounded-lg h-2">
                        <div className=" w-1/5 bg-indigo-600 rounded-lg h-2"></div>
                      </div>
                    </div>
                    <div className="w-1/5 text-gray-700 pl-3">
                      <span className="text-sm">8%</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="w-1/5 text-indigo-500 tracking-tighter">
                      <span>1 star</span>
                    </div>
                    <div className="w-3/5">
                      <div className="bg-gray-300 w-full rounded-lg h-2">
                        <div className=" w-2/12 bg-indigo-600 rounded-lg h-2"></div>
                      </div>
                    </div>
                    <div className="w-1/5 text-gray-700 pl-3">
                      <span className="text-sm">5%</span>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  {userInfo ? (
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
      </div>
    </>
  );
};

export default ProductDetail;
