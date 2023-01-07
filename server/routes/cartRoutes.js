const { Router } = require("express");
const {
  myCart,
  addToCart,
  deleteCartItems,
  decrementQtyItem,
  addToFavorite,
  getFavorites,
  deleteFavoriteItem
} = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.get("/mycart", authMiddleware, myCart);

router.put("/addcart/:id", authMiddleware, addToCart);

router.delete("/cart/:id", authMiddleware, deleteCartItems);

router.delete("/decr/:id", authMiddleware, decrementQtyItem);

// Favorites routes
router.get("/favorites", authMiddleware, getFavorites);

router.post("/fovorite/:id", authMiddleware, addToFavorite);

router.delete("/fovorite/:id", authMiddleware, deleteFavoriteItem);

module.exports = router;
