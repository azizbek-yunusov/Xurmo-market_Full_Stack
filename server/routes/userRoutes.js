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
  addAdress,
  getMyAdresses,
  deleteAddress,
  uploadAvatar,
  updateProfile,
  deleteSelected,
  addToCart,
  deleteCartItems,
  decrementQtyItem,
  addToFavorite,
  deleteFavoriteItem,
} = require("../controllers/userController");

router.put("/addcart/:id", authMiddleware, addToCart);
router.delete("/cart/:id", authMiddleware, deleteCartItems);
router.delete("/decr/:id", authMiddleware, decrementQtyItem);
router.post("/fovorite/:id", authMiddleware, addToFavorite);
router.delete("/fovorite/:id", authMiddleware, deleteFavoriteItem);
router.put("/update", authMiddleware, updateProfile);
router.put("/avatar", authMiddleware, uploadAvatar);
router.post("/address", authMiddleware, addAdress);
router.get("/addresses", authMiddleware, getMyAdresses);
router.delete("/address/:id", authMiddleware, deleteAddress);
router.get("/user", authMiddleware, getUserInfo);
router.get("/users", authMiddleware, authAdminMiddleware, getAllUsers);
router.get("/user/:id", authMiddleware, authAdminMiddleware, getUser);
router.put("/user/:id", authMiddleware, authAdminMiddleware, updateUser);
router.delete("/user/:id", authMiddleware, authAdminMiddleware, deleteUser);
router.post("/user/selected", authMiddleware, authAdminMiddleware, deleteSelected);

module.exports = router;
