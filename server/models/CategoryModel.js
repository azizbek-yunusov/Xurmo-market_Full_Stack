const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    nameUz: {
      type: String,
      required: true,
    },
    nameEn: {
      type: String,
      required: true,
    },
    nameRu: {
      type: String,
      required: true,
    },
    slug: {
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
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
    createdAt: {
      type: Date,
      default: new Date(),
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

module.exports = model("Category", categorySchema);
