import React from "react";
import { AiOutlineSetting } from "react-icons/ai";

const SettingsIcon = () => {
  return (
    <div className="fixed top-80 right-0 z-50 cursor-pointer shadow-xl bg-purple-600 rounded-l-lg">
      <AiOutlineSetting className="p-2 py-[10px] text-4xl text-gray-50" />
    </div>
  );
};

export default SettingsIcon;
