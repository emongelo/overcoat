var enabled = true;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  enabled = !enabled;

  runScript();

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
	if(details.reason == "install"){

	}else if(details.reason == "update"){
		//console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
	}
});

function runScript(tabId) {
  chrome.tabs.executeScript(tabId, {
    file: 'content_script.js'
  });
}