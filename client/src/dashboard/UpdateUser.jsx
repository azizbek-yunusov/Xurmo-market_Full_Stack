import { Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "./Layout";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(Boolean);
  const navigate = useNavigate();
  // const handleChange = (value) => {
  //   setAdmin(value);
  // };

  const params = useParams();
  const { id: userId } = params;
  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${userId}`, {
        headers: { Authorization: localStorage.getItem("jwt") },
      });
      setName(data.user.name);
      setEmail(data.user.email);
      setAdmin(data.user.admin);
    } catch (err) {
      console.log(err);
    }
  };
  const onChanged = (e) => {
    console.log("radio checked", e.target.value);
    setAdmin(e.target.value);
  };
  const updateUserHandler = async (e) => {
    e.preventDefault();
    try {
      e.preventDefault();
      fetch(`http://localhost:5000/user/update/${userId}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          name,
          email,
          admin,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.err) {
            toast.error(data.error);
          } else {
            toast.success("Updated user");
            navigate("/dashboard/users");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <section className="bg-white">
        <div className="flex justify-center min-h-screen">
          {/* <div className="hidden bg-cover lg:block lg:w-2/5 bg_image"></div> */}

          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize">
                Get your free account now.
              </h1>

              <p className="mt-4 text-gray-500 ">
                Let’s get you all set up so you can verify your personal account
                and begin setting up your profile.
              </p>

              <form
                onSubmit={updateUserHandler}
                className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2"
              >
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

                  {/* <Select
                    defaultValue={!admin ? "ADMIN" : "USER"}
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
                  /> */}
                  <Radio.Group onChange={onChanged} value={admin}>
                    <Radio value={true}>ADMIN</Radio>
                    <Radio value={false}>USER</Radio>
                  </Radio.Group>
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

                <button className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  <span>Sign Up </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 rtl:-scale-x-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UpdateUser;
