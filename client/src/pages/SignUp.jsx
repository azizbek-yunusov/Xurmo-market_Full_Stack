import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import RegisterBg from "../assets/images/register-bg.png";
import AuthBottomBg from "../assets/images/auth-bottom-bg.png";
import TreeBg from "../assets/images/tree-bg.png";
import toast from "react-hot-toast";
import {
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const signUpHandler = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.msg);
        }
      });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Helmet>
        <title>Sign Up | E-commerce</title>
      </Helmet>
      <div className="bg-white ">
        <div className="grid grid-cols-12 min-h-screen bg-white gap-0">
          <div className="md:col-span-8 relative md:flex hidden justify-center items-center overflow-hidden">
            <img
              src={RegisterBg}
              className="max-w-3xl w-full z-20 object-cover"
              alt=""
            />
            <img
              className="absolute left-0 bottom-0 z-10"
              src={AuthBottomBg}
              alt=""
            />
            <img
              className="absolute left-0 bottom-1 z-20"
              src={TreeBg}
              alt=""
            />
          </div>
          <div className="md:col-span-4 col-span-12 border-l border-l-gray-300 flex items-center justify-center w-full mx-auto">
            <div className="">
              <div className="">
                <h2 className="text-2xl font-bold text-gray-700 ">
                  Adventure starts here 🚀
                </h2>

                <p className="mt-3 text-gray-500">
                  Make your app management easy and fun!
                </p>
              </div>

              <div className="mt-8">
                <form onSubmit={signUpHandler}>
                  <TextField
                    id="outlined-basic"
                    fullWidth
                    variant="outlined"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="mt-6">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mt-6">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      label="Password"
                      value={password}
                      className="rounded-2xl"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  {/* <OutlinedInput
                    fullWidth
                    label='Password'
                    value={values.password}
                    id="auth-login-password"
                    onChange={handleChange("password")}
                    type={values.showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label="toggle password visibility"
                        >
                          {values.showPassword ? (
                            <AiOutlineEye />
                          ) : (
                            <AiOutlineEyeInvisible />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  /> */}
                  </div>

                  <div className="mt-1 -ml-2 text-sm">
                    <Checkbox className="text-sm" label="s" />
                  </div>
                  <div className="mt-3">
                    <Button
                      type="submit"
                      className="w-full"
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Sign Up
                    </Button>
                  </div>
                </form>

                <p className="md:mt-5 mt-3 md:text-base text-sm text-center text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to={"/signin"}
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign in instead
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
