import { Button, Tooltip } from "@mui/material";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { BsCalendarDate, BsEye, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

const PostCard = ({
  _id,
  title,
  excerpt,
  content,
  createdAt,
  viewsCount,
  slug,
  image,
  handleDeletePost,
}) => {
  let { t } = useTranslation(["dashboard"]);
  return (
    <div className="p-3 border_l rounded-xl">
      <Link to={`/post/detail/${_id}`} className="w-full flex_center">
        <img
          src={image?.url}
          className="h-40 w-full object-cover rounded-lg"
          alt={title}
        />
      </Link>
      <div className="flex_betwen my-2 text-gray-500">
        <div className="flex_center">
          <BsCalendarDate className="mr-1" />
          <span>{moment(createdAt).format("lll")}</span>
        </div>
        <div className="flex_center">
          <AiOutlineEye className="mr-1 text-xl" />
          <span>{viewsCount}</span>
        </div>
      </div>
      <Link
        to={`/post/detail/${_id}`}
        className=" to-zinc-700 font-semibold text-lg hover:text-purple-600 transition_normal"
      >
        <p className="mb-2">{title}</p>
      </Link>
      <p className="text-zinc-500 mb-2">{excerpt.slice(0, 150)}...</p>
      <div className="flex_betwen">
        <Link to={`/post/detail/${_id}`}>
          <Tooltip title="View">
            <Button
              variant="contained"
              size="small"
              color="info"
              sx={{
                marginRight: "10px",
              }}
              startIcon={<BsEye />}
            >
              {t("view")}
            </Button>
          </Tooltip>
        </Link>
        <Link to={`/post/detail/${_id}`}>
          <Tooltip title="Update Item">
            <Button
              fullWidth
              variant="contained"
              size="small"
              sx={{}}
              startIcon={<BiEdit />}
            >
              {t("update")}
            </Button>
          </Tooltip>
        </Link>
        <Tooltip title="Delete Item">
          <Button
            onClick={() => handleDeletePost(_id)}
            variant="contained"
            size="small"
            color="error"
            sx={{
              marginLeft: "10px",
            }}
            startIcon={<BsTrash />}
          >
            {t("delete")}
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default PostCard;
