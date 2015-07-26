/**
 * Module dependencies.
 */
var request = require('../helpers/request');
var extend = require('../helpers/deep_extend');
var uriParser = require('../helpers/URIParser');
var Q = require('q');


/**
 *
 * @returns {{call: call}}
 * @constructor
 */
var ApiConnector = function () {
  var defaultOptions = {
    json: true,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    timeout: 10000
  };


  /**
   *
   * @param method
   * @param url
   * @param params
   * @param options
   * @param apiModel
   * @returns {*|r.promise|Function|promise|d.promise|k.promise}
   */
  function call(method, url, params, options, apiModel) {
    var deferred = Q.defer();
    params = params || {};
    var uri = uriParser(url, params);
    var newOptions = extend(defaultOptions, options);

    request[method](uri, params, newOptions).then(function(data){
      var apiResponse = new apiModel(data.response, data.body);
      if(apiResponse.error)
        return deferred.reject(apiResponse.error);
      deferred.resolve(apiResponse);
    }, function(error){
      deferred.reject(error);
    });

    return deferred.promise;

  }

  return{
    call: call
  }

};


module.exports = ApiConnector;