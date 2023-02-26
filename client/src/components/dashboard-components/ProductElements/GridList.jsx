import {
  IconIconButton,
  ButtonIconButton,
  Ratin,
  IconButtong,
  Tooltip,
  IconButton,
  Rating,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsEye, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import Price from "../../client-components/Helpers/Price";

const GridList = ({
  products,
  handleSelectAll,
  selectedProductIds,
  filteredProducts,
  handleSelectOne,
  handleDeleteProduct,
}) => {
  let { t } = useTranslation(["product-d"]);

  return (
    <div className="grid grid-cols-3 xl:grid-cols-4 gap-5 p-5">
      {filteredProducts.length ? (
        filteredProducts.map((item, index) => (
          <div className="overflow-hidden bg-white relative flex tranistion_normal hover:shadow-xl flex-col justify-between md:border border-gray-200 hover:border-gray-50 md:rounded-xl rounded-md md:p-3 p-2 md:px-4">
            <div className="">
              <Link
                to={`/product/view/${item._id}`}
                className="flex justify-center items-center"
              >
                <img
                  className="md:h-44 h-[140px] object-cover"
                  src={item.images[0].url}
                  alt=""
                />
              </Link>
              <div className="w-full mt-1 text-gray-800">
                <h1 className="md:text-base text-sm font-semibold global-font">
                  {item.name}
                </h1>
              </div>
            </div>
            <div className="w-full text-gray-800 mt-3">
              {item.discount > 0 ? (
                <div className="">
                  <Price
                    price={item.price - (item.price * item.discount) / 100}
                    className="md:text-lg font-semibold"
                  />
                  <Price
                    price={item.price}
                    className="md:text-lg font-semibold line-through text-gray-500 md:ml-3"
                  />
                </div>
              ) : (
                <Price
                  price={item.price}
                  className="md:text-lg font-semibold"
                />
              )}

              <div className="flex items-center md:mt-2 mt-1">
                <h1 className="text-base text-gray-700 mr-2">
                  {item.ratings?.toFixed(1)}
                </h1>
                <Rating
                  icon={<AiFillStar fontSize="20px" />}
                  emptyIcon={<AiOutlineStar fontSize="20px" />}
                  readOnly
                  value={item.ratings || 0}
                />
              </div>
            </div>
            <div className="w-full flex justify-end md:px-2 mt-4">
              <Link to={`/product/detail/${item._id}`}>
                <Tooltip title="View">
                  <IconButton
                    variant="contained"
                    size="small"
                    sx={{
                      marginRight: "10px",
                      borderRadius: "6px",
                      background: "green",
                    }}
                  >
                    <BsEye className="text-white" />
                  </IconButton>
                </Tooltip>
              </Link>
              <Link to={`/banner/${item._id}`}>
                <Tooltip title="Update Item">
                  <IconButton
                    variant="contained"
                    size="small"
                    sx={{
                      background: "blue",
                      borderRadius: "6px",
                    }}
                  >
                    <BiEdit className="text-white" />
                  </IconButton>
                </Tooltip>
              </Link>
              <Tooltip title="Delete Item">
                <IconButton
                  onClick={() => handleDeleteProduct(item._id)}
                  variant="contained"
                  size="small"
                  sx={{
                    marginLeft: "10px",
                    background: "red",
                    borderRadius: "6px",
                  }}
                >
                  <BsTrash className="text-white" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ))
      ) : (
        <div className="flex_center p-5">
          <h1 className="w-full">no data</h1>
        </div>
      )}
    </div>
  );
};

export default GridList;
