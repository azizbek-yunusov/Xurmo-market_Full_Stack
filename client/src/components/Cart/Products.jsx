import { Button } from "@mui/material";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useGlobalApi from "../../hooks/useGlobalApi";

const Products = ({ cart }) => {
  const { access_token } = useSelector((state) => state.auth);
  const {
    addToCartHandle,
    decrementQtyItem,
    deleteHandle,
    deleteFavoriteItem,
  } = useGlobalApi(access_token);
  return (
    <>
      <div className="container-full grid grid-cols-12 gap-5 min-h-screen">
        <div className="col-span-8 ">
          <div className="border border-gray-200 p-5 md:rounded-2xl">
            <div className="flex justify-between items-center font-semibold mb-4 text-gray-700">
              <h1 className="md:text-2xl">Shopping cart</h1>
              <h1 className="md:text-xl font-mono">Items {cart.length}</h1>
            </div>
            <div>
              {cart && cart[0]
                ? cart.map((item, index) => (
                    <div
                      key={index}
                      className="p-1 my-2 border-t border-t-gray-200"
                    >
                      <div className="grid grid-cols-12 lg:py-3 py-3 px-1 ease-in-out duration-300 border-b-0 border-b-gray-200">
                        <div className="col-span-7 flex justify-start">
                          <div className="overflow-hidden border-0 border-gray-300 py-1 rounded-xl">
                            <img
                              src={item.productId.images[0].url}
                              alt={""}
                              className="object-cover md:h-28 md:w-28 w-24 h-24 object-center"
                            />
                          </div>
                          <div className="md:ml-4 flex flex-col justify-between">
                            <p className="md:text-base font-semibold">
                              {item.productId.name}
                            </p>
                            <p className="font-semibold text-lg">
                              {item.productId.price}
                              {"$"}
                            </p>
                            <div className="flex">
                              <button
                                onClick={() => deleteHandle(item.productId._id)}
                                className="flex items-center text-base text-red-500"
                              >
                                <HiOutlineTrash className="md:text-xl" />
                                {"  "}
                                {"remove"}
                              </button>
                              <span className="text-gray-600 md:mx-2">|</span>
                              <button
                                onClick={() =>
                                  deleteFavoriteItem(item.productId._id)
                                }
                                className="flex items-center text-base text-blue-500"
                              >
                                <BsHeart className="md:text-lg mr-1" />
                                {"  "}
                                {"add favorites"}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3 flex justify-center items-center">
                          <div className="flex items-center w-max md:justify-center justify-between h-min rounded-md">
                            {item.quantity > 1 ? (
                              <button
                                onClick={() =>
                                  decrementQtyItem(item.productId._id)
                                }
                                className="h-8 text-[#00e8a6] border-2 border-[#00e8a6] tranistion_normal hover:bg-[#00e8a6] hover:text-white rounded-lg p-1 px-2"
                              >
                                <AiOutlineMinus />
                              </button>
                            ) : (
                              <button className="h-8 cursor-not-allowed text-red-600 border-2 border-[#f00] rounded-lg p-1 px-2">
                                <AiOutlineMinus />
                              </button>
                            )}
                            <p className="mx-4 font-mono text-lg">
                              {item.quantity}
                            </p>
                            <button
                              onClick={() => {
                                addToCartHandle(item.productId._id);
                              }}
                              className="h-8 text-[#00e8a6] border-2 border-[#00e8a6] tranistion_normal hover:bg-[#00e8a6] hover:text-white rounded-lg p-1 px-2"
                            >
                              <AiOutlinePlus />
                            </button>
                          </div>
                        </div>
                        <div className="col-span-2 flex justify-center items-center">
                          <h1 className="md:text-2xl font-semibold tracking-widest text-gray-700">
                            {item.quantity * item.productId.price}
                            {"$"}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
          {/* <div className="border border-gray-200 p-5 md:rounded-2xl my-5">
                <Addresses />
              </div> */}
        </div>
        <div className="col-span-4">
          <div className="sticky top-28 border border-gray-200 p-5 md:rounded-2xl">
            <div className="flex justify-between md:px-3 items-center mb-5 border-b-2 border-b-gray-300">
              <h1 className="md:text-2xl mb-5 text-gray-600 font-bold">
                Total:
              </h1>
              <h1 className="md:text-2xl mb-5 text-gray-600 font-bold">
                {cart.reduce((a, c) => a + c.productId.price * c.quantity, 0)}
                {"$"}
              </h1>
            </div>
            <div className="border-2 border-purple-400 flex justify-between items-center overflow-hidden rounded-xl">
              <input
                type="text"
                className="w-full px-4 text-base py-3"
                placeholder="promo code"
              />
              <button className="my-[2px] lowercase flex px-10 h-full py-3 rounded-lg mx-[2px] bg-purple-600 text-white">
                apply
              </button>
            </div>
            <div className=" mt-6">
              <ul className="flex justify-between items-center text-gray-700">
                <li className="text-lg">Stoimost delivery:</li>
                <li className="text-lg">0$</li>
              </ul>
            </div>
            <div className="mt-5">
              <Link to={"/checkout"}>
                <Button
                  className="w-full tracking-wide font-normal"
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{
                    background: "rgb(145, 85, 253)",
                    borderRadius: "6px",
                  }}
                >
                  check out
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
