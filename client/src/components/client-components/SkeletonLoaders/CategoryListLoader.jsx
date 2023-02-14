import React from "react";

const CategoryListLoader = () => {
  const category = ["1", "2", "3"];
  return (
    <div className="col-span-12 grid lg:grid-cols-5 md:grid-cols-3 lg:gap-4 grid-cols-2 gap-3 container-full flex_betwen md:my-10 animate-pulse">
      {category.map((item, index) => (
        <div key={index} className="md:w-48 md:h-28 w-20 h-20 bg-[#dadada] rounded-xl"></div>
      ))}
    </div>
  );
};

export default CategoryListLoader;
