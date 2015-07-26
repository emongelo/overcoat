/**
 *
 * Abstract Cache
 * ------------------------
 * ------------------------
 *
 * Cache service for api requests
 *
 */

var Q = require('q');
var cache_manager = require('cache-manager');
var custom_cache = [];

var cache = function () {
  var deferred = Q.defer();

  function get(key, cacheConfig, source) {

    custom_cache[key] = custom_cache[key] || cache_manager.caching(cacheConfig);
    custom_cache[key].wrap(key, function (cache_callback) {
      source().then(function (data) {
        amLogger.log('[cache-service:set cache]:'+key);
        cache_callback(null, data);
      }, cache_callback);
    }, function (err, data) {
      if (err) {
        handleError(err);
      } else {
        amLogger.log('[cache-service:return from cache]:'+key);
        respond(data);
      }
    });

    return deferred.promise;
  }

  //Functions
  function respond(data) {
    deferred.resolve(data);
  }

  function handleError(error) {
    deferred.reject(error);
  }

  return {
    get: get
  }
};

module.exports = cache;
