import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import BannerItem from "./BannerItem";
import DayProductList from "./DayProductList";

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const fetchBanners = async () => {
    try {
      const { data } = await axios.get("/banners");
      setBanners(data.banners);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBanners();
    fetchProducts();
  }, []);
  return (
    <div className="container-full grid grid-cols-12 gap-5 overflow-hidden">
      <div className="col-span-9 rounded-xl overflow-hidden">
        <Swiper
          // install Swiper modules
          modules={[Pagination]}
          spaceBetween={40}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {banners.map((item, index) => (
            <SwiperSlide key={index}>
              <BannerItem {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="col-span-3 flex items-center justify-center">
        <DayProductList products={products} />
      </div>
    </div>
  );
};

export default BannerCarousel;
