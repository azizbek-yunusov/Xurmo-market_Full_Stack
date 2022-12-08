import React from "react";

const DayProductItem = ({ name, image, price }) => {
  return (
    <div className=" overflow-hidden p-3 rounded-xl flex flex-col items-center h-[350px]">
      <img src={image} className="h-44 mt-9" alt={name} />
      <div className="w-full">
        <p className="">{name}</p>
      </div>
      <div className="w-full ">
        <p className="md:text-xl font-semibold">
          {price}
          {"$"}
        </p>
      </div>
    </div>
  );
};

export default DayProductItem;
