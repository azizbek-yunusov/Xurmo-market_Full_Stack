const { Router } = require("express");
const {
  getPosts,
  getPostOne,
  createPost,
  updatePost,
  deletePost,
  deleteSelected,
} = require("../controllers/postController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

// path - /post
router.get("/", getPosts);
router.get("/:id", getPostOne);
// admin only
router.post("/", authMiddleware, authAdminMiddleware, createPost);
router.put("/:id", authMiddleware, authAdminMiddleware, updatePost);
router.delete("/:id", authMiddleware, authAdminMiddleware, deletePost);
router.post("/selected", authMiddleware, authAdminMiddleware, deleteSelected);

module.exports = router;
