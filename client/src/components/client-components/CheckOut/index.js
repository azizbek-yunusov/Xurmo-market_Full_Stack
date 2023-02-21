import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BiHomeAlt, BiStoreAlt } from "react-icons/bi";
import { BsCreditCard2Back } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGlobalApi from "../../../hooks/useGlobalApi";
import HelmetTitle from "../../../utils/HelmetTitle";
import Top from "./Top";
import address from "../../../data/address.json";
import Price from "../Helpers/Price";

const CheckOut = () => {
  const { t } = useTranslation();
  const { cart, auth } = useSelector((state) => state);
  const { addToCartHandle, decrementQtyItem, deleteHandle } = useGlobalApi(
    auth.access_token
  );

  const [name, setName] = useState(auth.user.name || "");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState(auth.user.email || "");
  const [region, setRegion] = useState("Toshkent Viloyati");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [payment, setPayment] = useState("plastik");
  const [delivery, setDelivery] = useState("home");
  const [selectDistricts, setSelectDistricts] = useState([]);

  const navigate = useNavigate();
  const paymentOnChange = (e) => {
    setPayment(e.target.value);
  };
  const defaultDistricts = address.districts.filter((value) => {
    return value.region_id === 11;
  });
  const handleRegion = (e) => {
    const getRegionId = e.target.value;
    const getRegionData = address?.regions.find(
      (reg) => reg.id === getRegionId
    );
    console.log(getRegionId);
    const getDistrictsdata = address.districts.filter(
      (item) => item.region_id === getRegionId
    );
    setRegion(getRegionData.name);
    setSelectDistricts(getDistrictsdata);
  };
  const totalPrice =
    cart.length &&
    cart?.reduce((a, c) => a + c.productId.price * c.quantity, 0);
  const totalQuantity =
    cart.length && cart?.reduce((a, c) => a + c.quantity, 0);
  const newOrderHandle = (e) => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HelmetTitle title={t("shop:checkout")} />
      <div className="min-h-screen md:mb-14">
        <Top />
        <div className="container-full block my-5">
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
          <h1 className="md:text-2xl text-xl font-semibold text-gray-800 border-b border-b-gray-300 md:pb-5 pb-2">
            {t("shop:checkout")}
          </h1>
          <form onSubmit={newOrderHandle}>
            <div className="grid md:grid-cols-3 grid-cols-1 md:my-5 my-3">
              <div className="md:col-span-2 xl:mr-20 lg:mr-10 md:mr-3">
                <div className="md:mb-9 mb-4">
                  <div className="flex items-center mb-8">
                    <span className="flex_center md:w-8 md:h-8 w-6 h-6 bg-zinc-800 rounded-full md:text-xl text-sm text-white">
                      1
                    </span>
                    <h1 className="md:text-xl ml-3">
                      {" "}
                      {t("shop:enteraddress")}
                    </h1>
                  </div>
                  <div className="my-6 grid md:grid-cols-2 grid-cols-1 gap-5">
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
                  </div>
                </div>
                <div className="md:mb-10">
                  <div className="flex items-center">
                    <span className="flex_center md:w-8 md:h-8 w-6 h-6 bg-gray-800 rounded-full md:text-xl text-sm text-white">
                      2
                    </span>
                    <h1 className="text-xl ml-3">{t("shop:paymenttype")}</h1>
                  </div>
                  <div className="md:my-6">
                    <div
                      onChange={paymentOnChange}
                      className="grid md:grid-cols-2 grid-cols-1 my-5 gap-6"
                    >
                      <label htmlFor="card">
                        <div
                          className={`flex justify-start items-center cursor-pointer md:border-2 border-[3px] rounded-lg p-2 p-2 ${
                            payment === "plastik"
                              ? "border-orange-300"
                              : "border-gray-300"
                          }`}
                        >
                          <Radio
                            value="plastik"
                            id="card"
                            color="warning"
                            name="type"
                          />
                          <p className="grow text-gray-800 mx-2">
                            {t("shop:plasticcard")}
                          </p>
                          <GiMoneyStack className="text-2xl text-green-500 mr-3" />
                        </div>
                      </label>
                      <label htmlFor="money">
                        <div
                          className={`flex justify-start items-center cursor-pointer md:border-2 border-[3px] rounded-lg p-2 ${
                            payment === "card"
                              ? "border-orange-300"
                              : "border-gray-300"
                          }`}
                        >
                          <Radio
                            value="card"
                            id="money"
                            name="type"
                            color="warning"
                          />
                          <p className="grow text-gray-800 mx-2">
                            {t("shop:bycash")}
                          </p>
                          <BsCreditCard2Back className="text-2xl text-blue-500 mr-3" />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center">
                    <span className="flex_center md:w-8 md:h-8 w-6 h-6 bg-gray-800 rounded-full md:text-xl text-sm text-white">
                      3
                    </span>
                    <h1 className="text-xl ml-3">
                      {t("shop:methodreception")}
                    </h1>
                  </div>
                  <div className="md:my-6">
                    <div
                      onChange={(e) => setDelivery(e.target.value)}
                      className="grid md:grid-cols-2 grid-cols-1  my-5 gap-6"
                    >
                      <label htmlFor="addresses">
                        <div
                          className={`flex justify-start items-center cursor-pointer border-2 rounded-lg p-2 ${
                            delivery === "home"
                              ? "border-amber-500"
                              : "border-gray-300"
                          }`}
                        >
                          <Radio
                            value="home"
                            id="addresses"
                            name="address"
                            color="warning"
                          />
                          <p className="grow text-gray-800 mx-2">
                            {t("shop:deliveryaddress")}
                          </p>
                          <BiHomeAlt className="text-2xl text-orange-500 mr-3" />
                        </div>
                      </label>
                      <label htmlFor="store">
                        <div
                          className={`flex justify-start items-center cursor-pointer border-2 rounded-lg p-2 ${
                            delivery === "store"
                              ? "border-amber-500"
                              : "border-gray-300"
                          }`}
                        >
                          <Radio
                            value="store"
                            id="store"
                            name="address"
                            color="warning"
                          />
                          <p className="grow text-gray-800 mx-2">
                            {t("shop:shoppingstore")}
                          </p>
                          <BiStoreAlt className="text-2xl text-purple-600 mr-3" />
                        </div>
                      </label>
                    </div>
                  </div>
                  <h1 className="md:text-base font-semibold text-gray-800">
                    {t("shop:enteraddress")}
                  </h1>
                  <div className="my-6 grid md:grid-cols-2 grid-cols-1 gap-5">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {t("shop:region")}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        
                        defaultValue={"11"}
                        label={t("shop:region")}
                        onChange={(e) => handleRegion(e)}
                      >
                        {address.regions.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {t("shop:district")}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        placeholder="select"
                        label={t("shop:district")}
                        value={district || ""}
                        onChange={(e) => setDistrict(e.target.value)}
                      >
                        {(selectDistricts.length
                          ? selectDistricts
                          : defaultDistricts
                        ).map((item, index) => (
                          <MenuItem key={index} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                <div className="md:flex hidden">
                  <Button
                    type="submit"
                    className="w-full md:block hidden"
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    {t("shop:checkout")}
                  </Button>
                </div>
              </div>

              <div className="col-span-1 md:sticky top-5">
                <div className="sticky top-5">
                  <div className="border border-gray-300 m-1 md:rounded-xl rounded-md md:p-5 p-3">
                    <p className="text-lg font-semibold">
                      {t("shop:productonordertxt")}
                    </p>
                    <div className="mt-2">
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
                                  className="object-cover md:h-26 md:w-26 w-16 h-1w-16 object-center"
                                />
                              </div>
                              <div className="w-[75%] md:mx-2 flex justify-center flex-col">
                                <p className="md:text-sm text-base font-normal text-gray-800">
                                  {item.productId.name}
                                </p>
                                <div className="flex md:mt-3 justify-between items-center">
                                  <Price
                                    price={item.productId.price}
                                    className="text-base font-semibold"
                                  />
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
                  <div className=" mt-5 border border-gray-300 m-1 md:rounded-xl rounded-md md:p-5 p-3">
                    <p className="text-lg font-semibold md:mb-4">
                      {t("shop:ordertxt")}
                    </p>
                    <div className="flex justify-between items-center text-sm my-2">
                      <p className="">
                        {totalQuantity} {t("shop:priceorders")}
                      </p>
                      <Price price={totalPrice} className="" />
                    </div>
                    <div className="flex justify-between items-center text-sm my-5 md:pb-5 pb-3 border-b border-b-gray-300">
                      <p className="">{t("shop:shippingcost")}</p>
                      <p className="">{t("shop:freeshipping")}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">{t("shop:totalpayment")}:</p>
                      <Price
                        price={totalPrice}
                        className="xl:text-2xl text-lg font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:hidden mt-5 flex">
                <Button
                  type="submit"
                  className="w-full"
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  {t("shop:checkout")}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
