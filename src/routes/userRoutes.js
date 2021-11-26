const express = require("express");
const router = express.Router();

const controller = require("../controller/userController");

router.get("/posts", controller.getAll);
router.get("/posts/:id", controller.getById);
router.post("/user", controller.createUser);

module.exports = router;
