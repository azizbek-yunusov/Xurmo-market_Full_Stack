import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Backdrop, Box, Button, Fade, Modal, TextField } from "@mui/material";
import { BsFillCalendarFill } from "react-icons/bs";
import moment from "moment";
import { signOut } from "../../../redux/actions/authAction";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  boxShadow: 24,
  p: 4,
};

const SideBarPf = () => {
  let { t } = useTranslation(["profile"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, access_token } = useSelector((state) => state.auth);
  const [name, setName] = useState(user.name || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [contact, setContact] = useState(user.phoneNumber || "");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/profile.png");

  const signOutHandle = () => {
    dispatch(signOut());
    navigate("/signin");
    toast.success("Sign out ");
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const editUserInfo = (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:5000/me/update", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: JSON.stringify({
          name,
          lastName,
          phoneNumber: contact,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            handleClose();
            dispatch({
              type: "GET_USER",
              payload: data.updatedUser,
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const updateProfileSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/product", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
        } else {
          navigate("/dashboard/products");
        }
      });
  };
  const updateProfileDataChange = (e) => {
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
    <div className="flex flex-col justify-between sticky top-56">
      <div className="relative flex items-center flex-col justify-between w-[350px] h-[450px] bg-white -mt-28 ml-5 md:py-5 border_l rounded-2xl">
        <div className="flex flex-col items-center">
          <div className="z-10 overflow-hidden md:rounded-2xl max-w-max bg-white">
            <img
              className="md:rounded-2xl h-40 w-40 object-cover bg-teal-300"
              src={user.avatar?.url}
              alt=""
            />
          </div>
          <h1 className="md:my-3 md:text-2xl text-gray-800 font-semibold my-3 ">
            {user.name} {user.lastName ? user.lastName : ""}
          </h1>
          {/* {address.length ? (
            <div className="flex items-center bg-light-green-100 rounded-md p-1 px-2">
              <MdLocationOn className="text-lg text-gray-600" />
              <p className="text-sm font-semibold text-gray-600">
                {address[0].region}
                {", "}
                {address[0].district}
                {", "}
                {address[0].street}
              </p>
            </div>
          ) : null} */}

          <div className="flex items-center text-base font-semibold text-gray-600 my-2">
            <MdEmail className="text-base mx-1" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center text-base font-semibold text-gray-600 my-1">
            <BsFillCalendarFill className="text-sm mx-1" />
            <span>{moment(user.createdAt).format("LL")}</span>
          </div>
        </div>
        <div className="flex md:my-2">
          <Button
            color="primary"
            onClick={handleOpen}
            variant="contained"
            sx={{ borderRadius: "6px", marginRight: "8px" }}
          >
            <div className="flex_center">{t("edit")}</div>
          </Button>
          <Button
            color="error"
            onClick={() => signOutHandle()}
            variant="contained"
            sx={{ borderRadius: "6px", background: "red" }}
          >
            <div className="flex_center">{t("sign-out")}</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBarPf;
