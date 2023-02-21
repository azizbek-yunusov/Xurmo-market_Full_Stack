import React from "react";
import moment from "moment";
import { IconButton, Rating } from "@mui/material";
import {
  AiFillStar,
  AiOutlineDislike,
  AiOutlineLike,
  AiOutlineStar,
} from "react-icons/ai";

const Comments = ({ review }) => {
  return (
    <div className="rounded-lg md:my-5 my-4 border_primary md:p-5 p-3 pb-2 w-full">
      <div className="flex justify-between md:pb-3">
        <div className="flex items-center">
          <img
            src={
              review.user?.avatar?.url ||
              "https://www.ihp.ie/wp-content/uploads/profile-img.jpg"
            }
            className="w-12 h-12 object-cover bg-cyan-200 rounded-full"
            alt="Avatar"
          />
          <div className="ml-1">
            <h1 className="md:text-xl text-gray-700 mx-2 font-semibold">
              {review.user ? review.user.name : "deleted account"}
            </h1>
            <p className="text-sm text-gray-600 mx-2">
              {review.createdAt
                ? moment(review.createdAt).startOf().fromNow()
                : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Rating
            icon={<AiFillStar fontSize="18px" />}
            emptyIcon={<AiOutlineStar fontSize="18px" />}
            value={review.rating}
            readOnly
          />
          <p className="md:text-xl mx-2">{review.rating}</p>
        </div>
      </div>
      <div className="mt-4 md:ml-[60px] md:mr-9">
        <p className="">{review.comment}</p>
      </div>
      <div className="md:mt-3 mt-2 flex justify-end items-center">
        <IconButton size="small">
          <AiOutlineLike />
          <span>0</span>
        </IconButton>
        <IconButton size="small">
          <AiOutlineDislike />
          <span>0</span>
        </IconButton>
      </div>
    </div>
  );
};
export default Comments;
