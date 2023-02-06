import {
  Checkbox,
  FormControl,
  InputAdornment,
  Rating,
  TextField,
} from "@mui/material";
import Slider from "@material-ui/core/Slider";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

function valuetext(value) {
  return `${value}°C`;
}

export const ratings = [
  {
    name: "5",
    rating: 5,
  },
  {
    name: "4",
    rating: 4,
  },

  {
    name: "3",
    rating: 3,
  },

  {
    name: "2",
    rating: 2,
  },

  {
    name: "1",
    rating: 1,
  },
];

const Filter = ({ categories, brands, getFilterUrl, category}) => {
  const [value, setValue] = useState([0, 10000]);
  const [termBd, setTermBd] = useState("");
  const [termCy, setTermCy] = useState("");
  const [showCy, setShowCy] = useState(true);
  const [showBd, setShowBd] = useState(true);
  const [showRg, setShowRg] = useState(true);
  const [showPc, setShowPc] = useState(true);
  const [fromPrice, setFromPrice] = useState(0);
  const [untilPrice, setUntilPrice] = useState(100000);

  const filteredBrands = brands.filter((s) => {
    const searchName = s.name;
    return searchName.toLowerCase().includes(termBd.toLowerCase());
  });
  const filteredCategories = categories.filter((s) => {
    const searchName = s.name;
    return searchName.toLowerCase().includes(termCy.toLowerCase());
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex_col border border-gray-200 rounded-lg p-5">
      <h1 className="text-xl text-gray-700 font-semibold md:mb-8">Filter</h1>
      <div className="flex_col">
        <div
          onClick={() => setShowPc(!showPc)}
          className="flex_betwen text-gray-600 md:mb-2 cursor-pointer"
        >
          <p className="text-lg font-semibold">Price</p>
          <MdOutlineKeyboardArrowDown className="md:text-2xl" />
        </div>
        {showPc && (
          <div className="">
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={10000}
            />

            <div className="flex_betwen md:my-5">
              <TextField
                size="small"
                // value={term}
                // onChange={(e) => setTerm(e.target.value)}
                placeholder="dan"
                variant="outlined"
                sx={{ marginRight: "15px" }}
              />
              <TextField
                size="small"
                // value={term}
                // onChange={(e) => setTerm(e.target.value)}
                placeholder="gacha"
                variant="outlined"
              />
            </div>
          </div>
        )}
        <div className="flex_col md:my-3">
          <div
            onClick={() => setShowCy(!showCy)}
            className="flex_betwen text-gray-600 md:mb-2 cursor-pointer"
          >
            <p className="text-lg font-semibold">Category</p>
            <MdOutlineKeyboardArrowDown className="md:text-2xl" />
          </div>
          {showCy && (
            <div className="">
              <FormControl>
                <TextField
                  size="small"
                  fullWidth
                  value={termCy}
                  onChange={(e) => setTermCy(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BiSearch className="text-xl" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search Category"
                  variant="outlined"
                />
              </FormControl>
              <div className="block mt-1">
                {filteredCategories.map((item, index) => (
                  <Link
                    to={getFilterUrl({ category: item.name })}
                    key={index}
                    className="flex"
                  >
                    <Checkbox size="small" defaultChecked={item === category ? true : false} />
                    <p className="my-[6px] w-full text-gray-600">{item.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex_col md:my-3">
          <div
            onClick={() => setShowBd(!showBd)}
            className="flex_betwen text-gray-600 md:mb-2 cursor-pointer"
          >
            <p className="text-lg font-semibold">Brand</p>
            <MdOutlineKeyboardArrowDown className="md:text-2xl" />
          </div>
          {showBd && (
            <div className="">
              <FormControl>
                <TextField
                  size="small"
                  fullWidth
                  value={termBd}
                  onChange={(e) => setTermBd(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BiSearch className="text-xl" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search Brand"
                  variant="outlined"
                />
              </FormControl>
              <div className="block mt-1">
                {filteredBrands.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <Checkbox size="small" />
                    <p className="my-[6px] w-full uppercase font-semibold text-gray-600">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex_col md:my-3">
          <div
            onClick={() => setShowRg(!showRg)}
            className="flex_betwen text-gray-600 md:mb-2 cursor-pointer"
          >
            <p className="text-lg font-semibold">Rating</p>
            <MdOutlineKeyboardArrowDown className="md:text-2xl" />
          </div>
          {showRg && (
            <div className="flex_col mt-1">
              {ratings.map((item, index) => (
                <Link
                  to={getFilterUrl({ rating: item.rating })}
                  key={index}
                  className="flex items-center md:my-1"
                >
                  <Checkbox size="small" color="warning" />
                  <Rating defaultValue={item.rating} readOnly />
                  <span className="ml-2 text-gray-800">{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
