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
const testAdminLimitMiddleware = require("../middleware/testAdminLimitMiddleware");
const router = Router();

// path - /category
router.get("/", getAllCategoris);
router.get("/:id", getCategory);
router.get("/client/:slug", getSlugCategory);

// admin only
router.post("/", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, createCategory);
router.put("/:id", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, updateCategory);
router.delete("/:id", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, deleteCategory);
router.post("/selected", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, deleteSelected);

router.post("/sub-category", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, createSubCategory);
router.delete(
  "/sub-category/:id",
  authMiddleware,
  authAdminMiddleware,
  testAdminLimitMiddleware,
  deleteSubCategory
);
router.get("/sub-categories/all", getSubCategories);

module.exports = router;
