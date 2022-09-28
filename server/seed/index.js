const Product = require("../models/product")
const products = require("./products")

const User = require("../models/user")
const users = require("./users")

const seedDB = async () => {
  const productCount = await Product.count();
  const userCount = await User.count();

  if (productCount === 0) {
    console.log('seeding products...')
    // await Product.deleteMany({});
    await Product.insertMany(products)
  }

  if (userCount === 0) {
    await User.insertMany(users);
  }
}

module.exports = seedDB;