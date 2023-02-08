import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LayoutP from "./LayoutP";

const EditMyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, address, user } = useSelector((state) => state);
  const [name, setName] = useState(user.name || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [contact, setContact] = useState(user.phoneNumber || "");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/profile.png");

  const updateProfileSubmit = async () => {
    await fetch("http://localhost:5000/avatar", {
      method: "put",
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
          toast.success("Upload");
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
    <>
      <LayoutP>
        <div className="grid grid-cols-3 gap-x-5 md:my-5">
          <div className="col-span-1 border border-gray-200 rounded-xl flex items-center flex-col p-5 ">
            <img
              src={avatarPreview}
              alt="Profile"
              className="h-32 w-32 object-center rounded-full"
            />
            <div className="flex justify-between">
              <label
                htmlFor="avatar-upload"
                className="relative cursor-pointer"
              >
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    borderRadius: "6px",
                    marginY: "20px",
                    marginRight: "15px",
                  }}
                >
                  Upload
                </Button>
                <input
                  id="avatar-upload"
                  type="file"
                  name="avatar"
                  accept="image/*"
                  className="sr-only"
                  onChange={updateProfileDataChange}
                />
              </label>

              <Button
                onClick={() => updateProfileSubmit()}
                color="secondary"
                variant="contained"
                sx={{ borderRadius: "6px", marginY: "20px" }}
              >
                Save
              </Button>
            </div>
          </div>
          <div className="col-span-2 border border-gray-200 rounded-xl p-4 ">
            <form action="">
              <div className="grid grid-cols-2 gap-x-5">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  label="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{marginBottom: "25px"}}
                />
                <TextField
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  label="Last name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <TextField
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  label="Contact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
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
            </form>
          </div>
        </div>
      </LayoutP>
    </>
  );
};

export default EditMyProfile;
