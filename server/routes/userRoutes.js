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
  googleLogin,
  logout,
  editMyInfo,
  activateEmail,
  forgotPassword,
  getAccessToken,
  resetPassword,
} = require("../controllers/userController");

router.post("/signup", signUp);
router.post("/activation", activateEmail);
router.post("/signin", signIn);
router.post("/refreshtoken", getAccessToken);
router.post("/forgot", forgotPassword);
router.post("/reset", authMiddleware, resetPassword);
router.get("/logout", logout);
router.put("/update", authMiddleware, editMyInfo);
router.get("/users", authMiddleware, authAdminMiddleware, getAllUsers);
router.get("/user/:id", authMiddleware, authAdminMiddleware, getUser);
router.put("/user/:id", authMiddleware, authAdminMiddleware, updateUser);
router.delete("/user/:id", authMiddleware, authAdminMiddleware, deleteUser);
router.post("/address", authMiddleware, addAdress);
router.get("/addresses", authMiddleware, getMyAdresses);
router.delete("/address/:id", authMiddleware, deleteAddress);
router.get("/infor", authMiddleware, getUserInfo);
router.post("/googlelogin", googleLogin);

module.exports = router;
