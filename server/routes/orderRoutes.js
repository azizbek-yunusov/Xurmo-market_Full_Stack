const { Router } = require("express");
const {
  newOrder,
  getAllOrders,
  getOrder,
  getMyOrders,
} = require("../controllers/orderController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.post("/order", authMiddleware, newOrder);
router.get("/orders", authMiddleware, authAdminMiddleware, getAllOrders);
router.get("/order/:id", authMiddleware, authAdminMiddleware, getOrder);
router.get("/myorders", authMiddleware, getMyOrders);

module.exports = router;
