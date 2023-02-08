import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Backdrop, Box, Button, Fade, Modal, TextField } from "@mui/material";
import { BsFillCalendarFill } from "react-icons/bs";
import moment from "moment";
import { signOut } from "../../../redux/actions/authAction";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, address, user } = useSelector((state) => state);
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
          Authorization: auth.access_token,
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
        Authorization: auth.access_token,
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
console.log(user);
  return (
    <div className="flex flex-col justify-between sticky top-56">
      <div className="relative flex items-center flex-col justify-between w-[350px] h-[450px] bg-white -mt-28 ml-5 md:py-5 shadow-lg rounded-2xl">
        <div className="flex flex-col items-center">
          <div className="z-10  overflow-hidden rounded-full max-w-max bg-white">
            <img
              className="md:rounded-full h-40 w-40 object-cover"
              src={user.avatar?.url}
              alt=""
            />
          </div>
          <h1 className="md:my-3 md:text-2xl text-gray-900 font-semibold my-3 ">
            {user.name} {user.lastName ? user.lastName : ""}
          </h1>
          {address.length ? (
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
          ) : null}

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
            <div className="flex_center">Edit</div>
          </Button>
          <Button
            color="error"
            onClick={() => signOutHandle()}
            variant="contained"
            sx={{ borderRadius: "6px", background: "red" }}
          >
            <div className="flex_center">sign out</div>
          </Button>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="rounded-xl bg-white text-center">
            <h1 className="text-gray-800 text-2xl font-semibold">
              Edit User Information
            </h1>
            <p className="text-gray-500 font-semibold text-base mb-8">
              Updating user details will receive a privacy audit.
            </p>
            <form encType="multipart/form-data" onSubmit={updateProfileSubmit}>
              <div className="flex_betwen">
                <label
                  htmlFor="avatar-upload"
                  className="relative cursor-pointer w-[50%]"
                >
                  <div id="updateProfileImage" className="">
                    <img
                      className="h-44 md:rounded-full p-[6px]"
                      src={avatarPreview}
                      alt="Profile"
                    />
                    <input
                      id="avatar-upload"
                      type="file"
                      name="avatar"
                      accept="image/*"
                      className="sr-only"
                      onChange={updateProfileDataChange}
                    />
                  </div>
                </label>
                <div className="flex flex-col w-full">
                  <div className="mb-5">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      variant="outlined"
                      label="Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      variant="outlined"
                      label="Last name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className="mb-5">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      variant="outlined"
                      label="Contact"
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end mt-5">
                <Button
                  onClick={handleClose}
                  variant="contained"
                  size="large"
                  color="info"
                  sx={{ borderRadius: "6px", marginRight: "15px" }}
                >
                  close
                </Button>
                <Button
                  // onClick={handleClose}
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  update
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default SideBarPf;
