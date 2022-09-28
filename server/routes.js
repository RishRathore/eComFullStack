const express = require("express");
const app = express();

const middlewares = require("./middlewares");
const cart = require("./controllers/cart");
const product = require("./controllers/product");
const user = require("./controllers/user");
const order = require("./controllers/order");

app.post("/signup", user.signUp);
app.post("/login", user.userLogin);
app.get("/user", user.getUser);

app.get("/products", product.getProducts);
app.post('/addProduct', middlewares.upload, product.addProduct);

app.get("/orders", middlewares.verifyToken, order.getOrders);

app.get('/carts', cart.getCartList)
app.post('/cart/:id', cart.addToCart)
app.delete('/cart', cart.flushCart)
app.patch('/cart/:id', cart.updateCart)


// app.get("/products", middlewares.verifyToken, product.getProducts);

// app.get('/carts', middlewares.verifyToken, cart.flushCart)


app.get("/set-cookie", (req, res) => {
  res.cookie('cookieName', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
  // console.log("req.cookies",req.cookies)
  res.status(200).send(req.cookies)
})

module.exports = app;