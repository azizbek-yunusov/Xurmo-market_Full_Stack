import "./theme-switch.css";
import { FiMoon, FiSun } from "react-icons/fi";
import { useDarkSide } from "../../../hooks";


const ThemeToggle = () => {
  const [theme, handleThemeSwitch] = useDarkSide();
  return (
    <div onClick={handleThemeSwitch} className="mx-4 cursor-pointer flex text-2xl justify-center">
      {theme === "light" ? <FiSun className="text-gray-700" /> : <FiMoon className="text-gray-100" />}
    </div>
  );
};

export default ThemeToggle;
