import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import BrandItem from "./BrandItem";

const BrandsList = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/brands");
      setBrands(data.brands);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container-full md:my-5 my-5 md:pt-10 md:pb-5 bg-[#f2f2f2]">
      <div className="flex_betwen">
        <h1 className="lg:text-3xl text-2xl text-gray-800 text-left font-semibold">
          Brendlar
        </h1>
        <Link
          to={"/manufacturer"}
          className="text-lg hover:underline transition_normal text-orange-500"
        >
          Barchasini ko'rish
        </Link>
      </div>
      <div className="lg:grid lg:grid-cols-6 lg:my-5 my-4 lg:gap-5 flex justify-between">
        {brands.slice(0, 6).map((brand) => (
          <BrandItem key={brand._id} {...brand} />
        ))}
      </div>
    </div>
    // <>
    //   {loading ? (
    //     <CategoryListLoader />
    //   ) : (
    //     <div className="md:my-10 my-5 container-full">
    //       <Swiper
    //         breakpoints={{
    //           300: {
    //             width: 300,
    //             slidesPerView: 3,
    //             spaceBetween: 10,
    //           },
    //           425: {
    //             width: 425,
    //             slidesPerView: 3,
    //             spaceBetween: 10,
    //           },
    //           640: {
    //             width: 640,
    //             slidesPerView: 3,
    //             spaceBetween: 10,
    //           },
    //           768: {
    //             width: 768,
    //             slidesPerView: 4,
    //             spaceBetween: 10,
    //           },
    //           1024: {
    //             width: 1024,
    //             slidesPerView: 5,
    //             spaceBetween: 40,
    //           },
    //         }}
    //       >
    //         {brands.map((item, index) => (
    //           <SwiperSlide key={index}>
    //             <BrandItem {...item} />
    //           </SwiperSlide>
    //         ))}
    //       </Swiper>
    //     </div>
    //   )}
    // </>
  );
};

export default BrandsList;
