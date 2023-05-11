const { Schema, model } = require("mongoose");

const bannerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    redirect: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Banner", bannerSchema);
