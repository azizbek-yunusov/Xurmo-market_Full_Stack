import React from "react";

const CategoryListLoader = () => {
  const category = ["1", "2", "3", "4", "5", "6", "7"];
  return (
    <div className="container-full flex_betwen md:my-10 animate-pulse">
      {category.map((item, index) => (
        <div key={index} className="w-48 h-28 bg-[#dadada] rounded-xl"></div>
      ))}
    </div>
  );
};

export default CategoryListLoader;
