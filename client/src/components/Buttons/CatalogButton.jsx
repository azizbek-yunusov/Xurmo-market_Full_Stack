import { Button } from "@mui/material";
import React from "react";
import { BiMenu } from "react-icons/bi";

export const CatalogButton = () => {
  return (
    <div className="md:block hidden">
      <Button
        variant="contained"
        color="primary"
        className="w-44"
        size="large"
        startIcon={<BiMenu />}
        sx={{
          background: "rgb(145, 85, 253)",
        }}
      >
        Catalog
      </Button>
    </div>
  );
};
