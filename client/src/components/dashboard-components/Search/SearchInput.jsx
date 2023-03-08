import { Backdrop, Box, Fade, Modal } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiSearch } from "react-icons/bi";

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
            <div className="flex items-center pb-4 border-b border-b-gray-300">
              <BiSearch className="text-2xl text-gray-500 mr-3" />
              <input
                type="text"
                placeholder={t("search")}
                autoFocus
                className="text-gray-700 outline-none border-none"
              />
            </div>
            <div className="grid grid-cols-2">
              <div className="">s</div>
              <div className="">s</div>
              <div className="">s</div>
              <div className="">s</div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default SearchInput;
