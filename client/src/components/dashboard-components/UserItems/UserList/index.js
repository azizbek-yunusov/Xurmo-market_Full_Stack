import {
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BiExport, BiSearch, BiTable } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteUser,
  getUsers,
  selectedDeleteUser,
} from "../../../../redux/customer";
import { HelmetTitle } from "../../../../utils";
import NotData from "../../Helpers/NotData";
import { Layout } from "../../Layouts";
import GridList from "./GridList";
import TableBody from "./TableBody";

const UsersTable = () => {
  const { isLoading, users } = useSelector((state) => state.customer);
  const { access_token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isXl = useMediaQuery("(min-width: 1245px)");
  let { t } = useTranslation(["user"]);

  const [isTable, setIsTable] = useState(false);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [term, setTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const filteredUsers = users.filter(
    (value) =>
      value.name.toLowerCase().includes(term.toLowerCase()) ||
      value.email.toLowerCase().includes(term.toLowerCase())
  );
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
  const handleSelectedDelete = async () => {
    try {
      const selectedIds = {
        selected: selectedCustomerIds,
      };
      await dispatch(selectedDeleteUser({ access_token, selectedIds }));
      dispatch(getUsers());
      setSelectedCustomerIds([]);
      toast.success(t("user-selected-deleted"));
    } catch (err) {
      console.log();
    }
  };
  const handleDeleteUser = async (id) => {
    try {
      await dispatch(deleteUser({ access_token, id }));
      toast.success(t("user-delete"));
    } catch (err) {
      console.log();
    }
  };

  useEffect(() => {
    dispatch(getUsers(access_token));
  }, [access_token, dispatch]);
  console.log(users);
  return (
    <>
      <HelmetTitle title={t("all-users")} />
      <Layout>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <div className="bg-white dark:bg-[#2e2d4a] rounded-lg overflow-hidden my-6 border border-gray-300 dark:border-gray-600">
              <h1 className="p-5 text-gray-600 dark:text-gray-200 text-xl font-semibold">
                {t("search-filter")}
              </h1>
              <div className="grid grid-cols-3 gap-x-5 pb-6 mb-3 px-5 border-b border-b-gray-200 dark:border-b-gray-600">
                <FormControl size="medium" sx={{}}>
                  <InputLabel _id="demo-simple-select-label">
                    {t("select-role")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    // value={"all"}
                    // onChange={(e) => setCategory(e.target.value)}
                    label={t("select-role")}
                  >
                    <MenuItem value={null}>{t("all")}</MenuItem>
                    <MenuItem value={true}>{t("admin")}</MenuItem>
                    <MenuItem value={false}>{t("client")}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="medium" sx={{}}>
                  <InputLabel _id="demo-simple-select-label">
                    {t("select-sort")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    // value={"all"}
                    // onChange={(e) => setCategory(e.target.value)}
                    label={t("select-sort")}
                  >
                    <MenuItem value={"all"}>Date</MenuItem>
                    <MenuItem value={"user"}>Name</MenuItem>
                    <MenuItem value={"admin"}>Status</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="medium" sx={{}}>
                  <InputLabel _id="demo-simple-select-label">
                    {t("select-rating")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    // value={"all"}
                    // onChange={(e) => setCategory(e.target.value)}
                    label={t("select-rating")}
                  >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"user"}>users</MenuItem>
                    <MenuItem value={"admin"}>Admins</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {selectedCustomerIds.length ? (
                <div className="flex w-ful items-center justify-between py-[12.5px] px-4">
                  <h1 className="font-semibold text-gray-700">{`${
                    selectedCustomerIds.length
                  } ${t("selected")}`}</h1>
                  <Button
                    variant="contained"
                    color="error"
                    size="medium"
                    onClick={() => handleSelectedDelete()}
                    sx={{
                      marginLeft: "15px",
                      minWidth: "130px",
                    }}
                    startIcon={<MdDelete />}
                  >
                    {t("delete")}
                  </Button>
                </div>
              ) : (
                <div className="flex w-full items-center justify-between py-3 px-4">
                  <FormControl
                    size="small"
                    sx={{ maxWidth: isXl ? "70px" : "80px" }}
                  >
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
                  <FormControl sx={{ minWidth: isXl ? 500 : 250 }}>
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
                      placeholder={t("search")}
                      variant="outlined"
                    />
                  </FormControl>
                  <div className="flex items-center">
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

                    <Button
                      disabled
                      variant="outlined"
                      size="medium"
                      sx={{
                        marginLeft: isXl ? "25px" : "10px",
                      }}
                      startIcon={<BiExport />}
                    >
                      {isXl ? "EXPORT" : "EXP"}
                    </Button>
                    <Link to={"/user/create"}>
                      <Tooltip title={t("add-user-title")}>
                        <Button
                          variant="contained"
                          size="medium"
                          sx={{
                            marginLeft: "25px",
                          }}
                          startIcon={<FiPlus />}
                        >
                          {t("add-user")}
                        </Button>
                      </Tooltip>
                    </Link>
                  </div>
                </div>
              )}
              {users.length ? (
                <>
                  {!isTable ? (
                    <TableBody
                      users={users}
                      handleSelectAll={handleSelectAll}
                      selectedCustomerIds={selectedCustomerIds}
                      filteredUsers={filteredUsers}
                      handleSelectOne={handleSelectOne}
                      handleDeleteUser={handleDeleteUser}
                    />
                  ) : (
                    <GridList
                      users={users}
                      handleSelectAll={handleSelectAll}
                      selectedCustomerIds={selectedCustomerIds}
                      filteredUsers={filteredUsers}
                      handleSelectOne={handleSelectOne}
                      handleDeleteUser={handleDeleteUser}
                    />
                  )}
                </>
              ) : (
                <NotData />
              )}
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default UsersTable;
