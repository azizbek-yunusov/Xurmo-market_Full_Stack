import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const FetchLoader = ({ isLoading }) => {
  return (
    <div className="w-full min-h-screen bg-red-500/50">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default FetchLoader;
