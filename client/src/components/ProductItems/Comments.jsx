import React from "react";
import { Rate } from "antd";

const Comments = ({ review }) => {
  console.log(review);
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="flex">
          <img src="" className="w-9 h-9" alt="" />
          <p className="">{review.user.name}</p>
          <span className="">08.12.2022</span>
        </div>
        <div className="">
          <Rate disabled value={review.rating} />
        </div>
      </div>
      <div className="">
        <p className="">{review.comment}</p>
      </div>
    </div>
  );
};

export default Comments;
