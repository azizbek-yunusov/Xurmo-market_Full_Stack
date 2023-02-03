import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryItem from "./CategoryItem";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { CategoryListLoader } from "../SkeletonLoaders";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const CategoryList = () => {
  const matches = useMediaQuery("(min-width: 700px)");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data.categories);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <CategoryListLoader />
      ) : (
        <div className="md:my-10 my-5 container-full">
          <Swiper
            style={{
              "--swiper-navigation-size": "18px",
            }}
            breakpoints={{
              300: {
                width: 300,
                slidesPerView: 3,
                spaceBetween: 10,
              },
              425: {
                width: 425,
                slidesPerView: 3,
                spaceBetween: 10,
              },
              640: {
                width: 640,
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                width: 768,
                slidesPerView: 5,
                spaceBetween: 10,
              },
              1024: {
                width: 1024,
                slidesPerView: 6,
                spaceBetween: 40,
              },
            }}
            modules={[Pagination]}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
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
