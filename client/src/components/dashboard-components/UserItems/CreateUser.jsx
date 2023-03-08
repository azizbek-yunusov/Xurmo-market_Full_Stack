import styled from "@emotion/styled";
import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../../redux/customer";
import { HelmetTitle } from "../../../utils";
import { Layout } from "../Layouts";
import InputMask from "react-input-mask";

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

const CreateUser = () => {
  let { t } = useTranslation(["user"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.customer);
  const { access_token } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [admin, setAdmin] = useState(false);
  const [avatar, setAvatar] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState("/images/profile.png");

  const createUserHandle = async (e) => {
    e.preventDefault();
    try {
      let userData = {
        name,
        lastName,
        password,
        email,
        phoneNumber,
        avatar,
        admin,
      };
      dispatch(createUser({ userData, access_token }));
      console.log(userData);
      if (!isLoading) {
        toast.success(t("success-added"));
        navigate("/dashboard/users");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleAdmin = (e) => {
    setAdmin(e.target.value);
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
  return (
    <>
      <HelmetTitle title={`${t("add-user")} - ${t("users")}`} />
      <Layout>
        <section className="relative">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-40 px-5 pt-4 text-gray-50 rounded-xl">
            <div className="flex_betwen">
              <h1 className="text-white text-2xl">{t("add-user")}</h1>
              <Breadcrumbs sx={{ color: "#ffff" }}>
                <Link to={"/"} className="">
                  {t("home")}
                </Link>
                <Link to={"/myprofile"} className="">
                  {t("users")}
                </Link>
                <Link to={"/myprofile/update"} className="">
                  {t("add-user")}
                </Link>
              </Breadcrumbs>
            </div>
          </div>
          <div className="-mt-24 rounded-2xl flex mx-4 bg_color border_primary">
            <div className="flex w-full p-8 px-8 xl:px-16">
              <div className="w-full">
                <form onSubmit={createUserHandle}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
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
                          <p className="text-gray-500 text-sm mt-5">
                            {t("upload-avatar-t")}
                          </p>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label={t("name")}
                        placeholder={t("name-p")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label={t("last-name")}
                        placeholder={t("last-name-p")}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
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
                            required
                            {...inputProps}
                            fullWidth
                            variant="outlined"
                            label={t("contact")}
                            placeholder={t("contact-p")}
                          />
                        )}
                      </InputMask>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        type="text"
                        label={t("password")}
                        placeholder={t("password-p")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          {t("role")}
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          defaultValue={false}
                          name="radio-buttons-group"
                          value={admin}
                          onChange={handleAdmin}
                        >
                          <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label={t("client")}
                          />
                          <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label={t("admin")}
                          />
                        </RadioGroup>
                      </FormControl>
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
                        <Button type="submit" variant="contained">
                          {t("save")}
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
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
