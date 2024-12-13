const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");  // Added required dependency for jwt
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);
const secret = "your_jwt_secret";  // Defined the secret variable

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Please provide all required fields!",
    });
    return;
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({
      username,
      password: hashedPassword,
    });
    res.send({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something went wrong while registering a new user",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Please provide all required fields!",
    });
    return;
  }

  try {
    const userDoc = await UserModel.findOne({ username });
    if (!userDoc) {
      res.status(404).send({
        message: "User not found",
      });
      return;
    }

    const isPasswordMatched = await bcrypt.compare(password, userDoc.password);
    if (!isPasswordMatched) {
      res.status(401).send({
        message: "Invalid credentials",
      });
      return;
    }

    // Login success
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) {
        return res.status(500).send({
          message: "Internal server error: Authentication failed!",
        });
      }

      // Token generated
      res.send({
        message: "User logged in successfully",
        token,  // Added the token to the response
      });
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something went wrong while logging in",
      
    });
  }
};
