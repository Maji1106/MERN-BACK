const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);

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
      message: "User registered successfully!",
      user: user, // Optionally, you might want to return the user data
    });
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while registering the user.",
      error: error.message,
    });
  }
};
