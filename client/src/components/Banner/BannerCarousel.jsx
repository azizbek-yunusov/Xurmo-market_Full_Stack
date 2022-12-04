import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BannerItem from "./BannerItem";
// import img from "../assets/img/1.jpg"
const responsive = {
  all: {
    breakpoint: { max: 2560, min: 320 },
    items: 1,
  },
};
const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  const fetchBanners = async () => {
    try {
      const { data } = await axios.get("/banners", {
        headers: { Authorization: localStorage.getItem("jwt") },
      });
      setBanners(data.banners);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBanners();
  }, []);
  return (
    <div className="container-full grid grid-cols-12">
      <Carousel
        showDots={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        infinite
        draggable={false}
        // customLeftArrow={customLeftArrow}
        // customRightArrow={customRightArrow}
        responsive={responsive}
        className="col-span-9 rounded-xl"
      >
        {banners.map((item) => (
          <BannerItem key={item._id} {...item} />
        ))}
      </Carousel>
      <div className="col-span-3"></div>
    </div>
  );
};

export default BannerCarousel;
