import React from "react";
import moment from "moment";
import { Rating } from "@mui/material";

const Comments = ({ review }) => {
  return (
    <div className="rounded-lg my-5 border border-gray-200 p-5 w-full">
      <div className="flex justify-between md:pb-3">
        <div className="flex items-center">
          <img
            src={review.user?.avatar.url || "https://www.ihp.ie/wp-content/uploads/profile-img.jpg"}
            className="w-12 h-12 object-cover rounded-full"
            alt=""
          />
          <div className="ml-1">
            <h1 className="md:text-xl mx-2">
              {review.user ? review.user.name : "deleted account"}
            </h1>
            <p className="md:text-sm text-gray-600 mx-2">
              {review.createdAt ? moment(review.createdAt).startOf().fromNow() : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Rating value={review.rating} readOnly />
          <p className="md:text-xl mx-2">{review.rating}</p>
        </div>
      </div>
      <div className="mt-4 ml-[60px] mr-9">
        <p className="">{review.comment}</p>
      </div>
    </div>
  );
};

export default Comments;
