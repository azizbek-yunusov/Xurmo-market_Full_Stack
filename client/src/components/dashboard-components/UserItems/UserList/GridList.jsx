import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiEdit } from "react-icons/bi";
import { BsEye, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

const GridList = ({
  users,
  handleSelectAll,
  selectedCustomerIds,
  filteredUsers,
  handleSelectOne,
  handleDeleteUser,
}) => {
  let { t } = useTranslation(["category-d"]);

  return (
    <div className="grid grid-cols-3 xl:grid-cols-4 gap-5 p-5">
      {filteredUsers.length ? (
        filteredUsers.map((item, index) => (
          <div
            key={index}
            className="col-span-1 rounded-lg border border-gray-200 dark:border-gray-600 p-2"
          >
            <div className="w-full flex_center py-2">
              <img
                src={item.avatar.url}
                className="h-28 object-cover rounded-full bg-teal-300"
                alt=""
              />
            </div>
            <h1 className="text_color text-center xl:text-lg mb-5 mt-3">
              {item.lastName ? `${item.name} ${item.lastName}` : item.name}
            </h1>
            <div className="flex justify-end">
              <Link to={`/user/view/${item._id}`}>
                <Tooltip title="View">
                  <IconButton variant="contained" size="small">
                    <BsEye />
                  </IconButton>
                </Tooltip>
              </Link>
              <Link to={`/user/update/${item._id}`}>
                <Tooltip title="Update Item">
                  <IconButton
                    fullWidth
                    variant="contained"
                    size="small"
                    color="info"
                    startIcon={<BiEdit />}
                  >
                    {t("update")}
                  </IconButton>
                </Tooltip>
              </Link>
              <Tooltip title="Delete Item">
                <IconButton
                  onClick={() => handleDeleteUser(item._id)}
                  variant="contained"
                  size="small"
                  color="error"
                  startIcon={<BsTrash />}
                >
                  {t("delete")}
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
