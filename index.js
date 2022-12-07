const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const productRoutes = require("./routes/productroutes");

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/product", productRoutes);

mongoose
  .connect("mongodb://0.0.0.0:27017/api", { useNewUrlParser: true })
  .then(() => {
    console.log("db connected");
  });
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
