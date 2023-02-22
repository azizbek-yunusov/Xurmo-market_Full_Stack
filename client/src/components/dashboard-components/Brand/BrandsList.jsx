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
  deleteBrand,
  getBrands,
  selectedDeleteBrand,
} from "../../../redux/brand/brandSlice";
import HelmetTitle from "../../../utils/HelmetTitle";
import { NotData } from "../Helpers";
import { Layout } from "../Layouts";
import GridList from "./GridList";
import TableBody from "./TableBody";

const BrandsList = () => {
  let { t } = useTranslation(["brand-d"]);
  const isXl = useMediaQuery("(min-width: 1250px)");
  const { brand, auth } = useSelector((state) => state);
  let { isLoading, brands } = brand;
  let { access_token } = auth;
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);
  const [isTable, setIsTable] = useState(false);

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

  const handleSelectOne = (ed, _id) => {
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

  const handleDeleteBrand = async (id) => {
    try {
      await dispatch(deleteBrand({ access_token, id }));
      toast.success(t("brand-delete"));
    } catch (err) {
      console.log();
    }
  };
  const handleSelectedDelete = async () => {
    try {
      const selectedIds = {
        selected: selectedBrandIds,
      };
      await dispatch(selectedDeleteBrand({ access_token, selectedIds }));
      dispatch(getBrands());
      setSelectedBrandIds([]);
      toast.success(t("brand-selected-deleted"));
    } catch (err) {
      console.log();
    }
  };
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);
  return (
    <>
      <HelmetTitle title="All brands" />
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
                    {t("select-brand")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    // value={"all"}
                    // onChange={(e) => setCategory(e.target.value)}
                    label={t("select-brand")}
                  >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"user"}>brands</MenuItem>
                    <MenuItem value={"admin"}>Admins</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="medium" sx={{}}>
                  <InputLabel _id="demo-simple-select-label">
                    {t("select-brand")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    // value={"all"}
                    // onChange={(e) => setCategory(e.target.value)}
                    label={t("select-brand")}
                  >
                    <MenuItem value={"all"}>Date</MenuItem>
                    <MenuItem value={"user"}>Name</MenuItem>
                    <MenuItem value={"admin"}>Status</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="medium" sx={{}}>
                  <InputLabel _id="demo-simple-select-label">
                    {t("select-brand")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    // value={"all"}
                    // onChange={(e) => setCategory(e.target.value)}
                    label={t("select-brand")}
                  >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"user"}>brands</MenuItem>
                    <MenuItem value={"admin"}>Admins</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {selectedBrandIds.length ? (
                <div className="flex w-ful items-center justify-between py-[12.5px] px-4">
                  <h1 className="font-semibold text-gray-700">{`${
                    selectedBrandIds.length
                  } ${t("selected")}`}</h1>
                  <Button
                    variant="contained"
                    color="error"
                    size="medium"
                    onClick={() => handleSelectedDelete(selectedBrandIds)}
                    sx={{
                      marginLeft: "15px",
                      borderRadius: "6px",
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
                    <IconButton
                      onClick={() => setIsTable(false)}
                      aria-label="Table"
                      color={!isTable ? "primary" : "default"}
                    >
                      <BiTable />
                    </IconButton>
                    <IconButton
                      onClick={() => setIsTable(true)}
                      aria-label="Table"
                      color={isTable ? "primary" : "default"}
                    >
                      <BsGrid />
                    </IconButton>
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
                    <Link to={"/brand/create"}>
                      <Tooltip title={t("add-brand-title")}>
                        <Button
                          variant="contained"
                          size="medium"
                          sx={{
                            marginLeft: isXl ? "25px" : "10px",
                          }}
                          startIcon={<FiPlus />}
                        >
                          {t("add-brand")}
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
                      handleDeleteBrand={handleDeleteBrand}
                    />
                  ) : (
                    <GridList
                      brands={brands}
                      handleSelectAll={handleSelectAll}
                      selectedBrandIds={selectedBrandIds}
                      filteredBrands={filteredBrands}
                      handleSelectOne={handleSelectOne}
                      handleDeleteBrand={handleDeleteBrand}
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
