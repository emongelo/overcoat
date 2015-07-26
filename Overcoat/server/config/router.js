var configurationInterceptor = require('../interceptors/configuration-interceptor'),
  core = require('../core'),
  express = require('express'),
  router = express.Router(),
  apiRouter= express.Router();

module.exports = function(app){
  // Bind Interceptors to routers
  apiRouter.use(configurationInterceptor);
  router.use(configurationInterceptor);

  //Bind method to routers
  require('../controllers/api-controller')(apiRouter);
  require('../controllers/controller')(router);

  //Bind path to routers
  app.use('/api', apiRouter);
  app.use('/', router);
};