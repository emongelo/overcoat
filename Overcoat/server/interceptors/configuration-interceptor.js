module.exports = function(req, res, next){
  req.config = config;
  next();
};