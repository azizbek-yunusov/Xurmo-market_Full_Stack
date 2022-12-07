import React, { useContext, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
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
    <div className="mx-3">
      <DarkModeSwitch
        checked={darkSide}
        onChange={toggleDarkMode}
        size={26}
      />
    </div>
  );
};

export default ThemeToggle;
