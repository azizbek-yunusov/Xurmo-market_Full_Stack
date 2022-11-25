import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "./Layout";
import NavbarD from "./NavbarD";
import SideBar from "./SideBar";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [descr, setDescr] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const createHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/product/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name,
        price,
        descr,
        image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("create");
          navigate("/dashboard/products");
        }
      });
  };
  return (
    <Layout>
      <div className="min-h-screen z-30  w-full  flex justify-center items-center">
        <form onSubmit={createHandler}>
          <div className="py-12 px-12 relative bg-white rounded-2xl shadow-xl z-20">
            {/* <div
          onClick={() => setShowUpdate(!showUpdate)}
          className="absolute top-2 cursor-pointer right-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-8"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </div> */}
            <div>
              <h1 className="text-3xl text-center mb-4">Update product</h1>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              />
              <input
                type="text"
                placeholder="Description"
                onChange={(e) => setDescr(e.target.value)}
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              />
              <input
                type="text"
                placeholder="Image"
                onChange={(e) => setImage(e.target.value)}
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              />
            </div>
            <div className="text-center mt-6">
              <button className="py-3 w-64 text-xl text-white bg-green-600 rounded-2xl">
                create
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateProduct;
