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
        <div className="w-full primary_bg">
          <div className="container-full py-[6px] flex items-center justify-between">
            <div className="flex justify-between items-center"></div>
            <div className="flex justify-between items-center">
              <p className="text-base text-white font-semibold mr-2">
                {t("shop:contactcenter")}
                {": "}
              </p>
              <p className="text-lg mr-5 font-semibold text-white">
                +998 (71) 202 20 21
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
