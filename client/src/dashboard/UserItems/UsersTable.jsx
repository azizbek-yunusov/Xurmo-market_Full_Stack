import {
  Avatar,
  AvatarGroup,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HelmetTitle from "../../utils/HelmetTitle";

import Layout from "../Layout";

const UsersTable = () => {
  const { access_token } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [checked, setChecked] = useState(false);
  const checkToggle = (checked) => {
    setChecked(!checked);
  };
  const fetchUsers = async () => {
    try {
      fetch("http://localhost:5000/users", {
        headers: {
          Authorization: access_token,
        },
      })
        .then((res) => res.json())
        .then((data) => setUsers(data.users));
      // const { data } = axios.get("/users", {
      //   headers: {
      //     Authorization: access_token,
      //   },
      // });
      // setUsers(data.users);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteUser = async (id, e) => {
    e.preventDefault();
    try {
      await axios.delete(`/user/${id}`, {
        headers: {
          Authorization: access_token,
        },
      });
      fetchUsers();
      toast.success("Deleted user");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  console.log(users);
  return (
    <>
      <HelmetTitle title={"All Admins"} />
      <Layout>
        <div className="bg-white mx-5 dark:bg-[#2e2d4a] rounded-lg overflow-hidden my-6 border border-gray-300">
          <div className="flex w-full bg-white items-center justify-end py-3 px-4">
            <div className="">
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={"all"}
                  // onChange={(e) => setCategory(e.target.value)}
                  label="Sorting"
                >
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"user"}>Users</MenuItem>
                  <MenuItem value={"admin"}>Admins</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Link to={"/user/create"}>
              <Tooltip content="Add new user">
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    marginLeft: "25px",
                    background: "rgb(145, 85, 253)",
                    borderRadius: "10px",
                  }}
                >
                  create user
                </Button>
              </Tooltip>
            </Link>
          </div>
          <table className="min-w-max w-full table-auto rounded-lg ">
            <thead>
              <tr className="bg-gray-300 dark:bg-[#232338] text-gray-700 dark:text-gray-200 text-sm rounded-t-lg leading-normal global-font">
                <th className="py-3">
                  <Checkbox onChange={checkToggle} />
                </th>
                <th className="py-3 px-6 text-left">Info</th>
                <th className="py-3 px-6 text-center">Role</th>
                <th className="py-3 px-6 text-center">Orders</th>
                <th className="py-3 px-6 text-center">CreatedBy</th>
                <th className="py-3 px-6 text-center">CreatedAt</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-300 text-sm font-light">
              {users.length
                ? users
                    .map((user, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 font-semibold hover:dark:bg-gray-600"
                      >
                        <td className="py-3 flex_center">
                          <Checkbox sx={{ borderRadius: 5 }} />
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="flex justify-start items-center">
                            <div className="mr-4">
                              <Avatar
                                src="https://www.material-tailwind.com/img/face-2.jpg"
                                alt="avatar"
                                size="sm"
                              />
                            </div>
                            <div className="flex flex-col mr-2">
                              <span className="">{user.name}</span>
                              <span className="text-gray-500 text-sm">{user.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span>{user.admin ? "Admin" : "Client"}</span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex justify-center items-center">
                            <AvatarGroup total={24}>
                              <Avatar
                                sx={{ borderRadius: "12px" }}
                                alt="Travis Howard"
                                src="https://www.material-tailwind.com/img/face-2.jpg"
                              />
                              <Avatar
                                sx={{ borderRadius: "12px" }}
                                alt="Agnes Walker"
                                src="https://www.material-tailwind.com/img/face-2.jpg"
                              />
                              <Avatar
                                sx={{ borderRadius: "12px" }}
                                alt="Trevor Henderson"
                                src="https://www.material-tailwind.com/img/face-2.jpg"
                              />
                            </AvatarGroup>
                            <span className="mr-2">15 pct</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex justify-center items-center">
                            <div className="mr-2">
                              <Avatar
                                src="https://www.material-tailwind.com/img/face-2.jpg"
                                alt="avatar"
                                size="sm"
                              />
                            </div>
                            <div className="block"></div>
                            <span className="mr-2">
                              {user.createdBy
                                ? user.createdBy.name
                                : "deleted account"}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex justify-center items-center">
                            <span>{moment(user.createdAt).format("lll")}</span>
                          </div>
                        </td>

                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <Link
                              to={`/user/${user._id}`}
                              className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </Link>
                            <Link to={`/user/${user._id}`}>
                              <div className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110">
                                <FiEdit className="text-lg" />
                              </div>
                            </Link>
                            <button
                              onClick={() => deleteUser(user._id)}
                              className="cursor-pointer w-5 mr-3 transform hover:text-purple-500 hover:scale-110"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                    .reverse()
                : null}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default UsersTable;
