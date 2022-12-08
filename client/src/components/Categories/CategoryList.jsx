import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryItem from "./CategoryItem";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data.categories);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="md:my-10 container-full">
      <Swiper
        style={{
          "--swiper-navigation-size": "18px",
        }}
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={7}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {categories.map((item, index) => (
          <SwiperSlide key={index}>
            <CategoryItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryList;
