const express = require("express");
const router = express.Router();

const controller = require("../controller/userController");

router.get("/:id", controller.getById);
router.post("/", controller.createUser);
router.patch("/:id", controller.updateUserById);

module.exports = router;
