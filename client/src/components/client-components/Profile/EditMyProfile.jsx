import styled from "@emotion/styled";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HelmetTitle } from "../../../utils";
import LayoutP from "./LayoutP";
import InputMask from "react-input-mask";
import { editProfile, uploadAvatar } from "../../../redux/actions/userAction";

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

const EditMyProfile = () => {
  const { t } = useTranslation(["user"]);
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

  const editProfileHandle = async (e) => {
    e.preventDefault();
    try {
      let userData = { name, lastName, email, phoneNumber };
      dispatch(editProfile(userData, access_token));
      if (!isLoading) {
        toast.success(t("success-edited"));
        navigate("/myprofile");
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
      <LayoutP>
        <section className="relative">
          <div className="flex justify-between items-center md:mb-4 mb-2">
            <h1 className="md:text-2xl text-xl font-semibold">
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
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ImgStyled src={avatarPreview} alt="Profile Pic" />
                  <Box>
                    <ButtonStyled
                      component="label"
                      variant="contained"
                      htmlFor="account-settings-upload-image"
                      color="secondary"
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
                    <p className="text-gray-500 text-sm mt-5">
                      {t("upload-avatar-t")}
                    </p>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  fullWidth
                  label={t("name")}
                  placeholder={t("name-p")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  fullWidth
                  label={t("last-name")}
                  placeholder={t("last-name-p")}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  fullWidth
                  type="email"
                  label={t("email")}
                  placeholder={t("email-p")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputMask
                  mask="(99) 999 99 99"
                  maskChar=" "
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                >
                  {(inputProps) => (
                    <TextField
                      color="secondary"
                      {...inputProps}
                      fullWidth
                      variant="outlined"
                      label={t("contact")}
                      placeholder={t("contact-p")}
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={12}>
                <div className="flex_end">
                  <Button
                    variant="contained"
                    color="info"
                    sx={{ marginRight: 2 }}
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    onClick={() => uploadAvatarHandle()}
                  >
                    {t("save")}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </section>
      </LayoutP>
    </>
  );
};

export default EditMyProfile;
