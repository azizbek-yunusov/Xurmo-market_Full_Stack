import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

const BannerUpload = ({ banner, setBanner }) => {
  let { t } = useTranslation(["category-d"]);
  const handleImageBanner = (e) => {
    const setFileToBase = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBanner(reader.result);
      };
    };
    const file = e.target.files[0];
    setFileToBase(file);
  };
  const deleteImageBanner = (index) => {
    const newArr = [banner];
    newArr.splice(index, 1);
    setBanner(newArr);
  };
  return (
    <>
      <div className="mt-5">
        <label htmlFor="file-upload" className="w-full">
          <p className="block text-base mb-1 text_color">
            {t("upload-banner")}
          </p>
          <div className="mr-2 flex min-w-full bg-gray-100 dark:bg-gray-700/50 justify-center items-center rounded-md border-2 border-dashed border-gray-300 p-3 py-8 cursor-pointer">
            <div className="flex justify-center flex-col items-center">
              <AiOutlineCloudUpload className="text-3xl text-gray-600 text_color" />
              <div className="flex text-sm text_color">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium"
                >
                  <span> {t("upload-banner")}</span>
                  <input
                    id="file-upload"
                    name="file"
                    type="file"
                    className="sr-only"
                    onChange={handleImageBanner}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>
          </div>
        </label>
      </div>
      {banner.length > 0 ? (
        <div className="p-[6px] mx-[2px] relative  md:mt-3">
          <div className="border_primary overflow-hidden rounded" id="file_img">
            <img
              src={banner}
              alt="images"
              className="img-thumbnail h-52 p-2 w-full"
            />
          </div>
          <IoMdClose
            onClick={() => deleteImageBanner(0)}
            className="absolute text-gray-600 top-0 p-1 text-2xl border_primary right-0 cursor-pointer rounded-full bg-white"
          />
        </div>
      ) : null}
    </>
  );
};

export default BannerUpload;
