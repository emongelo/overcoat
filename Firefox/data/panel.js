//var ext = {};
var toggleLink = document.getElementById('toggleExtension');

toggleLink.addEventListener('click', function(e){
  self.port.emit('toggle-state');
}, false);

self.port.on('status-change', function(status){
  console.log('Status changed: ' + status);
});