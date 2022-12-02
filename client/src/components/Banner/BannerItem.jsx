import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const BannerItem = () => {
  return (
    <div className="w-full cursor-pointer min-h-[200px] rounded-xl">
      <LazyLoadImage
        src="https://olcha.uz/image/original/sliders/ru/F2uzGLSdISWqNSBfF4PAOJWIs0zsvlh44PlTyXsOwh6mdMCmXVW6hghvZIrd."
        alt="banner"
        effect="blur"
        className="w-full bg-center object-center min-h-[200px] lg:h-full rounded-xl"
      />
    </div>
  );
};

export default BannerItem;
