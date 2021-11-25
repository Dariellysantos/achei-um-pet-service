const express = require("express");
const router = express.Router();

const controller = require("../controller/userController");

router.post("/user", controller.createUser);

module.exports = router;
