const { Router } = require("express");
const {
  getAllCategoris,
  getCategory,
  createCategory,
  updateCategory,
  deleteSelected,
  deleteCategory,
  getSlugCategory,
  createSubCategory,
  getSubCategories,
  deleteSubCategory,
} = require("../controllers/categoryController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

// path - /category
router.get("/", getAllCategoris);
router.get("/:id", getCategory);
router.get("/client/:slug", getSlugCategory);

// admin only
router.post("/", authMiddleware, authAdminMiddleware, createCategory);
router.put("/:id", authMiddleware, authAdminMiddleware, updateCategory);
router.delete("/:id", authMiddleware, authAdminMiddleware, deleteCategory);
router.post("/selected", authMiddleware, authAdminMiddleware, deleteSelected);

router.post("/sub-category", authMiddleware, authAdminMiddleware, createSubCategory);
router.delete(
  "/sub-category/:id",
  authMiddleware,
  authAdminMiddleware,
  deleteSubCategory
);
router.get("/sub-categories/all", getSubCategories);

module.exports = router;
