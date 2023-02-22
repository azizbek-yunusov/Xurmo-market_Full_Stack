const { Router } = require("express");
const {
  newOrder,
  getAllOrders,
  getOrder,
  getMyOrders,
  deleteOrder,
  deleteSelected
} = require("../controllers/orderController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.post("/order", authMiddleware, newOrder);
router.get("/orders", authMiddleware, authAdminMiddleware, getAllOrders);
router.get("/order/:id", authMiddleware, authAdminMiddleware, getOrder);
router.get("/myorders", authMiddleware, getMyOrders);
router.delete("/order/:id", authMiddleware, deleteOrder);
router.post("/order/selected", authMiddleware, authAdminMiddleware, deleteSelected);

module.exports = router;
