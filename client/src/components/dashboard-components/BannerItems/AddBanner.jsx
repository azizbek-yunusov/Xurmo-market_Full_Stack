import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createBanner } from "../../../redux/banner";
import HelmetTitle from "../../../utils/HelmetTitle";
import { Layout } from "../Layouts";

const AddBanner = () => {
  let { t } = useTranslation(["banner-d"]);
  const { access_token } = useSelector((state) => state.auth);
  const { isLoading, isError } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [href, setHref] = useState("");
  const [image, setImage] = useState([]);
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
  const deleteImage = (index) => {
    const newArr = [image];
    newArr.splice(index, 1);
    setImage(newArr);
  };
  const createBannerHandle = async (e) => {
    e.preventDefault();
    const bannerData = {
      name,
      href,
      image,
    };
    await dispatch(createBanner({ access_token, bannerData }));
    if (!isLoading) {
      toast.success(t("new-banner-added"));
      navigate("/dashboard/banners");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  };
  return (
    <>
      <HelmetTitle title={t("add-banner-title")} />
      <Layout>
        <section className="relative">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-40 px-5 pt-4 text-gray-50 rounded-xl">
            <div className="flex_betwen">
              <h1 className="text-white text-2xl">{t("add-banner-title")}</h1>
              <ol className="list-reset mt-1 flex text-grey-dark text-sm text-gray-100">
                <li>
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  <span>{t("add-banner-title")}</span>
                </li>
              </ol>
            </div>
          </div>
          <div className="-mt-24 rounded-2xl flex mx-4 bg_color backdrop-blur-md dark: border_primary">
            <div className="flex w-full p-8 px-16">
              <div className="w-full">
                <form onSubmit={createBannerHandle}>
                  <div className="flex flex-col">
                    <div className="grid grid-cols-2 gap-x-12">
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
                      <TextField
                        id="outlined-basic"
                        fullWidth
                        variant="outlined"
                        label={t("href")}
                        placeholder={t("href-pl")}
                        type="text"
                        className="rounded-xl"
                        value={href}
                        onChange={(e) => setHref(e.target.value)}
                      />
                    </div>

                    <div className="mt-5">
                      <label htmlFor="file-upload" className="w-full">
                        <p className="block text-base mb-1 text_color">
                          {t("upload-image")}
                        </p>
                        <div className="mr-2 flex min-w-full bg-gray-100 dark:bg-gray-700/50 justify-center items-center rounded-md border-2 border-dashed border-gray-300 p-3 py-8 cursor-pointer">
                          <div className="flex justify-center flex-col items-center">
                            <AiOutlineCloudUpload className="text-3xl text-gray-600 text_color" />
                            <div className="flex text-sm text_color">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md font-medium"
                              >
                                <span> {t("upload-image")}</span>
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
                    {image.length > 0 ? (
                      <div className="p-[6px] mx-[2px] relative  md:mt-3">
                        <div
                          className="border_primary overflow-hidden rounded"
                          id="file_img"
                        >
                          <img
                            src={image}
                            alt="images"
                            className="object-cover h-52 p-2 w-full"
                          />
                        </div>
                        <IoMdClose
                          onClick={() => deleteImage(0)}
                          className="absolute text-gray-600 top-0 p-1 text-2xl border_primary right-0 cursor-pointer rounded-full bg-white"
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="w-full mt-10 flex justify-end">
                    <Button
                      onClick={() => goback(-1)}
                      variant="contained"
                      size="large"
                      sx={{
                        width: "150px",
                        borderRadius: "6px",
                        marginRight: "15px",
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        width: "150px",
                        background: "#AB47BC",
                        borderRadius: "6px",
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
                          {"Loading... "}
                        </div>
                      ) : (
                        "Save"
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

export default AddBanner;
