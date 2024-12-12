const express = require("express");
const router = express.router();
const userController = require("../controllers/user.controller");

router.post("/register", userController.register);

module.exports = router;
