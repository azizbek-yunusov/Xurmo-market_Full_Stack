import { Badge } from "@mui/material";
import React from "react";
import { FiHeart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FavoritesButton = () => {
  const { favorites } = useSelector((state) => state);
  return (
    <>
      <Link to={"/wishlist"}>
        <Badge
          showZero
          badgeContent={favorites ? favorites.length : 0}
          color="error"
          
        >
          <FiHeart className="md:text-[26px] text-xl text-gray-700 cursor-pointer" />
        </Badge>
      </Link>
    </>
  );
};

export default FavoritesButton;
