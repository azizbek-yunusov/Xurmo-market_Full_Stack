import { IconButton, useMediaQuery } from "@mui/material";
import React from "react";
import { BiTable } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";

const TableButton = ({isTable, setIsTable}) => {
  const isXl = useMediaQuery("(min-width: 1245px)");

  return (
    <div>
      {isXl ? (
        <div className="">
          <IconButton
            onClick={() => setIsTable(false)}
            aria-label="Table"
            color={!isTable ? "secondary" : "default"}
          >
            <BiTable />
          </IconButton>
          <IconButton
            onClick={() => setIsTable(true)}
            aria-label="Table"
            color={isTable ? "secondary" : "default"}
          >
            <BsGrid />
          </IconButton>
        </div>
      ) : (
        <div className="">
          <IconButton
            onClick={() => setIsTable(!isTable)}
            aria-label="Table"
            color="primary"
          >
            {isTable ? <BiTable /> : <BsGrid />}
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default TableButton;
