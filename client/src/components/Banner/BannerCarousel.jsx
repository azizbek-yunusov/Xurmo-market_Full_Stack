import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BannerItem from "./BannerItem";
import { BannerLoader } from "../SkeletonLoaders";

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/banners");
      setBanners(data.banners);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBanners();
  }, []);
  return (
    <div className="container-full grid grid-cols-12 overflow-hidden">
      <div className="col-span-12 rounded-xl overflow-hidden">
        {loading ? (
          <BannerLoader />
        ) : (
          <Swiper
            style={{
              "--swiper-navigation-size": "18px",
            }}
            modules={[Pagination, Navigation]}
            spaceBetween={40}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {banners.map((item, index) => (
              <SwiperSlide key={index}>
                <BannerItem {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default BannerCarousel;
