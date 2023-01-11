import React, { useEffect, useState } from "react";
import { Checkbox, Modal } from "antd";
import axios from "axios";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import LayoutP from "./LayoutP";
import { Button, Card, Input } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import Spinner from "../SkeletonLoaders/Spinner";

const Addresses = () => {
  let { t } = useTranslation(["shop"]);
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [allAddresses, setAllAddresses] = useState([]);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fetchAdresses = async () => {
    const { data } = await axios.get("/addresses", {
      headers: { Authorization: access_token },
    });
    setAllAddresses(data.addresses);
  };
  const deleteAddress = async (id) => {
    try {
      const { data } = await axios.delete(`/address/${id}`, {
        headers: { Authorization: access_token },
      });
      if (data.error) {
        toast.error("error");
      } else {
        dispatch({
          type: "GET_ADDRESS",
          payload: data.user.addresses,
        });
        fetchAdresses();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const addAddress = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/address", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      body: JSON.stringify({
        isActive,
        region,
        district,
        street,
        house,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
        } else {
          fetchAdresses();
          setIsModalOpen(false);
        }
      });
  };
  useEffect(() => {
    if (access_token) {
      fetchAdresses();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token]);
  return (
    <LayoutP>
      <div className="flex justify-between items-center md:mb-5">
        <h1 className="md:text-3xl font-semibold">Addresses</h1>
        {/* <div className="flex justify-center items-center md:text-lg text-gray-50 p-2 px-4 bg-indigo-400 rounded-xl">Addresses</div> */}
        <Button size="md" onClick={showModal}>
          Add address
        </Button>
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={null}
          width={700}
        >
          <h1 className="w-full global_font text-2xl font-semibold mb-4 text-center">
            New Address
          </h1>
          <form onSubmit={addAddress}>
            <div className="md:my-6 grid grid-cols-2 gap-5">
              <Input
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                label={t("shop:region")}
                size="lg"
              />
              <Input
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                label={t("shop:district")}
                size="lg"
              />
              <Input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                label={t("shop:street")}
                size="lg"
              />
              <Input
                value={house}
                onChange={(e) => setHouse(e.target.value)}
                label={t("shop:housenumber")}
                size="lg"
              />
            </div>

            <div className="flex justify-end items-center mt-3">
              <Button
                color="red"
                size="md"
                onClick={handleCancel}
                className="md:mr-3"
              >
                close
              </Button>

              <Button type="submit" size="md" onClick={handleOk}>
                save
              </Button>
            </div>
          </form>
        </Modal>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {allAddresses.length
          ? allAddresses.map((item) => (
              <Card key={item._id} className="p-7 border border-purple-300">
                <div className="flex justify-between md:mb-2">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="">
                      <ul className="">
                        <li className="md:my-1 text-gray-700">
                          {t("region")}
                          {":"}
                        </li>
                        <li className="md:my-1 text-gray-700">
                          {t("district")}
                          {":"}
                        </li>
                        <li className="md:my-1 text-gray-700">
                          {t("street")}
                          {":"}
                        </li>
                      </ul>
                    </div>
                    <div className="">
                      <ul className="">
                        <li className="md:my-1">{item.region}</li>
                        <li className="md:my-1">{item.district}</li>
                        <li className="md:my-1">{item.street}</li>
                      </ul>
                    </div>
                  </div>
                  <BiEdit className="cursor-pointer text-3xl text-gray-600" />
                </div>
                <div className="flex justify-end items-center mt-5">
                  <Button
                    size="md"
                    color="red"
                    onClick={() => deleteAddress(item._id)}
                    className="mr-3"
                  >
                    <div className="flex_center">
                      <BiTrash className="mr- md:text-lg" />
                      delete
                    </div>
                  </Button>
                  {item.isActive ? (
                    <Button
                      size="md"
                      color="green"
                      variant="gradient"
                      className="mr-2"
                    >
                      <div className="flex_center">
                        <BsCheckCircle className="mr-1 md:text-lg" />
                        {"Default"}
                      </div>
                    </Button>
                  ) : (
                    <Button variant="outlined" size="md" className="mr-2">
                      <div className="flex_center">{"Default"}</div>
                    </Button>
                  )}
                </div>
              </Card>
            ))
          : <Spinner />}
      </div>
    </LayoutP>
  );
};

export default Addresses;
