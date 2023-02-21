const ProductModel = require("../models/ProductModel");
const cloudinary = require("../utils/cloudinary");

const addReview = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user.id,
      name: req.user.id,
      rating: Number(rating),
      comment,
    };
    let pictures = [...req.body.pictures];
    let picturesBuffer = [];

    for (let i = 0; i < pictures?.length; i++) {
      const result = await cloudinary.uploader.upload(pictures[i], {
        folder: "products",
      });

      picturesBuffer.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.pictures = picturesBuffer;
    let product = await ProductModel.findById(productId)
      .populate("createdBy", "_id name avatar")
      .populate("reviews.user", "_id name avatar");

    const isReviewed = product.reviews.find(
      (rev) => rev.name.toString() === req.user.id.toString()
    );
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.name.toString() === req.user.id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      msg: "Successfully",
      product,
    });
  } catch (err) {
    return console.log(err);
  }
};

const showReview = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

const updateReview = async (req, res) => {
    try {
      await ProductModel.findByIdAndUpdate(
        req.body.reviewId,
        {
          $push : {likes}
        }
      )
    } catch (err) {
      console.log(err);
    }
  };

  const likeReview = async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const disLikeReview = async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

const deleteReview = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

const deleteSelect = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addReview,
  showReview,
  deleteReview,
  likeReview,
  disLikeReview,
  deleteSelect,
  updateReview
};
