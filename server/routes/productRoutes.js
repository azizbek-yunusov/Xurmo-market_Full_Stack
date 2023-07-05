const router = require("express").Router();
const {
  getAllProducts,
  getbestProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  deleteSelected,
  getProductView,
  getSearch,
  getSearchList,
  getSearchProducts,
  discountSelected
} = require("../controllers/productController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const testAdminLimitMiddleware = require("../middleware/testAdminLimitMiddleware");

// path - /banner
router.get("/", getAllProducts);
router.get("/list", getSearchList);
router.get("/search", getSearchProducts);
router.get("/best", getbestProducts);
router.get("/:id", getProduct);
router.get("/view/:slug", getProductView);
router.get("/products/search", getSearch)
// admin only
router.post("/", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, createProduct);
router.put("/:id", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, updateProduct);
router.delete(
  "/:id",
  authMiddleware,
  authAdminMiddleware,
  testAdminLimitMiddleware,
  deleteProduct
);
router.post(
  "/selected",
  authMiddleware,
  authAdminMiddleware,
  testAdminLimitMiddleware,
  deleteSelected
);
router.post(
  "/discount-selected",
  authMiddleware,
  authAdminMiddleware,
  testAdminLimitMiddleware,
  discountSelected
);


module.exports = router;
