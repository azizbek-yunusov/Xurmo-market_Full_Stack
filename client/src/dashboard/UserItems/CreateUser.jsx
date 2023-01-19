import { Select } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(Boolean);
  const [loading, setLoading] = useState(false);
  const goback = useNavigate();
  const navigate = useNavigate();
  const handleChange = (value) => {
    setAdmin(value);
  };
  const createUser = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        admin,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          
        } else {
          if (admin) {
            navigate("/dashboard/admins");
          } else {
            navigate("/dashboard/users");
          }
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
                  Create Product
                </h1>

                <p className="mt-4 text-gray-500 ">
                  Let’s get you all set up so you can verify your personal
                  account and begin setting up your profile.
                </p>

                <form onSubmit={createUser}>
                  <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 ">
                        First Name
                      </label>
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="John"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-gray-600 ">
                        Last name
                      </label>
                      <input
                        type="text"
                        placeholder="Snow"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-gray-600 ">
                        Phone number
                      </label>
                      <input
                        type="text"
                        placeholder="XXX-XX-XXXX-XXX"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-gray-600 ">
                        Email address
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="johnsnow@example.com"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-gray-600 ">
                        Password
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter your password"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />

                      <Select
                        defaultValue="USER"
                        style={{
                          width: 120,
                        }}
                        onChange={handleChange}
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
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-gray-600 ">
                        Confirm password
                      </label>
                      <input
                        disabled
                        type="password"
                        placeholder="Enter your password"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <label htmlFor="file-upload">
                      <label
                        htmlFor="file-upload"
                        className="block text-sm font-medium mb-3 text-gray-700"
                      >
                        Cover photo
                      </label>
                      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
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
                    </label>
                  </div>
                  <div className="w-full mt-8 flex justify-end">
                    <div
                      onClick={() => goback(-1)}
                      className="inline-flex justify-center rounded-md border-2 mr-3 border-indigo-600 py-3 px-10 text-lg font-medium text-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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

export default CreateUser;
