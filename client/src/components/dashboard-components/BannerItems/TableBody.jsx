import { Avatar, Checkbox, Chip } from "@mui/material";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

const TableBody = ({
  banners,
  handleSelectAll,
  selectedBannerIds,
  filteredBanners,
  handleSelectOne,
  deleteBanner,
}) => {
  let { t } = useTranslation(["banner-d"]);

  return (
    <table className="min-w-max w-full table-auto rounded-lg ">
      <thead>
        <tr className="bg-gray-100 text-left dark:bg-[#232338] text-gray-500 dark:text-gray-200 text-sm font-light rounded-t-lg uppercase">
          <th className="py-2 text-center">
            <Checkbox
              checked={selectedBannerIds.length === banners.length}
              color="primary"
              indeterminate={
                selectedBannerIds.length > 0 &&
                selectedBannerIds.length < banners.length
              }
              onChange={handleSelectAll}
            />
          </th>
          <th className="px-3">{t("banner")}</th>
          <th className="px-3">{t("created-by")}</th>
          <th className="px-3">{t("created-at")}</th>
          <th className="px-3">{t("actions")}</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 dark:text-gray-300 text-sm font-light">
        {filteredBanners.length ? (
          filteredBanners
            .map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 font-semibold hover:dark:bg-gray-600"
              >
                <td className="py-3 flex_center">
                  <Checkbox
                    checked={selectedBannerIds.indexOf(item._id) !== -1}
                    onChange={(event) => handleSelectOne(event, item._id)}
                    value="true"
                  />
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <div className="flex justify-start items-center">
                    <div className="mr-4">
                      <img
                        className="h-12 w-full rounded"
                        src={item.image.url}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col mr-2">
                      <Link
                        to={`/item/${item._id}`}
                        className="transition_normal hover:text-purple-500"
                      >
                        {item.name}
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 text-left">
                  <div className="flex justify-start items-center">
                    <div className="mr-2">
                      <Avatar
                        src="https://www.material-tailwind.com/img/face-2.jpg"
                        alt="avatar"
                        size="sm"
                      />
                    </div>
                    <span className="mr-2">
                      {item.createdBy ? item.createdBy.name : "deleted account"}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex justify-start items-center">
                    <span>{moment(item.createdAt).format("lll")}</span>
                  </div>
                </td>

                <td className="py-3 px-6 text-left">
                  <div className="flex item-center justify-start">
                    <Link
                      to={`/banner/${item._id}`}
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
                    <Link to={`/banner/${item._id}`}>
                      <div className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110">
                        <FiEdit className="text-lg" />
                      </div>
                    </Link>
                    <button
                      onClick={() => deleteBanner(item._id)}
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