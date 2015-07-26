module.exports = function(req, res, next){
  var header = (/.*\.(overcoat)\..*/.test(req.headers.origin))? req.headers.origin: "";

  res.header("Access-Control-Allow-Origin", header);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};