const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  signUp,
  activateEmail,
  signIn,
  getAccessToken,
  forgotPassword,
  resetPassword,
  logout,
  googleOauth,
} = require("../controllers/authController");

router.post("/signup", signUp);
router.post("/activation", activateEmail);
router.post("/signin", signIn);
router.post("/refreshtoken", getAccessToken);
router.post("/forgot", forgotPassword);
router.post("/reset", authMiddleware, resetPassword);
router.get("/logout", logout);
router.post("/googleauth", googleOauth);

module.exports = router;
