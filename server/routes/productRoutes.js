const { Router } = require("express");
const {
  getAllProducts,
  getbestProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  addReview,
} = require("../controllers/productController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.get("/products", getAllProducts);
router.get("/best", getbestProducts);
router.get("/product/:id", getProduct);
router.post("/product", authMiddleware, authAdminMiddleware, createProduct);
router.put("/product/:id", authMiddleware, authAdminMiddleware, updateProduct);
router.delete(
  "/product/:id",
  authMiddleware,
  authAdminMiddleware,
  deleteProduct
);

router.put("/review", authMiddleware, addReview);

module.exports = router;
