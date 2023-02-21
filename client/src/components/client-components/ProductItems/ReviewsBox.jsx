import React from "react";
import { Box, Button, LinearProgress } from "@mui/material";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Review } from "./Review";

export const ReviewsBox = () => {
  const { product } = useSelector((state) => state.product);


  // 1 star
  const findOne = product?.reviews?.filter((item) => item.rating === 1);
  const onePercentage =
    findOne?.length > 0 ? (findOne?.length * 100) / product?.numOfReviews : 0;
  // 2 star
  const findTwo = product?.reviews?.filter((item) => item.rating === 2);
  const twoPercentage =
    findTwo?.length > 0 ? (findTwo?.length * 100) / product?.numOfReviews : 0;
  // 3 star
  const finThree = product?.reviews?.filter((item) => item.rating === 3);
  const threePercentage =
    finThree?.length > 0 ? (finThree?.length * 100) / product?.numOfReviews : 0;
  // 4 star
  const findFour = product?.reviews?.filter((item) => item.rating === 4);
  const fourPercentage =
    findFour?.length > 0 ? (findFour?.length * 100) / product?.numOfReviews : 0;
  // 5 star
  const findFive = product?.reviews?.filter((item) => item.rating === 5);
  const fivePercentage =
    findFive?.length > 0 ? (findFive?.length * 100) / product?.numOfReviews : 0;

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
                value={threePercentage}
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
                value={twoPercentage}
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
                value={onePercentage}
              />
            </Box>
            <span className="">1</span>
          </div>
        </div>
        <div className="w-full">
          {/* {auth.isLogged ? (
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
          )} */}
        </div>
      </div>
    </>
  );
};
