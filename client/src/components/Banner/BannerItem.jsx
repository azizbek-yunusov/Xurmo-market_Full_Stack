import React from "react";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";

const BannerItem = ({ name, image, href }) => {
  return (
    <div
      // onMouseMove={() => console.log("hover")}
      className="w-full overflow-hidden cursor-pointer flex justify-start items-center"
    >
      <img
        src={image.url}
        alt={name}
        className="w-full bg-center object-cover lg:h-[385px] md:h-[248px] h-[135px] rounded-xl"
      />
    </div>
  );
};

export default BannerItem;
