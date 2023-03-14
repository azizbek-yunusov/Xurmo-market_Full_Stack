const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const productReviewRoutes = require("./routes/productReviewRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const brandRoutes = require("./routes/brandRoutes");
const postRoutes = require("./routes/postRoutes");

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

app.use(authRoutes);
app.use(productRoutes);
app.use(productReviewRoutes);
app.use(userRoutes);
app.use(bannerRoutes);
app.use(categoryRoutes);
app.use(orderRoutes);
app.use(brandRoutes);
app.use(postRoutes);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDb connected...");
  })
  .catch((err) => console.log(err));

app.listen(PORT, console.log(`Server has a been started on port:${PORT}`));
