import React, { useEffect, useState } from "react";
import { MdFullscreen } from "react-icons/md";

const FullScreen = () => {
  // function requestFullScreen() {
  //   if (elem.requestFullscreen) {
  //     elem.requestFullscreen();
  //   } else if (elem.webkitRequestFullscreen) {
  //     /* Safari */
  //     elem.webkitRequestFullscreen();
  //   } else if (elem.msRequestFullscreen) {
  //     /* IE11 */
  //     elem.msRequestFullscreen();
  //   }
  // }

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
      <button className="cursor-pointer p-1">
        <MdFullscreen onClick={fullScreen} className="text-3xl text-gray-600 dark:text-gray-100" />
      </button>
    </>
  );
};

export default FullScreen;
