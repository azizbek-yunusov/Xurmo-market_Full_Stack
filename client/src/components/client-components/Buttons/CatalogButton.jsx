import { Button } from "@mui/material";
import React from "react";
import { BiMenu } from "react-icons/bi";

const CatalogButton = () => {
  return (
    <div className="lg:block hidden">
      <Button
        variant="contained"
        color="warning"
        className="w-40"
        size="medium"
        startIcon={<BiMenu />}
      >
        Catalog
      </Button>
    </div>
  );
};

export default CatalogButton;
