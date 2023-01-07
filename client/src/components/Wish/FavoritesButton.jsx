import { Badge, Space } from "antd";
import React from "react";
import { GrFavorite } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FavoritesButton = () => {
  const { favorite } = useSelector((state) => state);
  return (
    <>
      <Link to={"/wishlist"}>
        <Space size="middle">
          <Badge count={favorite ? favorite.length : 0} showZero>
            <GrFavorite shape="square" className="md:text-2xl cursor-pointer" />
          </Badge>
        </Space>
      </Link>
    </>
  );
};

export default FavoritesButton;
