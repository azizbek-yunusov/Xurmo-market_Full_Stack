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
  createUser,
  uploadAvatar,
  updateProfile,
  deleteSelected,
  changePassword,
} = require("../controllers/userController");
const {
  addAdress,
  myAddresses,
  standardizationAddress,
  deleteAddress,
} = require("../controllers/addressController");
const {
  addToFavorites,
  deleteFromFavorites,
  clearFavorite,
} = require("../controllers/favoriteController");
const {
  addToCart,
  deleteCartItem,
  decrementQtyItem,
} = require("../controllers/cartController");

router.post("/cart/:id", authMiddleware, addToCart);
router.put("/cart/:id", authMiddleware, deleteCartItem);
router.put("/decr/:id", authMiddleware, decrementQtyItem);
router.post("/favorite/:id", authMiddleware, addToFavorites);
router.put("/favorite/:id", authMiddleware, deleteFromFavorites);
router.put("/favorites", authMiddleware, clearFavorite);
router.put("/update", authMiddleware, updateProfile);
router.put("/avatar", authMiddleware, uploadAvatar);
router.get("/addresses", authMiddleware, myAddresses);
router.post("/address", authMiddleware, addAdress);
router.put(
  "/address/standardization/:id",
  authMiddleware,
  standardizationAddress
);
router.delete("/address/:id", authMiddleware, deleteAddress);
router.put("/change-password", authMiddleware, changePassword);
router.get("/me", authMiddleware, getUserInfo);
router.post("/", authMiddleware, authAdminMiddleware, createUser);
router.get("/", authMiddleware, authAdminMiddleware, getAllUsers);
router.get("/:id", authMiddleware, authAdminMiddleware, getUser);
router.put("/:id", authMiddleware, authAdminMiddleware, updateUser);
router.delete("/:id", authMiddleware, authAdminMiddleware, deleteUser);
router.post("/selected", authMiddleware, authAdminMiddleware, deleteSelected);

module.exports = router;
