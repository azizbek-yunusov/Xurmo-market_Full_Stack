import styled from "@emotion/styled";
import { Badge } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { FiHeart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 2,
    border: `2px solid white`,
    padding: "0px 4px",
  },
}));

const FavoritesButton = () => {
  const { favorites } = useSelector((state) => state);
  let { t } = useTranslation(["product"]);
  return (
    <Link
      to={"/wishlist"}
      className="flex justify-between text-gray-500 active:text-orange-400 transition_normal flex-col items-center"
    >
      <StyledBadge
        showZero
        badgeContent={favorites ? favorites.length : 0}
        color="warning"
      >
        <FiHeart className="text-2xl cursor-pointer" />
      </StyledBadge>
      <p className="text-xs pt-1 sm:text-sm">{t("wish")}</p>
    </Link>
  );
};

export default FavoritesButton;
