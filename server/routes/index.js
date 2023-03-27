const router = require('express').Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const reviewRoutes = require("./reviewRoutes");
const bannerRoutes = require("./bannerRoutes");
const categoryRoutes = require("./categoryRoutes");
const orderRoutes = require("./orderRoutes");
const brandRoutes = require("./brandRoutes");
const postRoutes = require("./postRoutes");

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/review', reviewRoutes);
router.use('/banner', bannerRoutes);
router.use('/category', categoryRoutes);
router.use('/order', orderRoutes);
router.use('/brand', brandRoutes);
router.use('/post', postRoutes);

module.exports = router;