import React from "react";
import DayProductItem from "./DayProductItem";
import { Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const DayProductList = ({ products }) => {
  console.log(products);
  return (
    <>
      <Swiper
        className="rounded-xl mx-10 day_gradient_border"
        // install Swiper modules
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        navigation={false}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {products.map((item, index) => (
          <SwiperSlide key={index} className="">
            <DayProductItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default DayProductList;
