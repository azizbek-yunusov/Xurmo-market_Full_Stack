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
  addToCart,
  deleteCartItems,
  decrementQtyItem,
  addToFavorite,
  deleteFavoriteItem,
  cleanWishList,
  changePassword,
} = require("../controllers/userController");
const { addAdress, myAddresses, standardizationAddress, deleteAddress } = require("../controllers/addressController");

router.put("/addcart/:id", authMiddleware, addToCart);
router.delete("/cart/:id", authMiddleware, deleteCartItems);
router.delete("/decr/:id", authMiddleware, decrementQtyItem);
router.post("/fovorite/:id", authMiddleware, addToFavorite);
router.delete("/fovorite/:id", authMiddleware, deleteFavoriteItem);
router.put("/fovorites", authMiddleware, cleanWishList);
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
