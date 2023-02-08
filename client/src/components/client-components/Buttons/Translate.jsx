import React, { useEffect } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import UzSvg from "../../../assets/svg/Flag_of_Uzbekistan.svg";
import EnSvg from "../../../assets/svg/Flag_of_United_States.svg";
import RuSvg from "../../../assets/svg/Flag_of_Russia.svg";

const Translate = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("uz");
    }
  }, []);
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };
  console.log(UzSvg);
  const languages = [
    {
      name: "Uz",
      value: "uz",
      svg: UzSvg,
    },
    {
      name: "En",
      value: "en",
      svg: EnSvg,
    },
    {
      name: "Ru",
      value: "ru",
      svg: RuSvg,
    },
  ];
  return (
    <div>
      <div className="flex_betwen transition_normal">
        {languages.map((item, index) => (
          <div
            key={index}
            onClick={() => handleChange(item.value)}
            className={` ${
              localStorage.getItem("i18nextLng") === item.value
                ? "border-gray-100 cursor-not-allowed"
                : ""
            }  md:mx-3 px-1 border border-transparent rounded-md flex items-center cursor-pointer`}
          >
            <img
              src={item.svg}
              alt={item.value}
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
