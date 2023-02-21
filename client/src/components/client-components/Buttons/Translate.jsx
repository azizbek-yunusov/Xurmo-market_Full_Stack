import React, { useEffect } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import UzSvg from "../../../assets/svg/Flag_of_Uzbekistan.svg";
import EnSvg from "../../../assets/svg/Flag_of_United_States.svg";
import RuSvg from "../../../assets/svg/Flag_of_Russia.svg";

const Translate = () => {
  const { i18n } = useTranslation();
  const languages = [
    {
      name: "Uz",
      lng: "uz",
      svg: UzSvg,
    },
    {
      name: "En",
      lng: "en",
      svg: EnSvg,
    },
    {
      name: "Ru",
      lng: "ru",
      svg: RuSvg,
    },
  ];
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("uz");
    }
  }, []);
  const handleChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <div className="flex_betwen transition_normal">
        {languages.map((item, index) => (
          <div
            key={index}
            onClick={() => handleChange(item.lng)}
            className={` ${
              localStorage.getItem("i18nextLng") === item.lng
                ? "border-gray-500 bg-gray-200/30 cursor-not-allowed"
                : ""
            }  md:mx-3 px-1 border border-transparent rounded-md flex items-center cursor-pointer`}
          >
            <img
              src={item.svg}
              alt={item.lng}
              className="h-5 w-5 object-cover rounded-full"
            />
            <p className="text-gray-50 md:text-lg ml-1">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Translate;
