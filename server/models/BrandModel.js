const { Schema, model } = require("mongoose");

const brandSchema = new Schema({
  name: {
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
  createdAt: {
    type: Date,
    default: new Date(),
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
});

module.exports = model("Brand", brandSchema);
