import { Backdrop, Box, Fade, Modal } from "@mui/material";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  boxShadow: 24,
  p: 4,
};
const SearchInput = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div onClick={handleOpen} className="flex items-center cursor-pointer">
        <BiSearch className="text-2xl text-gray-500" />
        <p className="mx-2 text-base text-gray-400">Search</p>
        <div className="text-xs text-gray-400 border border-gray-300 rounded-md p-1 px-[6px]">
          ⌘K
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
          <Box sx={style} className="rounded-lg bg-white">
            <div className="flex items-center pb-4 border-b border-b-gray-300">
              <BiSearch className="text-2xl text-gray-500 mr-3" />
              <input type="text" autoFocus className="text-lg text-gray-700 outline-none border-none" />
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
    // <form onSubmit={SearchHandler} className="flex items-center w-full">
    //   <div className="relative w-full min-w-[500px]">
    //     <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
    //       <CgSearch className="md:text-xl text-gray-500" />
    //     </div>
    //     <input
    //       type="text"
    //       id="voice-search"
    //       required
    //       onChange={(e) => setQuery(e.target.value)}
    //       className="bg-white border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-400 focus:border-purple-400 block w-full pl-10 p-2.5"
    //       placeholder="Search, Smartphones, Laptop Products..."
    //     />
    //     <div
    //       onClick={() => openVoiceSearch()}
    //       className="flex absolute inset-y-0 right-0 items-center pr-3"
    //     >
    //       <BiMicrophone className="md:text-[22px] text-gray-500" />
    //     </div>
    //   </div>
    //   <button
    //     type="submit"
    //     className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg- rounded-lg bg-purple-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //   >
    //     <CgSearch className="md:text-lg mr-1 text-gray-50" />
    //     Search
    //   </button>
    // </form>
  );
};

export default SearchInput;
