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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BiExport } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, getPosts, selectedDeletePost } from "../../../redux/post";
import { HelmetTitle } from "../../../utils";
import { MoreMenu, NotData, SearchInput } from "../Helpers";
import { Layout } from "../Layouts";
import PostCard from "./PostCard";

const PostsList = () => {
  let { t } = useTranslation(["dashboard"]);
  const { isLoading, posts } = useSelector((state) => state.post);
  const isXl = useMediaQuery("(min-width: 1245px)");
  const [isFilter, setIsFilter] = useState(true);
  const { access_token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [selectedPostIds, setSelectedProductIds] = useState([]);

  const filteredPosts = posts.filter((value) => {
    const searchName = value.title;
    return searchName.toLowerCase().includes(term.toLowerCase());
  });
  const handleSelectAll = (event) => {
    let newSelectedPostIds;

    if (event.target.checked) {
      newSelectedPostIds = posts.map((post) => post._id);
    } else {
      newSelectedPostIds = [];
    }

    setSelectedProductIds(newSelectedPostIds);
  };

  const handleSelectOne = (event, _id) => {
    const selectedIndex = selectedPostIds.indexOf(_id);
    let newSelectedPostIds = [];

    if (selectedIndex === -1) {
      newSelectedPostIds = newSelectedPostIds.concat(selectedPostIds, _id);
    } else if (selectedIndex === 0) {
      newSelectedPostIds = newSelectedPostIds.concat(selectedPostIds.slice(1));
    } else if (selectedIndex === selectedPostIds.length - 1) {
      newSelectedPostIds = newSelectedPostIds.concat(
        selectedPostIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedPostIds = newSelectedPostIds.concat(
        selectedPostIds.slice(0, selectedIndex),
        selectedPostIds.slice(selectedIndex + 1)
      );
    }

    setSelectedProductIds(newSelectedPostIds);
  };
  const handleSelectedDelete = async () => {
    try {
      const selectedIds = {
        selected: selectedPostIds,
      };
      await dispatch(selectedDeletePost({ access_token, selectedIds }));
      dispatch(getPosts());
      setSelectedProductIds([]);
      toast.success(t("product-selected-deleted"));
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeletePost = async (id) => {
    try {
      await dispatch(deletePost({ access_token, id }));
      toast.success(t("delete-post"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <>
      <HelmetTitle title={t("all-posts")} />
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
                    {/* {categories.map((item) => (
                      <MenuItem key={item._id} value={item.slug}>
                        {i18n.language === "uz"
                          ? item.nameUz
                          : i18n.language === "en"
                          ? item.nameEn
                          : i18n.language === "ru"
                          ? item.nameRu
                          : null}
                      </MenuItem>
                    ))} */}
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
                    {/* {brands.map((item) => (
                      <MenuItem key={item._id} value={item.slug}>
                        {item.name}
                      </MenuItem>
                    ))} */}
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
                    <MenuItem value={"user"}>posts</MenuItem>
                    <MenuItem value={"admin"}>Admins</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}

            {selectedPostIds.length ? (
              <div className="flex w-ful items-center justify-between py-[12.5px] px-4">
                <h1 className="font-semibold text_color">{`${
                  selectedPostIds.length
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
                  <Link to={"/post/create"}>
                    <Tooltip title="Add new user">
                      <Button
                        variant="contained"
                        size="medium"
                        sx={{
                          marginLeft: "25px",
                        }}
                        startIcon={<FiPlus />}
                      >
                        {t("add-post")}
                      </Button>
                    </Tooltip>
                  </Link>
                </div>
              </div>
            )}
            {posts.length ? (
              <div className="grid grid-cols-3 gap-4 mx-4">
                {posts.map((item) => (
                  <PostCard
                    key={item._id}
                    {...item}
                    handleDeletePost={handleDeletePost}
                  />
                ))}
              </div>
            ) : (
              <NotData />
            )}
          </div>
        )}
      </Layout>
    </>
  );
};

export default PostsList;
