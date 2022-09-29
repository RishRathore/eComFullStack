const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const { keys } = require("./configs/index"); 

exports.verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization
  const jwtSecretKey = keys.JWT_SECRET_KEY;
  const token = authorization?.split(" ")[1]
  
  if (token) {
    try {
      jwt.verify(token, jwtSecretKey);
      next()
    } catch (error) {
      res.status(401)
      res.json({
        login: false,
        data: error
      });
    }
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/assets/images'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

exports.upload = multer({ storage }).single("image")
