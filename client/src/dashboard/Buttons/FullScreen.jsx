import React, { useEffect, useState } from "react";
import { BsFullscreen } from "react-icons/bs";

const FullScreen = () => {
  // let elem = document.documentElement;

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

  // // playing bg music

  // const fullScreen = () => {
  //   requestFullScreen();
  // };

const [isFullscreen, setIsFullscreen] = useState(false);

// Watch for fullscreenchange
useEffect(() => {
  function onFullscreenChange() {
    setIsFullscreen(Boolean(document.fullscreenElement));
  }
        
  document.addEventListener('fullscreenchange', onFullscreenChange);

  return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
}, []);

  return (
    <>
      <button className="cursor-pointer mx-3" onClick={() => setIsFullscreen(true)}>
        <BsFullscreen className="text-xl text-gray-600" />
      </button>
    </>
  );
};

export default FullScreen;
