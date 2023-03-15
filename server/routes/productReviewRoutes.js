const { Router } = require("express");
const {
  deleteSelect,
  deleteReview,
  updateReview,
  disLikeReview,
  likeReview,
  showReview,
  addReview,
} = require("../controllers/reviewContoller");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.put("/review", authMiddleware, addReview);

router.delete("/review/:id", authMiddleware, authAdminMiddleware, deleteReview);
router.put(
  "/review/update/:id",
  authMiddleware,
  authAdminMiddleware,
  updateReview
);
router.put("/review/show", authMiddleware, authAdminMiddleware, showReview);
router.put("/review/like", authMiddleware, likeReview);
router.put("/review/dislike", authMiddleware, disLikeReview);
router.post(
  "/review/selected",
  authMiddleware,
  authAdminMiddleware,
  deleteSelect
);

module.exports = router;
