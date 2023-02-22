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

router.get("/brands", getAllBrands);
router.get("/brand/:id", getBrand);
router.post("/brand", authMiddleware, authAdminMiddleware, createBrand);
router.put("/brand/:id", authMiddleware, authAdminMiddleware, updateBrand);
router.delete("/brand/:id", authMiddleware, authAdminMiddleware, deleteBrand);
router.post("/brand/selected", authMiddleware, authAdminMiddleware, deleteSelected);

module.exports = router;
