const { Schema, model } = require("mongoose");

const bannerSchema = new Schema(
  {
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
      trim: true,
    },
    activated: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Banner", bannerSchema);
