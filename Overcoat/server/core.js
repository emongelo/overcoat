var core = {
  config: require('./config/config'),
  helpers: require('./helpers/index'),
  interceptors: require('./interceptors/index'),
  middlewares: require('./middlewares/index'),
  models: require('./models/index'),
  services: require('./services/index'),
  transformers: require('./transformers/index'),
  endpoints: require('./resources/endpoints/index'),
  mocks: require('./resources/mocks/index'),
  properties: require('./resources/properties/index')
};

module.exports = core;