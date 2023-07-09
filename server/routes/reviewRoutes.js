const { Router } = require("express");
const {
  addReview,
  getAllReviews,
  getReview,
  verifyReview,
  deleteReview,
  replyComment,
  likeReview,
  unLikeReview,
  deleteSelected,
} = require("../controllers/reviewController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const testAdminLimitMiddleware = require("../middleware/testAdminLimitMiddleware");
const router = Router();

router.post("/", authMiddleware, addReview);
router.put("/reply/:id", authMiddleware, replyComment);
router.patch("/:id/like", authMiddleware, likeReview);
router.patch("/:id/unlike", authMiddleware, unLikeReview);
router.get("/:id", getReview);
router.get("/", authMiddleware, authAdminMiddleware, getAllReviews);
router.put("/:id", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, verifyReview);
router.delete("/:id", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, deleteReview);
router.post("/selected", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, deleteSelected);

module.exports = router;
