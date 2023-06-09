import {
  Checkbox,
  FormControl,
  InputAdornment,
  Rating,
  Slider,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiSearch } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gteLtePrice } from "../../redux/filter";

export const ratings = [
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

const Filter = ({
  categories,
  brands,
  getFilterUrl,
  category,
  price,
  setPrice,
}) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  let { t } = useTranslation(["product"]);
  const { rangePrice } = useSelector((state) => state.filter);
  const navigate = useNavigate();
  const { search } = useLocation();

  const sp = new URLSearchParams(search); // /search?category=Shirts
  const query = sp.get("query");
  const minPrice = sp.get("min-price");
  const maxPrice = sp.get("max-price");
  const [termBd, setTermBd] = useState("");
  const [termCy, setTermCy] = useState("");

  const [showCy, setShowCy] = useState(true);
  const [showBd, setShowBd] = useState(true);
  const [showRg, setShowRg] = useState(true);
  const [showPc, setShowPc] = useState(true);
  const filteredBrands = brands.filter((s) => {
    const searchName = s.name;
    return searchName.toLowerCase().includes(termBd.toLowerCase());
  });
  const filteredCategories = categories.filter((s) => {
    const searchName = s.nameOz;
    return searchName.toLowerCase().includes(termCy.toLowerCase());
  });
  const handleChange = (event, newValue) => {
    setPrice(newValue);
    navigate(
      `/search?query=${query}&min-price=${rangePrice[0]}&max-price=${rangePrice[1]}`
    );
    // dispatch(gteLtePrice(newValue));
  };
  return (
    <div className="sticky top-8">
      <div className="flex_col border border-gray-200 rounded-lg xl:p-5 p-4">
        <h1 className="text-xl text-gray-700 font-semibold md:mb-8">
          {t("filter")}
        </h1>
        <div className="flex_col">
          <div
            onClick={() => setShowPc(!showPc)}
            className="flex_betwen text-gray-600 md:mb-2 cursor-pointer"
          >
            <p className="text-lg font-semibold">{t("price-by")}</p>
            <MdOutlineKeyboardArrowDown className="md:text-2xl" />
          </div>
          {showPc && (
            <div className="">
              <Slider
                value={price}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={rangePrice[0] || minPrice}
                color="secondary"
                max={rangePrice[1] || maxPrice}
              />
              <div className="flex_betwen md:my-5">
                <TextField
                  size="small"
                  value={price[0]}
                  // onChange={(e) => setTerm(e.target.value)}
                  placeholder={t("from")}
                  variant="outlined"
                  color="secondary"
                  sx={{ marginRight: "10px" }}
                />
                <TextField
                  size="small"
                  value={price[1]}
                  // value={term}
                  // onChange={(e) => setTerm(e.target.value)}
                  placeholder={t("up-to")}
                  variant="outlined"
                  color="secondary"
                />
              </div>
            </div>
          )}
          <div className="flex_col md:my-3">
            <div
              onClick={() => setShowCy(!showCy)}
              className="flex_betwen text-gray-600 md:mb-2 cursor-pointer"
            >
              <p className="text-lg font-semibold">{t("category-by")}</p>
              <MdOutlineKeyboardArrowDown className="md:text-2xl" />
            </div>
            {showCy && (
              <div className="">
                <FormControl>
                  <TextField
                    color="secondary"
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
                    placeholder={t("category-search")}
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
                      <Checkbox
                        size="small"
                        defaultChecked={item === category ? true : false}
                      />
                      <p className="my-[6px] w-full text-gray-600">
                        {i18n.language === "oz"
                          ? item.nameOz
                          : i18n.language === "uz"
                          ? item.nameUz
                          : i18n.language === "ru"
                          ? item.nameRu
                          : null}
                      </p>
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
              <p className="text-lg font-semibold">{t("brand-by")}</p>
              <MdOutlineKeyboardArrowDown className="md:text-2xl" />
            </div>
            {showBd && (
              <div className="">
                <FormControl>
                  <TextField
                    color="secondary"
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
                    placeholder={t("brand-search")}
                    variant="outlined"
                  />
                </FormControl>

                <div className="block mt-1">
                  {filteredBrands.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <Checkbox size="small" color="secondary" />
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
              <p className="text-lg font-semibold">{t("rating-by")}</p>
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
                    <Checkbox size="small" color="secondary" />
                    <Rating defaultValue={item.rating} readOnly />
                    <span className="ml-2 text-gray-800">{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Filter;
