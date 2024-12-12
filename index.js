const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
//connect to mongo DB
try {
  await mongoose.connect(DB_URL);
  console.log("connect to Mongo DB Successfully");
} catch (error) {
  console.log("DB connect error");
}

app.use(cors({ origin: BASE_URL, credentials: true }));
app.use(express.json());
app.get("");
