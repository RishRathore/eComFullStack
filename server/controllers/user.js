const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { keys } = require("../configs/index"); 

exports.login = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email, password: req.body.password })
    if (user.length > 0) {
      let jwtSecretKey = keys.JWT_SECRET_KEY;
      const token = jwt.sign(req.body, jwtSecretKey, { expiresIn: "1d" });
      res.status(201);
      res.send({ username: user[0].name, email: user[0].email, token });
    } else {
      res.status(400).json({ message: 'Invalid credentials'});
    }
  } catch (err) {
    res.status(400).json(err)
  }
};

exports.signUp = async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  try {
    if (email.includes("@")) {
      const allusers = await User.find({ email })
      if (allusers.length > 0) {
        res.status(400);
        res.send({ message: "email already exists!" });
      } else {
        if (password === cpassword) {
          try {
            const user = new User({
              name,
              email,
              password,
            })
            let jwtSecretKey = keys.JWT_SECRET_KEY;
            const token = jwt.sign({ name, email, password }, jwtSecretKey, {
              expiresIn: "1d",
            });
            res.status(200);
            await user.save();

            res.send({ token, message: "account created" });
          } catch (err) {
            console.log(err)
            res.status(401).send(err);
          }
        } else {
          res.status(401).send({ message: "password did not matched!" });
        }
      }
    } else {
      res.status(401).send({ message: "invalid email address" });
    }
  } catch (err) {
    console.log('')
    res.status(401).send(err);
  }
};

exports.getUser = async (req, res) => {
  const authorization = req.headers.authorization;
  const jwtSecretKey = keys.JWT_SECRET_KEY;
  const token = authorization.split(" ")[1];
  if (token) {
    try {
      const user = jwt.verify(token, jwtSecretKey);
      const userData = await User.find({ email: user.email })

      res.status(200);
      res.send({
        id: userData[0]._id,
        username: userData[0].name,
        email: userData[0].email,
      });
    } catch (error) {
      res.status(400);
      res.json({
        auth: false,
        data: error,
      });
    }
  }
};