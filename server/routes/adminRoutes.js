const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/authMiddleware");
const { addAdmin, getAllAdmins, deleteAdmin, updateAdmin, deleteSelected } = require("../controllers/adminController");
const ownerMiddleware = require("../middleware/ownerMiddleware");

router.get("/", authMiddleware, ownerMiddleware, getAllAdmins);
router.post("/", authMiddleware, ownerMiddleware, addAdmin);
router.delete("/:id", authMiddleware, ownerMiddleware, deleteAdmin);
router.put("/:id", authMiddleware, ownerMiddleware, updateAdmin);
router.post("/", authMiddleware, ownerMiddleware, deleteSelected);

module.exports = router;
