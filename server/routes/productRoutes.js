const { Router } = require("express");
const {
  getAllProducts,
  getbestProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  deleteSelected,
  getSearch
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
router.post(
  "/product/selected",
  authMiddleware,
  authAdminMiddleware,
  deleteSelected
);
router.get("/search", getSearch)


module.exports = router;
