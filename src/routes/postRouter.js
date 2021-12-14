const express = require("express");
const postRouter = express.Router();

const postController = require("../controller/postController");

postRouter.post("/", postController.createPost);
postRouter.get("/:id/user", postController.getByUserId);
postRouter.delete("/:id", postController.deletePostById);
postRouter.get("/", postController.getAll);
postRouter.get("/:id", postController.getById);
postRouter.post("/:id/up", postController.createUp);
postRouter.get("/:id/help", postController.getAllHelper);

module.exports = postRouter;
