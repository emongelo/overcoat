var js = document.getElementById("overcoatJs"),
  container = document.getElementById("ocExtensionContainer");

self.port.on('status-change', function(status){
  if ( status )
    attachScript();
  else
    detachScript();
});

function detachScript() {
	console.log('detach');
  if (js || container) {
    if ( js ) js.remove();
    if ( container ) container.remove();
  }
}

function attachScript() {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.id = "overcoatJs";
  script.src = 'http://ec2-52-8-130-205.us-west-1.compute.amazonaws.com:4000/statics/js/iframe/iframe-pkg.js';
  head.appendChild(script);
}