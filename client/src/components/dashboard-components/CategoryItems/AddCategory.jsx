import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HelmetTitle } from "../../../utils";
import Layout from "../Layout";
import BannerUpload from "./BannerUpload";

const AddCategory = () => {
  let { t } = useTranslation(["category-d"]);
  const { access_token } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const createCategoryHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    fetch("http://localhost:5000/category", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      body: JSON.stringify({
        name,
        slug,
        image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
        } else {
          setLoading(false);
          navigate("/dashboard/categories");
        }
      });
  };

  return (
    <>
      <HelmetTitle title={t("add-category-title")} />
      <Layout>
        <section className="relative">
          <div className="bg-indigo-400 w-full h-40 pl-5 pt-4 text-gray-50 rounded-xl">
            <h1 className="text-white text-2xl">Create category</h1>
            {/* <ol className="list-reset mt-1 flex text-grey-dark text-sm text-gray-200">
          <li>
            <Link to={"/dashboard"}>Dashboard</Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link to={"/dashboard/products"}>Create</Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <span>Create</span>
          </li>
        </ol> */}
          </div>
          <div className="-mt-24 rounded-2xl flex mx-4 bg_color border_primary">
            <div className="flex w-full p-8 px-16">
              <div className="w-full">
                <form onSubmit={createCategoryHandler}>
                  <div className="grid grid-cols-1 gap-6 gap-x-14 md:grid-cols-2">
                    <div className="col-span-1">
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
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        sx={{ marginTop: "40px" }}
                      />
                    </div>

                    <div className="flex">
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
                      {image.length ? (
                        <div className="p-[6px] mx-[2px] relative  md:mt-3">
                          <div
                            className="border border-gray-300 overflow-hidden rounded"
                            id="file_img"
                          >
                            <img
                              src={image}
                              alt="images"
                              className="img-thumbnail h-32 p-2 w-full"
                            />
                          </div>
                          <IoMdClose
                            // onClick={() => deleteImages(index)}
                            className="absolute text-gray-600 top-0 p-1 border text-2xl border-gray-300 right-0 cursor-pointer rounded-full bg-white"
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {/* <BannerUpload banner={banner} setBanner={setBanner} /> */}
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
                      {loading ? (
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

export default AddCategory;
