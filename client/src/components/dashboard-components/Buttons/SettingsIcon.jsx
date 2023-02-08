import { Drawer } from "@mui/material";
import React from "react";
import { AiOutlineSetting } from "react-icons/ai";

const SettingsIcon = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <div onClick={toggleDrawer("right", true)} className="fixed top-80 right-0 z-50 cursor-pointer shadow-xl bg-purple-600 rounded-l-lg">
        <AiOutlineSetting className="p-2 py-[10px] text-4xl text-gray-50" />
      </div>
      <div>
        {["left", "right", "top", "bottom"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              <div className="w-[350px] min-h-screen bg-white dark:bg-gray-900">s</div>
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default SettingsIcon;
