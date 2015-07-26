var fs = require("fs");
var _ = require("underscore");

var all = {};
fs.readdirSync(__dirname).forEach(function(file) {

  if(file.indexOf("js") > 0 && file != "index.js") {
    _.extend(all, require("./"+file));
  }

});

module.exports = all;