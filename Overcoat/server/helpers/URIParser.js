
module.exports = URIParser;

function URIParser (uri, opts) {
  
  var regex = undefined;
  Object.keys(opts).forEach(function (key) {

    regex = new RegExp(":" + key, "g");
    uri = uri.replace( regex, opts[key] || "");
  });

  uri.replace(/\:[a-zA-Z0-9]*/g, "");
  return uri;
}