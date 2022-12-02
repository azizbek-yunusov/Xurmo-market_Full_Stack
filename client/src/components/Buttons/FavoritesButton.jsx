import { Badge, Space } from "antd";
import React from "react";
import { GrFavorite } from "react-icons/gr";

const FavoritesButton = () => {
  return (
    <Space size="middle">
      <Badge count={0} showZero>
        <GrFavorite shape="square" className="md:text-2xl cursor-pointer" />
      </Badge>
    </Space>
  );
};

export default FavoritesButton;
