const Product = require("../models/product")
const products = require("./products")

const seedDB = async () => {
  const count = await Product.count();

  if (count === 0) {
    console.log('seeding products...')
    // await Product.deleteMany({});
    await Product.insertMany(products)
  }
}

module.exports = seedDB;