const { Router } = require("express");
const {
  newOrder,
  getAllOrders,
  getOrder,
  getMyOrders,
  deleteOrder,
  deleteSelected,
  updateOrderStatus
} = require("../controllers/orderController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

// path - /order
router.post("/", authMiddleware, newOrder);
router.get("/my", authMiddleware, getMyOrders);
router.delete("/:id", authMiddleware, authAdminMiddleware, deleteOrder);
router.get("/", authMiddleware, authAdminMiddleware, getAllOrders);
router.get("/:id", authMiddleware, authAdminMiddleware, getOrder);
router.put("/:id", authMiddleware, authAdminMiddleware, updateOrderStatus);
router.post("/selected", authMiddleware, authAdminMiddleware, deleteSelected);

module.exports = router;
