import React from "react";

const DayProductItem = ({ name, images, price }) => {
  return (
    <div className=" overflow-hidden px-5 m-1 bg-white rounded-lg flex flex-col items-center h-[350px]">
      <img src={images[0].url} className="h-44 mt-9" alt={name} />
      <div className="w-full">
        <p className="text-lg">{name}</p>
      </div>
      <div className="w-full ">
        <p className="md:text-2xl mt-2 font-semibold">
          {price}
          {"$"}
        </p>
      </div>
    </div>
  );
};

export default DayProductItem;
