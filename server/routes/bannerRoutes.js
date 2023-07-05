const { Router } = require("express");
const {
  getAllBanners,
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  deleteSelected,
} = require("../controllers/bannerController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const testAdminLimitMiddleware = require("../middleware/testAdminLimitMiddleware");
const router = Router();

// path - /banner
router.get("/", getAllBanners);
router.get("/:id", getBanner);
// admin only
router.post("/", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, createBanner);
router.put("/:id", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, updateBanner);
router.delete("/:id", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, deleteBanner);
router.post("/selected", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, deleteSelected);

module.exports = router;
