import { Input, Option, Select } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";

import Layout from "../Layout";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [descr, setDescr] = useState("");
  const [images, setImages] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  // const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const goback = useNavigate();
  const navigate = useNavigate();
  const selectedChange = (value) => {
    setCategory(value);
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
        setImages(data.product.images);
        setCategory(data.product.category);
      });
  };
  const updateHandler = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/product/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name,
        price,
        descr,
        images,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
        } else {
          navigate("/dashboard/products");
        }
      });
  };
  const fetchCategory = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data.categories);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(category);
  console.log(categories);
  return (
    <Layout>
      <section className="relative">
        <div className="bg-indigo-400 w-full h-40 pl-5 pt-4 text-gray-50">
          <h1 className="text-white text-2xl">Update Product</h1>
          <ol className="list-reset mt-1 flex text-grey-dark text-sm text-gray-200">
            <li>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link to={"/dashboard/products"}>Create</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <span>Update</span>
            </li>
          </ol>
        </div>
        <div className="-mt-14 rounded-2xl flex mx-4 bg-white">
          <div className="flex w-full p-8 px-16">
            <div className="w-full">
              <form onSubmit={updateHandler}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Input
                    label="Name"
                    size="lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Select
                    value="4"
                    onChange={selectedChange}
                    size="lg"
                    label="Select Version"
                  >
                    {categories.map((item, index) => (
                      <Option key={index} value={item.name}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                  <Input
                    label="Name"
                    size="lg"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <div className="flex">
                    <label htmlFor="file-upload">
                      <label
                        htmlFor="file-upload"
                        className="block text-sm mb-2 text-gray-700"
                      >
                        Upload images
                      </label>
                      <div className="mr-2 flex bg-white justify-center items-center rounded-md border-2 border-dashed border-gray-300 p-3 py-6 cursor-pointer">
                        <div className="flex justify-center flex-col items-center">
                          <AiOutlineCloudUpload className="text-3xl text-gray-600" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload image</span>
                              <input
                                id="file-upload"
                                name="file"
                                type="file"
                                className="sr-only"
                                // onChange={handleImage}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG up to 10MB
                          </p>
                        </div>
                      </div>
                    </label>

                    <div className="show_images flex flex-wrap items-center">
                      {/* {images.map((img, index) => (
                        <div key={index} className="p-[6px] mx-[2px] relative">
                          <div
                            className="border border-gray-400 overflow-hidden rounded"
                            id="file_img"
                          >
                            <img
                              src={img}
                              alt="images"
                              className="img-thumbnail max-w-[90px] w-full"
                            />
                          </div>
                          <IoMdClose
                            // onClick={() => deleteImages(index)}
                            className="absolute text-gray-600 top-0 p-1 border text-2xl border-gray-300 right-0 cursor-pointer rounded-full bg-white"
                          />
                        </div>
                      ))} */}
                    </div>
                  </div>
                </div>
                <div className="w-full mt-8 flex justify-end">
                  <div
                    onClick={() => goback(-1)}
                    className="inline-flex justify-center cursor-pointer rounded-md border-2 mr-3 border-indigo-600 py-3 px-10 text-lg font-medium text-indigo-600 shadow-sm hover:bg-indigo-700 hover:text-white tranistion_normal focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Cancel
                  </div>

                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-10 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UpdateProduct;
