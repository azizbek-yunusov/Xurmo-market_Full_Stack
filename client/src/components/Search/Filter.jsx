import styled from "@emotion/styled";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputAdornment,
  Slider,
  SliderThumb,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MdOutlineExpandMore } from "react-icons/md";

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return <SliderThumb {...other}>{children}</SliderThumb>;
}

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#3a8589",
  height: 5,
  padding: "13px 10",

  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 10,
  },
}));
function valuetext(value) {
  return `${value}°C`;
}
const Filter = ({ categories, brands }) => {
  const [value, setValue] = useState([10, 90]);
  const [fromPrice, setFromPrice] = useState(0);
  const [untilPrice, setUntilPrice] = useState(100000);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex_col border border-gray-200 rounded-lg p-4">
      <h1 className="text-xl text-gray-700 font-semibold md:mb-8">Filter</h1>
      <div className="flex_col">
        <p className="text-lg text-gray-600 font-semibold md:mb-3">Price</p>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />

        <div className="flex_betwen md:my-5">
          <TextField
            type={"number"}
            size="small"
            id="max-price"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">dan</InputAdornment>
              ),
            }}
            sx={{ marginRight: "8px" }}
          />

          <TextField
            type={"number"}
            size="small"
            id="max-price"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">gacha</InputAdornment>
              ),
            }}
          />
        </div>
        <div className="flex_col md:my-5">
          <p className="text-lg text-gray-600 font-semibold md:mb-2">
            Category
          </p>
          <div className="block">
            {categories.map((item, index) => (
              <p key={index} className="my-2 w-full text-gray-600">
                {item.name}
              </p>
            ))}
          </div>
          
        </div>
        <div className="flex_col md:my-5">
          <p className="text-lg text-gray-600 font-semibold md:mb-2">
            Brand
          </p>
          <div className="block">
            {brands.map((item, index) => (
              <p key={index} className="my-2 w-full text-gray-600">
                {item.name}
              </p>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Filter;
