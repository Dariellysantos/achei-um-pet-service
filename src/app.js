const express = require("express");
const cors = require("cors");

require("dotenv").config();
const db = require("./database/mongoConfig");

const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const loginRouter = require("./routes/loginRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/login", loginRouter);

db.connect();

module.exports = app;
