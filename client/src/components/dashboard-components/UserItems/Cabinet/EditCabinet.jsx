import styled from "@emotion/styled";
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  Tab,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  changePassword,
  editProfile,
  uploadAvatar,
} from "../../../../redux/actions/userAction";
import { HelmetTitle } from "../../../../utils";
import { Layout } from "../../Layouts";
import InputMask from "react-input-mask";
import CabinetTop from "./CabinetTop";
import CabinetTabs from "./CabinetTabs";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUser,
} from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";

// ** Icons Imports
const ImgStyled = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: "25px",
  borderRadius: theme.shape.borderRadius,
  objectFit: "cover",
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: "18px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

const EditCabinet = () => {
  let { t } = useTranslation(["user"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((state) => state.me);
  const { access_token } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conNewPassword, setConNewpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [disabledPass, setDisabledPass] = useState(true);
  const [passwordError, setPasswordError] = useState("");

  const editProfileHandle = async (e) => {
    e.preventDefault();
    try {
      let userData = { name, lastName, email, phoneNumber };
      dispatch(editProfile(userData, access_token));
      if (oldPassword && newPassword && conNewPassword) {
        if (newPassword.length < 8) {
          setPasswordError("Password must be at least 8 characters long");
        } else if (!/\d/.test(newPassword) || !/[!@#$%^&*]/.test(newPassword)) {
          setPasswordError(
            "Password must contain at least one number and one special character (!@#$%^&*)"
          );
        } else {
          setPasswordError("");
          let passwords = { oldPassword, newPassword, conNewPassword };
          dispatch(changePassword(passwords, access_token));
        }
      }
      if (!isLoading) {
        toast.success(t("success-edited"));
        navigate("/dashboard/cabinet");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const uploadAvatarHandle = async () => {
    try {
      dispatch(uploadAvatar(avatar, access_token));
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setLastName(user?.lastName || "");
      setEmail(user?.email || "");
      setPhoneNumber(user?.phoneNumber || "");
      setAvatarPreview(user?.avatar?.url || "/images/profile.png");
    }
  }, [user]);
  return (
    <>
      <HelmetTitle title={`${t("edit-profile")} - ${t("personal")}`} />
      <Layout>
        <section className="my-4">
          <CabinetTop />
          <CabinetTabs />
          <div className="flex justify-between items-center md:mb-4 mb-2">
            <h1 className="md:text-2xl text-xl text-gray-800 dark:text-gray-200 font-semibold">
              {t("edit-profile")}
            </h1>
            <Breadcrumbs>
              <Link to={"/"} className="">
                {t("home")}
              </Link>
              <Link to={"/myprofile"} className="">
                {t("overview")}
              </Link>
              <Link to={"/myprofile/update"} className="">
                {t("edit-profile")}
              </Link>
            </Breadcrumbs>
          </div>

          <form onSubmit={editProfileHandle}>
            <div className="grid grid-cols-12 gap-x-8 px-5">
              <div className="col-span-12 mb-4">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ImgStyled src={avatarPreview} alt="Profile Pic" />
                  <Box>
                    <ButtonStyled
                      component="label"
                      variant="contained"
                      htmlFor="account-settings-upload-image"
                    >
                      {t("upload-avatar")}
                      <input
                        hidden
                        type="file"
                        onChange={onChange}
                        accept="image/png, image/jpeg"
                        id="account-settings-upload-image"
                      />
                    </ButtonStyled>
                    <ResetButtonStyled
                      color="error"
                      variant="outlined"
                      onClick={() => setAvatar("/images/profile.png")}
                    >
                      {t("reset")}
                    </ResetButtonStyled>
                    <p className="text-gray-500 dark:text-gray-200 text-sm mt-5">
                      {t("upload-avatar-t")}
                    </p>
                  </Box>
                </Box>
              </div>
              <div className="col-span-6">
                <div className="flex items-center text-gray-700 dark:text-gray-200">
                  <AiOutlineUser className="text-xl mr-1" />
                  <p className="text-xl">{t("profile-data")}</p>
                </div>
                <TextField
                  fullWidth
                  sx={{ marginY: 2 }}
                  required
                  label={t("name")}
                  placeholder={t("name-p")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  fullWidth
                  sx={{ marginY: 2 }}
                  required
                  label={t("last-name")}
                  placeholder={t("last-name-p")}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <TextField
                  fullWidth
                  sx={{ marginY: 2 }}
                  required
                  type="email"
                  label={t("email")}
                  placeholder={t("email-p")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <InputMask
                  mask="(99) 999 99 99"
                  maskChar=" "
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                >
                  {(inputProps) => (
                    <TextField
                      fullWidth
                      sx={{ marginY: 2 }}
                      required
                      {...inputProps}
                      variant="outlined"
                      label={t("contact")}
                      placeholder={t("contact-p")}
                    />
                  )}
                </InputMask>
              </div>
              <div className="col-span-6">
                <label htmlFor="disabled">
                  <div className="flex items-center text-gray-700 dark:text-gray-200">
                    <BiLockAlt className="text-xl mr-1" />
                    <p className="text-xl">{t("password-change")}</p>
                    <Checkbox
                      value={disabledPass}
                      onChange={() => setDisabledPass(!disabledPass)}
                      sx={{ paddingY: 0 }}
                    />
                  </div>
                </label>

                <TextField
                  fullWidth
                  sx={{ marginY: 2 }}
                  required
                  disabled={disabledPass}
                  type={showPassword ? "text" : "password"}
                  label={t("current-password")}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
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
                <div>
                  <TextField
                    fullWidth
                    disabled={disabledPass}
                    sx={{ marginY: 2 }}
                    required
                    type={showPassword ? "text" : "password"}
                    label={t("new-password")}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    error={!!passwordError}
                    helperText={passwordError}
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
                  <div>
                    <p className="mb-2 text-gray-600 dark:text-gray-200">
                      {t("password-required")}
                    </p>
                    <ul className="list-disc text-gray-400 dark:text-gray-300 list-inside">
                      <li className="my-1">{t("password-req-first")}</li>
                      <li className="my-1">{t("password-req-two")}</li>
                    </ul>
                  </div>
                </div>
                <TextField
                  fullWidth
                  sx={{ marginY: 2 }}
                  required
                  disabled={disabledPass}
                  type={showPassword ? "text" : "password"}
                  label={t("confirm-new-password")}
                  value={conNewPassword}
                  onChange={(e) => setConNewpassword(e.target.value)}
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
            </div>

            <div className="flex_center my-5">
              <Button variant="contained" color="info" sx={{ marginRight: 2 }}>
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={() => uploadAvatarHandle()}
              >
                {t("save")}
              </Button>
            </div>
          </form>
        </section>
      </Layout>
    </>
  );
};

export default EditCabinet;
