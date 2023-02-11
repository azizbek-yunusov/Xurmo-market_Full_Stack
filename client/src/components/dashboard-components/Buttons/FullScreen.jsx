import { IconButton } from "@mui/material";
import React from "react";
import { MdFullscreen } from "react-icons/md";

const FullScreen = () => {
  let elem = document.documentElement;
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  }
  const fullScreen = () => {
    toggleFullscreen();
  };
  return (
    <>
      <IconButton
        onClick={fullScreen}
        color="default"
        sx={{ marginX: 1 }}
        aria-label="translate"
      >
        <MdFullscreen className="icon_color" />
      </IconButton>
    </>
  );
};

export default FullScreen;
