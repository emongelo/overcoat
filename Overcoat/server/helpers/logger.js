
var Logger = function (config) {
  var bunyan = require('bunyan')(config.logger);

  function log(message, ref) {
    console.log(format(message, ref));
  }

  function debug(message, ref) {
    format(message, ref);
  }

  function trace(message, ref) {
    console.trace(format(message, ref));
  }

  function info(message, ref) {
    console.info(format(message, ref, "info"));
  }

  function warning(message, ref) {
    format(message, ref);
  }

  function error(message, ref) {
    console.error(format(message, ref));
    bunyan.error(ref, format(message, ref));
  }

  function format(message, ref, consoleType) {
    consoleType = consoleType || "";
    var data = (ref && ref.reqInfo) ? ref.reqInfo : (ref && ref.headers) ? ref.headers : ref;

    var actualDate = new Date();
    var actualMonth = (actualDate.getMonth() == 11) ? 12 : actualDate.getMonth() + 1;
    var dateTo = actualDate.getFullYear() + "/" + actualMonth + "/" + actualDate.getDate() + " " + actualDate.getHours() + ":" + actualDate.getMinutes() + ":" + actualDate.getSeconds() + "," + actualDate.getMilliseconds();
    var level = (format.caller) ? format.caller.name.toUpperCase() : "INFO";
    var dataInfo = undefined;
    var responseLog = [];

    if (data) {
      try {
        dataInfo = JSON.stringify(data);
      } catch (e) {
      }
    }

    if(consoleType !== "info")
      responseLog.push(dateTo);
    responseLog.push(level);

    if (process.env.LOG_LEVEL == '2') {
      responseLog.push(dataInfo);
    }

    responseLog.push(message);

    responseLog = responseLog.filter(function (n) {
      return n !== undefined;
    });

    responseLog = responseLog.join(" ");

    return responseLog;

  }

  //newrelic: require('newrelic/lib/logger').child({component: 'error_rate'});

  return {
    log: log,
    debug: debug,
    trace: trace,
    info: info,
    warning: warning,
    error: error
  };

};

module.exports = Logger;