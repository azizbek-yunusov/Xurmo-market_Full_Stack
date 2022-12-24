const { Router } = require("express");
const {
  myCart,
  addToCart,
  deleteCartItems,
} = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.get("/mycart", authMiddleware, myCart);

router.put("/addcart/:id", authMiddleware, addToCart);

router.delete("/cart/:id", authMiddleware, deleteCartItems);

module.exports = router;
