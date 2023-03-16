import { Avatar, Checkbox } from "@mui/material";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

const TableBody = ({
  subCategorys,
  handleSelectAll,
  selectedCategoryIds,
  filteredCategories,
  handleSelectOne,
  handledeleteSubCategory,
}) => {
  const { i18n } = useTranslation();
  let { t } = useTranslation(["category"]);
  return (
    <table className="min-w-max w-full table-auto rounded-lg overflow-scroll">
      <thead>
        <tr className="bg-gray-100 text-left dark:bg-[#232338] text-gray-500 dark:text-gray-200 text-sm font-light rounded-t-lg uppercase">
          <th className="py-2 text-center">
            <Checkbox
              checked={selectedCategoryIds.length === subCategorys.length}
              color="primary"
              indeterminate={
                selectedCategoryIds.length > 0 &&
                selectedCategoryIds.length < subCategorys.length
              }
              onChange={handleSelectAll}
            />
          </th>
          <th className="px-2 xl:px-3">{t("name")}</th>
          <th className="px-2 xl:px-3">{t("category")}</th>
          <th className="px-2 xl:px-3">{t("created-by")}</th>
          <th className="px-2 xl:px-3">{t("created-at")}</th>
          <th className="px-2 xl:px-3">{t("actions")}</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 dark:text-gray-300 text-sm font-light ">
        {filteredCategories.length ? (
          filteredCategories
            .map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 font-semibold hover:dark:bg-gray-600"
              >
                <td className="py-3 flex_center">
                  <Checkbox
                    checked={selectedCategoryIds.indexOf(item._id) !== -1}
                    onChange={(event) => handleSelectOne(event, item._id)}
                    value="true"
                  />
                </td>
                <td className="py-3 px-2 xl:px-3 whitespace-nowrap">
                  <div className="flex justify-start items-center">
                    <div className="mr-4">
                      <img
                        className="h-12 w-full rounded"
                        src={item.image.url}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col xl:mr-2">
                      <Link
                        to={`/item/${item._id}`}
                        className="transition_normal hover:text-purple-500"
                      >
                        {i18n.language === "uz"
                          ? item.titleUz
                          : i18n.language === "en"
                          ? item.titleEn
                          : i18n.language === "ru"
                          ? item.titleRu
                          : null}
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 xl:px-3 whitespace-nowrap">
                  <div className="flex justify-start items-center">
                    <div className="flex flex-col xl:mr-2">
                      <Link
                        to={`/item/${item.categoryId._id}`}
                        className="transition_normal hover:text-purple-500"
                      >
                        {i18n.language === "uz"
                          ? item.categoryId.nameUz
                          : i18n.language === "en"
                          ? item.categoryId.nameEn
                          : i18n.language === "ru"
                          ? item.categoryId.nameRu
                          : null}
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 xl:px-3 text-left">
                  <div className="flex justify-start items-center">
                    <div className="mr-2">
                      <Avatar
                        src={
                          item.createdBy?.avatar?.url ||
                          "https://www.material-tailwind.com/img/face-2.jpg"
                        }
                        alt="avatar"
                        size="sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Link
                        to={`/category/${item.createdBy?._id}`}
                        className="transition_normal hover:text-purple-500"
                      >
                        {item.createdBy?.name}
                      </Link>
                      <span className="text-gray-500 text-[12px]">
                        {item.createdBy?.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 xl:px-3 text-left">
                  <div className="flex justify-start items-center">
                    <span>{moment(item.createdAt).format("lll")}</span>
                  </div>
                </td>

                <td className="py-3 px-2 xl:px-3 text-left">
                  <div className="flex item-center justify-start">
                    <Link
                      to={`/category/${item._id}`}
                      className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </Link>
                    <Link to={`/category/${item._id}`}>
                      <div className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110">
                        <FiEdit className="text-lg" />
                      </div>
                    </Link>
                    <button
                      onClick={() => handledeleteSubCategory(item._id)}
                      className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
            .reverse()
        ) : (
          <tr className="flex_center p-5">
            <td className="w-full">no data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableBody;
