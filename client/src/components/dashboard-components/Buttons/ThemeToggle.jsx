import { FiMoon, FiSun } from "react-icons/fi";
import { useDarkSide } from "../../../hooks";
import { IconButton } from "@mui/material";

const ThemeToggle = () => {
  const [theme, handleThemeSwitch] = useDarkSide();
  return (
    <IconButton
      onClick={handleThemeSwitch}
      color="default"
      sx={{marginX: 1}}
      aria-label="ThemeToggle"
    >
      {theme === "light" ? (
        <FiSun className="text-gray-700" />
      ) : (
        <FiMoon className="text-gray-300" />
      )}
    </IconButton>
  );
};

export default ThemeToggle;
