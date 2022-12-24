import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../Layout";

const AddBanner = () => {
  const [name, setName] = useState("");
  const [href, setHref] = useState("");
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const goback = useNavigate();
  const navigate = useNavigate();
  const handleImage = (e) => {
    const setFileToBase = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    };
    const file = e.target.files[0];
    setFileToBase(file);
  };
  const createHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    fetch("http://localhost:5000/banner", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name,
        href,
        image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
        } else {
          setLoading(false);
          navigate("/dashboard/banners");
        }
      });
  };
  return (
    <>
      <Layout>
        <section className="">
          <div className="flex min-h-screen">
            <div className="flex w-full p-8">
              <div className="w-full">
                <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize">
                  Create Banner
                </h1>

                <p className="mt-4 text-gray-500 ">
                  Let’s get you all set up so you can verify your personal
                  account and begin setting up your profile.
                </p>

                <form onSubmit={createHandler}>
                  <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 ">
                        Banner Name
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Acer"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-gray-600 ">
                        Category
                      </label>
                      <input
                        type="text"
                        placeholder="Laptop"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-gray-600 ">
                        href
                      </label>
                      <input
                        type="text"
                        placeholder="href"
                        value={href}
                        onChange={(e) => setHref(e.target.value)}
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    {/* <div>
                      <label className="block mb-2 text-sm">Image</label>
                      <input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        type="text"
                        placeholder="Image"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div> */}

                    {/* <div>
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

                      <Select
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
                  />
                    </div> */}
                    <div className="">
                      <div className="form-outline mb-4">
                        <input
                          onChange={handleImage}
                          type="file"
                          id="formupload"
                          name="image"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form4Example2">
                          Image
                        </label>
                      </div>
                      <img className="img-fluid h-28" src={image} alt="" />
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

export default AddBanner;
