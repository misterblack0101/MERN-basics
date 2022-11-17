const express = require("express");
const mongoose = require("mongoose");
require("./db/config");
const User = require("./db/models/User.js");
const cors = require("cors");
const Product = require("./db/models/Product");
const jwt = require("jsonwebtoken");
// I know this key should be in a .env file, but since its a test project, it doesn't matter.
const jwtKey = "e-comm";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  const user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  delete result.__v;
  if (result) {
    jwt.sign({ result }, jwtKey, { expiresIn: "10h" }, (err, token) => {
      if (err) return resp.send({ result: "no User found" });
      return resp.send({ result, token });
    });
  } else resp.send({ result: "no User found" });
});

app.post("/login", async (req, resp) => {
  const user = req.body;
  if (user.email && user.password) {
    const result = await User.findOne(user).select("-password -__v");
    if (result) {
      jwt.sign({ result }, jwtKey, { expiresIn: "10h" }, (err, token) => {
        if (err) return resp.send({ result: "no User found" });
        result["auth"] = token;
        return resp.send({ result, token });
      });
    }
  } else resp.send({ result: "no User found" });
});

app.post("/add-product", verifyToken, async (req, resp) => {
  const prod = req.body;
  console.log(prod);
  if (prod.name && prod.price && prod.category && prod.userId && prod.brand) {
    const product = new Product(prod);
    const result = await product.save();
    return resp.send(result);
  } else {
    resp.send("Some product details are missing, please try again.");
  }
});

app.get("/products", verifyToken, async (req, resp) => {
  const prodcuts = await Product.find();
  if (prodcuts.length > 0) return resp.send(prodcuts);
  else resp.send({ result: "No products found" });
});

app.delete("/product/:id", verifyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/product/:id", verifyToken, async (req, resp) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const result = await Product.find({ _id: req.params.id });
    if (result) return resp.send(result);
  }
  resp.send({ result: "No records found" });
});

app.put("/product/:id", verifyToken, async (req, resp) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const result = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    if (result) return resp.send(result);
  }
  resp.send({ result: "Couldn't update records" });
});

app.get("/search/:key", verifyToken, async (req, resp) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { brand: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "JWT token is invalid." });
      } else {
      }
    });
  } else {
    resp.status(403).send({ result: "Please add a JWT token." });
  }
  next();
}

app.listen(5002);
