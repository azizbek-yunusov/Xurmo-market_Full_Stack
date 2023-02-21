import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Rating,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 4,
};

export const Review = ({ product }) => {
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
      const { data } = await axios.put(
        "/review",
        {
          productId: product._id,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: access_token,
          },
        }
      );
      dispatch({ type: "GET_PRODUCT", payload: data.product });
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
        Add Review
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
            <h1 className="text-primary md:mb-3 mb-2">Write a review</h1>
            <form onSubmit={reviewsHandle}>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                sx={{ marginBottom: "20px" }}
              />
              <TextField
                fullWidth
                multiline
                label="Comments"
                minRows={4}
                placeholder="Comments"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="flex items-center justify-end mt-5">
                <Button
                  onClick={handleClose}
                  variant="contained"
                  size="medium"
                  color="info"
                  sx={{ borderRadius: "6px", marginRight: "15px" }}
                >
                  close
                </Button>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  size="medium"
                  type="submit"
                >
                  add review
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
