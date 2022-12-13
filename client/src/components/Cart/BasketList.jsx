import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../reducers/useReducer";

const BasketList = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = async (item, quantity) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  console.log(cartItems);

  return (
    <>
      <Helmet>
        <title data-rh="true">Shopping Cart | E-commerce</title>
      </Helmet>
      <div className="bg-gray-100">
        {cartItems.length ? (
          <div className="container-full grid grid-cols-12 gap-5 min-h-screen">
            <div className="col-span-8 border border-gray-200 p-5 md:rounded-2xl">
              <h1 className="md:text-2xl mb-5">Shopping cart</h1>
              <div className="py-3 border-t border-t-gray-200 ">
                {cartItems.length
                  ? cartItems.map((item, index) => (
                      <div key={index} className=" p-1 my-2">
                        <li className="flex lg:py-4 py-3 ease-in-out duration-300 lg:justify-between border-b border-b-gray-200">
                          <div className="lg:h-32 lg:w-32 w-24 h-24 overflow-hidden rounded-md">
                            <img
                              src={item.images[0].url}
                              alt={""}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="flex lg:flex-row lg:justify-between w-full flex-col">
                            <div className="float-left lg:px-0 px-2 lg:ml-5 ml-2">
                              <p className=" md:text-lg font-semibold">
                                {item.name}
                              </p>
                              <p className="font-semibold lg:py-3 p-1 text-lg">
                                {item.price}
                                {"$"}
                              </p>
                            </div>
                            <div className="flex lg:items-end h-min items-center justify-between py-0 lg:flex-col lg:px-0 pl-5">
                              <div className="flex items-center w-max md:justify-center justify-between h-min rounded-md lg:px-3 py-1 p-[2px] border">
                                {item.quantity > 0 ? (
                                  <button
                                    onClick={() =>
                                      updateCartHandler(
                                        item,
                                        item.quantity > 0
                                          ? item.quantity - 1
                                          : item.quantity === 0
                                      )
                                    }
                                    className="h-8 text-red-600"
                                  >
                                    <AiOutlineMinus />
                                  </button>
                                ) : (
                                  <button className="h-8 cursor-not-allowed text-red-600">
                                    <AiOutlineMinus />
                                  </button>
                                )}
                                <p className="mx-3 text-lg">{item.quantity}</p>
                                <button
                                  onClick={() =>
                                    updateCartHandler(item, item.quantity + 1)
                                  }
                                  className="h-8 text-red-600"
                                >
                                  <AiOutlinePlus />
                                </button>
                              </div>
                              <button
                                onClick={() => removeItemHandler(item)}
                                className="font-medium flex text-zinc-500 lg:mt-5  rounded-lg lg:px-0 float-right py-2"
                              >
                                <HiOutlineTrash className="md:text-2xl" />
                              </button>
                            </div>
                          </div>
                        </li>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="col-span-4">s</div>
          </div>
        ) : (
          <div className="min-h-[630px] flex justify-center items-center">
            <div className="flex justify-center flex-col">
              <h1 className="text-4xl font-semibold">
                The shopping cart is empty
              </h1>
              <button
                onClick={() => navigate("/")}
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
