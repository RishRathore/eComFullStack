var cartList = require("../config");
var productList = require("../config");
var orderList = require("../config");
const jwt = require("jsonwebtoken");
const { keys } = require("../config");

var carts = cartList.carts;
var products = productList.products;
var orders = orderList.orders;

exports.addToBag = async (req, res) => {
  let jwtSecretKey = keys.JWT_SECRET_KEY;
  const token = jwt.sign(req.params, jwtSecretKey, { expiresIn: "3h" });
  const { id } = req.params;
  const data = products.filter((item) => item.id == id)[0];
  products.map((item) => {
    if (item.id == id) {
      item.stock = item.stock - 1;
    }
  });
  if (data) {
    const fillCarts = carts.filter((item) => item.product_id == id);
    if (fillCarts.length > 0) {
      carts.forEach((item, index) => {
        if (item.product_id == id) {
          item.quantity = item.quantity + 1;
        }
      });
      res.status(200);
      // res.cookie("jwtoken", token, {
      //   expiresIn: "1d",
      //   httpOnly: true,
      // });
      res.send(carts);
    } else {
      try {
        carts.push({
          id: carts.length + 1,
          product_id: parseInt(id),
          user_id: 1,
          quantity: 1,
        });

        // res.cookie("jwtoken", token, {
        //   expiresIn: "1d",
        //   httpOnly: true,
        // });
        res.status(200);
        res.send("product added into cart");
      } catch (err) {
        // res.cookie("jwtoken", token, {
        //   expiresIn: "1d",
        //   httpOnly: true,
        // });
        res.status(400);
        res.send(err);
      }
    }
  }
};

exports.getBagList = async (req, res) => {
  console.log("req.cookies==========",req.cookies)
  let jwtSecretKey = keys.JWT_SECRET_KEY;
  const token = jwt.sign(req.body, jwtSecretKey, { expiresIn: "3h" });
  let cartlist = [];
  try {
    carts.forEach((item) => {
      const product = products.find(({ id }) => id === item.product_id);
      cartlist.push({
        ...product,
        quantity: item.quantity,
        total_price: product.price * item.quantity,
      });
    });
    // res.cookie("jwtoken", token, {
    //   expiresIn: "1d",
    //   httpOnly: true,
    // });
    res.status(200);
    res.send(cartlist);
  } catch (err) {
    res.status(400);
    console.log("err", err);
  }
};

exports.updateBag = async (req, res) => {
  let jwtSecretKey = keys.JWT_SECRET_KEY;
  const token = jwt.sign(req.body, jwtSecretKey, { expiresIn: "3h" });
  const { id } = req.params;
  const { quantity } = req.body;

  products.map((item) => {
    if (item.id == id) {
      item.stock = item.stock - quantity;
    }
  });

  try {
    carts.forEach((item, index) => {
      if (item.product_id == id) {
        carts.splice(index, 1, { ...item, quantity: quantity });
      }
    });
    let cartlist = [];
    try {
      carts.forEach((item) => {
        const product = products.find(({ id }) => id === item.product_id);
        cartlist.push({
          ...product,
          quantity: item.quantity,
          total_price: product.price * item.quantity,
        });
      });
      // res.cookie("jwtoken", token, {
      //   expiresIn: "1d",
      //   httpOnly: true,
      // });
      res.status(200);
      res.send(cartlist);
    } catch (err) {
      res.status(400);
      console.log("err", err);
    }
    // res.cookie("jwtoken", token, {
    //   expiresIn: "1d",
    //   httpOnly: true,
    // });
    res.status(200);
    res.send(cartlist);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

exports.removeBag = async (req, res) => {
  let jwtSecretKey = keys.JWT_SECRET_KEY;
  const token = jwt.sign(req.body, jwtSecretKey, { expiresIn: "3h" });
  const { id } = req.body;

  carts.forEach((item) => {
    const product = products.find(({ id }) => id === item.product_id);
    if (product) {
      orders.push({
        ...product,
        quantity: item.quantity,
        total_price: product.price * item.quantity,
        date: new Date(),
      });
    }
    return [];
  });

  try {
    if (id) {
      const filterCarts = carts.filter((item) => item.product_id != id);
      // res.cookie("jwtoken", token, {
      //   expiresIn: "1d",
      //   httpOnly: true,
      // });
      res.status(200);
      res.send("product has been removed from the cart");
    } else {
      // res.cookie("jwtoken", token, {
      //   expiresIn: "1d",
      //   httpOnly: true,
      // });
      res.status(200);
      res.send("");
    }
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};
