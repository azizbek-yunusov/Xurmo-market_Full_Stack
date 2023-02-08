import { Badge } from "@mui/material";
import React from "react";
import { GrFavorite } from "react-icons/gr";
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
          <GrFavorite className="md:text-[26px] cursor-pointer" />
        </Badge>
      </Link>
    </>
  );
};

export default FavoritesButton;
