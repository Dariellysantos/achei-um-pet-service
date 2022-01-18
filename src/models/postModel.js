const schemaPost = require("../models/Schema/postsSchema");

const getById = (postId) => {
  const post = await PostSchema.findById(postId);

  if (post.lenth === 0) {
    return [];
  }

  return [post[0]];
};
