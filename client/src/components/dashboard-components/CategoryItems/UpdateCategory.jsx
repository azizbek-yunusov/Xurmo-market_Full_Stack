import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCategory, updateCategory } from "../../../redux/category";
import { HelmetTitle } from "../../../utils";
import { Layout } from "../Layouts";

const UpdateCategory = () => {
  const { isLoading, currentCategory, isError } = useSelector(
    (state) => state.category
  );
  const { access_token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  let { t } = useTranslation(["category"]);
  const [nameOz, setNameOz] = useState("");
  const [nameUz, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const goback = useNavigate();
  const navigate = useNavigate();
  const handleImage = (e) => {
    const setFileToBase = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    };
    const file = e.target.files[0];
    setFileToBase(file);
  };
  const updateCategoryHandle = async (e) => {
    e.preventDefault();
    const categoryData = {
      nameOz,
      nameRu,
      nameUz,
      slug,
    };
    await dispatch(updateCategory({ access_token, id, categoryData }));
    if (!isLoading) {
      toast.success(t("updated-category"));
      navigate("/dashboard/categories");
    }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  };
  useEffect(() => {
    dispatch(getCategory({ id }));
  }, [dispatch, id]);
  useEffect(() => {
    if (currentCategory) {
      setNameOz(currentCategory?.nameOz || "");
      setNameEn(currentCategory?.nameUz || "");
      setNameRu(currentCategory?.nameRu || "");
      setSlug(currentCategory?.slug || "");
      setImage(currentCategory?.image || "");
    }
  }, [currentCategory]);
  return (
    <>
      <HelmetTitle title={t("edit-category")} />
      <Layout>
        <section className="relative">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-40 px-5 pt-4 text-gray-50 rounded-xl">
            <div className="flex_betwen">
              <h1 className="text-white text-2xl">{t("edit-category")}</h1>
              <ol className="list-reset mt-1 flex text-grey-dark text-sm text-gray-100">
                <li>
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  <span>{t("edit-category")}</span>
                </li>
              </ol>
            </div>
          </div>
          <div className="-mt-24 rounded-2xl flex mx-4 bg_color border_primary">
            <div className="flex w-full p-8 px-10 xl:px-16">
              <div className="w-full">
                <form onSubmit={updateCategoryHandle}>
                  <div className="grid grid-cols-1 gap-6  gap-x-8 xl:gap-x-14 md:grid-cols-2">
                    <div className="col-span-1">
                      <TextField
                        id="outlined-basic"
                        fullWidth
                        variant="outlined"
                        label={t("name-uz")}
                        placeholder={t("name-uz-pl")}
                        type="text"
                        className="rounded-xl"
                        value={nameOz}
                        onChange={(e) => setNameOz(e.target.value)}
                      />
                      <TextField
                        id="outlined-basic"
                        fullWidth
                        variant="outlined"
                        label={t("name-en")}
                        placeholder={t("name-en-pl")}
                        type="text"
                        className="rounded-xl"
                        value={nameUz}
                        sx={{ marginTop: "20px" }}
                        onChange={(e) => setNameEn(e.target.value)}
                      />
                      <TextField
                        id="outlined-basic"
                        fullWidth
                        variant="outlined"
                        label={t("name-ru")}
                        placeholder={t("name-ru-pl")}
                        type="text"
                        className="rounded-xl"
                        value={nameRu}
                        sx={{ marginTop: "20px" }}
                        onChange={(e) => setNameRu(e.target.value)}
                      />
                    </div>
                    <div className="col-span-1">
                      <TextField
                        id="outlined-basic"
                        fullWidth
                        variant="outlined"
                        label={t("href")}
                        placeholder={t("href-pl")}
                        type="text"
                        className="rounded-xl"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                      />
                      <div className="flex mt-2">
                        <label htmlFor="file-upload">
                          <p className="block text-base mb-1 text_color">
                            {t("upload-image")}
                          </p>
                          <div className="mr-2 flex bg-gray-100 dark:bg-gray-700/50 justify-center items-center rounded-md border-2 border-dashed border-gray-300 p-3 py-6 cursor-pointer">
                            <div className="flex justify-center flex-col items-center">
                              <AiOutlineCloudUpload className="text-3xl text_color" />
                              <div className="flex text-sm text_color">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-gray-100 dark:bg-gray-700/50 font-medium"
                                >
                                  <span>{t("upload-image")}</span>
                                  <input
                                    id="file-upload"
                                    name="file"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleImage}
                                  />
                                </label>
                              </div>
                              <p className="text-xs text_color">
                                PNG, JPG up to 10MB
                              </p>
                            </div>
                          </div>
                        </label>
                        {image && (
                          <div className="p-[6px] mx-[2px] relative  md:mt-3">
                            <div
                              className="border border-gray-300 overflow-hidden rounded"
                              id="file_img"
                            >
                              <img
                                src={image.url}
                                alt="images"
                                className="img-thumbnail h-32 p-2 w-full"
                              />
                            </div>
                            <IoMdClose
                              // onClick={() => deleteImages(index)}
                              className="absolute text-gray-600 top-0 p-1 border text-2xl border-gray-300 right-0 cursor-pointer rounded-full bg-white"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-10 flex justify-end">
                    <Button
                      onClick={() => goback(-1)}
                      variant="contained"
                      size="large"
                      color="info"
                      sx={{
                        width: "150px",
                        marginRight: "15px",
                      }}
                    >
                      {t("cancel")}
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
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

export default UpdateCategory;
