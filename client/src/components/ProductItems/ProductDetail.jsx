import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";

import { Helmet } from "react-helmet-async";
import ImageThumbs from "./ImageThumbs";
import { useSelector } from "react-redux";
import { ReviewsBox } from "./ReviewsBox";
import { Breadcrumbs, Button, Typography } from "@mui/material";
import { ProductDetailLoader } from "../SkeletonLoaders";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";

const ProductDetail = () => {
  const { auth, cart, address } = useSelector((state) => state);
  const goback = useNavigate();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const productDetail = async () => {
    try {
      const { data } = await axios.get(`/product/${id}`);
      setProduct(data.product);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    productDetail();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Helmet>
        <title data-rh="true">{`${product.name} | E-commerce`}</title>
      </Helmet>
      <>
        {!loading ? (
          <div className="container-full md:px-10 min-h-screen">
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginY: "8px" }}>
              <Link to={"/"}>Home</Link>
              <Link to={"/category"}>Category</Link>
              <Typography color="text.primary">{product.name}</Typography>
            </Breadcrumbs>
            <div className="md:grid grid-cols-1 md:grid-cols-3 md:gap-5 border-t  border-r-gray-400 lg:py-5 py-4">
              <div className="">
                <ImageThumbs images={product.images} />
              </div>
              <div className="block">
                <h1 className="md:text-3xl text-xl  font-semibold text-zinc-700">
                  {product.category} {product.name}
                </h1>
                <div className="">
                  <h1 className="text-lg leading-6 lg:mt-4 mt-4 text-zinc-600">
                    {product.descr}
                  </h1>
                </div>
              </div>
              <div className="flex justify-center col-span-1">
                <div>
                  <div className="sticky top-28 border border-gray-300 md:rounded-xl">
                    <div className="flex flex-col md:p-5 justify-between w-[350px]">
                      <div className="border flex_betwen overflow-hidden border-gray-300 text-lg text-white rounded-lg md:mb-5">
                        <button className="bg-gray-400 px-6 py-[14px] text-xl">
                          <AiOutlineMinus />
                        </button>
                        <p className="text-xl text-gray-800 font-semibold">
                          15
                        </p>
                        <button className="bg-orange-500 px-6 py-[14px] text-xl">
                          <AiOutlinePlus />
                        </button>
                      </div>
                      <div className="flex_betwen md:mt-4 border-b border-gray-300 pb-4">
                        <p className="md:text-lg text-gray-600">Price</p>
                        <p className="md:text-xl text-gray-800 font-semibold">
                          {product.price}
                        </p>
                      </div>
                      <div className="flex_betwen md:my-4">
                        <p className="md:text-lg text-gray-600">Shipping</p>
                        <p className="md:text-xl text-gray-800 font-semibold">
                          free
                        </p>
                      </div>
                      <Button
                        variant="contained"
                        size="large"
                        aria-label="add"
                        color="warning"
                        sx={{
                          background: "#ff8400",
                          borderRadius: "8px",
                          marginY: "20px",
                          paddingY: "15px",
                          textTransform: "none",
                        }}
                      >
                        <div className="flex_center text-lg">
                          <FiShoppingCart className="md:mr-2" />
                          <p className="">add to cart</p>
                        </div>
                      </Button>
                      <button className="py-3 border-2 border-orange-300 text-lg text-orange-600 font-semibold rounded-lg">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ProductDetailLoader />
        )}

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
              <ReviewsBox product={product} productDetail={productDetail} />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ProductDetail;
