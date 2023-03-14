const PostModel = require("../models/PostModel");
const cloudinary = require("../utils/cloudinary");

const createPost = async (req, res) => {
  const { title, excerpt, slug, content, image } = req.body;
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "Posts",
      // width: 300,
      // crop: "scale"
    });
    const post = await PostModel.create({
      title,
      excerpt,
      slug,
      content,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      createdBy: req.user.id,
    });
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate(
      "createdBy",
      "_id name lastName avatar email"
    );
    res.status(201).json(posts);
  } catch (err) {
    console.log(err);
  }
};

const getPostOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Unable to return article",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Article not found",
          });
        }

        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, excerpt, slug, content, image } = req.body;
    const post = await PostModel.findByIdAndUpdate(req.params.id, {
      title,
      excerpt,
      slug,
      content,
      image,
    });
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await PostModel.findByIdAndDelete(req.params.id);
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
  }
};

const deleteSelected = async (req, res) => {
  try {
    let selected = [...req.body.selected];

    // for (let i = 0; i < selected.length; i++) {
    //   console.log(selected);
    // }
    await selected.forEach((id) => {
      PostModel.deleteOne({ _id: id }, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Post o'chirildi");
        }
      });
    });
    res.status(200).json({ msg: "successfully" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostOne,
  updatePost,
  deletePost,
  deleteSelected,
};
