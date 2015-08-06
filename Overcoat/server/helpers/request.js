var Q = require('q');
var request = require('request');

function requestResponse(method, url, params, options) {
  var deferred = Q.defer();

  //options.form = params;
  console.log('[request:make request]'+method+' '+url);
  request[method](url, options, function (error, response, body) {
    if (error) {
      console.error('[request:response error]:' + url + ':' + JSON.stringify(error));
      if(!error.statusCode)
        error.statusCode = 504;
      deferred.reject(error);
    } else {
      console.log('[request:response success]:' + url);
      deferred.resolve({response: response, body: body});
    }
  });

  return deferred.promise;
}

exports.get = function (url, params, options) {
  return requestResponse('get', url, params, options);
};

exports.post = function (url, params, options) {
  return requestResponse('post', url, params, options);
};

exports.put = function (url, params, options) {
  return requestResponse('put', url, params, options);
};

exports.delete = function (url, params, options) {
  return requestResponse('del', url, params, options);
};

exports.head = function (url, params, options) {
  return requestResponse('head', url, params, options);
};

exports.json = function (url, params, options) {
  return requestResponse('json', url, params, options);
};

exports.postJson = function (url, params, options) {
  return requestResponse('postJson', url, params, options);
};


