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

// path - /category
router.get("/", getAllCategoris);
router.get("/:id", getCategory);
router.get("/slug/:slug", getSlugCategory);

// admin only
router.post("/", authMiddleware, authAdminMiddleware, createCategory);
router.put(
  "/:id",
  authMiddleware,
  authAdminMiddleware,
  updateCategory
);
router.delete(
  "/:id",
  authMiddleware,
  authAdminMiddleware,
  deleteCategory
);
router.post(
  "/selected",
  authMiddleware,
  authAdminMiddleware,
  deleteSelected
);

router.post(
  "/item",
  authMiddleware,
  authAdminMiddleware,
  createCategoryItem
);
router.delete(
  "/item/:id",
  authMiddleware,
  authAdminMiddleware,
  deleteCategoryItem
);
router.get("/items", getCategoryItems);

module.exports = router;
