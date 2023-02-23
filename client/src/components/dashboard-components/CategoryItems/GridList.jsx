import { Button, Tooltip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiEdit } from "react-icons/bi";
import { BsEye, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

const GridList = ({
  categories,
  handleSelectAll,
  selectedCategoryIds,
  filteredCategories,
  handleSelectOne,
  handleDeleteCategory,
}) => {
  const { i18n } = useTranslation();
  let { t } = useTranslation(["category-d"]);
  console.log(filteredCategories);
  return (
    <div className="grid grid-cols-3 xl:grid-cols-4 gap-5 p-5">
      {filteredCategories.length ? (
        filteredCategories.map((item, index) => (
          <div
            key={index}
            className="col-span-1 rounded-lg border border-gray-200 dark:border-gray-600 p-2"
          >
            <div className="w-full flex_center">
              <img
                src={item.image.url}
                className="h-40 object-cover rounded-xl"
                alt=""
              />
            </div>
            <h1 className="text_color xl:text-lg mb-5 mt-3">
              {i18n.language === "uz"
                ? item.nameUz
                : i18n.language === "en"
                ? item.nameEn
                : i18n.language === "ru"
                ? item.nameRu
                : null}
            </h1>
            <div className="flex justify-end">
              <Link to={`/banner/${item._id}`}>
                <Tooltip title="View">
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
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
                    }}
                    startIcon={<BiEdit />}
                  >
                    {t("update")}
                  </Button>
                </Tooltip>
              </Link>
              <Tooltip title="Delete Item">
                <Button
                  onClick={() => handleDeleteCategory(item._id)}
                  variant="contained"
                  size="small"
                  sx={{
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
      ) : (
        <div className="flex_center p-5">
          <h1 className="w-full">no data</h1>
        </div>
      )}
    </div>
  );
};

export default GridList;
