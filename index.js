const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userroutes");
const productRoutes = require("./routes/productroutes");
const cartRoutes = require("./routes/cartroutes");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

app.get("/", (req, res) => {
  return res.send("WELCOME TO FIRESTORE");
});
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("db connected");
  });
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
