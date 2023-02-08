import React from "react";

const DayProductItem = ({ name, images, price }) => {
  return (
    <div className="overflow-hidden lg:px-3 bg-white rounded-b-lg flex lg:flex-col justify-between flex-row md:items-center items-start lg:h-[300px] md:h-[170px] h-[140px]">
      <img src={images[0].url} className="md:h-44 h-40 md:mt-5" alt={name} />
      <div className="w-full">
        <p className="text-lg">{name}</p>
      </div>
      <div className="w-full ">
        <p className="md:text-2xl md:mt-2 font-semibold">
          {price}
          {"$"}
        </p>
      </div>
    </div>
  );
};

export default DayProductItem;
