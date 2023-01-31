import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { BiCamera } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import HelmetTitle from "../../utils/HelmetTitle";
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
      <HelmetTitle title={"Add new User"} />
      <Layout>
        <section className="relative">
          <div className="bg-indigo-400 w-full h-40 pl-5 pt-4 text-gray-50 rounded-b-lg">
            <h1 className="text-white text-2xl">Add new User</h1>
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
                <div className="grid grid-cols-3 gap-x-5">
                  <div className="col-span-1 flex_center">
                    <div className="relative">
                      <div className="absolute bottom-3 right-0 bg-white rounded-full">
                        <IconButton
                          color="default"
                          aria-label="upload picture"
                          component="label"
                          size="large"
                          sx={{ padding: "10px" }}
                        >
                          <input hidden accept="image/*" type="file" />
                          <BiCamera />
                        </IconButton>
                      </div>
                      <img
                        src="https://www.ihp.ie/wp-content/uploads/profile-img.jpg"
                        className="rounded-full h-40 object-cover"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-span-2 grid grid-cols-1 gap-6 gap-x-5 md:grid-cols-2">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      label="First Name"
                      type="text"
                      className="rounded-xl"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      label="Last Name"
                      type="text"
                      className="rounded-xl"
                      // value={price}
                      // onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      label="Email"
                      type="text"
                      className="rounded-xl"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      label="Phone"
                      type="number"
                      className="rounded-xl"
                      // value={inStock}
                      // onChange={(e) => setInStock(e.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      label="Password"
                      type="number"
                      className="rounded-xl"
                      // value={Password}
                      // onChange={(e) => setDiscount(e.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      label="Compare Password"
                      type="number"
                      className="rounded-xl"
                      // value={discount}
                      // onChange={(e) => setDiscount(e.target.value)}
                    />
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
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default CreateUser;
