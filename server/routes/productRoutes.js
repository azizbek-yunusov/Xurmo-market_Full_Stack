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
  getSearchList
} = require("../controllers/productController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

// path - /banner
router.get("/", getAllProducts);
router.get("/list", getSearchList);
router.get("/best", getbestProducts);
router.get("/:id", getProduct);
router.get("/view/:slug", getProductView);
router.get("/products/search", getSearch)
// admin only
router.post("/", authMiddleware, authAdminMiddleware, createProduct);
router.put("/:id", authMiddleware, authAdminMiddleware, updateProduct);
router.delete(
  "/:id",
  authMiddleware,
  authAdminMiddleware,
  deleteProduct
);
router.post(
  "/selected",
  authMiddleware,
  authAdminMiddleware,
  deleteSelected
);


module.exports = router;
