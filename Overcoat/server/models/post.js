exports.Post = function(data) {
  var post = {};

  post.id = data.id || undefined;
  post.userId = data.userId || {};
  post.coatId = data.coatId || undefined;
  post.message = data.message || undefined;
  post.upvotes = data.upvotes || undefined;
  post.downvotes = data.downvotes || undefined;
  post.tips = data.tips || undefined;
  post.shares = data.shares || undefined;
  post.picture = data.picture || undefined;
  post.replies = data.replies || [];

  return post;

};