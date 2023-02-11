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
import { useTranslation } from "react-i18next";
import { BiExport, BiSearch, BiTable } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HelmetTitle from "../../../utils/HelmetTitle";
import { NotData } from "../Helpers";
import Layout from "../Layout";
import GridList from "./GridList";
import TableBody from "./TableBody";

const BannersList = () => {
  let { t } = useTranslation(["banner-d"]);
  const { access_token } = useSelector((state) => state.auth);
  const [banners, setBanners] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isTable, setIsTable] = useState(false);
  const [id, setId] = useState("");

  const [selectedBannerIds, setSelectedBannerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const filteredBanners = banners.filter((frontMatter) => {
    const searchContent = frontMatter.name;
    return searchContent.toLowerCase().includes(term.toLowerCase());
  });

  const handleSelectAll = (event) => {
    let newSelectedBannersIds;

    if (event.target.checked) {
      newSelectedBannersIds = banners.map((banner) => banner._id);
    } else {
      newSelectedBannersIds = [];
    }

    setSelectedBannerIds(newSelectedBannersIds);
  };

  const handleSelectOne = (event, _id) => {
    const selectedIndex = selectedBannerIds.indexOf(_id);
    let newSelectedBannersIds = [];

    if (selectedIndex === -1) {
      newSelectedBannersIds = newSelectedBannersIds.concat(
        selectedBannerIds,
        _id
      );
    } else if (selectedIndex === 0) {
      newSelectedBannersIds = newSelectedBannersIds.concat(
        selectedBannerIds.slice(1)
      );
    } else if (selectedIndex === selectedBannerIds.length - 1) {
      newSelectedBannersIds = newSelectedBannersIds.concat(
        selectedBannerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedBannersIds = newSelectedBannersIds.concat(
        selectedBannerIds.slice(0, selectedIndex),
        selectedBannerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedBannerIds(newSelectedBannersIds);
  };

  const fetchData = async () => {
    const { data } = await axios.get("/banners", {
      headers: { Authorization: access_token },
    });
    setBanners(data.banners);
    setLoading(false);
  };
  const deleteBanner = async (id) => {
    try {
      await axios.delete(`/banner/${id}`, {
        headers: {
          Authorization: access_token,
        },
      });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <HelmetTitle title={t("all-banner")} />
      <Layout>
        {loading ? (
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
                    <MenuItem value={"user"}>banners</MenuItem>
                    <MenuItem value={"admin"}>Admins</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="medium" sx={{}}>
                  <InputLabel _id="demo-simple-select-label">
                    {t("select-banner")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    _id="demo-simple-select"
                    // value={"all"}
                    // onChange={(e) => setCategory(e.target.value)}
                    label={t("select-banner")}
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
                    <MenuItem value={"user"}>banners</MenuItem>
                    <MenuItem value={"admin"}>Admins</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {selectedBannerIds.length ? (
                <div className="flex w-ful items-center justify-between py-[12.5px] px-4">
                  <h1 className="font-semibold text_color">{`(${
                    selectedBannerIds.length
                  }) ${t("selected")}`}</h1>
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
                      placeholder={t("search")}
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
                    <Link to={"/banner/add"}>
                      <Tooltip title={t("add-banner-title")}>
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
                          {t("add-banner")}
                        </Button>
                      </Tooltip>
                    </Link>
                  </div>
                </div>
              )}
              {banners.length ? (
                <>
                  {isTable ? (
                    <TableBody
                      banners={banners}
                      handleSelectAll={handleSelectAll}
                      selectedBannerIds={selectedBannerIds}
                      filteredBanners={filteredBanners}
                      handleSelectOne={handleSelectOne}
                      deleteBanner={deleteBanner}
                    />
                  ) : (
                    <GridList
                      banners={banners}
                      handleSelectAll={handleSelectAll}
                      selectedBannerIds={selectedBannerIds}
                      filteredBanners={filteredBanners}
                      handleSelectOne={handleSelectOne}
                      deleteBanner={deleteBanner}
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

export default BannersList;
