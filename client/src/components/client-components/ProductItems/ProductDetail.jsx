import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs, Rating, Typography } from "@mui/material";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { ProductDetailLoader } from "../SkeletonLoaders";
import { HelmetTitle } from "../../../utils";
import ImageThumbs from "./ImageThumbs";
import Comments from "./Comments";
import { ReviewsBox } from "./ReviewsBox";
import { getProduct } from "../../../redux/product";
import BottomScoll from "./BottomScoll";
import Stock from "../Helpers/Stock";
import AddToWish from "../Helpers/AddToWish";
import { useTranslation } from "react-i18next";
import ShopBox from "./ShopBox";

const ProductDetail = () => {
  let { t } = useTranslation(["product"]);
  const { product, isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProduct(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);
  return (
    <>
      {!isLoading && product ? (
        <section>
          <HelmetTitle title={`${product?.name}`} />
          <BottomScoll product={product} />
          <div className="container-full xl:px-10 xl:min-h-screen">
            <Breadcrumbs
              className="md:flex hidden"
              aria-label="breadcrumb"
              sx={{ marginY: "8px" }}
            >
              <Link to={"/"}>{t("home-title")}</Link>
              <Link to={"/category"}>{product?.category}</Link>
              <Typography className="text-xs">{product?.name}</Typography>
            </Breadcrumbs>
            <div className="md:grid grid-cols-1 lg:grid-cols-3 xl:gap-x-5 border-t border-r-gray-400 lg:py-5 py-3">
              <div className="md:bg-transparent  bg-gray-200 rounded-2xl">
                <ImageThumbs images={product.images} />
              </div>
              <div className="block md:my-0 md:px-3 px-0 my-3">
                <div className="flex_betwen">
                  <h1 className="xl:text-3xl md:text-2xl text-2xl  font-semibold text-zinc-700">
                    {product.name}
                  </h1>
                  <div className="is_desktop">
                    <AddToWish productId={product._id} />
                  </div>
                </div>
                <div className="flex items-center mt-2 mb-2">
                  <Rating
                    icon={<AiFillStar fontSize="20px" />}
                    emptyIcon={<AiOutlineStar fontSize="20px" />}
                    readOnly
                    value={product?.ratings || 0}
                  />
                  <span className="text-lg text-gray-700 ml-2">
                    {product.ratings?.toFixed(1)}
                  </span>
                </div>
                <Stock inStock={product.inStock} />
                <h1 className="md:text-base text-sm leading-6 lg:mt-4 mt-2 md:text-zinc-600 text-gray-500">
                  {product.descr}
                </h1>
              </div>
              <ShopBox product={product} />
            </div>
          </div>
          <div className="md:mt-0 mt-1 container-full">
            <h1 className="md:text-4xl text-2xl text-gray-700 md:mb-5 mb-4">
              {t("reviews")}
            </h1>
            <div className="lg:grid md:grid-cols-12 md:gap-9 flex flex-col-reverse">
              <div className="w-full col-span-7">
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
                  <p className="noReviews">{t("no-reviews")}</p>
                )}
              </div>
              <div className="w-full col-span-5 flex justify-end">
                <ReviewsBox />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <ProductDetailLoader />
      )}
    </>
  );
};
export default ProductDetail;
