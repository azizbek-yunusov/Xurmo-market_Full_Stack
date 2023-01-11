import React, { useEffect } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Option, Select } from "@material-tailwind/react";

const Translate = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("uz");
    }
  }, []);
  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  return (
    <div>
      <select
        onChange={handleChange}
        value={localStorage.getItem("i18nextLng")}
        className="bg-gray-200 rounded-lg p-1"
      >
        <option value={"en"}>English</option>
        <option value={"ru"}>Russian</option>
        <option value={"uz"}>Uzbekcha</option>
      </select>
      {/* <Select
        style={{
          width: 100,
        }}
        onChange={handleChange}
        options={[
          {
            value: "en",
            label: "English",
          },
          {
            value: "uz",
            label: "Uzbek",
          },
          {
            value: "ru",
            label: "Rus",
          },
        ]}
      /> */}
    </div>
  );
};

export default Translate;
