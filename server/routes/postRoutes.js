const { Router } = require("express");
const {
  getPosts,
  getPostOne,
  createPost,
  updatePost,
  deletePost,
  deleteSelected,
  getPost,
} = require("../controllers/postController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const testAdminLimitMiddleware = require("../middleware/testAdminLimitMiddleware");
const router = Router();

// path - /post
router.get("/", getPosts);
router.get("/:slug", getPostOne);
// admin only
router.get("/view/:id", authMiddleware, authAdminMiddleware, getPost);

router.post("/", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, createPost);
router.put("/:slug", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, updatePost);
router.delete("/:id", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, deletePost);
router.post("/selected", authMiddleware, authAdminMiddleware, testAdminLimitMiddleware, deleteSelected);

module.exports = router;
