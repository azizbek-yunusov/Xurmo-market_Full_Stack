import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/actions/authAction";
import toast from "react-hot-toast";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Backdrop, Box, Button, Fade, Modal, TextField } from "@mui/material";
import { BsFillCalendarFill } from "react-icons/bs";
import moment from "moment";

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
  const { auth, address } = useSelector((state) => state);
  let { user } = auth;
  const [name, setName] = useState(auth.user.name || "");
  const [lastName, setLastName] = useState(auth.user.lastName || "");
  const [contact, setContact] = useState(auth.user.phoneNumber || "");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const signOutHandle = () => {
    dispatch(signOut());
    navigate("/signin");
    toast.success("Sign out ");
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="flex flex-col justify-between sticky top-56">
      <div className="relative flex items-center flex-col w-[350px] h-[450px] bg-white -mt-28 ml-5 md:py-5 shadow-lg rounded-2xl">
        <div className="absolute top-3 right-3">
          <button onClick={handleOpen}>edit</button>
        </div>
        <div className="z-10 overflow-hidden rounded-full max-w-max bg-white">
          <img
            className="h-40 md:rounded-full p-[6px]"
            src="https://demos.themeselection.com/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            alt=""
          />
        </div>
        <h1 className="md:my-3 md:text-2xl text-gray-900 font-semibold my-3 ">
          {user.name}
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
            <form>
              <div className="flex_betwen">
                <div className="w-[50%]">
                  <img
                    className="h-44 md:rounded-full p-[6px]"
                    src="https://demos.themeselection.com/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
                    alt=""
                  />
                </div>
                <div className="flex flex-col w-full">
                  <div className="mb-5">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      variant="outlined"
                      label="Name"
                      type="email"
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
                      type="email"
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
                      type="email"
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
                  onClick={handleClose}
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  add review
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
