const { Router } = require("express");
const {
  getAllCategoris,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.get("/categories", getAllCategoris);
router.get("/category/:id", getCategory);
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

module.exports = router;
