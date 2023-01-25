import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoMdClose } from "react-icons/io";
import Layout from "../Layout";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import HelmetTitle from "../../utils/HelmetTitle";

const CreateProduct = () => {
  const { access_token } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [descr, setDescr] = useState("");
  const [inStock, setInStock] = useState("");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);

  const goback = useNavigate();
  const navigate = useNavigate();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("http://localhost:5000/product", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      body: JSON.stringify({
        name,
        price,
        descr,
        images,
        category,
        discount,
        inStock,
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
  console.log(category);

  return (
    <>
      <HelmetTitle title={"Create Product"} />
      <Layout>
        <section className="relative">
          <div className="bg-indigo-400 w-full h-40 pl-5 pt-4 text-gray-50">
            <h1 className="text-white text-2xl">Create Product</h1>
            {/* <ol className="list-reset mt-1 flex text-grey-dark text-sm text-gray-200">
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
          </ol> */}
          </div>
          <div className="-mt-24 rounded-2xl flex mx-4 bg-white shadow-lg">
            <div className="flex w-full p-8 px-16">
              <div className="w-full">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6 gap-x-14 md:grid-cols-2">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      label="Name"
                      type="text"
                      className="rounded-xl"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Select category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Select category"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        {categories?.map((item, index) => (
                          <MenuItem key={index} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div className="grid grid-cols-1 gap-0">
                      <TextField
                        id="outlined-basic"
                        fullWidth
                        variant="outlined"
                        label="Price"
                        type="number"
                        className="rounded-xl"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      label="In Stock"
                      type="number"
                      className="rounded-xl"
                      value={inStock}
                      onChange={(e) => setInStock(e.target.value)}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Select brand
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Select brand"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        {categories?.map((item, index) => (
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
                      label="Discount"
                      type="number"
                      className="rounded-xl"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                    <div className="">
                      <label
                        htmlFor="description"
                        className="block mb-1 text-base text-gray-700"
                      >
                        Desciption
                      </label>
                      <textarea
                        value={descr}
                        onChange={(e) => setDescr(e.target.value)}
                        id="description"
                        rows="5"
                        className="block p-2.5 w-full text-base text-gray-800 bg-white rounded-md border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Description.."
                      />
                    </div>
                    <div className="flex">
                      <label htmlFor="file-upload">
                        <label
                          htmlFor="file-upload"
                          className="block text-base mb-1 text-gray-700"
                        >
                          Upload images
                        </label>
                        <div className="mr-2 flex bg-white justify-center items-center rounded-md border-2 border-dashed border-gray-300 p-3 py-6 cursor-pointer">
                          <div className="flex justify-center flex-col items-center">
                            <AiOutlineCloudUpload className="text-3xl text-gray-600" />
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-medium"
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
                          <div
                            key={index}
                            className="p-[6px] mx-[2px] relative"
                          >
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
                  <div className="w-full mt-10 flex justify-end">
                    <Button
                      onClick={() => goback(-1)}
                      variant="contained"
                      size="large"
                      sx={{
                        width: "150px",
                        borderRadius: "6px",
                        marginRight: "15px",
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        width: "150px",
                        background: "#AB47BC",
                        borderRadius: "6px",
                      }}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
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
                          {"Loading... "}
                        </div>
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default CreateProduct;
