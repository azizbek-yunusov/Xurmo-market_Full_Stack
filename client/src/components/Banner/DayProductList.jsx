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
        className="rounded-xl mx-10"
        // install Swiper modules
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        navigation={false}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {products.map((item, index) => (
          <SwiperSlide key={index} className="day_gradient_border">
            <DayProductItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default DayProductList;
