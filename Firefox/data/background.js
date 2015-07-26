var js = document.getElementById("overcoatJs"),
  container = document.getElementById("ocExtensionContainer");

self.port.on('status-change', function(status){
  if ( status )
    attachScript();
  else
    dettachScript();
});

function dettachScript() {
  if (js || container) {
    if ( js ) js.remove();
    if ( container ) container.remove();
  }
}

function attachScript() {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.id = "overcoatJs";
  script.src = 'http://dev.overcoat.com:4000/statics/js/iframe/iframe-pkg.js';
  head.appendChild(script);
}