import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { HelmetTitle } from "../../../utils";
import { useTranslation } from "react-i18next";
import { Layout } from "../Layouts";
import { toast } from "react-hot-toast";
import { createProduct } from "../../../redux/product";
import { getCategories, getCategory } from "../../../redux/category";
import { getBrands } from "../../../redux/brand/brandSlice";
import { features } from "../../../data/features";

const CreateProduct = () => {
  let { t } = useTranslation(["product"]);
  const { i18n } = useTranslation();
  const { isLoading, isError } = useSelector((state) => state.product);
  const { access_token } = useSelector((state) => state.auth);
  const { brands } = useSelector((state) => state.brand);
  const { categories, items } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [descr, setDescr] = useState("");
  const [inStock, setInStock] = useState(1);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryChild, setCategoryChild] = useState("");
  const [brand, setBrand] = useState("");
  const [discount, setDiscount] = useState("");
  const [feature, setFeature] = useState("");
  const [fvalue, setFvalue] = useState("");

  const navigate = useNavigate();

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImages((oldArray) => [...oldArray, reader.result]);
      };
    });
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };
  const createCategoryHandle = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      price,
      descr,
      images,
      category,
      categoryChild,
      brand,
      discount,
      inStock,
    };
    await dispatch(createProduct({ access_token, productData }));
    if (!isLoading) {
      toast.success(t("new-category-added"));
      navigate("/dashboard/products");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  };

  const featuresData = features.filter((item) => {
    return item.type === category;
  });
  const featureChange = (e) => {
    let value = e.target.value;
    const featuresData = features.find((item) => {
      return item.type === category;
    });
  };
  const featuresHandle = (e) => {
    e.preventDefault();
    try {
      let features = {
        feature,
        fvalue,
      };
      console.log(features);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFeature = (e) => {
    const value = e.target.value;
    setFeature(value);
    // const getDistrictsdata = features.filter(
    //   (item) => item.region_id ===
    // );
  };
  const handleFeatureValue = (e) => {
    const value = e.target.value;
    const findFeature = features.filter((item) => item.type === feature);

    // const getDistrictsdata = features.filter(
    //   (item) => item.region_id ===
    // );
  };

  const findCategory = categories.find((item) => {
    return item.slug === category;
  });

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  let id = findCategory?._id;
  useEffect(() => {
    if (id) {
      dispatch(getCategory({ id }));
    }
  }, [dispatch, id]);
  return (
    <>
      <HelmetTitle title={t("add-product-title")} />
      <Layout>
        <section className="relative">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-40 px-5 pt-4 text-gray-50 rounded-xl">
            <div className="flex_betwen">
              <h1 className="text-white text-2xl">{t("add-product-title")}</h1>
              <ol className="list-reset mt-1 flex text-grey-dark text-sm text-gray-100">
                <li>
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  <span>{t("add-product-title")}</span>
                </li>
              </ol>
            </div>
          </div>
          <div className="-mt-24 rounded-2xl p-6 px-10 xl:px-16 mx-4 bg-white dark:bg-[#312d4b] border_l">
            <h1 className="text-2xl mb-3">Asosiy ma'lumotlar</h1>
            <div className="flex w-full">
              <div className="w-full">
                <form onSubmit={createCategoryHandle}>
                  <div className="grid grid-cols-1 gap-6 gap-x-14 md:grid-cols-2">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      label={t("name")}
                      placeholder={t("name-pl")}
                      type="text"
                      className="rounded-xl"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {t("select-category")}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label={t("select-category")}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        {categories?.map((item, index) => (
                          <MenuItem key={index} value={item.slug}>
                            {i18n.language === "uz"
                              ? item.nameUz
                              : i18n.language === "en"
                              ? item.nameEn
                              : i18n.language === "ru"
                              ? item.nameRu
                              : null}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div className="grid grid-cols-1 gap-0">
                      <TextField
                        id="outlined-basic"
                        fullWidth
                        variant="outlined"
                        label={t("price")}
                        placeholder={t("price-pl")}
                        type="number"
                        className="rounded-xl"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {t("select-category-item")}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={categoryChild}
                        label={t("select-category-item")}
                        onChange={(e) => setCategoryChild(e.target.value)}
                      >
                        {items?.map((item, index) => (
                          <MenuItem key={index} value={item.slug}>
                            {i18n.language === "uz"
                              ? item.titleUz
                              : i18n.language === "en"
                              ? item.titleEn
                              : i18n.language === "ru"
                              ? item.titleRu
                              : null}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div className="flex">
                      <TextField
                        id="outlined-basic"
                        fullWidth
                        variant="outlined"
                        label={t("in-stock")}
                        placeholder={t("in-stock-pl")}
                        type="number"
                        className="rounded-xl"
                        value={inStock}
                        onChange={(e) => setInStock(e.target.value)}
                      />
                      <TextField
                        id="outlined-basic"
                        fullWidth
                        variant="outlined"
                        label={t("discount")}
                        placeholder={t("discount-pl")}
                        type="number"
                        sx={{ marginLeft: 3 }}
                        className="rounded-xl"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                      />
                    </div>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {t("select-brand")}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={brand}
                        label={t("select-brand")}
                        onChange={(e) => setBrand(e.target.value)}
                      >
                        {brands?.map((item, index) => (
                          <MenuItem key={index} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div className="mt-4">
                      <TextField
                        fullWidth
                        multiline
                        minRows={5}
                        label={t("descr")}
                        placeholder={t("descr-pl")}
                        value={descr}
                        onChange={(e) => setDescr(e.target.value)}
                      />
                    </div>
                    <div className="w-full">
                      <div className="grid grid-cols-6">
                        <div className="col-span-2">
                          <label htmlFor="file-upload">
                            <label
                              htmlFor="file-upload"
                              className="block text-base mb-1 text_color"
                            >
                              {t("upload-images")}
                            </label>
                            <div className="mr-2 flex bg-white dark:bg-gray-700 justify-center items-center rounded-md border-2 border-dashed border-gray-300 dark:border-gray-500 p-3 py-6 cursor-pointer h-36">
                              <div className="flex justify-center flex-col items-center">
                                <AiOutlineCloudUpload className="text-3xl text-gray-600" />
                                <div className="flex text-sm text-gray-600">
                                  <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white dark:bg-transparent text_color font-medium"
                                  >
                                    <span>{t("upload-images")}</span>
                                    <input
                                      id="file-upload"
                                      name="file"
                                      type="file"
                                      className="sr-only"
                                      onChange={handleImage}
                                    />
                                  </label>
                                </div>
                                <p className="text-xs text-gray-500">
                                  PNG, JPG up to 10MB
                                </p>
                              </div>
                            </div>
                          </label>
                        </div>

                        <div className="col-span-4 grid grid-cols-3 items-center">
                          {images.map((img, index) => (
                            <div
                              key={index}
                              className="p-[6px] flex_center relative"
                            >
                              <div
                                className="border border-gray-300 overflow-hidden rounded"
                                id="file_img"
                              >
                                <img
                                  src={img}
                                  alt="images"
                                  className="img-thumbnail max-w-[80px] w-full"
                                />
                              </div>
                              <IoMdClose
                                onClick={() => deleteImages(index)}
                                className="absolute text-gray-600 top-0 p-1 border text-2xl border-gray-300 right-0 cursor-pointer rounded-full bg-white"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-10 flex justify-end">
                    <Button
                      onClick={() => navigate(-1)}
                      variant="contained"
                      size="large"
                      color="info"
                      sx={{
                        width: "150px",
                        borderRadius: "6px",
                        marginRight: "15px",
                      }}
                    >
                      {t("cancel")}
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      color="primary"
                      sx={{
                        width: "150px",
                      }}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          {t("loading")}
                        </div>
                      ) : (
                        t("save")
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-5 rounded-2xl p-6 px-10 xl:px-16 mx-4 bg-white dark:bg-[#312d4b] border_l">
            <h1 className="text-2xl mb-3">Xususiyatlari</h1>
            <div className="flex w-full">
              <div className="w-full">
                <form onSubmit={featuresHandle}>
                  <div className="grid grid-cols-3 gap-6 gap-x-14 md:grid-cols-3">
                    {featuresData.map((item, index) => (
                      <div key={index} className="">
                        <input
                          id="outlined-basic"
                          hidden
                          className="rounded-xl"
                          value={item.feature}
                          onChange={handleFeature}
                        />
                        <TextField
                          id="outlined-basic"
                          fullWidth
                          variant="outlined"
                          label={t(`${item.feature}`)}
                          placeholder={t(`${item.feature}`)}
                          type="text"
                          name={`${item.feature}`}
                          className="rounded-xl"
                          onChange={handleFeatureValue}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="w-full mt-10 flex justify-end">
                    <Button
                      onClick={() => navigate(-1)}
                      variant="contained"
                      size="large"
                      color="info"
                      sx={{
                        width: "150px",
                        borderRadius: "6px",
                        marginRight: "15px",
                      }}
                    >
                      {t("cancel")}
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      color="primary"
                      sx={{
                        width: "150px",
                      }}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          {t("loading")}
                        </div>
                      ) : (
                        t("save")
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default CreateProduct;
