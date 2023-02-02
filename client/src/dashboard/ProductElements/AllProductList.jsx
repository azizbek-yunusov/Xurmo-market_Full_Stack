import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
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
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { BiExport, BiSearch } from "react-icons/bi";
import TableBody from "./TableBody";
import HelmetTitle from "../../utils/HelmetTitle";
import Layout from "../Layout";

const AllProductList = () => {
  const { access_token } = useSelector((state) => state.auth);
  const [term, setTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const filteredProducts = products.filter((value) => {
    const searchName = value.name;
    return (
      searchName.toLowerCase().includes(term.toLowerCase())
    );
  });

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = products.map((customer) => customer._id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedProductIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, _id) => {
    const selectedIndex = selectedProductIds.indexOf(_id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedProductIds,
        _id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedProductIds.slice(1)
      );
    } else if (selectedIndex === selectedProductIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedProductIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedProductIds.slice(0, selectedIndex),
        selectedProductIds.slice(selectedIndex + 1)
      );
    }

    setSelectedProductIds(newSelectedCustomerIds);
  };
  const fetchData = async () => {
    const { data } = await axios.get("/products", {
      headers: { Authorization: access_token },
    });
    setProducts(data.products);
    setLoading(false);
  };
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/product/${id}`, {
        headers: {
          Authorization: access_token,
        },
      });
      fetchData();
      toast.success("Deleted product");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(products);
  return (
    <>
      <HelmetTitle title="All products" />
      <Layout>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <div className="bg-white dark:bg-[#2e2d4a] rounded-lg overflow-hidden my-6 border border-gray-200 dark:border-gray-600">
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
                    <MenuItem value={"user"}>products</MenuItem>
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
                    <MenuItem value={"user"}>products</MenuItem>
                    <MenuItem value={"admin"}>Admins</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {selectedProductIds.length ? (
                <div className="flex w-ful items-center justify-between py-[12.5px] px-4">
                  <h1 className="font-semibold text-gray-700">{`${selectedProductIds.length} Selected`}</h1>
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

              <table className="min-w-max w-full table-auto rounded-lg ">
                <thead>
                  <tr className="bg-gray-100 text-left dark:bg-[#232338] text-gray-500 dark:text-gray-200 text-sm font-light rounded-t-lg uppercase">
                    <th className="py-2 text-center">
                      <Checkbox
                        checked={selectedProductIds.length === products.length}
                        color="primary"
                        indeterminate={
                          selectedProductIds.length > 0 &&
                          selectedProductIds.length < products.length
                        }
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="px-3">Product</th>
                    <th className="px-3">Price</th>
                    <th className="px-3">Category</th>
                    <th className="px-3">Rating</th>
                    <th className="px-3">CreatedBy</th>
                    <th className="px-3">CreatedAt</th>
                    <th className="px-3">Actions</th>
                  </tr>
                </thead>
                <TableBody
                  selectedProductIds={selectedProductIds}
                  filteredProducts={filteredProducts}
                  handleSelectOne={handleSelectOne}
                  deleteProduct={deleteProduct}
                />
              </table>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default AllProductList;
