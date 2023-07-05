const { Router } = require("express");
const {
  getAllBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  deleteSelected
} = require("../controllers/brandController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const testAdminLimitMiddleware = require("../middleware/testAdminLimitMiddleware");
const router = Router();

router.get("/", getAllBrands);
router.get("/:id", getBrand);
router.post("/", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, createBrand);
router.put("/:id", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, updateBrand);
router.delete("/:id", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, deleteBrand);
router.post("/selected", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, deleteSelected);

module.exports = router;
