const express = require("express");
const postRouter = express.Router();

const postController = require("../controller/postController");

postRouter.post("/", postController.createPost);
postRouter.get("/user/:id/posts", postController.getByUserId);

module.exports = postRouter;
