import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs, Button, Rating, Typography } from "@mui/material";
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
  const goback = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProduct(id));
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      <HelmetTitle title={`${product?.name}`} />
      <BottomScoll product={product} />
      <>
        {!isLoading ? (
          <div className="md:px-10 xl:min-h-screen">
            <Breadcrumbs
              className="container-full"
              aria-label="breadcrumb"
              sx={{ marginY: "8px" }}
            >
              <Link to={"/"}>{t("hometitle")}</Link>
              <Link to={"/category"}>Category</Link>
              <Typography color="text.primary">{product.name}</Typography>
            </Breadcrumbs>
            <div className="md:grid grid-cols-1 md:grid-cols-3 md:gap-5 border-t  border-r-gray-400 lg:py-5 pb-4">
              <div className="md:bg-transparent bg-gray-200  rounded-b-[30px]">
                <ImageThumbs images={product.images} />
              </div>
              <div className="block container-full md:my-0 my-3">
                <div className="flex_betwen">
                  <h1 className="md:text-3xl text-2xl  font-semibold text-zinc-700">
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
                <h1 className="md:text-lg text-sm leading-6 lg:mt-4 mt-2 md:text-zinc-600 text-gray-500">
                  {product.descr}
                </h1>
              </div>
              <ShopBox product={product} />
            </div>
          </div>
        ) : (
          <ProductDetailLoader />
        )}

        <div className="container-full md:mt-0 mt-1">
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
      </>
    </>
  );
};
export default ProductDetail;
