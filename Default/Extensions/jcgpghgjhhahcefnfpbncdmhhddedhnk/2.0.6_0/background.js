/**
 * CTRE v2
 * by blade.sk
 */

function setActive() {
	chrome.browserAction.setIcon( { path: 'icons/action_active.png' } );
	chrome.browserAction.setTitle( { title: 'Click to remove element [active]' });
}

function setInactive() {
	chrome.browserAction.setIcon( { path: 'icons/action_inactive.png' } );
	chrome.browserAction.setTitle( { title: 'Click to remove element' });
}

function checkActive() {
	chrome.tabs.getSelected(null, function(tab) {
		if (!tab || tab.id < 0) return; // not really a tab, most likely a devtools window

		if (tab.url.substr(0,4) != 'http') {
			chrome.browserAction.setIcon( { path: 'icons/action_unavailable.png' } );
			chrome.browserAction.setTitle( { title: 'Click to remove element [unavailable for this tab]' });
			chrome.browserAction.disable(tab.id);
			return;
		} else {
			chrome.browserAction.enable(tab.id);
		}
		
		chrome.tabs.sendMessage(tab.id, { action: 'getStatus' }, function(isActive) {
			if (chrome.runtime.lastError) return;

			if (isActive) {
				setActive();
			} else {
				setInactive();
			}
		});
	});
}

chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, { 'action': 'toggle' }, function(response) {
			if (chrome.runtime.lastError) {
				// lastError needs to be checked, otherwise Chrome may throw an error
			}

			if (!response) {
				chrome.tabs.executeScript(tab.id, {
					code: "if (confirm('This tab was loaded before CTRE was installed. Would you like to reload it?\\nThis is necessary only the first time.')) location.reload();"
				});
			}
		});
	});
});

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.action == 'status' && msg.active == true) {
		setActive();
	} else if (msg.action == 'status' && msg.active == false) {
		setInactive();
	}

	if (msg.action == 'get_saved_elms') {
		sendResponse(localStorage['web:' + msg.website] || '[]');
	} else if (msg.action == 'set_saved_elms') {
		localStorage['web:' + msg.website] = msg.data;
	} else if (msg.action == 'get_settings') {
		sendResponse(localStorage['settings'] || '{}');
	} else if (msg.action == 'set_settings') {
		localStorage['settings'] = msg.data;
	}
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
	checkActive();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	checkActive();
});

checkActive();