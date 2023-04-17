const { Router } = require("express");
const {
  addReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
  replyComment,
  likeReview,
  unLikeReview,
  deleteSelected,
} = require("../controllers/reviewController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.get("/", authMiddleware, authAdminMiddleware, getAllReviews);
router.get("/:id", getReview);
router.post("/", authMiddleware, addReview);
router.put("/:id", authMiddleware, authAdminMiddleware, updateReview);
router.delete("/:id", authMiddleware, authAdminMiddleware, deleteReview);
router.put("/reply/:id", authMiddleware, replyComment);
router.patch("/:id/like", authMiddleware, likeReview);
router.patch("/:id/unlike", authMiddleware, unLikeReview);
router.post("/selected", authMiddleware, authAdminMiddleware, deleteSelected);

module.exports = router;
