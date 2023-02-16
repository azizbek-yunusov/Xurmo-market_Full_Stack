import {
  Button,
  Checkbox,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiExport, BiSearch } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HelmetTitle } from "../../../../utils";
import { Layout } from "../../Layouts";
import TableBody from "./TableBody";

const UsersTable = () => {
  const { access_token } = useSelector((state) => state.auth);
  const [term, setTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const filteredUsers = users.filter((frontMatter) => {
    const searchContent = frontMatter.name || frontMatter.email;
    return searchContent.toLowerCase().includes(term.toLowerCase());
  });

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = users.map((customer) => customer._id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, _id) => {
    const selectedIndex = selectedCustomerIds.indexOf(_id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        _id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
  const deleteUser = async (_id) => {
    try {
      await axios.delete(`/user/${_id}`, {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HelmetTitle title={"All Users"} />
      <Layout>
        <div className="bg-white dark:bg-[#2e2d4a] rounded-lg overflow-hidden my-6 border_primary">
          <h1 className="p-5 text-gray-600 text-xl font-semibold">
            Search Filter
          </h1>
          <div className="grid grid-cols-3 gap-x-5 pb-6 mb-3 px-5 border-b border-b-gray-200">
            <FormControl size="medium" sx={{}}>
              <InputLabel _id="demo-simple-select-label">
                Select Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                _id="demo-simple-select"
                // value={"all"}
                // onChange={(e) => setCategory(e.target.value)}
                label="Select Role"
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"user"}>Users</MenuItem>
                <MenuItem value={"admin"}>Admins</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="medium" sx={{}}>
              <InputLabel _id="demo-simple-select-label">Sorting</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                _id="demo-simple-select"
                // value={"all"}
                // onChange={(e) => setCategory(e.target.value)}
                label="Sorting"
              >
                <MenuItem value={"all"}>Date</MenuItem>
                <MenuItem value={"user"}>Name</MenuItem>
                <MenuItem value={"admin"}>Status</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="medium" sx={{}}>
              <InputLabel _id="demo-simple-select-label">
                Select Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                _id="demo-simple-select"
                // value={"all"}
                // onChange={(e) => setCategory(e.target.value)}
                label="Select Role"
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"user"}>Users</MenuItem>
                <MenuItem value={"admin"}>Admins</MenuItem>
              </Select>
            </FormControl>
          </div>
          {selectedCustomerIds.length ? (
            <div className="flex w-full items-center justify-between py-3 px-4">
              <Chip
                label={`${selectedCustomerIds.length} Selected`}
                size="medium"
                color="success"
              />

              <Button
                variant="contained"
                color="error"
                size="medium"
                sx={{
                  marginLeft: "15px",
                  borderRadius: "6px",
                  minWidth: "130px",
                }}
                startIcon={<MdDelete />}
              >
                DELETE
              </Button>
            </div>
          ) : (
            <div className="flex w-full items-center justify-between py-3 px-4">
              <FormControl size="small" sx={{ minWidth: "80px" }}>
                <Select
                  labelId="demo-simple-select-label"
                  _id="demo-simple-select"
                  value={"10"}
                  // onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value={"10"}>10</MenuItem>
                  <MenuItem value={"20"}>20</MenuItem>
                  <MenuItem value={"30"}>30</MenuItem>
                  <MenuItem value={"50"}>50</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 500 }}>
                <TextField
                  size="small"
                  fullWidth
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BiSearch className="text-xl" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search"
                  variant="outlined"
                />
              </FormControl>
              <div className="flex items-center">
                <Button
                  disabled
                  variant="outlined"
                  size="medium"
                  sx={{
                    marginLeft: "25px",
                    borderRadius: "6px",
                  }}
                  startIcon={<BiExport />}
                >
                  EXPORT
                </Button>
                <Link to={"/user/create"}>
                  <Tooltip content="Add new user">
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{
                        marginLeft: "25px",
                        background: "rgb(145, 85, 253)",
                        borderRadius: "6px",
                      }}
                      startIcon={<FiPlus />}
                    >
                      ADD NEW USER
                    </Button>
                  </Tooltip>
                </Link>
              </div>
            </div>
          )}

          <table className="min-w-max w-full table-auto rounded-lg ">
            <thead>
              <tr className="bg-gray-100 text-left dark:bg-[#373755] text-gray-500 dark:text-gray-200 text-sm font-light rounded-t-lg uppercase">
                <th className="py-2 text-center">
                  <Checkbox
                    checked={selectedCustomerIds.length === users.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < users.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-6">User</th>
                <th className="pl-10">Email</th>
                <th className="px-6">Role</th>
                <th className="px-6">Joined</th>
                <th className="px-6">Actions</th>
              </tr>
            </thead>
            <TableBody
              selectedCustomerIds={selectedCustomerIds}
              filteredUsers={filteredUsers}
              handleSelectOne={handleSelectOne}
              deleteUser={deleteUser}
            />
          </table>
        </div>
      </Layout>
    </>
  );
};

export default UsersTable;
