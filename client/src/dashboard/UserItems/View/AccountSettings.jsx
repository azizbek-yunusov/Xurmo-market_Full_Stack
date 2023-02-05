// ** React Imports
import { useState } from "react";



import TabAccount from "../TabAccount";
import TabSecurity from "../TabSecurity";
import TabInfo from "../TabInfo";
import { BiInfoCircle, BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import styled from "@emotion/styled";
import { MdOutlineTab } from "react-icons/md";
import { Box } from "@mui/system";
import { Card } from "@mui/material";

const Tab = styled(MdOutlineTab)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 100,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 67,
  },
}));

const TabName = styled("span")(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: "0.875rem",
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState("account");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>
     
    </Card>
  );
};

export default AccountSettings;
