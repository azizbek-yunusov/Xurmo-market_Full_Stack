const { Schema, model } = require("mongoose");

const favoriteProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
});

favoriteProductSchema.methods.removeFromFavorite = function (id) {
  let products = [...this.products];
  products = products.filter((p) => p.toString() !== id.toString());

  const newFavorites = products;
  this.products = newFavorites;
  return this.save();
};

module.exports = model("Favorite", favoriteProductSchema);
