import React from "react";
import DayProductItem from "./DayProductItem";
import { Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const DayProductList = ({ products }) => {
  return (
    <div className="h-full pb-2">
      <div className="bg-white rounded-md day_gradient_border p-1 h-full my-1">
        <div className="flex_betwen md:px-3">
          <h1 className="text-lg">Kun maxsuloti</h1>
        </div>
        <Swiper
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
      </div>
    </div>
  );
};

export default DayProductList;
