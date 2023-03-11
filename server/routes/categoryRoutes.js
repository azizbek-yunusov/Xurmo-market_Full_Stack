const { Router } = require("express");
const {
  getAllCategoris,
  getCategory,
  createCategory,
  updateCategory,
  deleteSelected,
  deleteCategory,
  getSlugCategory,
} = require("../controllers/categoryController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.get("/categories", getAllCategoris);
router.get("/category/:id", getCategory);
router.get("/category/:slug", getSlugCategory);
router.post("/category", authMiddleware, authAdminMiddleware, createCategory);
router.put(
  "/category/:id",
  authMiddleware,
  authAdminMiddleware,
  updateCategory
);
router.delete(
  "/category/:id",
  authMiddleware,
  authAdminMiddleware,
  deleteCategory
);
router.post(
  "/category/selected",
  authMiddleware,
  authAdminMiddleware,
  deleteSelected
);

module.exports = router;
