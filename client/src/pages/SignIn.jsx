import { Button, Checkbox, Input } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoginBg from "../assets/images/loginBg.png";
import { UserContext } from "../reducers/useReducer";
import AuthBottomBg from "../assets/images/auth-bottom-bg.png";
import TreeBg from "../assets/images/tree-bg.png";

const SignIn = () => {
  const { dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signIn = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          if (data.user.admin) {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
          toast.success("Successfuly!!");
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>Sign In | E-commerce</title>
      </Helmet>
      <div className="bg-white ">
        <div className="grid grid-cols-12 min-h-screen bg-white gap-0">
          <div className="col-span-8 relative flex justify-center items-center overflow-hidden">
            <img
              src={LoginBg}
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
          <div className="col-span-4 border-l border-l-gray-300 flex items-center md:px-14 w-full max-w-md mx-auto">
            <div className="flex-1">
              <div className="">
                <h2 className="text-2xl font-bold text-gray-700 ">
                  Welcome to Materio! 👋🏻
                </h2>

                <p className="mt-3 text-gray-500">
                  Please sign-in to your account and start the adventure
                </p>
              </div>

              <div className="mt-8">
                <form onSubmit={signIn}>
                  <div className="mt-6">
                    <Input
                      label="Email"
                      size="lg"
                      color="purple"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mt-6">
                    <Input
                      label="Password"
                      size="lg"
                      color="purple"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mt-1 flex justify-between items-center -ml-2 text-sm">
                    <Checkbox className="text-sm" label="Remember Me" />
                    <Link className="text-purple-500" to={"/signin"}>
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="mt-3">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full tracking-wide font-normal"
                      variant="gradient"
                    >
                      Sign In
                    </Button>
                  </div>
                </form>

                <p className="mt-5 text-base text-center text-gray-400">
                  New on our platform?{" "}
                  <Link
                    to={"/signup"}
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Create an account
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

export default SignIn;
