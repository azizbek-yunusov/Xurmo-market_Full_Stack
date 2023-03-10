import { Backdrop, Box, Fade, Modal } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BiSearch, BiShoppingBag } from "react-icons/bi";
import { FiShoppingBag, FiUsers } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  p: 4,
};
const SearchInput = () => {
  let { t } = useTranslation(["home"]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === "/") {
      setOpen(true);
      console.log("Control");
    }
  };
  const handleKeyUp = (event) => {
    if (event.ctrlKey && event.key === "/") {
      setOpen(false);
    }
  };
  const searchList = [
    {
      id: "1",
      name: "products",
      icon: <BiShoppingBag className="text-xl" />,
    },
    {
      id: "2",
      name: "users",
      icon: <FiUsers className="text-xl" />,
    },
    {
      id: "3",
      name: "orders",
      icon: <FiShoppingBag className="text-xl" />,
    },
    {
      id: "4",
      name: "cabinet",
      icon: <AiOutlineUser className="text-xl" />,
    },
  ];
  return (
    <>
      <div
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        className="flex items-center cursor-pointer"
      >
        <BiSearch className="text-2xl text-gray-500" />
        <p className="mx-2 text-base text-gray-400">{t("search")}</p>
        <div className="text-base text-gray-400">( Ctrl + / )</div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        sx={{ backgroundColor: "transparent", backdropFilter: "blur(1px)" }}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="rounded-lg bg-white">
            <div className="flex items-center pb-3 border-b border-b-gray-200 mb-4">
              <BiSearch className="text-2xl text-gray-500 mr-3" />
              <input
                type="text"
                placeholder={t("search")}
                autoFocus
                className="text-gray-700 outline-none border-none"
              />
            </div>
            <div className="grid grid-cols-2 px-8">
              <div className="">
                <p className="text-sm uppercase font-light text-gray-500 mb-4">
                  {t("popular-search-list")}
                </p>
                {searchList.map((item, index) => (
                  <Link
                    to={`/dashboard/${item.name}`}
                    key={index}
                    onClose={handleClose}
                    className="my-4 text_color flex items-center"
                  >
                    {item.icon}
                    <p className="ml-2">{t(`${item.name}`)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default SearchInput;
