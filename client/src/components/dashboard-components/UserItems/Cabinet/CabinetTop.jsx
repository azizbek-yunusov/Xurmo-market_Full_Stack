import { Fade, IconButton, Menu, MenuItem } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { AiFillCalendar, AiOutlineSetting } from "react-icons/ai";
import { MdLocationOn, MdVerifiedUser } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../../../redux/actions/authAction";

const CabinetTop = () => {
  const { isLogged, user } = useSelector((state) => state.auth);
  let { t } = useTranslation(["user"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const signOutHandle = async () => {
    await dispatch(signOut());
    if (isLogged) {
      navigate("/signin");
    }
    toast.success(t("sign-out"));
  };
  return (
    <div className="bg-white dark:bg-transparent border_primary rounded-xl p-2 relative">
      <div className="-z-20">
        <img
          src="/images/profilebg.png"
          className="h-60 rounded-md w-full bg-pink-500"
          alt="Bg"
        />
        <div className="absolute top-2 right-2">
          <IconButton onClick={handleClick}>
            <AiOutlineSetting className="text-white" />
          </IconButton>
        </div>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleClose}>
            <Link to={"/cabinet/edit"}>{t("edit-profile")}</Link>
          </MenuItem>
          <MenuItem onClick={signOutHandle}>{t("sign-out")}</MenuItem>
        </Menu>
      </div>
      <div className="flex justify-between">
        <div className="px-8 pb-5">
          <div className="z-40 absolute top-64 left-10 bg-white dark:bg-[#312d4b] p-[6px] max-w-max rounded-2xl -mt-14">
            <img
              src={user.avatar.url || "/images/profile.png"}
              className="h-36 w-36 object-cover bg-[#39fde9] rounded-xl"
              alt=""
            />
          </div>
          <div className="flex flex-col pl-48">
            <h1 className="text-2xl mt-6 mb-3 text-gray-700 dark:text-gray-200 font-semibold">
              {user.lastName ? `${user.name} ${user.lastName}` : user.name}
            </h1>
            <div className="flex items-center">
              <p className="flex text-gray-600 dark:text-gray-200 bg-transparent mr-5">
                <MdVerifiedUser className="text-xl mr-1" />
                {t("admin")}
              </p>
              <p className="flex text-gray-600 dark:text-gray-200 bg-transparent mr-5">
                <MdLocationOn className="text-xl mr-1" />
                Uzbekistan
              </p>
              <p className="flex text-gray-600 dark:text-gray-200 bg-transparent">
                <AiFillCalendar className="text-xl mr-1" />
                {moment(user.createdAt).format("LL")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabinetTop;
