import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ name, slug, image }) => {
  return (
    <Link
      to={`/category/${slug}`}
      className="cursor-pointer flex flex-col items-center mx-2"
    >
      <div className="">
        <img className="md:h-32 h-20 object-cover" src={image} alt="" />
      </div>
      <p className="text-zinc-800 lg:text-base text-center text-xs tranistion_normal hover:text-red-600">{name}</p>
    </Link>
  );
};

export default CategoryItem;
