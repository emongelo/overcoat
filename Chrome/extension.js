var toggleLink = document.getElementById('toggleExtension');

toggleLink.addEventListener('click', function() {
  chrome.runtime.sendMessage({}, function(response) {});
}, false);