import { Breadcrumbs, Button, Radio, TextField } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BiHomeAlt, BiStoreAlt } from "react-icons/bi";
import { BsCreditCard2Back } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useGlobalApi from "../../../hooks/useGlobalApi";
import HelmetTitle from "../../../utils/HelmetTitle";
import Translate from "../Buttons/Translate";

const CheckOut = () => {
  const { t } = useTranslation();
  const { cart, auth, address } = useSelector((state) => state);
  const { addToCartHandle, decrementQtyItem, deleteHandle } = useGlobalApi(
    auth.access_token
  );

  let defaultAddress = address.length && address[0];

  const [name, setName] = useState(auth.user.name || "");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState(auth.user.email || "");
  const [region, setRegion] = useState(defaultAddress?.region || "");
  const [district, setDistrict] = useState(defaultAddress?.district || "");
  const [street, setStreet] = useState(defaultAddress?.street || "");
  const [house, setHouse] = useState(defaultAddress?.house || "");
  const [payment, setPayment] = useState("plastik");
  const [delivery, setDelivery] = useState("home");

  const navigate = useNavigate();
  const paymentOnChange = (e) => {
    setPayment(e.target.value);
  };

  const totalPrice =
    cart.length &&
    cart?.reduce((a, c) => a + c.productId.price * c.quantity, 0);
  const totalQuantity =
    cart.length && cart?.reduce((a, c) => a + c.quantity, 0);
  const newOrder = (e) => {
    try {
      e.preventDefault();
      if (auth.access_token) {
        fetch("http://localhost:5000/order", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.access_token,
          },
          body: JSON.stringify({
            shippingAddress: {
              region: region,
              district: district,
              street: street,
              house: house,
            },
            name: name,
            lastName: lastName,
            email: email,
            contact: contact,
            paymentMethod: payment,
            deliveryType: delivery,
            totalPrice,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            navigate("/");
            toast.success("Your order has been accepted");
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <HelmetTitle title={t("shop:checkout")} />
      <div className="min-h-screen md:mb-14">
        <div className="shadow-md">
          <div className="container-full flex justify-between items-center md:py-3">
            <h1 className="md:text-xl">Texnoroom</h1>
            <div className="flex items-center">
              <h1 className="mr-5">+99871 209 99 44</h1>
              <Translate />
            </div>
          </div>
        </div>
        <div className="container-full block md:my-5 ">
          <div className="flex items-center md:mb-5">
            {/* <Breadcrumbs fullWidth>
              <Link to={"/"} className="">
                Home
              </Link>
              <Link to={"/"} className="">
                Back
              </Link>
            </Breadcrumbs> */}
          </div>
          <h1 className="md:text-2xl font-semibold text-gray-800 border-b border-b-gray-300 md: pb-5">
            {t("shop:checkout")}
          </h1>
          <form onSubmit={newOrder}>
            <div className="grid md:grid-cols-3 md:my-5">
              <div className="md:col-span-2 mr-20">
                <div className="md:mb-9">
                  <div className="flex items-center">
                    <span className="flex_center w-8 h-8 bg-gray-800 rounded-full text-xl text-white">
                      1
                    </span>
                    <h1 className="text-xl ml-3"> {t("shop:enteraddress")}</h1>
                  </div>
                  <div className="md:my-6 grid grid-cols-2 gap-5">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      label={t("shop:email")}
                      type="email"
                      value={email}
                      className="rounded-xl"
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      type="number"
                      className="rounded-xl"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      label={t("shop:number")}
                    />

                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      type="text"
                      className="rounded-xl"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      label={t("shop:name")}
                    />
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      type="text"
                      className="rounded-xl"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      label={t("shop:lastname")}
                    />
                  </div>
                </div>
                <div className="md:mb-10">
                  <div className="flex items-center">
                    <span className="flex_center w-8 h-8 bg-gray-800 rounded-full text-xl text-white">
                      2
                    </span>
                    <h1 className="text-xl ml-3">{t("shop:paymenttype")}</h1>
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
                          <Radio value="plastik" id="card" name="type" />
                          <p className="grow text-gray-800 mx-2">
                            {t("shop:plasticcard")}
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
                          <Radio value="card" id="money" name="type" />
                          <p className="grow text-gray-800 mx-2">
                            {t("shop:bycash")}
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
                    <h1 className="text-xl ml-3">
                      {t("shop:methodreception")}
                    </h1>
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
                          <Radio value="home" id="addresses" name="address" />
                          <p className="grow text-gray-800 mx-2">
                            {t("shop:deliveryaddress")}
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
                          <Radio value="store" id="store" name="address" />
                          <p className="grow text-gray-800 mx-2">
                            {t("shop:shoppingstore")}
                          </p>
                          <BiStoreAlt className="text-2xl text-purple-600 mr-3" />
                        </div>
                      </label>
                    </div>
                  </div>
                  <h1 className="md:text-base">{t("shop:enteraddress")}</h1>
                  <div className="md:my-6 grid grid-cols-2 gap-5">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      type="text"
                      className="rounded-xl"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      label={t("shop:region")}
                    />
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      type="text"
                      className="rounded-xl"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      label={t("shop:district")}
                    />
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      type="text"
                      className="rounded-xl"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      label={t("shop:street")}
                    />
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      type="text"
                      className="rounded-xl"
                      value={house}
                      onChange={(e) => setHouse(e.target.value)}
                      label={t("shop:housenumber")}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full primary_bg bg-purple-600"
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  {t("shop:checkout")}
                </Button>
              </div>

              <div className="col-span-1 sticky top-5">
                <div className="sticky top-5">
                  <div className="border border-gray-300 m-1 md:rounded-xl md:p-5">
                    <p className="text-lg font-semibold">
                      {t("shop:productonordertxt")}
                    </p>
                    <div className="">
                      {cart.length
                        ? cart.map((item) => (
                            <div
                              key={item._id}
                              className="flex justify-between"
                            >
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
                                    {t("shop:quantity")}
                                    {":"}
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
                    <p className="text-lg font-semibold md:mb-4">
                      {t("shop:ordertxt")}
                    </p>
                    <div className="flex justify-between items-center text-sm my-2">
                      <p className="">
                        {totalQuantity} {t("shop:priceorders")}
                      </p>
                      <p className="">{totalPrice}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm my-5 md:pb-5 border-b border-b-gray-300">
                      <p className="">{t("shop:shippingcost")}</p>
                      <p className="">{t("shop:freeshipping")}</p>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <p className="">{t("shop:totalpayment")}</p>
                      <p className="text-2xl font-semibold">{totalPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
