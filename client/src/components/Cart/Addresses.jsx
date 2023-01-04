import React, { useEffect, useState } from "react";
import { Button, Checkbox, Modal } from "antd";
import axios from "axios";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";

const Addresses = () => {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [apartment, setApartment] = useState("");
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
      headers: { Authorization: localStorage.getItem("jwt") },
    });
    setAllAddresses(data.addresses);
  };
  const deleteAddress = async (id) => {
    try {
      const { data } = await axios.delete(`/address/${id}`, {
        headers: { Authorization: localStorage.getItem("jwt") },
      });
      if (data.error) {
      } else {
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
        Authorization: localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        isActive,
        country,
        region,
        district,
        street,
        house,
        apartment,
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
    fetchAdresses();
  }, []);
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-5">
        {allAddresses ? allAddresses.map((item) => (
          <div
            key={item._id}
            className="border-2 border-purple-600 rounded-xl w-full p-5"
          >
            <div className="flex justify-between items-center">
              <h1 className="">
                {`${item.country}, ${item.region},${item.district}`}
              </h1>
              <BiEdit className="cursor-pointer text-3xl text-gray-600" />
            </div>
            <div className="flex justify-end items-center mt-5">
              <div
                onClick={() => deleteAddress(item._id)}
                className="text-white text-base flex items-center mx-5  cursor-pointer rounded-lg p-2 px-4 bg-red-600"
              >
                <BiTrash className="mr-1" />
                {"delete"}
              </div>
              {item.isActive ? <div className="text-white text-base cursor-pointer rounded-lg p-2 px-4 bg-green-600  flex items-center">
                <BsCheckCircle className="mr-1" />
                {"Default"}
              </div> : <div className="text-gray-900 text-base cursor-pointer rounded-lg p-2 px-4 bg-gray-400  flex items-center">
                <BsCheckCircle className="mr-1" />
                {"not"}
              </div>}
              
            </div>
          </div>
        )) : null}
      </div>

      <div className="cursor-pointer border-2 my-3 border-gray-300 rounded-2xl w-full p-8 flex justify-center">
        <div className="flex items-center">
          {/* <div className="">
            <AiOutlinePlus className="text-2xl" />{" "}
          </div> */}
          <Button
            type="primary"
            size="large"
            className="rounded-lg w-full primary_bg mt-8"
            onClick={showModal}
          >
            Add address
          </Button>
          <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={null}
            width={800}
          >
            <h1 className="w-full text-2xl font-semibold mb-4 text-center">
              New Address
            </h1>
            <form onSubmit={addAddress}>
              <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm text-gray-600 ">
                    Country
                  </label>
                  <input
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    type="text"
                    placeholder="Uzbekistan"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm text-gray-600 "
                  >
                    Region
                  </label>
                  <input
                    required
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    type="text"
                    placeholder="Ferghana"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {/* <select
                    value={region}
                    onChange={selectedChange}
                    id="countries"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  >
                    {categories.map((item) => (
                        <option key={item._id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select> */}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 ">
                    District
                  </label>
                  <input
                    type="text"
                    placeholder="Buvayda"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Brand</label>
                  <input
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    type="text"
                    placeholder="Alisher Navoiy"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label className="">Apartment</label>
                  <input
                    required
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    type="text"
                    placeholder="39"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div>
                  <label className="">house</label>
                  <input
                    required
                    value={house}
                    onChange={(e) => setHouse(e.target.value)}
                    type="text"
                    placeholder="28"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className=""></div>
                <div className="flex items-end mb-5">
                  <Checkbox
                    defaultChecked={isActive}
                    className="h-5"
                    onChange={(e) => setIsActive(e.target.checked)}
                  >
                    Default
                  </Checkbox>
                </div>
              </div>

              <div className="flex justify-end items-center mt-3">
                <p
                  className="py-2 cursor-pointer text-white px-6 text-[16px] tracking-wide font-semibold mx-3 bg-red-600 rounded-lg"
                  onClick={handleCancel}
                >
                  cancel
                </p>
                <button
                  type="submit"
                  className="py-2 text-white px-6 text-[16px] tracking-wide font-semibold bg-indigo-600 rounded-lg"
                  // onClick={handleOk}
                >
                  submit
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
