const schema = require("./Schema/postsSchema");
const { convertPostDbToPost } = require("./converters/postsConverter");

exports.getById = async (postId) => {
  const post = await schema.findById(postId);

  if (post.lenth === 0) {
    return [];
  }

  return [convertPostDbToPost(post[0])];
};
