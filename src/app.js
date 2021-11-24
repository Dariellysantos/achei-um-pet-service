require("dotenv").config();
const db = require("./database/mongoConfig");

const express = require("express");
const app = express();

db.connect();

module.exports = app;
