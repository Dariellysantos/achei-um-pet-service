const express = require("express");
const cors = require("cors");

require("dotenv").config();
const db = require("./database/mongoConfig");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

db.connect();

module.exports = app;
