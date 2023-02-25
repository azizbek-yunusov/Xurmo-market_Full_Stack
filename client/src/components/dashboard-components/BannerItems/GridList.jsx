import { Button, Tooltip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiEdit } from "react-icons/bi";
import { BsEye, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

const GridList = ({
  banners,
  handleSelectAll,
  selectedBannerIds,
  filteredBanners,
  handleSelectOne,
  handleDeleteBanner,
}) => {
  let { t } = useTranslation(["banner-d"]);
  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      {filteredBanners.length ? (
        filteredBanners
          .map((item, index) => (
            <div
              key={index}
              className="col-span-1 rounded-lg border border-gray-200 dark:border-gray-600 p-2"
            >
              <img src={item.image.url} className="h-40 rounded-xl" alt="" />
              <h1 className="text_color text-lg mb-5 mt-3">{item.name}</h1>
              <div className="flex justify-end">
                <Link to={`/banner/${item._id}`}>
                  <Tooltip title="View">
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        marginRight: "10px",
                        borderRadius: "6px",
                        background: "green",
                      }}
                      startIcon={<BsEye />}
                    >
                      {t("view")}
                    </Button>
                  </Tooltip>
                </Link>
                <Link to={`/banner/${item._id}`}>
                  <Tooltip title="Update Item">
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      sx={{
                        background: "blue",
                        borderRadius: "6px",
                      }}
                      startIcon={<BiEdit />}
                    >
                      {t("update")}
                    </Button>
                  </Tooltip>
                </Link>
                <Tooltip title="Delete Item">
                  <Button
                    onClick={() => handleDeleteBanner(item._id)}
                    variant="contained"
                    size="small"
                    sx={{
                      marginLeft: "10px",
                      borderRadius: "6px",
                      background: "red",
                    }}
                    startIcon={<BsTrash />}
                  >
                    {t("delete")}
                  </Button>
                </Tooltip>
              </div>
            </div>
          ))
          .reverse()
      ) : (
        <div className="flex_center p-5">
          <h1 className="w-full">no data</h1>
        </div>
      )}
    </div>
  );
};

export default GridList;
