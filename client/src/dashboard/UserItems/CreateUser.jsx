import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { BiCamera } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import HelmetTitle from "../../utils/HelmetTitle";
import Layout from "../Layout";
import TabAccount from "./TabAccount";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(Boolean);
  const [loading, setLoading] = useState(false);
  const goback = useNavigate();
  const navigate = useNavigate();
  const handleChange = (value) => {
    setAdmin(value);
  };
  const createUser = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        admin,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          if (admin) {
            navigate("/dashboard/admins");
          } else {
            navigate("/dashboard/users");
          }
        }
      });
  };
  return (
    <>
      <HelmetTitle title={"Add new User"} />
      <Layout>
        <section className="relative">
          <TabAccount />
        </section>
      </Layout>
    </>
  );
};

export default CreateUser;
