import React from "react";
import { HiOutlinePhone } from "react-icons/hi";
import Translate from "../Buttons/Translate";
import TransleteD from "../../dashboard-components/Buttons/TransleteD";

const Top = () => {
  return (
    <div className="shadow-md">
      <div className="container-full flex justify-between items-center md:py-3 py-2">
        <h1 className="text-xl text_color font-semibold">Texnoroom</h1>
        <div className="flex items-center is_mobile">
          <h1 className="mr-5">+99871 209 99 44</h1>
          <Translate />
        </div>
        <div className="flex items-center is_desktop">
          <HiOutlinePhone className="text_color text-xl" />
          <TransleteD />
        </div>
      </div>
    </div>
  );
};

export default Top;
