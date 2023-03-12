const { Router } = require("express");
const {
  getAllCategoris,
  getCategory,
  createCategory,
  updateCategory,
  deleteSelected,
  deleteCategory,
  getSlugCategory,
  createCategoryItem,
  getCategoryItems,
  deleteCategoryItem,
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

router.post(
  "/category/item",
  authMiddleware,
  authAdminMiddleware,
  createCategoryItem
);
router.delete(
  "/category/item/:id",
  authMiddleware,
  authAdminMiddleware,
  deleteCategoryItem
);
router.get("/categories/category/items", getCategoryItems);

module.exports = router;
