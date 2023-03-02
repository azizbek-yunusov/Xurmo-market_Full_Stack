import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import LayoutP from "./LayoutP";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  Modal,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  boxShadow: 24,
  p: 4,
};

const Addresses = () => {
  let { t } = useTranslation(["shop"]);
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [allAddresses, setAllAddresses] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchAdresses = async () => {
    const { data } = await axios.get("/addresses", {
      headers: { Authorization: access_token },
    });
    setAllAddresses(data.addresses);
  };
  const deleteAddress = async (id) => {
    try {
      const { data } = await axios.delete(`/address/${id}`, {
        headers: { Authorization: access_token },
      });
      if (data.error) {
        toast.error("error");
      } else {
        dispatch({
          type: "GET_ADDRESS",
          payload: data.user.addresses,
        });
        fetchAdresses();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const addAddress = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/address", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      body: JSON.stringify({
        isActive,
        region,
        district,
        street,
        house,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
        } else {
          fetchAdresses();
        }
      });
  };
  useEffect(() => {
    if (access_token) {
      fetchAdresses();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token]);
  return (
    <LayoutP>
      <div className="flex justify-between items-center md:mb-4">
        <h1 className="md:text-2xl font-semibold">Addresses</h1>
        <Button size="large" variant="contained">
          Add address
        </Button>
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
                  <div className="flex flex-col w-full">
                    <div className="mb-5">
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                        label="Name"
                        type="text"
                        // value={name}
                        // onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                        label="Last name"
                        type="text"
                        // value={last-name}
                        // onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                        label="Contact"
                        type="text"
                        // value={contact}
                        // onChange={(e) => setContact(e.target.value)}
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
      <div className="grid grid-cols-2 gap-5">
        {allAddresses.length ? (
          allAddresses.map((item) => (
            <div
              key={item._id}
              className="p-7 border shadow-lg rounded-lg border-gray-100"
            >
              <div className="flex justify-between md:mb-2">
                <div className="grid grid-cols-2 gap-5">
                  <div className="">
                    <ul className="">
                      <li className="md:my-1 text-gray-700">
                        {t("region")}
                        {":"}
                      </li>
                      <li className="md:my-1 text-gray-700">
                        {t("district")}
                        {":"}
                      </li>
                      <li className="md:my-1 text-gray-700">
                        {t("street")}
                        {":"}
                      </li>
                    </ul>
                  </div>
                  <div className="">
                    <ul className="">
                      <li className="md:my-1">{item.region}</li>
                      <li className="md:my-1">{item.district}</li>
                      <li className="md:my-1">{item.street}</li>
                    </ul>
                  </div>
                </div>
                <BiEdit className="cursor-pointer text-3xl text-gray-600" />
              </div>
              <div className="flex justify-end items-center mt-5">
                <Button
                  size="medium"
                  variant="contained"
                  color="error"
                  sx={{ borderRadius: "6px", marginRight: "8px" }}
                  onClick={() => deleteAddress(item._id)}
                  className="mr-3"
                >
                  <div className="flex_center">
                    <BiTrash className="mr-1 md:text-lg" />
                    delete
                  </div>
                </Button>
                {item.isActive ? (
                  <Button
                    size="medium"
                    variant="contained"
                    sx={{ borderRadius: "6px" }}
                    className="ml-2"
                  >
                    <div className="flex_center">
                      <BsCheckCircle className="mr-1 md:text-lg" />
                      {"Default"}
                    </div>
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{ borderRadius: "6px" }}
                    size="medium"
                    className="ml-2"
                  >
                    <div className="flex_center">{"Default"}</div>
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <CircularProgress />
        )}
      </div>
    </LayoutP>
  );
};

export default Addresses;
