import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { BiExport } from "react-icons/bi";
import TableBody from "./TableBody";
import { HelmetTitle } from "../../../utils";
import { MoreMenu, NotData, SearchInput, TableButton } from "../Helpers";
import { useTranslation } from "react-i18next";
import { Layout } from "../Layouts";
import {
  deleteProduct,
  getProducts,
  selectedDeleteProduct,
} from "../../../redux/product";
import GridList from "./GridList";
import { getCategories } from "../../../redux/category";
import { getBrands } from "../../../redux/brand/brandSlice";

const AllProductList = () => {
  const { i18n } = useTranslation();
  let { t } = useTranslation(["product"]);
  const { isLoading, products } = useSelector((state) => state.product);
  const { brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);
  const { access_token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const isXl = useMediaQuery("(min-width: 1245px)");
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [isTable, setIsTable] = useState(false);
  const [isFilter, setIsFilter] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredProducts = products.filter((value) => {
    const searchName = value.name;
    return searchName.toLowerCase().includes(term.toLowerCase());
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

  const handleSelectedDelete = async () => {
    try {
      const selectedIds = {
        selected: selectedProductIds,
      };
      await dispatch(selectedDeleteProduct({ access_token, selectedIds }));
      dispatch(getProducts());
      setSelectedProductIds([]);
      toast.success(t("product-selected-deleted"));
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteProduct = async (id) => {
    try {
      await dispatch(deleteProduct({ access_token, id }));
      toast.success(t("delete-product"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);
  return (
    <>
      <HelmetTitle title={t("all-products")} />
      <Layout>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <div className="bg-white relative dark:bg-[#2e2d4a] rounded-lg overflow-hidden my-6 border border-gray-200 dark:border-gray-600">
            <h1 className="p-5 text-gray-600 dark:text-gray-200 text-xl font-semibold">
              {t("search-filter")}
            </h1>
            <MoreMenu isFilter={isFilter} setIsFilter={setIsFilter} />
            {isFilter && (
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
                    <MenuItem value={"all"}>{t("all")}</MenuItem>
                    {categories.map((item) => (
                      <MenuItem key={item._id} value={item.slug}>
                        {i18n.language === "oz"
                          ? item.nameOz
                          : i18n.language === "en"
                          ? item.nameUz
                          : i18n.language === "ru"
                          ? item.nameRu
                          : null}
                      </MenuItem>
                    ))}
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
                    <MenuItem value={"all"}>{t("all")}</MenuItem>
                    {brands.map((item) => (
                      <MenuItem key={item._id} value={item.slug}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="medium" sx={{}}>
                  <InputLabel _id="demo-simple-select-label">
                    {t("sorting")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    // value={"all"}
                    // onChange={(e) => setCategory(e.target.value)}
                    label={t("sorting")}
                  >
                    <MenuItem value={"all"}>{t("all")}</MenuItem>
                    <MenuItem value={"user"}>products</MenuItem>
                    <MenuItem value={"admin"}>Admins</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}

            {selectedProductIds.length ? (
              <div className="flex w-ful items-center justify-between py-[12.5px] px-4">
                <h1 className="font-semibold text_color">{`${
                  selectedProductIds.length
                } ${t("selected")}`}</h1>
                <Button
                  variant="contained"
                  color="error"
                  size="medium"
                  onClick={() => handleSelectedDelete()}
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
                <FormControl size="small" sx={{ minWidth: "80px" }}>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    value={"10"}
                    sx={{ maxWidth: isXl ? "70px" : "80px" }}
                    // onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value={"10"}>10</MenuItem>
                    <MenuItem value={"20"}>20</MenuItem>
                    <MenuItem value={"30"}>30</MenuItem>
                    <MenuItem value={"50"}>50</MenuItem>
                  </Select>
                </FormControl>
                <SearchInput term={term} setTerm={setTerm} pl={t("search")} />
                <div className="flex items-center">
                  <TableButton isTable={isTable} setIsTable={setIsTable} />
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
                        }}
                        startIcon={<FiPlus />}
                      >
                        {t("add-product")}
                      </Button>
                    </Tooltip>
                  </Link>
                </div>
              </div>
            )}
            {products.length ? (
              <>
                {!isTable ? (
                  <TableBody
                    products={products}
                    handleSelectAll={handleSelectAll}
                    selectedProductIds={selectedProductIds}
                    filteredProducts={filteredProducts}
                    handleSelectOne={handleSelectOne}
                    handleDeleteProduct={handleDeleteProduct}
                  />
                ) : (
                  <GridList
                    products={products}
                    handleSelectAll={handleSelectAll}
                    selectedProductIds={selectedProductIds}
                    filteredProducts={filteredProducts}
                    handleSelectOne={handleSelectOne}
                    handleDeleteProduct={handleDeleteProduct}
                  />
                )}{" "}
              </>
            ) : (
              <NotData />
            )}
          </div>
        )}
      </Layout>
    </>
  );
};

export default AllProductList;
