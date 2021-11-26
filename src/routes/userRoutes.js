const express = require("express");
const router = express.Router();

const controller = require("../controller/userController");

router.get("/posts", controller.getAll);
router.get("/posts/:id", controller.getById);

module.exports = router;