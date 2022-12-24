const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
  })
);
app.use(fileUpload());

app.use(productRoutes);
app.use(userRoutes);
app.use(bannerRoutes);
app.use(categoryRoutes);
app.use(orderRoutes);
app.use(cartRoutes);

mongoose.connect(MONGO_URI, () => {
  console.log("MongoDB is working");
});

app.listen(5000, console.log(`Server has a been started on port:${PORT}`));
