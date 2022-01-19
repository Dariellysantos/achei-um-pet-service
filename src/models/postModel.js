const schemaPost = require("../models/Schema/postsSchema");

exports.getById = async (postId) => {
  const post = await PostSchema.findById(postId);

  if (post.lenth === 0) {
    return [];
  }

  return [post[0]];
};
