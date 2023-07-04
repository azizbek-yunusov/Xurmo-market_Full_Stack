const { Schema, model } = require("mongoose");

const subCategorySchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    titleOz: {
      type: String,
      required: true,
    },
    titleUz: {
      type: String,
      required: true,
    },
    titleRu: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("SubCategory", subCategorySchema);
