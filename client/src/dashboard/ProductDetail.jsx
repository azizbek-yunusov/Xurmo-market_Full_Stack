import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./Layout";

const ProductDetail = () => {
  const goback = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const productDetail = () => {
    fetch(`http://localhost:5000/product/${id}`, {
      method: "get",
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
      });
  };
  useEffect(() => {
    productDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(product);
  return (
    <Layout>
      <section className="text-gray-400 min-h-screen bg-slate-50 body-font overflow-hidden">
        <div className="px-5 py-5">
          <button
            onClick={() => goback(-1)}
            className="lg:px-4 px-2 text-md  rounded-full py-3 flex font-medium border text-gray-500 border-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <p className="">Назад</p>
          </button>
          <div className=" flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h1 className="text-zinc-700 text-3xl title-font font-medium mb-4">
                id : {product._id}
              </h1>
              <h1 className="text-zinc-700 border-t py-2 border-gray-500 text-3xl title-font font-medium">
                Name: {product.name}
              </h1>
              {/* <div className="flex mb-4">
                <a className="flex-grow text-yellow-400 border-b-2 border-yellow-500 py-2 text-lg px-1">
                  Description
                </a>
                <a className="flex-grow border-b-2 border-gray-800 py-2 text-lg px-1">
                  Reviews
                </a>
                <a className="flex-grow border-b-2 border-gray-800 py-2 text-lg px-1">
                  Details
                </a>
              </div> */}
              <h1 className="text-zinc-700 text-xl border-t py-2 border-gray-500 title-font font-medium">
                Price: {product.price}$
              </h1>
              <h1 className="text-zinc-700 border-t py-2 border-gray-500 text-xl title-font font-medium">
                descr: {product.descr}
              </h1>
            </div>
            <img
              alt={product.name}
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={product.image}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
