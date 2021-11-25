const express = require("express");
const router = express.Router();

const controller = require("../controller/userController");

router.get("/posts", controller.getAll);

module.exports = router;
