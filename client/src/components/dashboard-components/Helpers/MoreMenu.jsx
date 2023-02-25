import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { BiDotsVerticalRounded } from "react-icons/bi";

const MoreMenu = ({ isFilter, setIsFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDropdownClose = () => {
    setAnchorEl(null);
  };
  const isShowFilterPanel = () => {
    setIsFilter(!isFilter);
    setAnchorEl(null);
  };
  const reload = () => {
  };
  return (
    <>
      <IconButton onClick={handleDropdownOpen}>
        <BiDotsVerticalRounded />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 150, marginTop: 1 } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={reload}>reload</MenuItem>
        <MenuItem onClick={isShowFilterPanel}>filter bar</MenuItem>
      </Menu>
    </>
  );
};

export default MoreMenu;
