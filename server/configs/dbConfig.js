
const mongoose = require("mongoose");

const seedDB = require("../seed/index")
const config = require("./index");
const host = config.database.host;
const port = config.database.port;
const db = config.database.db_name;

const mongodb_uri = "mongodb://" + host + ":" + port + "/" + db;

mongoose.connect(mongodb_uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('database connected !!')
    seedDB() // insert some static products and users
  })
  .catch(error => console.log('db connection failed', error));
