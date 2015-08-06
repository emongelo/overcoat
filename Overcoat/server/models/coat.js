exports.Coat = function(data) {
  var coat = {};

  coat.id = data.id || undefined;
  coat.userId = data.userId || {};
  coat.message = data.message || undefined;
  coat.upvotes = data.upvotes || undefined;
  coat.downvotes = data.downvotes || undefined;
  coat.tips = data.tips || undefined;
  coat.shares = data.shares || undefined;
  coat.picture = data.picture || undefined;
  coat.replies = data.replies || [];

  return coat;

};