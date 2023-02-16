import {
  Button,
  Checkbox,
  CircularProgress,
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
import { BiExport, BiSearch } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HelmetTitle } from "../../../utils";
import { NotData } from "../Helpers";
import { Layout } from "../Layouts";
import TableBody from "./TableBody";

const OrdersList = () => {
  const { access_token } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const filteredOrders = orders.filter((frontMatter) => {
    const searchContent = frontMatter._id;
    return searchContent.toLowerCase().includes(term.toLowerCase());
  });

  const handleSelectAll = (event) => {
    let newSelectedOrderIds;

    if (event.target.checked) {
      newSelectedOrderIds = orders.map((order) => order._id);
    } else {
      newSelectedOrderIds = [];
    }

    setSelectedOrderIds(newSelectedOrderIds);
  };

  const handleSelectOne = (event, _id) => {
    const selectedIndex = selectedOrderIds.indexOf(_id);
    let newSelectedOrderIds = [];

    if (selectedIndex === -1) {
      newSelectedOrderIds = newSelectedOrderIds.concat(selectedOrderIds, _id);
    } else if (selectedIndex === 0) {
      newSelectedOrderIds = newSelectedOrderIds.concat(
        selectedOrderIds.slice(1)
      );
    } else if (selectedIndex === selectedOrderIds.length - 1) {
      newSelectedOrderIds = newSelectedOrderIds.concat(
        selectedOrderIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedOrderIds = newSelectedOrderIds.concat(
        selectedOrderIds.slice(0, selectedIndex),
        selectedOrderIds.slice(selectedIndex + 1)
      );
    }

    setSelectedOrderIds(newSelectedOrderIds);
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/orders", {
        headers: { Authorization: access_token },
      });
      setLoading(false);
      setOrders(data.orders);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteOrder = async (id) => {
    try {
      fetch(`http://localhost:5000/order/${id}`, {
        method: "delete",
        headers: {
          Authorization: access_token,
        },
      }).then((data) => {
        if (data.err) {
        } else {
          fetchOrders();
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);
  return (
    <>
      <HelmetTitle title="All orders" />
      <Layout>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <div className="bg-white dark:bg-[#2e2d4a] rounded-lg overflow-hidden my-6 border_primary">
              <h1 className="p-5 text-gray-600 dark:text-gray-200 text-xl font-semibold">
                Search Filter
              </h1>
              <div className="grid grid-cols-3 gap-x-5 pb-6 mb-3 px-5 border-b border-b-gray-200 dark:border-b-gray-600">
                <FormControl size="medium" sx={{}}>
                  <InputLabel _id="demo-simple-select-label">
                    Select Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    // value={"all"}
                    // onChange={(e) => setCategory(e.target.value)}
                    label="Select Category"
                  >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"user"}>orders</MenuItem>
                    <MenuItem value={"admin"}>Admins</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="medium" sx={{}}>
                  <InputLabel _id="demo-simple-select-label">
                    Select Brand
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    // value={"all"}
                    // onChange={(e) => setCategory(e.target.value)}
                    label="Select Brand"
                  >
                    <MenuItem value={"all"}>Date</MenuItem>
                    <MenuItem value={"user"}>Name</MenuItem>
                    <MenuItem value={"admin"}>Status</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="medium" sx={{}}>
                  <InputLabel _id="demo-simple-select-label">
                    Select Rating
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    // value={"all"}
                    // onChange={(e) => setCategory(e.target.value)}
                    label="Select Rating"
                  >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"user"}>orders</MenuItem>
                    <MenuItem value={"admin"}>Admins</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {selectedOrderIds.length ? (
                <div className="flex w-ful items-center justify-between py-[12.5px] px-4">
                  <h1 className="font-semibold text-gray-700">{`${selectedOrderIds.length} Selected`}</h1>
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
                    <Link to={"/product/create"}>
                      <Tooltip title="Add new user">
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
                          ADD NEW PRODUCT
                        </Button>
                      </Tooltip>
                    </Link>
                  </div>
                </div>
              )}
              {orders.length ? (
                <table className="min-w-max w-full table-auto rounded-lg ">
                  <thead>
                    <tr className="bg-gray-100 text-left dark:bg-[#232338] text-gray-500 dark:text-gray-200 text-xs font-light rounded-t-lg uppercase">
                      <th className="py-2 text-center">
                        <Checkbox
                          checked={selectedOrderIds.length === orders.length}
                          color="primary"
                          indeterminate={
                            selectedOrderIds.length > 0 &&
                            selectedOrderIds.length < orders.length
                          }
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th className="px-2">Order ID</th>
                      <th className="px-2">Products</th>
                      <th className="px-2">Payment Status</th>
                      <th className="px-2">Date</th>
                      <th className="px-2">Total</th>
                      <th className="px-2">Payment Status</th>
                      <th className="px-2">Order Status</th>
                      <th className="px-2">Customer</th>
                      <th className="px-2">Actions</th>
                    </tr>
                  </thead>
                  <TableBody
                    selectedOrderIds={selectedOrderIds}
                    filteredOrders={filteredOrders}
                    handleSelectOne={handleSelectOne}
                    deleteOrder={deleteOrder}
                  />
                </table>
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

export default OrdersList;
