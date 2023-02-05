import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../Layout";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(Boolean);
  const navigate = useNavigate();
  // const handleChange = (value) => {
  //   setAdmin(value);
  // };

  const params = useParams();
  const { id: userId } = params;
  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${userId}`, {
        headers: { Authorization: localStorage.getItem("jwt") },
      });
      setName(data.user.name);
      setEmail(data.user.email);
      setAdmin(data.user.admin);
    } catch (err) {
      console.log(err);
    }
  };
  const onChanged = (e) => {
    console.log("radio checked", e.target.value);
    setAdmin(e.target.value);
  };
  const updateUserHandler = async (e) => {
    e.preventDefault();
    try {
      e.preventDefault();
      fetch(`http://localhost:5000/user/${userId}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          name,
          email,
          admin,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.err) {
            
          } else {
            navigate("/dashboard/users");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <section className="bg-white">
        
      </section>
    </Layout>
  );
};

export default UpdateUser;
