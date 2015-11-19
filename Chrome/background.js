var enabled = true;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  enabled = !enabled;

	chrome.windows.getAll({populate:true},function(windows){
		windows.forEach(function(window){
			window.tabs.forEach(function(tab){
				runScript(tab.id);
			});
		});
	});

  sendResponse({enabled: enabled});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var url = tab.url;

  if (enabled && url !== undefined && changeInfo.status == 'complete') {
    // Execute some script when the page is fully (DOM) ready
    runScript(tab.id);
  }
});

chrome.runtime.onInstalled.addListener(function(details){
	chrome.windows.getAll({populate:true},function(windows){
		windows.forEach(function(window){
			window.tabs.forEach(function(tab){
				runScript(tab.id);
			});
		});
	});
});

function runScript(tabId) {
  chrome.tabs.executeScript(tabId, {
    file: 'content_script.js'
  });
}