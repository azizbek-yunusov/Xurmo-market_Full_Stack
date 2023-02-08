import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryItem from "./CategoryItem";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { useMediaQuery } from "@mui/material";
import { CategoryListLoader } from "../SkeletonLoaders";

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
