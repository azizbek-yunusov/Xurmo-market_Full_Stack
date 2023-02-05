import axios from "axios";
import React, { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BannerItem from "./BannerItem";
import { BannerLoader } from "../SkeletonLoaders";
import DayProductList from "./DayProductList";

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

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
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/products");
      setProducts(data.products);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBanners();
    fetchProducts();
  }, []);
  return (
    <div className="container-full lg:grid lg:grid-cols-12 block overflow-hidden md:my-4 gap-0 pb-2">
      <div className="col-span-9 rounded-xl overflow-hidden">
        {loading ? (
          <BannerLoader />
        ) : (
          <Swiper
            style={{
              "--swiper-navigation-size": "18px",
            }}
            breakpoints={{
              300: {
                modules: [],
              },
              768: {
                modules: [],
              },
              1024: {
                width: 1024,
                modules: [Pagination, Navigation],
              },
              1280: {
                width: 1280,
                modules: [Pagination, Navigation],
              },
            }}
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            spaceBetween={10}
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
      <div className="col-span-3 xl:mx-8 lg:mx-5 lg:my-0 my-5">
        <DayProductList products={products} />
      </div>
    </div>
  );
};

export default BannerCarousel;
