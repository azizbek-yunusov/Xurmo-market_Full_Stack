import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="overflow-hidden">
      <div className="container-full  min-h-[600px] flex items-center flex-col justify-center">
        <h2 className="mb-6 text-9xl text-indigo-600 font-bold leading-none">
          404
        </h2>
        <h3 className="mb-4 text-3xl font-bold">Something is wrong!</h3>
        <p className="text-lg text-gray-600 font-medium mb-5">
          The page you are looking for is not found! Try something else or go
          back to homepage.
        </p>
        <div>
          <Link
            to={"/"}
            className="inline-flex items-center text-center font-semibold py-2 px-5 rounded-xl bg-indigo-500 text-gray-100 hover:text-gray-50 leading-normal"
          >
            <span>Go Back to Homepage</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
