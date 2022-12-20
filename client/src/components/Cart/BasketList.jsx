import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { GlobalState } from "../../GlobalState";

const BasketList = () => {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;
  const addToCartHanle = state.userAPI.addToCartHanle;
  const deleteHandler = state.userAPI.deleteHandler;
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Helmet>
        <title data-rh="true">Shopping Cart | E-commerce</title>
      </Helmet>
      <div className="md:my-5">
        {cart.length ? (
          <div className="container-full grid grid-cols-12 gap-5 min-h-screen">
            <div className="col-span-8 border border-gray-200 p-5 md:rounded-2xl">
              <div className="flex justify-between items-center font-semibold text-gray-700">
                <h1 className="md:text-2xl mb-5">Shopping cart</h1>
                <h1 className="md:text-xl mb-5 font-mono">
                  Items {cart.length}
                </h1>
              </div>
              <div className="py-1 border-t border-t-gray-200 ">
                <div className="grid grid-cols-12 p-1 border-b border-b-gray-300 pb-3 font-semibold text-gray-600">
                  <div className="col-span-7 flex justify-start border-r border-r-gray-300">
                    Product item
                  </div>
                  <div className="col-span-3 flex justify-center border-r border-r-gray-300">
                    Quantity
                  </div>
                  <div className="col-span-2 flex justify-center">
                    Total price
                  </div>
                </div>
                {cart && cart[0]
                  ? cart.map((item, index) => (
                      <div key={index} className="p-1 my-2">
                        <div className="grid grid-cols-12 lg:py-3 py-3 px-1 ease-in-out duration-300 border-b border-b-gray-200">
                          <div className="col-span-7 flex justify-start">
                            <div className="overflow-hidden border border-gray-300 py-1 rounded-xl">
                              <img
                                src={item.productId.images[0].url}
                                alt={""}
                                className="object-cover md:h-28 md:w-28 w-24 h-24 object-center"
                              />
                            </div>
                            <div className="ml-2 flex flex-col justify-between">
                              <p className=" md:text-base font-semibold">
                                {item.productId.name}
                              </p>
                              <p className="font-semibold text-lg">
                                {item.productId.price}
                                {"$"}
                              </p>
                              <div className="">
                                <button
                                  onClick={() =>
                                    deleteHandler(item.productId._id)
                                  }
                                  className="flex items-center text-lg font-semibold text-red-500"
                                >
                                  <HiOutlineTrash className="md:text-xl" />{" "}
                                  {"remove"}
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-3 flex justify-center items-center">
                            <div className="flex items-center w-max md:justify-center justify-between h-min rounded-md">
                              {item.quantity > 1 ? (
                                <button
                                  onClick={() =>
                                    deleteHandler(item.productId._id)
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
                                onClick={() =>
                                  addToCartHanle(item.productId._id)
                                }
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
            <div className="col-span-4">
              <div className="border border-gray-200 p-5 md:rounded-2xl">
                <div className="flex justify-between md:px-3 items-center mb-5 border-b border-b-gray-300">
                  <h1 className="md:text-2xl mb-5 text-gray-600 font-bold">
                    Total:
                  </h1>
                  <h1 className="md:text-2xl mb-5 text-gray-600 font-bold">
                    {cart.reduce((a, c) => a + c.productId.price * c.quantity, 0)}
                    {"$"}
                  </h1>
                </div>
                <div className="border-2 border-gray-400 flex justify-between items-center overflow-hidden rounded-2xl">
                  <input type="text" disabled className="py-3 w-full px-4 text-lg" placeholder="promo code" />
                  <button className="bg-green-500 py-3 text-lg px-6">submit</button>
                </div>
                <div className=" mt-6">
                  <ul className="flex justify-between items-center">
                    <li className="text-lg">Stoimost delivery:</li>
                    <li className="text-lg">0$</li>
                  </ul>
                </div>
                <div className="mt-5">
                  <button className="rounded-2xl w-full py-4 bg-indigo-600 text-white text-xl">
                  placing an order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-[630px] flex justify-center items-center">
            <div className="flex justify-center flex-col">
              <h1 className="text-4xl font-semibold">
                The shopping cart is empty
              </h1>
              <button
                // onClick={() => navigate("/")}
                className="px-5 py-4 mt-8 text-2xl bg-red-500 text-white rounded-2xl "
              >
                continue shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BasketList;
