import React, { useEffect, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import UzSvg from "../../../assets/svg/Flag_of_Uzbekistan.svg";
import EnSvg from "../../../assets/svg/Flag_of_United_States.svg";
import RuSvg from "../../../assets/svg/Flag_of_Russia.svg";
import { alpha, Menu, MenuItem } from "@mui/material";
import styled from "@emotion/styled";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const StyledMenu = styled((props) => (
  <Menu
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(2),
    minWidth: 110,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Translate = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const languages = [
    {
      name: "Uzbekcha",
      lng: "uz",
      svg: UzSvg,
    },
    {
      name: "English",
      lng: "en",
      svg: EnSvg,
    },
    {
      name: "Русский",
      lng: "ru",
      svg: RuSvg,
    },
  ];
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("uz");
    }
  }, []);
  const handleLangChange = (lng) => {
    i18n.changeLanguage(lng);
    setAnchorEl(null);
  };
  return (
    <div>
      <div className="flex_betwen transition_normal">
        <div
          onClick={handleClick}
          className="flex items-center cursor-pointer text-gray-100"
        >
          <p className="text-gray-100">
            {i18n.language === "uz"
              ? "O'zbekcha"
              : i18n.language === "ru"
              ? "Русский"
              : i18n.language === "en"
              ? "English"
              : null}
          </p>
          <MdOutlineKeyboardArrowDown />
        </div>
      </div>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {languages.map((item, index) => (
          <MenuItem key={index} onClick={() => handleLangChange(item.lng)}>
            {item.name}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};
export default Translate;
