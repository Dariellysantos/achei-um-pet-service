const express = require("express");
const postRouter = express.Router();

const postController = require("../controller/postController");

postRouter.post("/", postController.createPost);
postRouter.get("/user/:id/posts", postController.getByUserId);
postRouter.delete("/user/post/:id", postController.deletePostById);
postRouter.get("/", postController.getAll);
postRouter.get("/:id", postController.getById);

module.exports = postRouter;
