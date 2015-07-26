// Required classes
var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var tabs = require("sdk/tabs");

var Overcoat = {};

// Default options
Overcoat.opts = {
  autorun: true,
  enabled: true
};

// UI Initialization
Overcoat.setupUI = function () {

  // Add tollbar button
  var button = ToggleButton({
    id: "overcoat-button",
    label: "Overcoat Menu",
    icon: {
      "16": "./overcoat-16.png",
      "32": "./overcoat-32.png",
      "64": "./overcoat-64.png"
    },
    onChange: handleChange
  });

  function handleChange(state) {
    if (state.checked) {
      panel.show({position: button});
    }
  }

  // Add panel on button click
  var panel = panels.Panel({
    contentURL: self.data.url("panel.html"),
    onHide: handleHide,
    contentScriptFile: [self.data.url('panel.js')]
  });

  function handleHide() {
    button.state('window', {checked: false});
  }

  // Listen for toggle state
  panel.port.on('toggle-state', function(){
    Overcoat.opts.enabled = !Overcoat.opts.enabled;

    panel.port.emit('status-change', Overcoat.opts.enabled);

    Overcoat.emitStatus(Overcoat.opts.enabled);
  });

  /**
   * Attach external script to all tabs
   */
  Overcoat.emitStatus = function(enabled) {
    for (let tab of tabs) {
      let worker = tab.attach({
        contentScriptFile: [self.data.url('background.js')]
      });

      worker.port.emit("status-change", Overcoat.opts.enabled);
    }
  };

  // Listen for tab openings.
  tabs.on('ready', function onOpen(tab) {
    console.log('tab ready');
    // Ejecutar background
    let worker = tab.attach({
      contentScriptFile: [self.data.url('background.js')]
    });

    worker.port.emit("status-change", Overcoat.opts.enabled);
  });

};

/**
 * Init module
 */
Overcoat.init = function() {
  Overcoat.setupUI();
};

Overcoat.init();