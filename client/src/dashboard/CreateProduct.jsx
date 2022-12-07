import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UploadImages from "./Forms/UploadImages";
import Layout from "./Layout";
const CreateBanner = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [descr, setDescr] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const goback = useNavigate();
  const navigate = useNavigate();
  const selectedChange = (e) => {
    setCategory(e.target.value);
  };
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
        category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("create");
          setLoading(true);
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
  console.log(category);
  return (
    <Layout>
      <section className="">
        <div className="flex min-h-screen">
          <div className="flex w-full p-8">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize">
                Create Product
              </h1>

              <p className="mt-4 text-gray-500 ">
                Let’s get you all set up so you can verify your personal account
                and begin setting up your profile.
              </p>

              <form onSubmit={createHandler}>
                <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 ">
                      Product Name
                    </label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Acer"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-sm text-gray-600 "
                    >
                      Category
                    </label>
                    {/* <Select
                      showSearch
                      style={{
                        width: 200,
                      }}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.name ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.name ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.name ?? "").toLowerCase())
                      }
                      options={categories}
                    /> */}
                    <select
                      value={category}
                      onChange={selectedChange}
                      id="countries"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                      {categories.map((item) => (
                        <option key={item._id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-gray-600 ">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="700$"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm">Image</label>
                    <input
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      type="text"
                      placeholder="Image"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div>
                    <label className="">Description</label>
                    <textarea
                      id="textarea"
                      type="textarea"
                      rows={5}
                      placeholder="Description"
                      value={descr}
                      onChange={(e) => setDescr(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500  focus:outline-none focus:ring"
                    />

                    {/* <Select
                    defaultValue="USER"
                    style={{
                      width: 120,
                    }}
                    // onChange={handleChange}
                    options={[
                      {
                        value: true,
                        label: "ADMIN",
                      },
                      {
                        value: false,
                        label: "USER",
                      },
                    ]}
                  /> */}
                  </div>

                  {/* <label htmlFor="file-upload">
                    <label
                      htmlFor="file-upload"
                      className="block text-sm font-medium mb-3 text-gray-700"
                    >
                      Cover photo
                    </label>
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed bg-white border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </label> */}
                  <div className="">
                    <UploadImages />
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
                    <button
                      type="submit"
                      className="inline-flex justify-center items-center rounded-md border border-transparent bg-indigo-600 py-3 px-10 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
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
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-10 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  )}
                  {/* <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-10 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CreateBanner;
