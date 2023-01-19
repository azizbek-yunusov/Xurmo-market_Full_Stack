import { Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NotFoundSvg from "../assets/svg/illustration_404.svg";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="overflow-hidden">
      <div className="container-full pt-7  min-h-[600px] flex items-center flex-col justify-start">
        <h1 className="md:text-gray-800 my-4 font-semibold text-3xl ">
          Sorry, page not found!
        </h1>
        <p className="text-gray-400 text-base md:my-3 md:px-[450px] text-center">
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </p>
        <img src={NotFoundSvg} className="h-72" alt="" />
        <Button
          onClick={() => navigate("/")}
          variant="contained"
          className="w-44"
          size="large"
          sx={{
            background: "rgb(145, 85, 253)",
            borderRadius: "6px",
            marginY: "20px",
          }}
        >
          Go To Home
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
