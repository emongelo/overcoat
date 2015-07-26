var
  _ = require('underscore'),
  path      = require('path'),
  rootPath  = path.normalize(__dirname + '/../..'),
  core      = require('..');

var Config = (function () {

  var _config
    , _env = process.env.NODE_ENV || "development"
    , _def = {
      env: _env,
      version: package.version,
      port : 4000,
      default_domain : "ARG" ,
      locales : ['es', 'en', 'pt'],
      rootPath: rootPath
    };

  _config = _.extend(_def, require("./env/"+ _env ));

  return _config;

}) ();


module.exports = Config;