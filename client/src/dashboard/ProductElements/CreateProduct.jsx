import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IoMdClose } from "react-icons/io";
import Layout from "../Layout";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Option, Select } from "@material-tailwind/react";
const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [descr, setDescr] = useState("");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const goback = useNavigate();
  const navigate = useNavigate();

  const selectedChange = (value) => {
    setCategory(value);
  };
  //handlde images
  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImages((oldArray) => [...oldArray, reader.result]);
      };
    });
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };
  const handleSubmit = async () => {
    setLoading(true);
    await fetch("http://localhost:5000/product", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name,
        price,
        descr,
        images,
        category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
        } else {
          setLoading(false);
          navigate("/dashboard/products");
        }
      });
  };
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data.categories);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Layout>
      <section className="relative">
        <div className="bg-indigo-400 w-full h-40 pl-5 pt-4 text-gray-50">
          <h1 className="text-white text-2xl">Create Product</h1>
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
              <span>Create</span>
            </li>
          </ol>
        </div>
        <div className="-mt-14 rounded-2xl flex mx-4 bg-white">
          <div className="flex w-full p-8 px-16">
            <div className="w-full">
              <Form
                onSubmit={handleSubmit}
                onFinish={handleSubmit}
                layout="vertical"
              >
                <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                  <Form.Item
                    label="Product name"
                    name="product"
                    rules={[
                      {
                        required: true,
                        message: "Please input your product!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      value={name}
                      placeholder="product"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>

                  <Select
                    value={category}
                    onChange={selectedChange}
                    size="lg"
                    label="Select Version"
                  >
                    {categories.map((item, index) => (
                      <Option key={index} value={item._id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>

                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Please input your price!",
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      size="large"
                      placeholder="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Item>

                  {/* <Form.Item
                    label="Brand"
                    name="brand"
                    rules={[
                      {
                        required: true,
                        message: "Please input your brand!",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      value={category}
                      placeholder="Select Brand"
                      onChange={selectedChange}
                      options={changedOptions}
                    />
                  </Form.Item> */}

                  <Form.Item
                    label="Description"
                    name="de"
                    rules={[
                      {
                        required: true,
                        message: "Please input your product!",
                      },
                    ]}
                  >
                    <TextArea
                      rows={5}
                      placeholder="maxLength is 6"
                      maxLength={500}
                      value={descr}
                      onChange={(e) => setDescr(e.target.value)}
                    />
                  </Form.Item>
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
                                onChange={handleImage}
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
                      {images.map((img, index) => (
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
                            onClick={() => deleteImages(index)}
                            className="absolute text-gray-600 top-0 p-1 border text-2xl border-gray-300 right-0 cursor-pointer rounded-full bg-white"
                          />
                        </div>
                      ))}
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
                  {loading ? (
                    <button className="inline-flex justify-center items-center rounded-md border border-transparent bg-indigo-600 py-3 px-10 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Loading...
                    </button>
                  ) : (
                    <button
                      onSubmit={handleSubmit}
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-10 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CreateProduct;
