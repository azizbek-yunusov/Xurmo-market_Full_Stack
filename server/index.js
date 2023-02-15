const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const brandRoutes = require("./routes/brandRoutes");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cookieParser());
// app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
  })
);

app.use(productRoutes);
app.use(userRoutes);
app.use(bannerRoutes);
app.use(categoryRoutes);
app.use(orderRoutes);
app.use(cartRoutes);
app.use(brandRoutes);

mongoose.connect(MONGO_URI, () => {
  console.log("MongoDB is working");
});

app.listen(5000, console.log(`Server has a been started on port:${PORT}`));
