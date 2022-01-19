const model = require("../models/postModel");

exports.getById = async (postId) => {
  const post = await model.getById(postId);

  if (post.lenth === 0) {
    throw Error("POST_NOT_FOUND_ERROR");
  }

  return post[0];
};
