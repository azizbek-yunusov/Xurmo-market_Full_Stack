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
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BiExport } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { paymentMethodData } from "../../../data/OrderTypeData";
import {
  deleteOrder,
  getOrders,
  selectedDeleteOrder,
} from "../../../redux/order";
import { HelmetTitle } from "../../../utils";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MoreMenu, NotData, SearchInput, TableButton } from "../Helpers";
import { Layout } from "../Layouts";
import GridList from "./GridList";
import TableBody from "./TableBody";

const OrdersList = () => {
  let { t } = useTranslation(["order"]);
  const { access_token } = useSelector((state) => state.auth);
  const { isLoading, orders } = useSelector((state) => state.order);
  const isXl = useMediaQuery("(min-width: 1245px)");
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const [term, setTerm] = useState("");
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const [isTable, setIsTable] = useState(false);
  const [isFilter, setIsFilter] = useState(true);
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
  const handleSelectedDelete = async () => {
    try {
      const selectedIds = {
        selected: selectedOrderIds,
      };
      await dispatch(selectedDeleteOrder({ access_token, selectedIds }));
      dispatch(getOrders(access_token));
      setSelectedOrderIds([]);
      toast.success(t("order-selected-deleted"));
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteOrder = async (id) => {
    try {
      await dispatch(deleteOrder({ access_token, id }));
      toast.success(t("order-order"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(getOrders(access_token));
  }, [access_token, dispatch]);
  return (
    <>
      <HelmetTitle title={t("all-orders")} />
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
                    {t("select-sort")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    // value={"all"}
                    // onChange={(e) => setCategory(e.target.value)}
                    label={t("select-sort")}
                  >
                    <MenuItem value={"all"}>All</MenuItem>
                    <MenuItem value={"user"}>orders</MenuItem>
                    <MenuItem value={"admin"}>Admins</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="medium" sx={{}}>
                  <InputLabel _id="demo-simple-select-label">
                    {t("select-order-status")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    // value={"all"}
                    // onChange={(e) => setCategory(e.target.value)}
                    label={t("select-order-status")}
                  >
                    <MenuItem value={"all"}>Date</MenuItem>
                    <MenuItem value={"user"}>Name</MenuItem>
                    <MenuItem value={"admin"}>Status</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="medium" sx={{}}>
                  <InputLabel _id="demo-simple-select-label">
                    {t("select-payment-type")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    // value={"all"}
                    // onChange={(e) => setCategory(e.target.value)}
                    label={t("select-payment-type")}
                  >
                    <MenuItem value={"all"}>{t("all")}</MenuItem>
                    {paymentMethodData.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {t(`${item.name}`)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}

            {selectedOrderIds.length ? (
              <div className="flex w-ful items-center justify-between py-[12.5px] px-4">
                <h1 className="font-semibold text_color">{`${
                  selectedOrderIds.length
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
                  <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                  >
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
                  </DownloadTableExcel>
                  <Tooltip title="Add new user">
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{
                        marginLeft: "25px",
                      }}
                      startIcon={<FiPlus />}
                    >
                      {t("add-order")}
                    </Button>
                  </Tooltip>
                </div>
              </div>
            )}
            {orders.length ? (
              <>
                {!isTable ? (
                  <TableBody
                    orders={orders}
                    handleSelectAll={handleSelectAll}
                    selectedOrderIds={selectedOrderIds}
                    filteredOrders={filteredOrders}
                    handleSelectOne={handleSelectOne}
                    handleDeleteOrder={handleDeleteOrder}
                    tableRef={tableRef}
                  />
                ) : (
                  <GridList
                    orders={orders}
                    handleSelectAll={handleSelectAll}
                    selectedOrderIds={selectedOrderIds}
                    filteredOrders={filteredOrders}
                    handleSelectOne={handleSelectOne}
                    handleDeleteOrder={handleDeleteOrder}
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

export default OrdersList;
