global.config = require('../config/config');

var express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  I18n = require('i18n-2'),
  corsInterceptor = require('../interceptors/cors-interceptor'),
  app = express();

if (app.get('env') === 'development') app.locals.pretty = true;
app.set('views', path.join(config.rootPath, 'views'));
app.set('view engine', 'jade');
app.set('port', config.port);
app.use(corsInterceptor);
app.use('/statics', express.static(path.join(config.rootPath, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

config.i18n = new I18n({ locales: config.locales, directory: config.rootPath+'/server/resources/i18n' });
I18n.expressBind(app, { locales: config.locales, directory: config.rootPath+'/server/resources/i18n'});

require('./router')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next();
});

// production error handler | no stacktraces leaked to user
if(app.get('env') !== "development"){
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send( {
        message: err.message,
        error: {}
    });
  });
}

console.log('App "Overcoat" started on port ' + config.port);
console.log('Environment ' + config.env);
console.log('App version ' + config.version);

module.exports = app;