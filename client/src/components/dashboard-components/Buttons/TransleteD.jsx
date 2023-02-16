import { Badge, Box, IconButton, Menu, MenuItem } from "@mui/material";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineTranslate } from "react-icons/md";

const TransleteD = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDropdownClose = () => {
    setAnchorEl(null);
  };
  const { i18n } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("uz");
    }
  }, []);
  const handleChange = (value) => {
    setAnchorEl(null);
    i18n.changeLanguage(value);
  };
  const languages = [
    {
      name: "Uzbekcha",
      value: "uz",
    },
    {
      name: "English",
      value: "en",
    },
    {
      name: "Russian",
      value: "ru",
    },
  ];
  return (
    <>
      <IconButton
        onClick={handleDropdownOpen}
        color="default"
        sx={{ marginX: 1 }}
        aria-label="translate"
      >
        <MdOutlineTranslate className="icon_color md:text-2xl text-xl" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 130, marginTop: 1 } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {languages.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleChange(item.value)}
            className={` ${
              localStorage.getItem("i18nextLng") === item.value ? "" : ""
            } `}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default TransleteD;
