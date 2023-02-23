import React, { useEffect } from "react";
import CategoryItem from "./CategoryItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CategoryListLoader } from "../SkeletonLoaders";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/category";

const CategoryList = () => {
  const { isLoading, categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <CategoryListLoader />
      ) : (
        <div className="md:my-10 mb-6 container-full">
          <Swiper
            breakpoints={{
              300: {
                slidesPerView: 3,
                spaceBetween: 5,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
            }}
            slidesPerView={7}
            spaceBetween={5}
            pagination={{
              clickable: true,
            }}
          >
            {categories.map((item, index) => (
              <SwiperSlide key={index}>
                <CategoryItem {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default CategoryList;
