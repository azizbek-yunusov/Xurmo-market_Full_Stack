import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useTranslation } from "react-i18next";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HelmetTitle } from "../../../utils";
import { Layout } from "../Layouts";
import { createPost } from "../../../redux/post";


const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
const CreatePost = () => {
  let { t } = useTranslation(["dashboard"]);
  const { access_token } = useSelector((state) => state.auth);
  const { isLoading, isSuccess, isError } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState([]);
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
  const handleTitleSlugChange = async (e) => {
    let value = e.target.value
    let slugy = await value.toLowerCase().replace(/\s+/g, "-")
    setTitle(value)
    setSlug(slugy)
  }
  const createBannerHandle = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      slug,
      excerpt,
      content,
      image,
    };
    await dispatch(createPost({ access_token, postData }));
    if (isSuccess) {
      toast.success(t("new-post-added"));
      navigate("/dashboard/posts");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  };
  return (
    <>
      <HelmetTitle title={t("add-post-title")} />
      <Layout>
        <section className="relative">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-40 px-5 pt-4 text-gray-50 rounded-xl">
            <div className="flex_betwen">
              <h1 className="text-white text-2xl">{t("add-post=title")}</h1>
              <ol className="list-reset mt-1 flex text-grey-dark text-sm text-gray-100">
                <li>
                  <Link to={"/dashboard"}>{"home"}</Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  <span>{t("add-post-title")}</span>
                </li>
              </ol>
            </div>
          </div>
          <div className="-mt-24 rounded-2xl flex mx-4 bg_color backdrop-blur-md dark: border_primary">
            <div className="flex w-full p-8 px-16">
              <div className="w-full">
                <form onSubmit={createBannerHandle}>
                  <div className="flex flex-col">
                    <div className="grid grid-cols-2 xl:gap-x-12 gap-x-6 xl:gap-y-7 gap-y-4 mb-5">
                      <TextField
                        id="outlined-basic"
                        fullWidth
                        variant="outlined"
                        label={t("title")}
                        placeholder={t("title-pl")}
                        type="text"
                        className="rounded-xl"
                        value={title}
                        onChange={handleTitleSlugChange}
                      />
                      <TextField
                        id="outlined-basic"
                        fullWidth
                        variant="outlined"
                        label={t("slug")}
                        placeholder={t("slug-pl")}
                        type="text"
                        className="rounded-xl"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        multiline
                        minRows={5}
                        label={t("excerpt")}
                        placeholder={t("excerpt-pl")}
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                      />

                      <div className="w-full -mt-4">
                        <div className="grid grid-cols-6">
                          <div className="col-span-2">
                            <label htmlFor="file-upload">
                              <label
                                htmlFor="file-upload"
                                className="block text-base mb-1 text_color"
                              >
                                {t("upload-image")}
                              </label>
                              <div className="mr-2 flex bg-white dark:bg-gray-700 justify-center items-center rounded-md border-2 border-dashed border-gray-300 dark:border-gray-500 p-2 py-4 cursor-pointer h-32">
                                <div className="flex justify-center flex-col items-center">
                                  <AiOutlineCloudUpload className="text-3xl text-gray-600" />
                                  <div className="flex text-sm text-gray-600">
                                    <label
                                      htmlFor="file-upload"
                                      className="relative cursor-pointer rounded-md bg-white dark:bg-transparent text_color font-medium"
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
                                  <p className="text-xs text-gray-500">
                                    PNG, JPG up to 10MB
                                  </p>
                                </div>
                              </div>
                            </label>
                          </div>
                          <div className="col-span-4">
                            {image.length > 0 ? (
                              <div className="p-[6px] mx-[2px] relative  md:mt-3">
                                <div
                                  className="border_primary overflow-hidden rounded"
                                  id="file_img"
                                >
                                  <img
                                    src={image}
                                    alt="images"
                                    className="object-cover h-40 p-2 w-full"
                                  />
                                </div>
                                <IoMdClose
                                  onClick={() => deleteImage(0)}
                                  className="absolute text-gray-600 top-0 p-1 text-2xl border_primary right-0 cursor-pointer rounded-full bg-white"
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      className="app editor-markdown w-full h-full min-[100px]"
                      modules={modules}
                      formats={formats}
                    />
                  </div>
                  <div className="w-full mt-10 flex justify-end">
                    <Button
                      onClick={() => navigate(-1)}
                      variant="contained"
                      size="large"
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
                      color="info"
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

export default CreatePost;
