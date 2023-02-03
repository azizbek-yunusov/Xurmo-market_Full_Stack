import { Box, Button, LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Review } from "./Review";

export const ReviewsBox = () => {
  const { auth, product } = useSelector((state) => state);
  const navigate = useNavigate();

  const signInNavigate = () => navigate("/signin");
  const findFive = product?.reviews?.filter((item) => item.rating === 5);
  const fivePercentage =
    findFive?.length > 0 ? (findFive?.length * 100) / product?.numOfReviews : 0;
  const findFour = product?.reviews?.filter((item) => item.rating === 4);
  const fourPercentage =
    findFour?.length > 0 ? (findFour?.length * 100) / product?.numOfReviews : 0;
  return (
    <>
      <div className="md:max-w-[400px] max-h-[440px] md:p-6 p-5 md:px-8 md:rounded-lg rounded-xl flex justify-between flex-col w-full border border-gray-300">
        <div className="flex md:mt-1 items-center justify-between">
          <div className="">
            <h1 className="text-5xl font-semibold">
              {product.ratings?.toFixed(1)}
            </h1>
            <p className="text-base text-gray-400 mt-4">
              Based on {product.numOfReviews} reviews
            </p>
          </div>
          <div className="">
            {/* <Rate disabled allowHalf value={product.ratings} /> */}
          </div>
        </div>
        <div className="my-3">
          <div className="md:my-5 flex justify-between items-center">
            <div className="flex">
              <AiFillStar className="text-orange-500" />
              <AiFillStar className="text-orange-500" />
              <AiFillStar className="text-orange-500" />
              <AiFillStar className="text-orange-500" />
              <AiFillStar className="text-orange-500" />
            </div>
            <Box sx={{ width: "100%", marginX: "6px" }}>
              <LinearProgress
                variant="determinate"
                color="warning"
                sx={{ borderRadius: "5px" }}
                value={fivePercentage}
              />
            </Box>
            <span className="">5</span>
          </div>
          <div className="md:my-5 flex justify-between items-center">
            <div className="flex">
              <AiFillStar className="text-orange-500" />
              <AiFillStar className="text-orange-500" />
              <AiFillStar className="text-orange-500" />
              <AiFillStar className="text-orange-500" />
              <AiOutlineStar className="text-gray-500" />
            </div>
            <Box sx={{ width: "100%", marginX: "6px" }}>
              <LinearProgress
                variant="determinate"
                color="warning"
                sx={{ borderRadius: "5px" }}
                value={fourPercentage}
              />
            </Box>
            <span className="">4</span>
          </div>
          <div className="md:my-5 flex justify-between items-center">
            <div className="flex">
              <AiFillStar className="text-orange-500" />
              <AiFillStar className="text-orange-500" />
              <AiFillStar className="text-orange-500" />
              <AiOutlineStar className="text-gray-500" />
              <AiOutlineStar className="text-gray-500" />
            </div>
            <Box sx={{ width: "100%", marginX: "6px" }}>
              <LinearProgress
                variant="determinate"
                color="warning"
                sx={{ borderRadius: "5px" }}
                value={0}
              />
            </Box>
            <span className="">3</span>
          </div>
          <div className="md:my-5 flex justify-between items-center">
            <div className="flex">
              <AiFillStar className="text-orange-500" />
              <AiFillStar className="text-orange-500" />
              <AiOutlineStar className="text-gray-500" />
              <AiOutlineStar className="text-gray-500" />
              <AiOutlineStar className="text-gray-500" />
            </div>
            <Box sx={{ width: "100%", marginX: "6px" }}>
              <LinearProgress
                variant="determinate"
                color="warning"
                sx={{ borderRadius: "5px" }}
                value={0}
              />
            </Box>
            <span className="">2</span>
          </div>
          <div className="md:my-5 flex justify-between items-center">
            <div className="flex">
              <AiFillStar className="text-orange-500" />
              <AiOutlineStar className="text-gray-500" />
              <AiOutlineStar className="text-gray-500" />
              <AiOutlineStar className="text-gray-500" />
              <AiOutlineStar className="text-gray-500" />
            </div>
            <Box sx={{ width: "100%", marginX: "6px" }}>
              <LinearProgress
                variant="determinate"
                color="warning"
                sx={{ borderRadius: "5px" }}
                value={0}
              />
            </Box>
            <span className="">1</span>
          </div>
        </div>
        <div className="w-full">
          {auth.isLogged ? (
            <>
              <Review product={product} />
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                // onClick={showModal}
              >
                add review
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
