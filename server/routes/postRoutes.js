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

router.get("/posts", getPosts);
router.get("/post/:id", getPostOne);
router.post("/post", authMiddleware, authAdminMiddleware, createPost);
router.put("/post/:id", authMiddleware, authAdminMiddleware, updatePost);
router.delete("/post/:id", authMiddleware, authAdminMiddleware, deletePost);
router.post("/post/selected", authMiddleware, authAdminMiddleware, deleteSelected);

module.exports = router;
