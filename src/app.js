const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger/swagger_output.json");

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

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));

db.connect();

module.exports = app;
