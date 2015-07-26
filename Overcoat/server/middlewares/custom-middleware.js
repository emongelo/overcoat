var customMiddleware = function(req, res, next){

  setTimeout(function(){
    console.log('Middleware 1');
    next();
  }, 2000);
};

module.exports = customMiddleware;