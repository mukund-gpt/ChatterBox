const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 8000;

const app = express();
app.get("/", (req, res) => {
  res.send("qwerty");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
