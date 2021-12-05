const express = require("express");
const postRouter = express.Router();

const postController = require("../controller/postController");

postRouter.post("/", postController.createPost);
postRouter.get("/user/:id", postController.getByUserId);
postRouter.delete("/post/:id", postController.deletePostById);
postRouter.get("/", postController.getAll);
postRouter.get("/:id", postController.getById);
postRouter.post("/:id/up", postController.createUp);

module.exports = postRouter;
