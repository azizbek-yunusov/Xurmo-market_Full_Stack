import { Button, Input, Radio } from "@material-tailwind/react";
import React, { useState } from "react";
import { BiHomeAlt, BiStoreAlt } from "react-icons/bi";
import { BsCreditCard2Back } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useGlobalApi from "../../hooks/useGlobalApi";
import HelmetTitle from "../../utils/HelmetTitle";

const CheckOut = () => {
  const [payment, setPayment] = useState("plastik");
  const [delivery, setDelivery] = useState("home");
  const { access_token } = useSelector((state) => state.auth);
  const { addToCartHandle, decrementQtyItem, deleteHandle, newOrder } =
    useGlobalApi(access_token);
  const { cart, auth } = useSelector((state) => state);
  const navigate = useNavigate();
  console.log(auth);
  const paymentOnChange = (e) => {
    setPayment(e.target.value);
  };
  return (
    <>
      <HelmetTitle title={"Check out"} />
      <div className="min-h-screen">
        <div className="shadow-md">
          <div className="container-full flex justify-between items-center md:py-3">
            <h1 className="md:text-xl">Texnoroom</h1>
            <h1 className="">+99871 209 99 44</h1>
          </div>
        </div>
        <div className="container-full block md:my-5 ">
          <div className="flex md:mb-5">
            <Link to={"/"}>Home</Link>
            <span>/</span>
            <Link to={"/"}>back</Link>
          </div>
          <h1 className="md:text-2xl font-semibold text-gray-800 border-b border-b-gray-300 md: pb-5">
            Check out
          </h1>
          <div className="grid md:grid-cols-3 md:my-5">
            <div className="md:col-span-2 mr-20">
              <div className="md:mb-9">
                <div className="flex items-center">
                  <span className="flex_center w-8 h-8 bg-gray-800 rounded-full text-xl text-white">
                    1
                  </span>
                  <h1 className="text-xl ml-3">Client info</h1>
                </div>
                <div className="md:my-6 grid grid-cols-2 gap-5">
                  <Input
                    defaultValue={auth.user.email || ""}
                    label="email"
                    size="lg"
                  />
                  <Input label="phone" size="lg" />
                  <Input
                    defaultValue={auth.user.name}
                    label="first name"
                    size="lg"
                  />
                  <Input label="last name" size="lg" />
                </div>
              </div>
              <div className="md:mb-10">
                <div className="flex items-center">
                  <span className="flex_center w-8 h-8 bg-gray-800 rounded-full text-xl text-white">
                    2
                  </span>
                  <h1 className="text-xl ml-3">Payment type</h1>
                </div>
                <div className="md:my-6">
                  <div
                    onChange={paymentOnChange}
                    className="grid grid-cols-2 my-5 gap-6"
                  >
                    <label htmlFor="card">
                      <div
                        className={`flex justify-start items-center cursor-pointer border-2 rounded-lg md:p-2 ${
                          payment === "plastik"
                            ? "border-amber-500"
                            : "border-gray-300"
                        }`}
                      >
                        <Radio
                          defaultChecked
                          value="plastik"
                          id="card"
                          name="type"
                          color="amber"
                        />
                        <p className="grow text-gray-800 mx-2">
                          Plastik karta orqali
                        </p>
                        <GiMoneyStack className="text-2xl text-green-500 mr-3" />
                      </div>
                    </label>
                    <label htmlFor="money">
                      <div
                        className={`flex justify-start items-center cursor-pointer border-2 rounded-lg md:p-2 ${
                          payment === "card"
                            ? "border-amber-500"
                            : "border-gray-300"
                        }`}
                      >
                        <Radio
                          value="card"
                          id="money"
                          name="type"
                          color="amber"
                        />
                        <p className="grow text-gray-800 mx-2">
                          Naqd pul orqali
                        </p>
                        <BsCreditCard2Back className="text-2xl text-light-blue-600 mr-3" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex items-center">
                  <span className="flex_center w-8 h-8 bg-gray-800 rounded-full text-xl text-white">
                    3
                  </span>
                  <h1 className="text-xl ml-3">Method of reception</h1>
                </div>
                <div className="md:my-6">
                  <div
                    onChange={(e) => setDelivery(e.target.value)}
                    className="grid grid-cols-2 my-5 gap-6"
                  >
                    <label htmlFor="addresses">
                      <div
                        className={`flex justify-start items-center cursor-pointer border-2 rounded-lg md:p-2 ${
                          delivery === "home"
                            ? "border-amber-500"
                            : "border-gray-300"
                        }`}
                      >
                        <Radio
                          defaultChecked
                          value="home"
                          id="addresses"
                          name="address"
                          color="amber"
                        />
                        <p className="grow text-gray-800 mx-2">
                          Delivery to the address
                        </p>
                        <BiHomeAlt className="text-2xl text-orange-500 mr-3" />
                      </div>
                    </label>
                    <label htmlFor="store">
                      <div
                        className={`flex justify-start items-center cursor-pointer border-2 rounded-lg md:p-2 ${
                          delivery === "store"
                            ? "border-amber-500"
                            : "border-gray-300"
                        }`}
                      >
                        <Radio
                          value="store"
                          id="store"
                          name="address"
                          color="amber"
                        />
                        <p className="grow text-gray-800 mx-2">
                          Shopping in store
                        </p>
                        <BiStoreAlt className="text-2xl text-purple-600 mr-3" />
                      </div>
                    </label>
                  </div>
                </div>
                <h1 className="md:text-base">Enter the shipping address</h1>
                <div className="md:my-6 grid grid-cols-2 gap-5">
                  <Input label="region" size="lg" />
                  <Input label="district" size="lg" />
                  <Input label="street" size="lg" />
                  <Input label="last name" size="lg" />
                </div>
              </div>
              <Button
                size="lg"
                fullWidth
                type="submit"
                variant="gradient"
                className=""
              >
                sumbit
              </Button>
            </div>

            <div className="col-span-1 sticky top-5">
              <div className="sticky top-5">
                <div className="border border-gray-300 m-1 md:rounded-xl md:p-5">
                  <p className="text-lg font-semibold">Products on order</p>
                  <div className="">
                    {cart.length
                      ? cart.map((item) => (
                          <div key={item._id} className="flex justify-between">
                            <div className="w-[25%]">
                              <img
                                src={item.productId.images[0].url}
                                alt={""}
                                className="object-cover md:h-26 md:w-26 w-24 h-24 object-center"
                              />
                            </div>
                            <div className="w-[75%] md:mx-2 flex justify-center flex-col">
                              <p className="md:text-sm font-normal text-gray-800">
                                {item.productId.name}
                              </p>
                              <div className="flex md:mt-3 justify-between items-center">
                                <p className="text-base font-semibold">
                                  {item.productId.price}
                                  {"$"}
                                </p>
                                <span className="">
                                  {"quantity: "}
                                  {item.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      : "non"}
                  </div>
                </div>
                <div className=" mt-5 border border-gray-300 m-1 md:rounded-xl md:p-5">
                  <p className="text-lg font-semibold md:mb-4">Your order</p>
                  <div className="flex justify-between items-center text-sm my-2">
                    <p className="">Price of 6 products</p>
                    <p className="">900$</p>
                  </div>
                  <div className="flex justify-between items-center text-sm my-5 md:pb-5 border-b border-b-gray-300">
                    <p className="">shipping cost</p>
                    <p className="">free of charge</p>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <p className="">total payment</p>
                    <p className="text-2xl font-semibold">1900$</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
