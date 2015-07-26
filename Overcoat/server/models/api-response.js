/**
 *
 * @param response
 * @param body
 * @returns {{headers: *, data: *, error: *, timestamp: number}|*}
 * @constructor
 */
exports.ApiResponse = function (response, body) {
  var _err;
  if ( response && response.statusCode != 200) {
    _err = {
      statusCode: response.statusCode,
      message: body,
    };
  }

  this.data = {
    headers     : (response)? response.headers : undefined,
    data        : body,
    error       : _err,
    timestamp   : new Date().getTime()
  };

  return this.data;
};