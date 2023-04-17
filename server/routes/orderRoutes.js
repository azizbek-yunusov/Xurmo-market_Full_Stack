const { Router } = require("express");
const {
  newOrder,
  getAllOrders,
  getOrder,
  getMyOrders,
  deleteOrder,
  deleteSelected,
  updateOrderStatus,
  resetOrderStatus
} = require("../controllers/orderController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

// path - /order
router.post("/", authMiddleware, newOrder);
router.get("/my", authMiddleware, getMyOrders);
// admin only
router.delete("/:id", authMiddleware, authAdminMiddleware, deleteOrder);
router.get("/", authMiddleware, authAdminMiddleware, getAllOrders);
router.get("/:id", authMiddleware, authAdminMiddleware, getOrder);
router.put("/:id", authMiddleware, authAdminMiddleware, updateOrderStatus); 
router.put("/reset/:id", authMiddleware, authAdminMiddleware, resetOrderStatus);
router.post("/selected", authMiddleware, authAdminMiddleware, deleteSelected);

module.exports = router;
