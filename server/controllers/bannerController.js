const BannerModel = require("../models/BannerModel");
const cloudinary = require("../utils/cloudinary");

const createBanner = async (req, res) => {
  const { name, href, image, createdAt } = req.body;
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "Banners",
      // width: 300,
      // crop: "scale"
    });
    const banner = await BannerModel.create({
      name,
      href,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      createdAt,
      createdBy: req.user.id,
    });
    await banner.save();
    res.status(200).json({
      banner,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllBanners = async (req, res) => {
  try {
    const banners = await BannerModel.find().populate("createdBy", "_id name");
    res.status(201).json({
      banners,
    });
  } catch (err) {
    console.log(err);
  }
};

const getBanner = async (req, res) => {
  try {
    const banner = await BannerModel.findById(req.params.id).populate(
      "createdBy",
      "_id name"
    );
    res.status(201).json({ banner });
  } catch (err) {
    console.log(err);
  }
};

const updateBanner = async (req, res) => {
  try {
    const { name, href, image } = req.body;
    const updatedBanner = await BannerModel.findByIdAndUpdate(req.params.id, {
      name,
      href,
      image,
    });
    res.status(200).json({ updatedBanner });
  } catch (err) {
    console.log(err);
  }
};

const deleteBanner = async (req, res) => {
  try {
    await BannerModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      msg: "DELETED",
    });
  } catch (err) {}
};

const deleteSelected = async (req, res) => {
  try {
    let selected = [...req.body.selected];

    // for (let i = 0; i < selected.length; i++) {
    //   console.log(selected);
    // }
    await selected.forEach((id) => {
      BannerModel.deleteOne({ _id: id }, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Mahsulot o'chirildi");
        }
      });
    });
    res.status(200).json({ msg: "successfully" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createBanner,
  getAllBanners,
  getBanner,
  updateBanner,
  deleteBanner,
  deleteSelected,
};
