import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "./Layout";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [descr, setDescr] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const config = {
    headers: {
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    },
  };
  const fetchData = () => {
    fetch(`http://localhost:5000/product/${id}`, {
      method: "get",
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.product.name);
        setDescr(data.product.descr);
        setPrice(data.product.price);
        setImage(data.product.image);
      });
  };
  const updateHandler = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/product/update/${id}`, {
      method: "put",
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
        if (data.err) {
          toast.error(data.error);
        } else {
          toast.success("Updated");
          navigate("/dashboard");
        }
      });
  };
  // await axios.put(`http://localhost:5000/product/update/${id}`, {
  //   headers: {
  //     authorization: localStorage.getItem("jwt"),
  //   },
  //   name,
  //   descr,
  //   price,
  //   image,
  // });
  //   navigate("/");
  // };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Layout>
      <div className="min-h-screen top-0 left-0 w-full flex justify-center items-center">
        <form onSubmit={updateHandler}>
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
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Price"
                value={price || ""}
                onChange={(e) => setPrice(e.target.value)}
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              />
              <input
                type="text"
                placeholder="Description"
                value={descr || ""}
                onChange={(e) => setDescr(e.target.value)}
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              />
              <input
                type="text"
                placeholder="Image"
                value={image || ""}
                onChange={(e) => setImage(e.target.value)}
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              />
            </div>
            <div className="text-center mt-6">
              <button className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl">
                update
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
