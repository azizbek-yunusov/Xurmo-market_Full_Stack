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
  deleteCategory,
  getCategories,
  selectedDeleteCategory,
} from "../../../redux/category";
import { HelmetTitle } from "../../../utils";
import { NotData } from "../Helpers";
import { Layout } from "../Layouts";
import GridList from "./GridList";
import TableBody from "./TableBody";

const CategoriesTable = () => {
  const { isLoading, categories } = useSelector((state) => state.category);
  const { access_token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isXl = useMediaQuery("(min-width: 1245px)");
  let { t } = useTranslation(["category-d"]);
  const [term, setTerm] = useState("");
  const [isTable, setIsTable] = useState(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const filteredCategories = categories?.filter(
    (value) =>
      value.nameUz.toLowerCase().includes(term.toLowerCase()) ||
      value.nameRu.toLowerCase().includes(term.toLowerCase()) ||
      value.nameEn.toLowerCase().includes(term.toLowerCase())
  );
  const handleSelectAll = (e) => {
    let newSelectedCategoryIds;

    if (e.target.checked) {
      newSelectedCategoryIds = categories.map((category) => category._id);
    } else {
      newSelectedCategoryIds = [];
    }

    setSelectedCategoryIds(newSelectedCategoryIds);
  };

  const handleSelectOne = (e, _id) => {
    const selectedIndex = selectedCategoryIds.indexOf(_id);
    let newSelectedCategoryIds = [];

    if (selectedIndex === -1) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(
        selectedCategoryIds,
        _id
      );
    } else if (selectedIndex === 0) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(
        selectedCategoryIds.slice(1)
      );
    } else if (selectedIndex === selectedCategoryIds.length - 1) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(
        selectedCategoryIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(
        selectedCategoryIds.slice(0, selectedIndex),
        selectedCategoryIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCategoryIds(newSelectedCategoryIds);
  };
  const handleSelectedDelete = async () => {
    try {
      const selectedIds = {
        selected: selectedCategoryIds,
      };
      await dispatch(selectedDeleteCategory({ access_token, selectedIds }));
      dispatch(getCategories());
      setSelectedCategoryIds([]);
      toast.success(t("brand-selected-deleted"));
    } catch (err) {
      console.log();
    }
  };
  const handleDeleteCategory = async (id) => {
    try {
      await dispatch(deleteCategory({ access_token, id }));
      toast.success(t("category-delete"));
    } catch (err) {
      console.log();
    }
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <>
      <HelmetTitle title={t("all-categories")} />
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
                    {t("select-category")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    // value={"all"}
                    // onChange={(e) => setCategory(e.target.value)}
                    label={t("select-category")}
                  >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"user"}>categories</MenuItem>
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
                    <MenuItem value={"user"}>categories</MenuItem>
                    <MenuItem value={"admin"}>Admins</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {selectedCategoryIds.length ? (
                <div className="flex w-ful items-center justify-between py-[12.5px] px-4">
                  <h1 className="font-semibold text-gray-700">{`${
                    selectedCategoryIds.length
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
                    <Link to={"/category/add"}>
                      <Tooltip title={t("add-category-title")}>
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
                          {t("add-category")}
                        </Button>
                      </Tooltip>
                    </Link>
                  </div>
                </div>
              )}
              {categories.length ? (
                <>
                  {!isTable ? (
                    <TableBody
                      categories={categories}
                      handleSelectAll={handleSelectAll}
                      selectedCategoryIds={selectedCategoryIds}
                      filteredCategories={filteredCategories}
                      handleSelectOne={handleSelectOne}
                      handleDeleteCategory={handleDeleteCategory}
                    />
                  ) : (
                    <GridList
                      categories={categories}
                      handleSelectAll={handleSelectAll}
                      selectedCategoryIds={selectedCategoryIds}
                      filteredCategories={filteredCategories}
                      handleSelectOne={handleSelectOne}
                      handleDeleteCategory={handleDeleteCategory}
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

export default CategoriesTable;
