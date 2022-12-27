import { Button, Checkbox, Input } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
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
    try {
      const { data } = await axios.post("/signin", {
        email,
        password,
      });
      localStorage.setItem("jwt", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch({ type: "USER", payload: data.user });
      if (data.user.admin) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
      toast.success("Successfuly!!");
    } catch (err) {
      console.log(err);
    }
  };
  const responseGoogle = () => {
    console.log("google auth");
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
          <div className="col-span-4 border-l border-l-gray-300 flex items-center md:px-16 w-full mx-auto">
            <div className="flex-1">
              <div className="">
                <h2 className="text-2xl font-bold text-gray-700 ">
                  Welcome to TexnoRoom! 👋🏻
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
                <div className="flex items-center justify-between mt-5">
                  <div className="w-full h-[1px] bg-gray-300"></div>
                  <span className="text-sm mx-5 text-gray-400">or</span>
                  <div className="w-full h-[1px] bg-gray-300"></div>
                </div>

                <div className="text-base">
                  {/* <a
                    href="/"
                    className="flex items-center justify-center space-x-2 text-gray-600 my-3 py-3 bg-gray-50 hover:bg-gray-200 rounded-lg border-2 border-gray-300"
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 326667 333333"
                      shape-rendering="geometricPrecision"
                      text-rendering="geometricPrecision"
                      image-rendering="optimizeQuality"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    >
                      <path
                        d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
                        fill="#4285f4"
                      ></path>
                      <path
                        d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
                        fill="#34a853"
                      ></path>
                      <path
                        d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
                        fill="#fbbc04"
                      ></path>
                      <path
                        d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
                        fill="#ea4335"
                      ></path>
                    </svg>
                    <span>Sign up with Google</span>
                  </a>{" "} */}
                  <GoogleLogin
                    clientId="1062466711644-deqnqctf7j4scdkfrv29ltmbvgno66g6.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  ></GoogleLogin>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
