import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
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
import { BiExport, BiSearch, BiTable } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HelmetTitle from "../../../utils/HelmetTitle";
import { NotData } from "../Helpers";
import { Layout } from "../Layouts";
import GridList from "./GridList";
import TableBody from "./TableBody";

const BrandsList = () => {
  const { access_token } = useSelector((state) => state.auth);
  const [brands, setBrands] = useState([]);
  const [term, setTerm] = useState("");
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTable, setIsTable] = useState(false);
  const fetchData = async () => {
    const { data } = await axios.get("/brands");
    setBrands(data.brands);
    setLoading(false);
  };

  const filteredBrands = brands.filter((frontMatter) => {
    const searchContent = frontMatter.name;
    return searchContent.toLowerCase().includes(term.toLowerCase());
  });

  const handleSelectAll = (e) => {
    let newSelectedBrandIds;

    if (e.target.checked) {
      newSelectedBrandIds = brands.map((brand) => brand._id);
    } else {
      newSelectedBrandIds = [];
    }

    setSelectedBrandIds(newSelectedBrandIds);
  };

  const handleSelectOne = (e, _id) => {
    const selectedIndex = selectedBrandIds.indexOf(_id);
    let newSelectedBrandIds = [];

    if (selectedIndex === -1) {
      newSelectedBrandIds = newSelectedBrandIds.concat(selectedBrandIds, _id);
    } else if (selectedIndex === 0) {
      newSelectedBrandIds = newSelectedBrandIds.concat(
        selectedBrandIds.slice(1)
      );
    } else if (selectedIndex === selectedBrandIds.length - 1) {
      newSelectedBrandIds = newSelectedBrandIds.concat(
        selectedBrandIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedBrandIds = newSelectedBrandIds.concat(
        selectedBrandIds.slice(0, selectedIndex),
        selectedBrandIds.slice(selectedIndex + 1)
      );
    }

    setSelectedBrandIds(newSelectedBrandIds);
  };

  const deleteBrand = async (id) => {
    try {
      await axios.delete(`/brand/${id}`, {
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
  }, []);
  return (
    <>
      <HelmetTitle title="All brands" />
      <Layout>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <div className="bg-white dark:bg-[#2e2d4a] rounded-lg overflow-hidden my-6 border border-gray-300 dark:border-gray-600">
              <h1 className="p-5 text-gray-600 dark:text-gray-200 text-xl font-semibold">
                Search Filter
              </h1>
              <div className="grid grid-cols-3 gap-x-5 pb-6 mb-3 px-5 border-b border-b-gray-200 dark:border-b-gray-600">
                <FormControl size="medium" sx={{}}>
                  <InputLabel _id="demo-simple-select-label">
                    Select brand
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    // value={"all"}
                    // onChange={(e) => setCategory(e.target.value)}
                    label="Select brand"
                  >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"user"}>brands</MenuItem>
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
                    <MenuItem value={"user"}>brands</MenuItem>
                    <MenuItem value={"admin"}>Admins</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {selectedBrandIds.length ? (
                <div className="flex w-ful items-center justify-between py-[12.5px] px-4">
                  <h1 className="font-semibold text-gray-700">{`${selectedBrandIds.length} Selected`}</h1>
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
                    <Link to={"/brand/add"}>
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
                          ADD NEW brand
                        </Button>
                      </Tooltip>
                    </Link>
                  </div>
                </div>
              )}
              {brands.length ? (
                <>
                  {!isTable ? (
                    <TableBody
                      brands={brands}
                      handleSelectAll={handleSelectAll}
                      selectedBrandIds={selectedBrandIds}
                      filteredBrands={filteredBrands}
                      handleSelectOne={handleSelectOne}
                      deleteBrand={deleteBrand}
                    />
                  ) : (
                    <GridList
                      brands={brands}
                      handleSelectAll={handleSelectAll}
                      selectedBrandIds={selectedBrandIds}
                      filteredBrands={filteredBrands}
                      handleSelectOne={handleSelectOne}
                      deleteBrand={deleteBrand}
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

export default BrandsList;
