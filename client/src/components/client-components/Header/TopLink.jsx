import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Translate from "../Buttons/Translate";

const TopLink = () => {
  const { auth } = useSelector((state) => state);
  const { t } = useTranslation();

  return (
    <>
      {auth && auth.isAdmin ? null : (
        <div className="lg:block hidden tranistion_normal w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400">
          <div className="container-full py-[6px] flex items-center justify-between">
            <div className="flex justify-between items-center"></div>
            <div className="flex justify-between items-center">
              <p className="text-base text-white font-semibold mr-2">
                {t("shop:contactcenter")}
                {": "}
              </p>
              <p className="text-lg mr-5 font-semibold text-white">
                +998 (94) 554 55 94
              </p>
              <Translate />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopLink;
