import React, { useContext, useState } from "react";
import "./theme-switch.css";
import useDarkSide from "../../hooks/useDarkSide";

const ThemeToggle = () => {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );
  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div className="mx-3 flex justify-center">
      {/* <DarkModeSwitch
        checked={darkSide}
        onChange={toggleDarkMode}
        size={26}
      /> */}
      {/* <Switch checked={darkSide}  defaultChecked onChange={toggleDarkMode}/> */}
      <div className="wrapper mt-2">
        <input
          type="checkbox"
          name="checkbox"
          // checked={darkSide}
          onChange={toggleDarkMode}
          className="switch"
        />
      </div>
    </div>
  );
};

export default ThemeToggle;
