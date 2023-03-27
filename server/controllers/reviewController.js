const ProductModel = require("../models/ProductModel");
const ReviewModel = require("../models/ReviewModel");
const cloudinary = require("../utils/cloudinary");

const addReview = async (req, res) => {
  try {
    const { productId, rating, comment, pictures } = req.body;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ err: "Product not found" });
    }
    let picturesBuffer = [];

    for (let i = 0; i < pictures.length; i++) {
      const result = await cloudinary.uploader.upload(pictures[i], {
        folder: "products",
      });

      picturesBuffer.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const reviewData = {
      productId,
      user: req.user.id,
      name: req.user.id,
      rating: Number(rating),
      comment,
      pictures: picturesBuffer,
    };

    // let findReview = await ReviewModel.find({ productId });
    // if (!findReview) {
    // }
    const review = await ReviewModel.create(reviewData);
    await review.save();
    // let product = await ProductModel.findById(productId)
    //   .populate("createdBy", "_id name avatar")
    //   .populate("reviews.user", "_id name lastName email avatar");

    // const isReviewed = product.reviews.find(
    //   (rev) => rev.name.toString() === req.user.id.toString()
    // );
    // if (isReviewed) {
    //   product.reviews.forEach((rev) => {
    //     if (rev.name.toString() === req.user.id.toString())
    //       (rev.rating = rating), (rev.comment = comment), (rev.pictures = pictures);
    //   });
    // } else {
    //   product.reviews.push(review);
    //   product.numOfReviews = product.reviews.length;
    // }

    // let avg = 0;

    // product.reviews.forEach((rev) => {
    //   avg += rev.rating;
    // });

    // product.ratings = avg / product.reviews.length;

    // await product.save({ validateBeforeSave: false });

    // res.status(200).json({
    //   msg: "Successfully",
    //   product,
    // });
  } catch (err) {
    return console.log(err);
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find()
      .populate("productId", "_id name price images")
      .populate("user", "_id name email avatar");
    res.status(200).json(reviews);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getReview = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id)
      .populate("productId", "_id name price images")
      .populate("user", "_id name email avatar");

    res.status(200).json(review);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
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
    try {
      const { isActive, rating, comment } = req.body;

      const review = await ReviewModel.findByIdAndUpdate(
        req.params.id,
        {
          isActive,
          rating,
          comment,
          updatedAt: new Date(),
        },
        {
          new: true,
        }
      );
      res.status(200).json({ msg: "Success", review });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  } catch (err) {
    console.log(err);
  }
};

const likeReview = async (req, res) => {
  try {
    const comment = await ReviewModel.find({
      _id: req.params.id,
      likes: req.user.id,
    });
    if (comment.length > 0) {
      console.log("Like bosgansan");
    }
    // return res.status(400).json({ msg: "" });

    // await ReviewModel.findOneAndUpdate(
    //   { _id: req.params.id },
    //   {
    //     $push: { likes: req.user.id },
    //   },
    //   { new: true }
    // );

    // res.json({ msg: "Liked Comment!" });
  } catch (err) {
    // return res.status(500).json({ msg: err.message });
    console.log(err);
  }
};

const unLikeReview = async (req, res) => {
  try {
    await ReviewModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    );

    res.json({ msg: "UnLiked Comment!" });
    res.status(200).json({ msg: "success" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const replyComment = async (req, res) => {
  try {
    const replyData = {
      text: req.body.text,
      user: req.user.id,
    };
    await ReviewModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { reply: replyData },
      },
      { new: true }
    )
      .populate("user reply.user", "_id name email avatar")
      .exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.json(result);
        }
      });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await ReviewModel.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(401).json({ msg: "review not found" });
    }
    if (review.pictures) {
      for (let i = 0; i < review.pictures.length; i++) {
        await cloudinary.uploader.destroy(review.pictures[i].public_id);
      }
    }
    await review.remove();
    res.status(201).json(review);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
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
  getReview,
  likeReview,
  getAllReviews,
  replyComment,
  deleteSelect,
  unLikeReview,
  updateReview,
};
