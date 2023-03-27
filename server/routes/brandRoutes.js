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
const router = Router();

router.get("/", getAllBrands);
router.get("/:id", getBrand);
router.post("/", authMiddleware, authAdminMiddleware, createBrand);
router.put("/:id", authMiddleware, authAdminMiddleware, updateBrand);
router.delete("/:id", authMiddleware, authAdminMiddleware, deleteBrand);
router.post("/selected", authMiddleware, authAdminMiddleware, deleteSelected);

module.exports = router;
