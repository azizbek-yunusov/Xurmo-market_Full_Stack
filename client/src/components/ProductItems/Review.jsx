import { Backdrop, Box, Button, Fade, Modal, Rating } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 4,
};

export const Review = ({ productDetail, product }) => {
  const { access_token } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const reviewsHandle = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/review", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      body: JSON.stringify({
        productId: product._id,
        rating,
        comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          console.log(data.err);
        } else {
        }
      });
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
        add review
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
            <h1 className="text-primary">Write a review</h1>
            <form onSubmit={reviewsHandle}>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                sx={{marginY: "6px"}}
              />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                id="message"
                rows="5"
                className="block p-2.5 my-3 w-full text-base text-gray-800 bg-gray-50 rounded-lg border-2 border-gray-300 focus:ring-purple-500 focus:border-purple-500 ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                placeholder="Your message..."
              />
              <div className="flex items-center justify-end mt-5">
                <Button
                  onClick={handleClose}
                  variant="contained"
                  size="large"
                  color="info"
                  sx={{borderRadius: "6px", marginRight: "15px"}}
                >
                  close
                </Button>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  size="large"
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
