import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  Rating,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AiFillStar,
  AiOutlineCloudUpload,
  AiOutlineStar,
} from "react-icons/ai";
import { MdAddAPhoto, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../../redux/product";

const style = {
  position: "absolute",

  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 3,
};

export const Review = ({ productId }) => {
  let { t } = useTranslation(["product"]);
  const { access_token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const reviewsHandle = async (e) => {
    try {
      e.preventDefault();
      dispatch(addReview({ access_token, productId, rating, comment }));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        size="large"
        color="warning"
        fullWidth
        onClick={handleOpen}
      >
        {t("add-review")}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="rounded-xl bg-white">
            <div className="flex_betwen">
              <h1 className="text-primary text-gray-800 md:mb-3 mb-2">
                {t("new-review")}
              </h1>
              <IconButton
                onClick={handleClose}
                variant="contained"
                size="medium"
                color="default"
              >
                <MdClose />
              </IconButton>
            </div>
            <form onSubmit={reviewsHandle}>
              <div className="flex items-center mb-5">
                <p className="text-gray-700 mr-2">{t("rate")}</p>
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(e, newValue) => {
                    setRating(newValue);
                  }}
                  icon={<AiFillStar fontSize="20px" />}
                  emptyIcon={<AiOutlineStar fontSize="20px" />}
                />
              </div>
              <TextField
                fullWidth
                multiline
                label={t("review-comment")}
                minRows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="md:mt-5 flex min-w-full bg-gray-50 dark:bg-gray-700/50 justify-center items-center rounded-md border-2 border-dashed border-gray-300 p-3 py-8 cursor-pointer">
                <div className="flex justify-center flex-col items-center">
                  <MdAddAPhoto className="text-3xl text-gray-500" />
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
                        // onChange={handleImageBanner}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end mt-5">
                <Button
                  onClick={handleClose}
                  variant="contained"
                  size="medium"
                  color="secondary"
                  type="submit"
                >
                  {t("add-review")}
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
