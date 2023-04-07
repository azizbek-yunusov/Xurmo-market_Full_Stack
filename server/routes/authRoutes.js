const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  signUp,
  signInClient,
  signInAdmin,
  getAccessToken,
  forgotPassword,
  resetPassword,
  googleOauth,
  getAccessAdminToken,
  signOutClient,
  signOutAdmin,
  verifyOtp,
} = require("../controllers/authController");

router.post("/signup", signUp);
router.post("/verify", verifyOtp);
router.post("/admin/signin", signInAdmin);
router.post("/signin", signInClient);
router.post("/refreshtoken", getAccessToken);
router.post("/admintoken", getAccessAdminToken);
router.post("/forgot", forgotPassword);
router.post("/reset", authMiddleware, resetPassword);
router.get("/logout", signOutClient);
router.get("/admin/logout", signOutAdmin);
router.post("/googleauth", googleOauth);

module.exports = router;
