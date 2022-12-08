import React, { useState } from "react";
import { Rate } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const Reviews = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const headers = {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("jwt"),
  };
  const reviewsHandler = async (e) => {
    e.preventDefault();
    // await axios.put("/review", {
    //   headers: headers,
    //   productId,
    //   comment,
    //   rating,
    // });
    // toast.success("reviews");

    fetch("http://localhost:5000/review", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        productId,
        rating,
        comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          toast.error(data.error);
        } else {
          toast.success("reviews");
        }
      });
  };
  return (
    <div className="max-w-xl">
      <form onSubmit={reviewsHandler}>
        <span>
          <Rate tooltips={desc} onChange={setRating} value={rating} />
          {rating ? (
            <span className="ant-rate-text">{desc[rating - 1]}</span>
          ) : (
            ""
          )}
        </span>
        <div>
          <label className="">Description</label>
          <textarea
            id="textarea"
            type="textarea"
            rows={5}
            placeholder="Description"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500  focus:outline-none focus:ring"
          />
        </div>
        <button>submit</button>
      </form>
    </div>
  );
};

export default Reviews;
