const { Schema, model } = require("mongoose");

const characteristicsSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    smartphone: {
      color: {
        type: String,
      },
      weight: {
        type: String,
      },
      fingerPrint: {
        type: String,
      },
      size: {
        type: String,
      },
      osVr: {
        type: String,
      },
      ProLvl: {
        type: String,
      },
      display: {
        type: String,
      },
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
        ref: "subCategory",
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

module.exports = model("Characteristics", characteristicsSchema);
