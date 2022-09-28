var orderList = require("../config");
const jwt = require("jsonwebtoken");
const { keys } = require("../config");

var orders = orderList.orders;

exports.getOrders = async (req, res) => {
  let jwtSecretKey = keys.JWT_SECRET_KEY;
  const token = jwt.sign(req.body, jwtSecretKey, { expiresIn: "3h" });
  res.status(200);
  res.send(orders);
};
