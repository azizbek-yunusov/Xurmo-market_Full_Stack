// import "../../assets/styles/swipperThumbs.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
import { useState } from "react";
import "swiper/css";
import "swiper/css/thumbs";

const ImageThumbs = ({ images }) => {
  const [activeThumb, setActiveThumb] = useState();
  return (
    <main>
      {images && images[0] && (
        <>
          <Swiper
            loop={true}
            spaceBetween={10}
            modules={[Thumbs]}
            grabCursor={true}
            className="product-images-slider border-2 border-gray-300 mb-2 rounded-lg bg-white"
            thumbs={{
              swiper:
                activeThumb && !activeThumb.destroyed ? activeThumb : null,
            }}
          >
            {images.map((item, index) => (
              <SwiperSlide key={index}>
                <img
                  src={item.url}
                  alt="product images "
                  className="object-cover p-4"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {images.length > 1 ? (
            <Swiper
              onSwiper={setActiveThumb}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              modules={[Navigation, Thumbs]}
              className="product-images-slider-thumbs"
            >
              {images.map((item, index) => (
                <SwiperSlide key={index} className="rounded-md overflow-hidden">
                  <div className="product-images-slider-thumbs-wrapper">
                    <img
                      src={item.url}
                      alt="product images"
                      className="object-cover p-2"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </>
      )}
    </main>
  );
};

export default ImageThumbs;
