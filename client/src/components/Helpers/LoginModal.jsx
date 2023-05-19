import {
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { signIn, toggleLoginModal } from "../../redux/auth";

const LoginModal = () => {
  const [loader, setLoader] = useState(false);
  const { isLoginShow, isLogged, isError, message } = useSelector(
    (state) => state.auth
  );

  let { t } = useTranslation(["home"]);
  const matches = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const storeDataEl = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClose = () => {
    dispatch(toggleLoginModal());
  };
  const signInSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formState.email) {
      errors.email = t("email-valid");
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = t("email-invalid");
    }
    if (!formState.password) {
      errors.password = t("password-valid");
    }
    setFormErrors(errors);

    // submit form if no errors
    if (Object.keys(errors).length === 0) {
      try {
        setLoader(true);
        await dispatch(signIn({formState}));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const responseGoogleOAuth = async (response) => {
    try {
      const { access_token } = response;
      dispatch(googleOauth({ access_token }));
    } catch (err) {
      console.log(err);
    }
  };

  const googleOAuthHandle = useGoogleLogin({
    onSuccess: (response) => responseGoogleOAuth(response),
  });
  useEffect(() => {
    if (isLogged) {
      setLoader(false);
      toast.success(t("sign-in-succ"));
      handleClose();
    }
    if (isError) {
      toast.error(message);
      dispatch(clearErrors());
      setLoader(false);
    }
  }, [dispatch, isError, isLogged, message]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: matches ? 400 : 320,
    boxShadow: 24,
    p: matches ? 4 : 2.5,
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={Boolean(isLoginShow)}
      onClose={handleClose}
      closeAfterTransition
      sx={{ backgroundColor: "#ffffff0a", backdropFilter: "blur(1px)" }}
    >
      <Fade in={Boolean(isLoginShow)}>
        <Box sx={style} className="rounded-xl text-center bg-white">
          <h1 className="text-gray-800 text-2xl font-semibold">
            {t("sign-in")}
          </h1>
          <form onSubmit={signInSubmit}>
            <div className="mt-5">
              <TextField
                id="outlined-basic"
                name="email"
                fullWidth
                color="secondary"
                variant="outlined"
                label={t("email")}
                type="email"
                autoComplete="email"
                autoFocus
                value={formState.email}
                onChange={handleChange}
                error={Boolean(formErrors.email)}
                helperText={formErrors.email}
              />
            </div>
            <div className="mt-5">
              <TextField
                id="outlined-basic"
                fullWidth
                color="secondary"
                variant="outlined"
                name="password"
                label={t("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={formState.password}
                onChange={handleChange}
                error={Boolean(formErrors.password)}
                helperText={formErrors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <AiOutlineEye />
                        ) : (
                          <AiOutlineEyeInvisible />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="mt-1 flex justify-between items-center text-sm">
              <FormControlLabel
                label={t("remember")}
                className="text-gray-500"
                control={
                  <Checkbox
                    id="storeData"
                    name="storeData"
                    color="secondary"
                    ref={storeDataEl}
                  />
                }
              />
              <Link className="text-purple-400" to={"/signin"}>
                {t("forgot-pass")}
              </Link>
            </div>
            <div className="mt-2">
              <Button
                type="submit"
                className="w-full tracking-wide font-normal"
                variant="contained"
                color="secondary"
                size="large"
              >
                {loader ? (
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
                    {t("loading")}...
                  </div>
                ) : (
                  `${t("sign-in-b")}`
                )}
              </Button>
            </div>
          </form>
          <p className="mt-4 text-base text-center text-gray-400">
            {t("new-platform")}{" "}
            <Link
              to={"/signup"}
              className="text-blue-500 focus:outline-none focus:underline hover:underline"
            >
              {t("create-a")}
            </Link>
            .
          </p>
          <div className="flex items-center justify-between mt-3">
            <div className="w-full h-[1px] bg-gray-300"></div>
            <span className="text-sm mx-5 text-gray-400">{t("or")}</span>
            <div className="w-full h-[1px] bg-gray-300"></div>
          </div>
          <button
            onClick={() => googleOAuthHandle()}
            className="flex items-center w-full justify-center space-x-2 text-gray-600 my-3 py-3 bg-gray-50 hover:bg-gray-200 rounded-lg border-2 border-gray-300"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 326667 333333"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
              imageRendering="optimizeQuality"
              fillRule="evenodd"
              clipRule="evenodd"
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
            <span>{t("google-in")}</span>
          </button>{" "}
        </Box>
      </Fade>
    </Modal>
  );
};

export default LoginModal;
