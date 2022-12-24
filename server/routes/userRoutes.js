const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/authMiddleware");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserInfo,
  signUp,
  signIn,
  addAdress,
  getMyAdresses,
  deleteAddress,
} = require("../controllers/userController");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/users", authMiddleware, authAdminMiddleware, getAllUsers);
router.get("/user/:id", authMiddleware, authAdminMiddleware, getUser);
router.put("/user/:id", authMiddleware, authAdminMiddleware, updateUser);
router.delete("/user/:id", authMiddleware, authAdminMiddleware, deleteUser);
router.post("/address", authMiddleware, addAdress);
router.get("/addresses", authMiddleware, getMyAdresses);
router.delete("/address/:id", authMiddleware, deleteAddress);
router.get("/infor", authMiddleware, getUserInfo);

module.exports = router;
