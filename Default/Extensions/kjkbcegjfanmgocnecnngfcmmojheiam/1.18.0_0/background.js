/*
Copyright (c) 2017-2019 Marco Foit. All rights reserved.
All portions of this file are the confidential and proprietary intellectual property of Marco Foit.
Use of this file is permitted only within the Favorites Google Chrome™ extension as published on the Google Chrome Web Store™.
For more information, see README.txt in the root directoy of this extension. Thank you!
*/
const api = {};
{
	api.SERVER_URL = (chrome.runtime.id == "kjkbcegjfanmgocnecnngfcmmojheiam") ? 'https://api.web-accessories.com' : 'http://localhost';
	const traverseAPIEventListeners = function(name, dict, callback) {
		if(api[name][dict]) {
			let listeners = api[name][dict];
			for(let cAPIName of Object.keys(listeners)) {
				let cAPIListeners = listeners[cAPIName];
				for(let cAPIEventName of Object.keys(cAPIListeners)) {
					callback(cAPIName, cAPIEventName, cAPIListeners[cAPIEventName]);
				}
			}
		}
	}
	const initAPISessionListeners = function(name) {
		traverseAPIEventListeners(name, "sessionListeners", (chromeAPIName, chromeAPIEventName, listener) => {
			chrome[chromeAPIName][chromeAPIEventName].addListener((a1,a2,a3,a4,a5) => api[name].isReady.then(()=>listener(a1,a2,a3,a4,a5)));
		});
	}
	const initAPIListeners = function(name) {
		traverseAPIEventListeners(name, "listeners", (chromeAPIName, chromeAPIEventName, listener) => {
			chrome[chromeAPIName][chromeAPIEventName].addListener(listener);
		});
	}
	const suspendAPIListeners = function(name) {
		traverseAPIEventListeners(name, "listeners", (chromeAPIName, chromeAPIEventName, listener) => {
			chrome[chromeAPIName][chromeAPIEventName].removeListener(listener);
		});
	}
	const initAPI = function(name) {
		if(!api[name].isReady) {
			initAPISessionListeners(name);
			api[name].isReady = (
					api[name].await ? Promise.all(api[name].await.map(initAPI)) : Promise.resolve()
				)
				.then(()=>
					api[name].init ? api[name].init() : true
				)
				.then(()=>
					initAPIListeners(name)
				)
				.then(()=>{
					const t1 = performance.now();
				})
		}
		return api[name].isReady;
	}
	var defineAPI = function(name, def) {
		api[name] = def;
	}
	var apiReady = new Promise(
			resolve=>window.addEventListener("load", resolve)
		)
		.then(()=>
			Promise.all(Object.keys(api).map(initAPI))
		)
		.then(()=>(window.api=api))
	chrome.runtime.onSuspend.addListener(()=>Object.keys(api).forEach(suspendAPIListeners));
	chrome.runtime.onSuspendCanceled.addListener(()=>Object.keys(api).forEach(initAPIListeners));
	api.ui = window;
}
{
	let settings, extensionEvent;
	let cache = {};
	const getChildren = function(id, callback) {
		if(!cache[id])
			cache[id] = { children : null }
		if(!(cache[id].children)) {
			cache[id].children = new Promise((resolve, reject) => {
				chrome.bookmarks.getChildren(id, children=>{
					if(chrome.runtime.lastError)
						reject(chrome.runtime.lastError);
					else
						resolve(children);
				});
			})
		}
		if(callback)
			return cache[id].children.then(callback, callback);
		else
			return cache[id].children;
	}
	const getSingle = function(id, callback) {
		if(!cache[id])
			cache[id] = { node : null }
		if(!(cache[id].node)) {
			cache[id].node = new Promise((resolve, reject) => {
				chrome.bookmarks.get(id, nodes=>{
					if(chrome.runtime.lastError)
						reject(chrome.runtime.lastError);
					else
						resolve((nodes && nodes.length) ? nodes[0] : null)
				});
			})
		}
		if(callback)
			return cache[id].node.then(callback, callback);
		else
			return cache[id].node;
	}
	const getPath = function(id, callback) {
		let path = [];
		let loadNext = () => getSingle(id).then(node =>{
			if(node)
				path.unshift(node);
			if(node && (node.parentId != undefined)) {
				id = node.parentId;
				return loadNext();
			}
			else {
				if(callback)
					callback(path);
				else
					return Promise.resolve(path);
			}
		})
		return loadNext();
	}
	const loadDefaultCatch = function() { return []; }
	const loadDefault = function() {
		const rootFolderId = settings.get("root-folder");
		var folderId;
		if(settings.get("show-last-visited-folder") && localStorage.getItem('navigation/last-visited-folder'))
			folderId = localStorage.getItem('navigation/last-visited-folder');
		else if(rootFolderId)
			folderId = rootFolderId;
		else
			folderId = "1";
		let preloadFoldersForIcons;
		if(settings.get("icon-folder-thumbnails")) {
			preloadFoldersForIcons = (nodes) => {
				return nodes
					.filter(node => !node.url)
					.map(node => getChildren(node.id))
			}
		};
		const promises = [];
		if(settings.get("show-navigation-bar")) {
			promises.push(
				getSingle(rootFolderId)
					.then(rootFolderNode => getChildren(rootFolderNode.parentId) )
					.catch(loadDefaultCatch)
			);
		}
		promises.push(getPath(folderId).catch(loadDefaultCatch));
		promises.push(
			getChildren(folderId)
				.then(preloadFoldersForIcons)
				.catch(loadDefaultCatch)
		);
		if(settings.get("show-dock")) {
			promises.push(
				getChildren(settings.get("dock-folder"))
					.then(preloadFoldersForIcons)
					.catch(loadDefaultCatch)
			);
		}
		return Promise.all(promises);
	}
	let resetCachePromise = null;
	const resetCache = function() {
		if(!resetCachePromise) {
			cache = {};
			resetCachePromise = new Promise(resolve=>setTimeout(resolve,50))
				.then(loadDefault)
				.then(()=>{
					resetCachePromise = null;
					extensionEvent.dispatch("bookmarks/change");
				});
		}
		return resetCachePromise;
	}
	const moveMany = function(ids, parentId, index, callback) {
		var idsToMove = ids.slice();
		var allIds;
		var movedNodes = 0;
		var moveNext = function() {
			var id = idsToMove.shift();
			if(id) {
				chrome.bookmarks.move(id, {parentId, index} , node=>{
					if(node) {
						var indexBefore = allIds.indexOf(id);
						if(indexBefore != node.index)
							movedNodes++;
						if((indexBefore < 0) || (indexBefore >= index)) {
							index++;
						}
					}
					moveNext();
				})
			}
			else {
				callback(movedNodes);
			}
		}
		chrome.bookmarks.getChildren(parentId, allNodes => {
			if(index>allNodes.length)
				index = allNodes.length;
			if(index<0)
				index = 0;
			allIds = allNodes.map(node=>node.id);
			moveNext();
		});
	}
	const reorderByTitle = function(parentId, callback) {
		var sortedNodes, i=0;
		var moveNext = function() {
			var node = sortedNodes.shift();
			if(node)
				chrome.bookmarks.move(node.id, {parentId, index:i++} , moveNext);
			else
				callback();
		}
		chrome.bookmarks.getChildren(parentId, allNodes => {
			sortedNodes = allNodes.sort((na,nb)=>na.title.toLowerCase().localeCompare(nb.title.toLowerCase()))
			moveNext();
		});
	}
	const safecreate = function(bookmark, callback) {
		if(bookmark.parentId === undefined) {
			throw new Error("parentId is mandatory!");
		}
		if(bookmark.index === undefined) {
			bookmark.index = Number.MAX_VALUE;
		}
		chrome.bookmarks.getChildren(bookmark.parentId, parentNodes => {
			if(bookmark.index > (parentNodes.length-1))
				bookmark.index = parentNodes.length;
			if((bookmark.index<0) || (!Number.isInteger(bookmark.index)))
				bookmark.index = 0;
			chrome.bookmarks.create(bookmark, callback);
		});
	}
	const safecreatemany = function(parentId, index, bookmarks, callback) {
		callback = callback ? callback : ()=>{};
		if(parentId === undefined) {
			throw new Error("parentId is mandatory!");
		}
		if(index === undefined) {
			index = Number.MAX_VALUE;
		}
		var nodesCreated = [];
		if(bookmarks.length==0)
			return callback(nodesCreated);
		chrome.bookmarks.getChildren(parentId, parentNodes => {
			if(index > (parentNodes.length-1))
				index = parentNodes.length;
			if((index<0) || (!Number.isInteger(index)))
				index = 0;
			bookmarks = bookmarks.slice();
			var i = 0;
			var createNext = ()=>{
				var bookmark = bookmarks.shift();
				if(bookmark) {
					var properties = {parentId, index : index + i, title : bookmark.title};
					if(bookmark.url)
						properties.url = bookmark.url;
					chrome.bookmarks.create(
						properties,
						bookmarkTreeNode=>{
							if(!chrome.runtime.lastError) {
								i++;
								nodesCreated.push(bookmarkTreeNode);
							}
							if(bookmarkTreeNode && !bookmarkTreeNode.url && bookmark.children) {
								safecreatemany(bookmarkTreeNode.id, 0, bookmark.children, createNext);
							}
							else
								createNext();
						}
					);
				}
				else
					callback(nodesCreated);
			}
			createNext();
		});
	}
	const getAllURLS = function(idOrArray, callback) {
		var urls = [];
		let collectURLS = function(nodes) {
			for(let node of nodes) {
				if(node.url)
					urls.push(node.url);
				else
					collectURLS(node.children);
			}
		}
		var ids = Array.isArray(idOrArray) ? idOrArray : [idOrArray];
		return Promise.all(
			ids.map(id => new Promise(resolve=>{
				chrome.bookmarks.getSubTree(id, nodes => {
					if(nodes)
						collectURLS(nodes)
					resolve();
				})
			}))
		)
		.then(()=>{
			if(callback)
				callback(urls); // FIXME both? really?
			return urls;
		})
	}
	const onBookmarkCreated = function(id, bookmark) {
		resetCache().then(()=>extensionEvent.dispatch("bookmarks/created", {id, bookmark}));
	}
	const onBookmarkRemoved = function(id, removeInfo) {
		resetCache().then(()=>extensionEvent.dispatch("bookmarks/removed", {id, removeInfo}));
	}
	const onBookmarkChanged = function(id, changeInfo) {
		resetCache().then(()=>extensionEvent.dispatch("bookmarks/changed", {id, changeInfo}));
	}
	const onBookmarkMoved = function(id, moveInfo) {
		resetCache().then(()=>extensionEvent.dispatch("bookmarks/moved", {id, moveInfo}));
	}
	const onBookmarkChildrenReordered = function(id, reorderInfo) {
		resetCache().then(()=>extensionEvent.dispatch("bookmarks/childrenReordered", {id, reorderInfo}));
	}
	const init = function() {
		settings = api.settings;
		extensionEvent = api.extensionEvent;
	}
	defineAPI("bookmarks", {
		await : ["settings", "extensionEvent"],
		init,
		listeners : {
			bookmarks : {
				onCreated : onBookmarkCreated,
				onRemoved : onBookmarkRemoved,
				onChanged : onBookmarkChanged,
				onMoved : onBookmarkMoved,
				onChildrenReordered : onBookmarkChildrenReordered,
			}
		},
		getChildren,
		getSingle,
		getPath,
		moveMany,
		reorderByTitle,
		safecreate,
		safecreatemany,
		update : chrome.bookmarks.update,
		getSubTree : chrome.bookmarks.getSubTree,
		getTree : chrome.bookmarks.getTree,
		getAllURLS,
		removeTree : chrome.bookmarks.removeTree,
		move : chrome.bookmarks.move,
		remove : chrome.bookmarks.remove,
		search : chrome.bookmarks.search
	})
}
{
	const ICON_DICT_DEFAULT = {
        "16": "/icon-16.png",
        "24": "/icon-24.png",
        "32": "/icon-32.png",
        "48": "/icon-48.png",
        "64": "/icon-64.png",
        "128": "/icon-128.png"
	};
	const update = function() {
		switch(settings.get("browser-action")) {
			case "popup":
				chrome.browserAction.setPopup({ popup: "/page.html?theme&ui=PopupUI&style=width:800px;height:600px;overflow:hidden;"});
			break;
			default:
				chrome.browserAction.setPopup({ popup: "" });
			break;
		}
	}
	const delay = function(timeout) {
		return new Promise(resolve=>setTimeout(resolve, timeout));
	}
	const getExtensionTabIds = function() {
		return Promise.all(
			chrome.extension
				.getViews()
				.map(
					win=>new Promise((resolve) =>
						win.chrome.tabs.getCurrent(resolve)
					)
				)
		)
		.then(tabs=>tabs.filter(tab=>!!(tab)).map(tab=>tab.id))
	}
	const onBrowserActionClicked = function(tab) {
		chrome.tabs.update(null, { url: "chrome://newtab" }, tab=>{
			delay(1000)
				.then(getExtensionTabIds)
				.then(extensionTabIds=>{
					if(!extensionTabIds.includes(tab.id)) {
						if(tab.incognito && (settings.get("browser-action") != "popup")) {
							if(confirm(chrome.i18n.getMessage("confirm_popup_incognito"))) {
								alert(chrome.i18n.getMessage("popup_incognito_enabled"));
								settings.set("browser-action", "popup");
							}
						}
						else {
							alert(chrome.i18n.getMessage("error_newtab_occupied"));
							chrome.tabs.update(tab.id, { url: "chrome://extensions" });
						}
					}
				})
		});
	}
	const init = function() {
		settings = api.settings;
		addEventListener("settings/browser-action", update);
		update();
	}
	defineAPI("browserAction", {
		await:["settings"],
		sessionListeners : {
			browserAction : {
				onClicked : onBrowserActionClicked,
			},
		},
		init
	})
}
{
	const openBookmarklet = function(js) {
		const js_encoded = encodeURIComponent(js);
		const code = `
		var script = document.createElement('script');
		script.textContent = decodeURIComponent("${js_encoded}");
		document.body.appendChild(script);
		script.remove();
		`;
		chrome.tabs.executeScript({code}, ()=>{
			if(chrome.runtime.lastError) {
				alert("Javascript bookmarks do not work in this tab!");
			}
		});
	}
	const openInCurrentTab = function(url) {
		if(url.startsWith("javascript:")) {
			openBookmarklet(url.substr(11));
		}
		else {
			chrome.tabs.update(null, {url})
			api.extensionEvent.dispatch("browser/open", {urls:[url]});
		}
	}
	const openInNewTab = function(urlOrArrayOfUrls, win, active, callback) {
		var urls = Array.isArray(urlOrArrayOfUrls) ? urlOrArrayOfUrls : [urlOrArrayOfUrls];
		if(!urls.length)
			return;
		win = (win || window);
		win.chrome.tabs.getCurrent(currentTab=>{
			win.chrome.tabs.query(
				{windowId : chrome.windows.WINDOW_ID_CURRENT},
				tabs => {
					let refTab = currentTab;
					tabs.forEach(tab=>{
						if(tab.openerTabId && currentTab && (currentTab.id == tab.openerTabId))
							refTab = tab;
					});
					let refTabIndex = refTab ? refTab.index : 9999; // refTab might be undefined for incognito windows
					urls.forEach((url, i) =>
						win.chrome.tabs.create(
							{url, index : refTabIndex+i+1, active : !!active, openerTabId : currentTab ? currentTab.id : undefined},
							callback
						)
					)
					api.extensionEvent.dispatch("browser/open", {urls});
				}
			);
		});
	}
	const openInNewWindow = function(urlOrArrayOfUrls, incognito) {
		var urls = Array.isArray(urlOrArrayOfUrls) ? urlOrArrayOfUrls : [urlOrArrayOfUrls];
		if(!urls.length) return;
		chrome.windows.create({"url": urls, "incognito": incognito});
		api.extensionEvent.dispatch("browser/open", {urls});
	}
	const popups = {};
	const openInPopupWindow = function(name, url, width, height, type) {
		const left = screen.left||0 + Math.round((screen.width - width) / 2);
		const top = screen.top||0 + Math.round((screen.height - height) / 2);
		type = type || "popup";
		const createNew = () => chrome.windows.create(
			{
				url, left, top, width, height, type, focused: true
			},
			w=>{
				popups[name] = w.tabs[0].id;
			}
		);
		if(popups[name]) {
			chrome.tabs.get(popups[name], tab => {
				if(chrome.runtime.lastError) {
					delete popups[name];
					createNew();
				}
				else {
					chrome.tabs.update(popups[name], { url, highlighted : true });
					chrome.windows.update(tab.windowId, {focused:true});
				}
			})
		}
		else {
			createNew();
		}
	}
	defineAPI("browser", {
		openInNewTab,
		openInCurrentTab,
		openInNewWindow,
		openInPopupWindow
	})
}
{
	let ts = null;
	let data = null;
	const setData = function(_ts, _data) {
		ts = _ts;
		data = _data;
	}
	const getData = function() {
		return data;
	}
	const getTS = function() {
		return ts;
	}
	defineAPI("clipboardutil", {
		setData,
		getData,
		getTS
	});
}
{
	const updateMenu = function() {
		chrome.contextMenus.removeAll()
		chrome.contextMenus.create({
			id : "show-favorites-in-popup",
			type : "checkbox",
			title: chrome.i18n.getMessage("show_favorites_in_popup"),
			checked : (api.settings.get("browser-action") == "popup"),
			contexts : ["browser_action"]
		});
		chrome.contextMenus.create({
			id : "settings",
			title: chrome.i18n.getMessage("settings"),
			contexts : ["browser_action"]
		});
		chrome.contextMenus.create({
			id : "help",
			title: chrome.i18n.getMessage("help"),
			contexts : ["browser_action"]
		});
		chrome.contextMenus.create({
			id : "set-wallpaper",
			title: chrome.i18n.getMessage("set_wallpaper_"),
			contexts : ["image"]
		});
	}
	const onContextMenuItemClicked = function(info, tab) {
		switch(info.menuItemId) {
			case "show-favorites-in-popup":
				api.settings.set("browser-action", info.wasChecked ? "default" : "popup");
			break;
			case "settings":
				api.settingsWindow.show();
			break;
			case "help":
				if(tab.incognito)
					api.helpDoc.showInNewWindow();
				else
					api.helpDoc.showInWindow(tab.windowId);
			break;
			case "set-wallpaper":
				if(info.srcUrl && confirm(chrome.i18n.getMessage("set_wallpaper_")  + " \n" + chrome.i18n.getMessage("confirm_changes"))) {
					api.settings.set("background-type", "web");
					api.settings.set("background-web", {
						url: info.srcUrl,
						expires : 8640000000000000
					});
				}
			break;
		}
	}
	const init = function() {
		addEventListener("settings/browser-action", updateMenu);
		updateMenu();
	}
	defineAPI("contextMenu", {
		await : ["settingsWindow", "settings"],
		init,
		sessionListeners : {
			contextMenus : {
				onClicked : onContextMenuItemClicked,
			}
		}
	});
}
{
	const nodesToHTML = function(nodes) {
		return nodes
			.map(node=>
				node.url ?
					'<a href="'+node.url+'">'+node.title+'</a>' :
					'<a href="chrome://newtab#'+node.id+'">New Tab [ID: '+node.id+']</a>'
			)
			.join("<br>\n")
	}
	const nodesToText = function(nodes) {
		return nodes
			.map(node=>{
				return node.url ? node.url : 'chrome://newtab#bookmarks?' + node.id
			})
			.join("\n")
	}
	const exportToEventData = function(eventData, nodes) {
		eventData.setData("text/plain", nodesToText(nodes));
		eventData.setData("text/html", nodesToHTML(nodes));
	}
	defineAPI("dataExport", {
		exportToEventData
	})
}
{
	const importFromBookmarkTreeNodes = function(bookmarkTreeNodes, parentId, index, callback) {
		api.bookmarks.safecreatemany(parentId, index, bookmarkTreeNodes, callback);
		return bookmarkTreeNodes.length;
	}
	const importFromHTML = function(html, parentId, index, callback) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(html, "text/html");
		var links = [];
		anchors = doc.querySelectorAll("a");
		for(var i=0; i<anchors.length; i++) {
			var a = anchors[i];
			var href = a.getAttribute("href");
			if(!href)
				continue;
			var title = a.textContent;
			if(!title)
				title = href;
			links.push({ url : href, title : title.trim()});
		}
		return importFromBookmarkTreeNodes(links, parentId, index, callback);
	}
	const importFromURIList = function(uriList, parentId, index, callback) {
		var links = uriList
			.trim()
			.split("\n")
			.map(line=>line.trim())
			.filter(line=>line.charAt(0) != '#')
			.map(uri=>{
				return {
					url : uri,
					title : uri
				}
			})
		return importFromBookmarkTreeNodes(links, parentId, index, callback);
	}
	const importFromEventData = function(eventData, parentId, index, callback) {
		var data;
		if(data = eventData.getData("text/html")) {
			return importFromHTML(data, parentId, index, callback);
		}
		if(data = eventData.getData("text/uri-list")) {
			return importFromURIList(data, parentId, index, callback);
		}
	}
	defineAPI("dataImport", {
		await : ["bookmarks"],
		importFromEventData
	})
}
{
	const diff = function(a, b) {
		var changed = [];
		for(var ak in a) {
			if(b[ak] === undefined)
				changed.push(ak);
			else if(a[ak] != b[ak]) {
				changed.push(ak);
			}
		}
		for(var bk in b) {
			if((a[bk] === undefined))
				changed.push(bk);
		}
		return changed;
	}
	defineAPI("dictUtil", {
		diff
	})
}
{
	let data = null;
	const setData = function(_data) {
		data = _data;
	}
	const getData = function() {
		return data;
	}
	const clearData = function() {
		data = null;
	}
	const hasData = function() {
		return data != null;
	}
	defineAPI("dndutil", {
		setData,
		getData,
		hasData,
		clearData
	});
}
{
	const dispatch = function(name, detail, onlyInBackgroundPage) {
		var event = new CustomEvent(name, {detail});
		window.dispatchEvent(event);
		if(!onlyInBackgroundPage) {
			const views = chrome.extension.getViews();
			if(views) {
				views.forEach(win=>{
					if(win != window) {
						win.dispatchEvent(event);
					}
				})
			}
		}
	}
	defineAPI("extensionEvent", {
		dispatch
	})
}
{
	const update = function() {
		var unreadItems = api.feedSubscriptionsStats.getUnreadItems("0");
		var text = "" + (unreadItems ? api.stringUtil.formatCounter1K(unreadItems) : "");
		chrome.browserAction.setBadgeText({text});
	}
	const init = function() {
		chrome.browserAction.setBadgeBackgroundColor({color : '#D8072B'});
		addEventListener("feedSubscriptionsStats/change", update);
	}
	defineAPI("feedSubscriptionsBadge", {
		await : ["feedSubscriptionsStats", "stringUtil"],
		init
	})
}
{
	let feedSubscriptions, bookmarks, extensionEvent;
	let nodes = {};
	const addBookmarkNode = function(node) {
		nodes[node.id] = node;
		return (
			(node.parentId && (nodes[node.parentId] == undefined ))
				? new Promise(resolve=>bookmarks.getSingle(node.parentId, resolve))
					.then(node => node ? addBookmarkNode(node) : null)
				: Promise.resolve()
		);
	}
	const addBookmarkURL = function(url) {
		return (
			new Promise(resolve => bookmarks.search({url}, resolve))
				.then(nodes => Promise.all(nodes.map(node => addBookmarkNode(node))))
		);
	}
	const collectGarbageParents = function(parentId) {
		while(parentId && nodes[parentId]) {
			for(var id in nodes) {
				if(nodes[id].parentId == parentId)
					return;
			}
			var node = nodes[parentId];
			delete nodes[parentId];
			parentId = node.parentId;
		}
	}
	const collectGarbageChildren = function(parentId) {
		for(var id in nodes) {
			if(nodes[id].parentId == parentId) {
				if(!nodes[id].url)
					collectGarbageChildren(id);
				delete nodes[id];
			}
		}
	}
	const removeBookmarkNode = function(id) {
		var node = nodes[id];
		if(!node) return;
		delete nodes[id];
		if(!node.url)
			collectGarbageChildren(id);
		collectGarbageParents(node.parentId);
	}
	const removeBookmarkURL = function(url) {
		for(var id in nodes) {
			if(nodes[id].url == url) {
				removeBookmarkNode(id);
			}
		}
	}
	let dispatchChangeTimeout;
	const dispatchChangeThrottled = function() {
		extensionEvent.dispatch("feedSubscriptionsBookmarks/change", null, false);
	}
	const dispatchChange = function() {
		clearTimeout(dispatchChangeTimeout);
		dispatchChangeTimeout = setTimeout(dispatchChangeThrottled, 150);
	}
	const getURLS = function() {
		var urls = [];
		for(var id in nodes) {
			var node = nodes[id];
			if(node.url && !urls.includes(node.url))
				urls.push(node.url);
		}
		return urls;
	}
	const getNodes = function() {
		return nodes;
	}
	const getBookmarks = function() {
		return Object.values(getNodes()).filter(node => node.url);
	}
	const onBookmarkMoved = function(event) {
		let id = event.detail.id;
		if(!nodes[id])
			return;
		let moveInfo = event.detail.moveInfo;
		if(moveInfo.parentId != moveInfo.oldParentId) {
			var newNode = {id, url:nodes[id].url, parentId:moveInfo.parentId};
			addBookmarkNode(newNode)
				.then(()=>collectGarbageParents(moveInfo.oldParentId))
				.then(dispatchChange);
		}
	}
	const onBookmarkCreated = function(event) {
		var newNode = event.detail.bookmark;
		if(feedSubscriptions.exists(newNode.url)) {
			addBookmarkNode(newNode).then(dispatchChange);
		}
	}
	const onBookmarkRemoved = function(event) {
		if(nodes[event.detail.id]) {
			removeBookmarkNode(event.detail.id);
			dispatchChange();
		}
	}
	const onBookmarkChanged = function(event) {
		var newURL = event.detail.changeInfo.url;
		var id = event.detail.id;
		if(nodes[id]) {
			removeBookmarkNode(id);
			if(feedSubscriptions.exists(newURL))
				addBookmarkURL(newURL).then(dispatchChange);
			else
				dispatchChange();
		}
		else if(feedSubscriptions.exists(newURL)) {
			addBookmarkURL(newURL).then(dispatchChange);
		}
	}
	const onSubscriptionsAdded = function(event) {
		var urls = event.detail;
		Promise
			.all(urls.map(addBookmarkURL))
			.then(dispatchChange);
	}
	const onSubscriptionsRemoved = function(event) {
		var urls = event.detail;
		urls.map(removeBookmarkURL);
		dispatchChange();
	}
	const bind = function() {
		addEventListener("bookmarks/moved", onBookmarkMoved);
		addEventListener("bookmarks/created", onBookmarkCreated);
		addEventListener("bookmarks/removed", onBookmarkRemoved);
		addEventListener("bookmarks/changed", onBookmarkChanged);
		addEventListener("feedSubscriptions/added", onSubscriptionsAdded);
		addEventListener("feedSubscriptions/removed", onSubscriptionsRemoved);
	}
	const init = function() {
		feedSubscriptions = api.feedSubscriptions;
		bookmarks = api.bookmarks;
		extensionEvent = api.extensionEvent;
		let urls = feedSubscriptions.getURLS();
		bind();
		return Promise
			.all(urls.map(addBookmarkURL))
	}
	defineAPI("feedSubscriptionsBookmarks", {
		await : ["feedSubscriptions", "bookmarks", "extensionEvent"],
		init,
		getURLS,
		getNodes,
		getBookmarks
	});
}
{
	const ALARM_NAME = "feed-subscriptions-update-alarm";
	let settings, feeds, feedSubscriptions, feedSubscriptionsBookmarks, extensionEvent;
	let feedInfos = {};
	const createFeedInfo = function(url) {
		feedInfos[url] = {
			lastReadItemPublished : 0,
			feedTimestamp : 0,
			unreadItems : 0
		}
	}
	const updateFeedInfo = function(url) {
		return feeds.getFeed(url).then(feed => {
			var lastReadItemPublished = feedSubscriptions.getLastReadItemPublished(url);
			feedInfos[url].lastReadItemPublished = lastReadItemPublished;
			feedInfos[url].feedTimestamp  = feed.timestamp;
			feedInfos[url].unreadItems = feed.items.reduce((unread, item)=>unread + ((item.published > lastReadItemPublished) ? 1 : 0) , 0);
		}).catch(console.log);
	}
	const deleteFeedInfo = function(url) {
		delete feedInfos[url];
	}
	const resetFeedTimestamp = function(url) {
		if(feedInfos[url]) {
			feedInfos[url].feedTimestamp = 0;
		}
	}
	let nodes = {};
	const updateFeedInfos = function() {
		var oldURLS = Object.keys(feedInfos);
		var newURLS = feedSubscriptionsBookmarks.getURLS();
		var urlsToRemove = oldURLS.filter( oldURL => !newURLS.includes(oldURL) );
		var urlsToAdd = newURLS.filter( newURL => !oldURLS.includes(newURL) );
		urlsToRemove.forEach(deleteFeedInfo);
		urlsToAdd.forEach(createFeedInfo);
		var now = Date.now();
		var expirationTime = 1000 * 60 * Number(settings.get("feeds-expiration-time"));
		var urlsToUpdate = newURLS
			.filter(
				url =>
				( (now - feedInfos[url].feedTimestamp) > expirationTime )
				||
				(feedInfos[url].lastReadItemPublished != feedSubscriptions.getLastReadItemPublished(url))
			);
		return Promise.all(urlsToUpdate.map(updateFeedInfo));
	}
	const updateUnreadItems = function() {
		nodes = feedSubscriptionsBookmarks.getNodes();
		var ids = [];
		for(var id in nodes) {
			var feedInfo = feedInfos[nodes[id].url];
			if(feedInfo && feedInfo.unreadItems) {
				nodes[id].unreadItems = feedInfo.unreadItems;
				if(!ids.includes(id))
					ids.push(id);
			}
			else {
				nodes[id].unreadItems = 0;
			}
		}
		for(var id of ids) {
			var parentId = nodes[id].parentId;
			while(parentId) {
				if(nodes[parentId]) {
					nodes[parentId].unreadItems+=nodes[id].unreadItems;
					parentId = nodes[parentId].parentId;
				}
				else
					parentId = null;
			}
		}
	}
	const dispatchEvent = function() {
		extensionEvent.dispatch("feedSubscriptionsStats/change");
	}
	const backgroundUpdateCancel = function() {
		chrome.alarms.clear(ALARM_NAME);
	}
	const getOldestFeedExpirationTime = function() {
		const oldestFeed = Object
			.values(feedInfos)
			.sort((a,b)=>(a.feedTimestamp-b.feedTimestamp))
			.shift();
		if(oldestFeed)
			return oldestFeed.feedTimestamp + (Number(settings.get("feeds-expiration-time")) + 5) * 60 * 1000; // plus 5 minutes
	}
	const scheduleBackgroundUpdate = function() {
		if(feedSubscriptions.count() && (settings.get("feed-subscriptions-update") == "in-background")) {
			const oldestFeedExpirationTime = getOldestFeedExpirationTime();
			if(oldestFeedExpirationTime !== null) {
				var now = Date.now();
				var dt = (oldestFeedExpirationTime - now);
				dt = (dt>0) ? dt : 10 * 60 * 1000;
				chrome.alarms.create(ALARM_NAME, {
					when : now + dt
				})
			}
		}
	}
	const onViewCreated = function() {
		if(feedSubscriptions.count() && (settings.get("feed-subscriptions-update") == "on-newtab")) {
			const oldestFeedExpirationTime = getOldestFeedExpirationTime();
			if((oldestFeedExpirationTime == null) || (oldestFeedExpirationTime < Date.now())) {
				update();
			}
		}
	}
	const _update = function() {
		backgroundUpdateCancel();
		updateFeedInfos()
			.then(updateUnreadItems)
			.then(dispatchEvent)
			.then(scheduleBackgroundUpdate)
	}
	let updateThrottleTimeout;
	const update = function() {
		clearTimeout(updateThrottleTimeout);
		updateThrottleTimeout = setTimeout(_update, 150);
	}
	const getChildrenUnreadItems = function(parentId) {
		var result = {};
		for(var id in nodes) {
			if(nodes[id].parentId == parentId)
				result[id] = nodes[id].unreadItems;
		}
		return result;
	}
	const getUnreadItems = function(id) {
		if(id) {
			return nodes[id] ? nodes[id].unreadItems : 0;
		}
		else {
			return api.feedSubscriptionsBookmarks
				.getURLS()
				.map(url=>getUnreadItemsByURL(url))
				.reduce((acc, val) => acc+val, 0);
		}
	}
	const getUnreadItemsByURL = function(url) {
		return feedInfos[url] ? feedInfos[url].unreadItems : 0;
	}
	const onAlarm = function(alarm) {
		if(alarm.name == ALARM_NAME) {
			update();
		}
	}
	const init = function() {
		settings = api.settings;
		feeds = api.feeds;
		feedSubscriptions = api.feedSubscriptions;
		feedSubscriptionsBookmarks = api.feedSubscriptionsBookmarks;
		extensionEvent = api.extensionEvent;
		addEventListener("feedSubscriptionsBookmarks/change", update);
		addEventListener("feedSubscriptions/updated", update);
		addEventListener("settings/feed-subscriptions-update", update);
		addEventListener("settings/feeds-expiration-time", update);
		addEventListener("settings/root-folder", update);
		addEventListener("feeds/clearCache", event=>{
			var deletedURLS = event.detail;
			deletedURLS.forEach(resetFeedTimestamp);
		});
		if(["on-startup", "in-background"].includes(settings.get("feed-subscriptions-update"))) {
			update();
		}
		addEventListener("session/view-created", onViewCreated);
	}
	defineAPI("feedSubscriptionsStats", {
		await : ["settings", "feeds", "feedSubscriptions", "feedSubscriptionsBookmarks", "extensionEvent"],
		init,
		sessionListeners : {
			alarms : {
				onAlarm,
			}
		},
		getChildrenUnreadItems,
		getUnreadItems,
		getUnreadItemsByURL
	})
}
{
	let settings, feeds, extensionEvent;
	const KEY = "feed-subscriptions";
	const URL_MAX_LENGTH = 200;
	const SUBSCRIPTIONS_MAX = 35;
	let subscriptions = {};
	const onChange = function() {
		var newSubscriptions = settings.get(KEY) || {};
		var oldURLS = Object.keys(subscriptions);
		var newURLS = Object.keys(newSubscriptions);
		var urlsAdded = newURLS.filter(url => !oldURLS.includes(url));
		var urlsRemoved = oldURLS.filter(url => !newURLS.includes(url));
		var urlsUpdated = newURLS.filter( url => ( oldURLS.includes(url) && (newSubscriptions[url] != subscriptions[url]) ) );
		subscriptions = newSubscriptions;
		if(urlsAdded.length)
			extensionEvent.dispatch("feedSubscriptions/added", urlsAdded, true);
		if(urlsRemoved.length)
			extensionEvent.dispatch("feedSubscriptions/removed", urlsRemoved, true);
		if(urlsUpdated.length)
			extensionEvent.dispatch("feedSubscriptions/updated", urlsUpdated, true);
	}
	const add = function(url, lastReadItemPublished) {
		var subscriptions = settings.get(KEY); // avoids async trouble
		if(url.length > URL_MAX_LENGTH)
			throw "URL too long!"; // TODO: translate!
		if(api.feedSubscriptionsBookmarks) {
			var validURLS = api.feedSubscriptionsBookmarks.getURLS();
			Object.keys(subscriptions)
				.forEach(url=>{
					if(!validURLS.includes(url)) {
						delete subscriptions[url];
					}
				});
		}
		if(count() >= SUBSCRIPTIONS_MAX)
			throw chrome.i18n.getMessage("error_too_many_subscriptions", ""+SUBSCRIPTIONS_MAX);
		var newSubscriptions = Object.assign({}, subscriptions);
		newSubscriptions[url] = lastReadItemPublished || 0;
		settings.set(KEY, newSubscriptions);
	}
	const reset = function(urlOrArray, lastReadItemPublished) {
		var subscriptions = settings.get(KEY); // avoids async trouble
		var newSubscriptions = Object.assign({}, subscriptions);
		var urls = Array.isArray(urlOrArray) ? urlOrArray : [urlOrArray];
		for(let url of urls) {
			if(subscriptions[url] != undefined) {
				newSubscriptions[url] = lastReadItemPublished || 0;
			}
		}
		settings.set(KEY, newSubscriptions);
	}
	const remove = function(url) {
		var subscriptions = settings.get(KEY); // avoids async trouble
		var newSubscriptions = Object.assign({}, subscriptions);
		delete newSubscriptions[url];
		settings.set(KEY, newSubscriptions);
	}
	const removeAll = function(url) {
		settings.set(KEY, {});
	}
	const exists = function(url) {
		return subscriptions[url] !== undefined;
	}
	const count = function() {
		return Object.keys(subscriptions).length;
	}
	const getURLS = function() {
		return Object.keys(subscriptions);
	}
	const getMaxNumberOfSubscriptions = function() {
		return SUBSCRIPTIONS_MAX;
	}
	const getLastReadItemPublished = function(url) {
		return subscriptions[url];
	}
	const getFeedsWithoutHostPermissions = function() {
		return Promise.all(
			getURLS().map(
				url=>feeds
					.getFeedURL(url)
					.then(feedURL => new Promise(r=>chrome.permissions.contains({ origins : [feedURL] }, granted=>r(granted?null:feedURL))))
					.catch(console.log)
			)
		)
		.then(feedURLS => feedURLS.filter(feedURL=>!!feedURL))
	}
	const init = function() {
		settings = api.settings;
		feeds = api.feeds;
		extensionEvent = api.extensionEvent;
		subscriptions = settings.get(KEY);
		addEventListener("settings/" + KEY, onChange);
		addEventListener("browser/open", event=>reset(event.detail.urls, Date.now()));
	}
	defineAPI("feedSubscriptions", {
		await : ["settings", "feeds", "extensionEvent"],
		init,
		add,
		reset,
		remove,
		removeAll,
		exists,
		count,
		getURLS,
		getMaxNumberOfSubscriptions,
		getLastReadItemPublished,
		getFeedsWithoutHostPermissions
	})
}
{
	let settings, stringUtil, dictUtil, keyValueCache, extensionEvent, uri;
	const KVNS = "feeds";
	const FEED_DIR = "feeds";
	let urlMapping, urlMappingKeys;
	const initURLMapping = function() {
		urlMapping = stringUtil.parseURLMapping(settings.get("feeds-url-mapping"));
		urlMappingKeys = Object.keys(urlMapping);
	}
	const updateURLMapping = function() {
		var newURLMapping = stringUtil.parseURLMapping(settings.get("feeds-url-mapping"));
		var changedURLS = dictUtil.diff(urlMapping, newURLMapping);
		clearCache(changedURLS)
			.then(()=>{
				urlMapping = newURLMapping;
				var oldMappingKeys = urlMappingKeys;
				urlMappingKeys = Object.keys(urlMapping);
				if(changedURLS.length || (urlMappingKeys.join() != oldMappingKeys.join())) {
					invalidate();
				}
			})
	}
	const rules = [
		{
			name : "youtube.com",
			active: true,
			isApplicable : url => url.includes("youtube.com") && uri.hasDomain(url, "youtube.com"),
			lookupURL: url => url
		}
	];
	const getLookupURL = function(url) {
		for(var i=0; i<urlMappingKeys.length; i++) {
			if(url.startsWith(urlMappingKeys[i])) {
				return urlMappingKeys[i];
			}
		}
		for(let rule of rules) {
			if(rule.active && rule.isApplicable(url)) {
				return rule.lookupURL(url);
			}
		}
		return url;
	}
	const getFeedURL = function(url) {
		var lookupURL = getLookupURL(url);
		var feedURL = keyValueCache.get(KVNS, lookupURL);
		if(feedURL) {
			return Promise.resolve(feedURL);
		}
		else {
			feedURL = urlMapping[lookupURL];
			if(feedURL) {
				keyValueCache.set(KVNS, lookupURL, feedURL);
				return Promise.resolve(feedURL);
			}
			return fetch(
					api.SERVER_URL + '/feed/' + lookupURL, { mode : 'cors' }
				)
				.then(response=>(response && response.ok) ? response.text() : Promose.reject('no-feed-url'))
				.then(feedURL=>{
				 	keyValueCache.set(KVNS, lookupURL, feedURL);
					return feedURL;
				})
		}
	}
	const parser = new DOMParser();
	const parseFeedElement = function(parent, tagName) {
		var element = parent.querySelector(tagName);
		return element ? element.textContent : null;
	}
	const parseFeedElementAttribute = function(parent, selector, attributename) {
		var el = parent.querySelector(selector);
		if(el && el.hasAttribute(attributename))
			return el.getAttribute(attributename);
		else
			return null;
	}
	const parseFeedRSS = function(doc) {
		var root = doc.querySelector("channel");
		if(!root)
			throw "parse error";
		var items = [];
		var now = Date.now();
		doc.querySelectorAll("item").forEach(item=>{
			var title = parseFeedElement(item, "title");
			var published = now;
			var publishedText = parseFeedElement(item, "pubDate");
			if(publishedText) {
				published = new Date(publishedText).getTime();
			}
			var descriptionDoc = parser.parseFromString(parseFeedElement(item, "encoded") || parseFeedElement(item, "description") || "", "text/html");
			descriptionDoc.querySelectorAll("style").forEach(style=>style.remove());
			var description = descriptionDoc.documentElement.textContent;
			var image = parseFeedElementAttribute(descriptionDoc, "img", "src");
			if(!image)
				image = parseFeedElementAttribute(item, 'content[medium*="image"][url], content[type*="image"][url], content[url*="jpg"], content[url*="jpeg"], content[url*="png"], content[url*="gif"], enclosure[url][type*=image], enclosure[url*="jpg"], enclosure[url*="jpeg"], enclosure[url*="png"], enclosure[url*="gif"]', "url");
			var link = parseFeedElement(item, "link");
			if(title && description)
				items.push({ title:(title||"Untitled"), published, description, image, link });
		})
		return {
			items
		};
	}
	const parseFeedAtom = function(doc) {
		var root = doc.querySelector("feed");
		if(!root)
			throw "parse error";
		var items = [];
		var now = Date.now();
		root.querySelectorAll("entry").forEach(item=>{
			var title = parseFeedElement(item, "title");
			var published = now;
			var publishedText = parseFeedElement(item, "published") || parseFeedElement(item, "issued"); // issued : GMAIL ?!
			if(publishedText) {
				var matchOffset = /([+-])(\d\d):(\d\d)$/;
				var offset = matchOffset.exec(publishedText);
				published = new Date(publishedText.replace('T', ' ').replace(matchOffset, ''));
				offset = offset ? (offset[1] == '+' ? -1 : 1) * (offset[2] * 60 + Number(offset[3])) : 0;
				published.setMinutes(published.getMinutes() + offset - published.getTimezoneOffset());
				published = published.getTime();
			}
			var descriptionDoc = parser.parseFromString(parseFeedElement(item, "content") || parseFeedElement(item, "summary") || parseFeedElement(item, "description") || "", "text/html");
			var description = descriptionDoc.documentElement.textContent;
			var image = parseFeedElementAttribute(item, "thumbnail", "url") || parseFeedElementAttribute(descriptionDoc, "img", "src");
			var link = parseFeedElementAttribute(item, "link", "href");
			if(title && description)
				items.push({ title:(title||"Untitled"), published, description, image, link });
		})
		return {
			items
		};
	}
	const parseFeed = function(doc) {
		var feed;
		switch(doc.documentElement.tagName.toLowerCase()) {
			case "rss":
			case "rdf":
			case "rdf:rdf":
				feed = parseFeedRSS(doc);
			break;
			case "feed":
				feed = parseFeedAtom(doc);
			break;
			default:
				throw ("Feed is neither RSS nor ATOM! " + doc.documentElement.tagName)
			break;
		}
		feed.timestamp = Date.now();
		feed.items.sort((a,b) => b.published - a.published);
		feed.latestItemPublished = feed.items.length ? feed.items[0].published : 0;
		return feed;
	}
	const loadFeedFile = function(feedURL) {
		return caches
			.open('feed')
			.then(cache =>
				cache.match(feedURL)
					.then(response => response ? response : Promise.reject('feed-not-cached'))
					.then(response => {
						const dt = Date.now() - parseInt(response.headers.get('modified-ts'));
						const expirationTime = 1000 * 60 * Number(settings.get("feeds-expiration-time"));
						return (dt > expirationTime) ? Promise.reject("too old") : response.json();
					})
					.catch(()=>
						fetch(feedURL)
							.then(response => response.text())
							.then(text=>{
								const parser = new DOMParser();
								const doc = parser.parseFromString(text, "application/xml");
								if(!doc.documentElement.hasAttribute("xml:base"))
									doc.documentElement.setAttribute("xml:base", feedURL);
								return doc
							})
							.then(doc=>doc ? doc : Promise.reject("no doc!"))
							.then(parseFeed)
							.then(feed=>
								cache.put(
									feedURL,
									new Response(
										JSON.stringify(feed, null, "\t"),
										{
											headers : new Headers({'modified-ts':Date.now()})
										}
									)
								)
								.then(()=>feed)
							)
					)
				)
	}
	const getFeed = function(url) {
		return getFeedURL(url).then(loadFeedFile);
	}
	const clearCache = function(urls) {
		const urlsToDelete = urls ? urls : keyValueCache.getKeys(KVNS);
		return caches
			.open('feed')
			.then(cache=>
				Promise.all(
					urlsToDelete
						.map(getLookupURL)
						.filter(lookupURL => keyValueCache.get(KVNS, lookupURL))
						.map(lookupURL => {
							const feedURL = keyValueCache.get(KVNS, lookupURL);
							keyValueCache.remove(KVNS, lookupURL);
							return cache.delete(feedURL);
						})
				)
			)
			.then(()=>{
				extensionEvent.dispatch("feeds/clearCache", urlsToDelete, true);
			})
	}
	const countCached = function() {
		return keyValueCache.count(KVNS);
	}
	const invalidate = function() {
		extensionEvent.dispatch("feeds/invalidate");
	}
	const init = function() {
		settings = api.settings;
		stringUtil = api.stringUtil;
		dictUtil = api.dictUtil;
		keyValueCache = api.keyValueCache;
		extensionEvent = api.extensionEvent;
		uri = api.uri;
		addEventListener("settings/feeds-url-mapping", updateURLMapping);
		initURLMapping();
	}
	defineAPI("feeds", {
		await : ["settings", "stringUtil", "dictUtil", "keyValueCache", "extensionEvent", "uri"],
		init,
		getFeedURL,
		getFeed,
		clearCache,
		countCached
	})
}
{
	let tabs = {};
	const getURL = function(section) {
		let url = "chrome://newtab/#help";
		if(section)
			url = url + "?" + section;
		return url;
	}
	const show = function (win, section) {
		win = (win || window);
		win.chrome.tabs.getCurrent(currentTab=>{
			if(currentTab && currentTab.windowId)
				showInWindow(currentTab.windowId, section);
			else
				showInNewWindow(section);
		});
	}
	const showInNewTab = function(windowId, section) {
		chrome.tabs.create({
			url : getURL(section),
			index : 99999,
			active : true,
			windowId
		}, tab=>{
			tabs[windowId] = tab.id
		})
	}
	const showInWindow = function(windowId, section) {
		let tabId = tabs[windowId];
		if(tabId) {
			chrome.tabs.update( tabId, { url : getURL(section), active : true }, () => {
				if(chrome.runtime.lastError)
					showInNewTab(windowId, section);
			});
		}
		else {
			showInNewTab(windowId, section);
		}
	}
	const showInNewWindow = function(section) {
		chrome.windows.create({url : getURL(section)});
	}
	defineAPI("helpDoc", {
		show,
		showInWindow,
		showInNewWindow
	});
}
{
	let dateFormatShort;
	let dateFormatLong;
	let timeFormat;
	const formatDateShort = function(date) {
		if(!dateFormatShort)
			dateFormatShort = new Intl.DateTimeFormat(chrome.i18n.getUILanguage(), { weekday:'long', month: 'long', day: 'numeric' });
		const uiLang = chrome.i18n.getUILanguage();
		let out;
		if(uiLang.startsWith("en")) {
			const parts = dateFormatShort.formatToParts(date);
			out = [
				parts[0].value,
				', ',
				parts[4].value,
				'. ',
				parts[2].value
			].join("");
		}
		else
			out = dateFormatShort.format(date);
		return out.charAt(0).toUpperCase() + out.slice(1);
	}
	const formatDateLong = function(date) {
		if(!dateFormatLong)
			dateFormatLong = new Intl.DateTimeFormat(chrome.i18n.getUILanguage(), { weekday:'long', year: 'numeric', month: 'long', day: 'numeric' });
		const out = dateFormatLong.format(date);
		return out.charAt(0).toUpperCase() + out.slice(1);
	}
	const formatTime = function(date) {
		if(!timeFormat)
			timeFormat = new Intl.DateTimeFormat(chrome.i18n.getUILanguage(), { hour:'numeric', minute:'numeric' });
		return timeFormat.format(date);
	}
	defineAPI("i18n", {
		formatDateShort,
		formatDateLong,
		formatTime
	});
}
{
	const getLookupURL = function(url) {
		const _url = new URL(url);
		const hostname = _url.hostname;
		if(
				(hostname == "apps.web-accessories.com")
			||	(hostname == "play.famobi.com")
			||	hostname.includes(".google.")
		)
			return _url.protocol + '//' + hostname + _url.pathname;
		else
			return _url.protocol + '//' + hostname;
	}
	const createFactory = function() {
		return {
			isApplicable : url => true,
			getCacheURL : url=>api.iconsUtil.getCacheURL(getLookupURL(url)),
			createIcon : (url, _, cache) => {
				const lookupURL = getLookupURL(url);
				const cacheURL = api.iconsUtil.getCacheURL(lookupURL);
				return api.iconsUtil.loadIcon(cacheURL)
					.catch(()=>
						api.iconsUtil.cacheIconWA(lookupURL, cache, cacheURL)
							.catch(()=>api.iconsUtil.cacheIconChrome(lookupURL, cache, cacheURL))
							.catch(()=>api.iconsUtil.cacheIconReplacement(lookupURL, cache, cacheURL))
					)
					.then(()=>api.iconsUtil.loadIcon(cacheURL))
			}
		};
	}
	defineAPI("iconsFactoryDefault", {
		await : ["uri", "iconsUtil"],
		createFactory
	});
}
{
	const ICON_SIZE = 160;
	const PROPERTIES = {
		"Grid 1x1": {type:"grid",dim:1},
		"Grid 2x2": {type:"grid",dim:2},
		"Grid 3x3": {type:"grid",dim:3},
		"Grid 4x4": {type:"grid",dim:4},
		"Grid 5x5": {type:"grid",dim:5},
		"Grid 2x2+Cover": {type:"grid",dim:2,cover:true},
		"Grid 3x3+Cover": {type:"grid",dim:3,cover:true},
		"Grid 4x4+Cover": {type:"grid",dim:4,cover:true},
		"Grid 5x5+Cover": {type:"grid",dim:5,cover:true},
		"Stack 1": {type:"stack",n:4,from:[0.4,0.4],to:[0.6,0.6]}, // from left/top tp right/bottom
		"Stack 2": {type:"stack",n:4,from:[0.6,0.4],to:[0.4,0.6]}, // from left/top tp right/bottom
		"Stack 3": {type:"stack",n:5,from:[0.5,0.25,0.0,0.3,0.3],to:[0.5,0.6,0.0,0.6,0.6]}, // from small to big
		"Stack 4": {type:"stack",n:5,from:[0.65,0.4,0.0,0.5,0.55,0.05,0.0],to:[0.35,0.6,0.0,0.5,0.55,0.05,0.0]}, // isom right=>left
		"Stack 5": {type:"stack",n:5,from:[0.35,0.4,0.0,0.5,0.55,-0.05,0.0],to:[0.65,0.6,0.0,0.5,0.55,-0.05,0.0]}, // isom right=>left
		"Stack 6": {type:"stack",n:5,from:[0.45,0.45,-0.75],to:[0.55,0.55,0]},
		"Mosaic 3x3+NorthWest": {type:"mosaic", dim:3, first: { x : 0, y : 0, dim : 2}},
		"Mosaic 4x4+NorthWest": {type:"mosaic", dim:4, first: { x : 0, y : 0, dim : 3}},
		"Mosaic 5x5+NorthWest": {type:"mosaic", dim:5, first: { x : 0, y : 0, dim : 4}},
		"Mosaic 4x4+Center": {type:"mosaic", dim:4, first: { x : 1, y : 1, dim : 2}},
		"Mosaic 5x5+Center": {type:"mosaic", dim:5, first: { x : 1, y : 1, dim : 3}}
	}
	const ctx = (()=>{
		const canvas = document.createElement('canvas');
		canvas.width = canvas.height = ICON_SIZE;
		return canvas.getContext('2d');
	})();
	const createFactory = function(style, getIconImageBitmap) {
		const FOLDER_THUMBNAILS_BGR = api.settings.get("icon-folder-background-color");
		let createIcon;
		let properties = PROPERTIES[style] || {type:"grid",dim:3};
		switch(properties.type) {
			case "stack": {
				function drawImage(imageBitmap, x, y, scaleX, scaleY, rotation, skewX, skewY) {
					scaleX = ICON_SIZE/imageBitmap.width *scaleX;
					scaleY = ICON_SIZE/imageBitmap.height *scaleY;
					ctx.setTransform(scaleX, skewX, skewY, scaleY, x, y);
					ctx.rotate(rotation);
					const xi = -imageBitmap.width / 2;
					const yi = -imageBitmap.height / 2;
					ctx.drawImage(
						imageBitmap,
						xi,
						yi
					);
					ctx.setTransform(1, 0, 0, 1, 0, 0);
				}
				const [x1=0.5,y1=0.5,rotation1=0.0,scaleX1=0.6,scaleY1=0.6,skewX1=0.0,skewY1=0.0] = properties.from;
				const [x2=0.5,y2=0.5,rotation2=0.0,scaleX2=0.6,scaleY2=0.6,skewX2=0.0,skewY2=0.0] = properties.to;
				const n = properties.n||3;
				createIcon = (bookmarkTreeNodes) =>
					Promise.all(bookmarkTreeNodes
						.slice(0,n)
						.map(bookmarkTreeNode=>getIconImageBitmap(bookmarkTreeNode.url).catch(console.log))
					)
					.then(imageBitmaps=> {
						const canvas = ctx.canvas;
						ctx.globalCompositeOperation = "source-over";
						ctx.imageSmoothingQuality = "high";
						ctx.fillStyle = FOLDER_THUMBNAILS_BGR;
						ctx.clearRect(0,0, canvas.width, canvas.height);
						ctx.fillRect(0,0, canvas.width, canvas.height);
						ctx.shadowColor = 'rgba(0,0,0,0.4)';
						ctx.shadowBlur = 10;
						const m = imageBitmaps.length;
						for(let i=0; i<m; i++) {
							const j = m-1-i;
							if(!imageBitmaps[j])
								continue;
							const progress = ((n-m)+i)/(n-1);
							drawImage(
								imageBitmaps[j],
								canvas.width * ( x1 + (x2-x1)*progress ),
								canvas.height * ( y1 + (y2-y1)*progress ),
								scaleX1 + (scaleX2-scaleX1)*progress,
								scaleY1 + (scaleY2-scaleY1)*progress,
								rotation1 + (rotation2-rotation1)*progress,
								skewX1 + (skewX2-skewX1)*progress,
								skewY1 + (skewY2-skewY1)*progress
							);
						}
						ctx.shadowBlur = 0;
						return createImageBitmap(canvas);
					})
			}
			break;
			case "grid": {
				const dim = properties.dim;
				const cover = properties.cover;
				const offset = cover ? 1 : 0;
				const n = dim * dim + offset;
				createIcon = (bookmarkTreeNodes) =>
					Promise.all(bookmarkTreeNodes
						.slice(0,n)
						.map(bookmarkTreeNode=>getIconImageBitmap(bookmarkTreeNode.url).catch(console.log))
					)
					.then(imageBitmaps=>{
						const canvas = ctx.canvas;
						ctx.globalCompositeOperation = "source-over";
						ctx.imageSmoothingQuality = "high";
						ctx.fillStyle = FOLDER_THUMBNAILS_BGR;
						const marginX = canvas.width / 10;
						const marginY = canvas.height / 10;
						const spaceX = canvas.width / 40;
						const spaceY = canvas.height / 40;
						const thumbWidth = (canvas.width - 2*marginX - (dim-1)*spaceX) / dim;
						const thumbHeight = (canvas.height - 2*marginY - (dim-1)*spaceY) / dim;
						ctx.clearRect(0,0, canvas.width, canvas.height);
						ctx.fillRect(0,0, canvas.width, canvas.height);
						if(cover)
							ctx.globalAlpha = .8;
						for(let i=0; i<imageBitmaps.length; i++) {
							if(!imageBitmaps[i+offset])
								continue;
							const x = marginX + (i%dim) * (thumbWidth + spaceX);
							const y = marginY + Math.floor(i/dim) * (thumbHeight + spaceY);
							ctx.drawImage(imageBitmaps[i+offset], x, y, thumbWidth, thumbHeight);
						}
						ctx.globalAlpha = 1.0;
						if(cover && imageBitmaps[0]) {
							ctx.shadowColor = 'rgba(0,0,0,0.4)';
							ctx.shadowBlur = 10;
							const s = 0.6;
							const w = canvas.width*s;
							const h = canvas.height*s;
							const x = (canvas.width - w) / 2;
							const y = (canvas.height - h) / 2;
							ctx.drawImage(imageBitmaps[0], x, y, w, h);
							ctx.shadowBlur = 0;
						}
						return createImageBitmap(canvas);
					})
			}
			break;
			case "mosaic":{
				const dim = properties.dim;
				const first = properties.first;
				const n = dim * dim - first.dim * first.dim + 1;
				createIcon = (bookmarkTreeNodes) =>
					Promise.all(bookmarkTreeNodes
						.slice(0,n)
						.map(bookmarkTreeNode=>getIconImageBitmap(bookmarkTreeNode.url).catch(console.log))
					)
					.then(imageBitmaps=>{
						const canvas = ctx.canvas;
						ctx.globalCompositeOperation = "source-over";
						ctx.imageSmoothingQuality = "high";
						ctx.fillStyle = FOLDER_THUMBNAILS_BGR;
						const marginX = canvas.width / 10;
						const marginY = canvas.height / 10;
						const spaceX = canvas.width / 40;
						const spaceY = canvas.height / 40;
						const thumbWidth = (canvas.width - 2*marginX - (dim-1)*spaceX) / dim;
						const thumbHeight = (canvas.height - 2*marginY - (dim-1)*spaceY) / dim;
						const firstThumbWidth = first.dim*thumbWidth + (first.dim-1) * spaceX;
						const firstThumbHeight = first.dim*thumbHeight + (first.dim-1) * spaceY;
						ctx.clearRect(0,0, canvas.width, canvas.height);
						ctx.fillRect(0,0, canvas.width, canvas.height);
						const x = marginX + first.x * (thumbWidth + spaceX);
						const y = marginY + first.y * (thumbHeight + spaceY);
						ctx.drawImage(imageBitmaps[0], x, y, firstThumbWidth, firstThumbHeight);
						let j = 0;
						for(let i=1; i<imageBitmaps.length; i++) {
							if(!imageBitmaps[i])
								continue;
							let xj = (j%dim);
							let yj = Math.floor(j/dim);
							while(
								(xj>=first.x) && (xj<(first.x+first.dim))
								&&
								(yj>=first.y) && (yj<(first.y+first.dim))
							) {
								j++;
								xj = (j%dim);
								yj = Math.floor(j/dim);
							}
							const x = marginX + xj * (thumbWidth + spaceX);
							const y = marginY + yj * (thumbHeight + spaceY);
							ctx.drawImage(imageBitmaps[i], x, y, thumbWidth, thumbHeight);
							j++;
						}
						return createImageBitmap(canvas);
					})
			}
			break;
		}
		return {
			isApplicable : (url, id) => (url==null) && (id!=null),
			createIcon : (_, id) =>
				new Promise((resolve, reject) => {
					api.bookmarks.getChildren(id,  bookmarkTreeNodes => {
						if(!bookmarkTreeNodes || !bookmarkTreeNodes.length) {
							return resolve(getIconImageBitmap(null));
						}
						createIcon(bookmarkTreeNodes)
							.then(resolve)
							.catch(reject)
					});
				})
		}
	}
	const init = function() {}
	defineAPI("iconsFactoryFolders", {
		await : ["bookmarks", "settings"],
		init,
		createFactory
	});
}
{
	const rules = {
		"radio.net" : {
			isApplicable : url => url.includes(".radio.") && api.uri.matchDomains(url, ["radio.net", "radio.de", "radio.at", "radio.fr", "radio.pt", "radio.dk", "radio.se", "radio.it", "radio.pl"]),
			watermarkURL : "/watermark/radio.net.png",
			fallbackURL : "http://static.radio.net/inc/v2/apple-touch-icon.png?_=70d77124e9d19f3b6dd34343775e136e877c6b2c"
		},
		"youtube.com" : {
			isApplicable : url => url.includes("youtube.com") && api.uri.hasDomain(url, "youtube.com") && ( url.includes('/channel/') || url.includes('/user/') || url.includes('/c/') ),
			watermarkURL : "/watermark/youtube.com.png",
			fallbackURL : "https://s.ytimg.com/yts/mobile/img/apple-touch-icon-144x144-precomposed-vflopw1IA.png"
		},
		"unsplash.com" : {
			isApplicable : url => url.startsWith("https://unsplash.com/photos/"),
			cacheIcon: (url, cache, cacheURL) => api.iconsUtil.cacheIcon("https://source.unsplash.com/"+url.substr(28).split("/").shift()+"/160x160", cache, cacheURL),
			watermarkURL : "/watermark/unsplash.com.png",
			fallbackURL : "https://unsplash.com/apple-touch-icon.png"
		},
		"twitter.com" : {
			isApplicable : url => url.startsWith("https://twitter.com/") && (url.length > 20) && !(["/home", "/search", "/explore", "/notifications", "/messages", "/notifications"].includes(api.uri.getPathname(url))),
			watermarkURL : "/watermark/twitter.com.png",
			fallbackURL : "https://abs.twimg.com/icons/apple-touch-icon-192x192.png"
		}
	};
	const createFactory = function(ruleName) {
		const isApplicable = rules[ruleName].isApplicable;
		const cacheIcon = rules[ruleName].cacheIcon ? rules[ruleName].cacheIcon : api.iconsUtil.cacheIconWA;
		const addWatermark = imageBitmap => rules[ruleName].watermark ? api.iconsUtil.addWatermark(imageBitmap, rules[ruleName].watermark) : imageBitmap;
		return {
			isApplicable,
			getCacheURL : api.iconsUtil.getCacheURL,
			createIcon : (url, _, cache) => {
				const cacheURL = api.iconsUtil.getCacheURL(url);
				return api.iconsUtil.loadIcon(cacheURL)
					.catch(()=>
						cacheIcon(url, cache, cacheURL)
							.catch(()=>api.iconsUtil.cacheIcon(rules[ruleName].fallbackURL, cache, cacheURL))
							.catch(()=>api.iconsUtil.cacheIconChrome(url, cache, cacheURL))
							.catch(()=>api.iconsUtil.cacheIconReplacement(url, cache, cacheURL))
					)
					.then(()=>api.iconsUtil.loadIcon(cacheURL))
					.then(addWatermark)
			}
		}
	}
	const init = function() {
		return Promise.all(
			Object.values(rules).map(rule=>
				api.iconsUtil.loadIcon(rule.watermarkURL)
					.then(imageBitmap=>rule.watermark = imageBitmap)
					.catch(console.log)
			)
		)
	}
	defineAPI("iconsFactorySiteRules", {
		await : ["iconsUtil"],
		init,
		createFactory
	});
}
{
	const getIconName = function(url) {
		if(!url)
			return "folder";
		if(url.startsWith("chrome://apps"))
			return "apps";
		if(url.startsWith("chrome://bookmarks"))
			return "bookmarks";
		if(url.startsWith("chrome://downloads"))
			return "downloads";
		if(url.startsWith("chrome://extensions"))
			return "extensions";
		if(url.startsWith("chrome://history"))
			return "history";
		if(url.startsWith("chrome://settings"))
			return "settings";
		if(url.startsWith("chrome://newtab/#games"))
			return "games";
		return "chrome";
	}
	const createFactory = function(theme) {
		return {
			isApplicable : url => (!url || url.startsWith("chrome://")),
			getCacheURL : url => 'https://cache.web-accessories.com/icon/' + url + '@' + theme,
			createIcon : (url) => {
				const image = new Image();
				return new Promise((resolve, reject) => {
					image.src = "/themes/" + theme + "/" + getIconName(url) + ".svg";
					image.onload = resolve;
					image.onerror = reject;
				})
				.then(()=>createImageBitmap(image, {resizeWidth:160, resizeHeight:160}))
			}
		}
	}
	const init = function() {}
	defineAPI("iconsFactoryTheme", {
		await : [],
		init,
		createFactory
	});
}
{
	const loadImageBitmap = function(url) {
		const img = new Image();
		return new Promise((resolve, reject) =>{
			img.onload = resolve;
			img.onerror = reject;
			img.src = url;
		})
		.then(()=>createImageBitmap(img))
	}
	const loadFromCache = function(cache, cacheURL) {
		return cache.match(cacheURL)
			.then(response=> response ? loadImageBitmap(cacheURL) : Promise.reject());
	}
	const createFactory = function(urlPattern, iconURL) {
		const cacheURL = 'https://cache.web-accessories.com/icon/' + urlPattern.replace('#','_') + '@' + iconURL.replace('#','_');
		return {
			isApplicable : url => url.startsWith(urlPattern),
			getCacheURL : url=>cacheURL,
			createIcon : (url, _, cache) => {
				return api.iconsUtil.loadIcon(cacheURL)
					.catch(()=>
						api.iconsUtil.cacheIcon(iconURL, cache, cacheURL)
							.catch(()=>api.iconsUtil.cacheIconReplacement(urlPattern, cache, cacheURL))
					)
					.then(()=>api.iconsUtil.loadIcon(cacheURL))
			}
		}
	}
	const init = function() {}
	defineAPI("iconsFactoryURLMapping", {
		await : ["iconsUtil"],
		init,
		createFactory
	});
}
{
	const ICONS_MIN_SIZE = 50;
	const ICONS_MAX_SIZE = 1600;
	const MAX_URL_LENGTH = 300;
	let urlMapping, urlMappingKeys;
	const setCustomURLMapping = function(url, iconURL) {
		iconURL = iconURL ? iconURL.trim() : "";
		var iconUrlMapping = api.stringUtil.removeURLMapping(api.settings.get("icon-url-mapping"), url);
		if(!iconURL) {
			api.settings.set("icon-url-mapping", iconUrlMapping);
			return Promise.resolve();
		}
		if(!api.uri.isValid(iconURL))
			return Promise.reject("URL not valid!");
		if(iconURL.length > MAX_URL_LENGTH)
			return Promise.reject("URL too long! (> "+MAX_URL_LENGTH+")");
		return api.iconsUtil.loadIcon(iconURL)
			.then(image=>{
				if(Math.min(image.width, image.height)<ICONS_MIN_SIZE) {
					return Promise.reject("Icon too small! Min size: " + ICONS_MIN_SIZE + "px by " + ICONS_MIN_SIZE + "px!");
				}
				if(Math.max(image.width, image.height)>ICONS_MAX_SIZE) {
					return Promise.reject("Icon too big! Max size: " + ICONS_MAX_SIZE + "px by " + ICONS_MAX_SIZE + "px!");
				}
			})
			.then(()=>{
				iconUrlMapping = api.stringUtil.addURLMapping(
					iconUrlMapping,
					url,
					iconURL
				);
				api.settings.set("icon-url-mapping", iconUrlMapping, error=> {
					if(error)
						throw error;
				});
			})
	}
	const getCustomURLMapping = function(url) {
		return api.stringUtil.parseURLMapping(api.settings.get("icon-url-mapping"))[url];
	}
	defineAPI("iconsURLMapping", {
		await : ["uri", "stringUtil", "settings", "iconsUtil"],
		setCustomURLMapping,
		getCustomURLMapping
	});
}
{
	const ICON_SIZE = 160;
	const PREFERRED_MIN_SIZE = 57;
	const ICONS_DEFAULT_REPLACEMENT_COLOR = '#0692E9';
	const CHROME_FAVICON_URL = 'chrome://favicon/size';
	const ICON_REPLACEMENT_MAX_CHARS = 8;
	const getCacheURL = function(lookupURL) {
		return 'https://cache.web-accessories.com/icon/' + lookupURL;
	}
	const loadIcon = function(url) {
		const img = new Image();
		return new Promise((resolve, reject) =>{
			img.onload = resolve;
			img.onerror = reject;
			img.src = url;
		})
		.then(()=>createImageBitmap(img))
	}
	const cacheIconOptions = { mode : 'no-cors', headers : new Headers({ 'accept' : 'image/webp,image/apng,image/*,*/*;q=0.8' }) };
	const cacheIcon = function(iconURL, cache, cacheURL) {
		return loadIcon(iconURL)
			.then(()=>fetch(iconURL, cacheIconOptions).then(response=>cache.put(cacheURL, response)))
	}
	const cacheIconWAOptions = { mode : 'cors', cache : 'reload', headers : new Headers({ 'accept' : 'text/uri-list'}) }; // set to no-store when debugging
	const cacheIconWA = function(lookupURL, cache, cacheURL) {
		return fetch(api.SERVER_URL + '/icon/' + lookupURL, cacheIconWAOptions)
			.then(response => response.ok ? response.text() : Promise.reject('not found with service'))
			.then(iconURL => cacheIcon(iconURL, cache, cacheURL))
	}
	const ctxFavicon = (()=>{
		const canvas = document.createElement('canvas');
		canvas.width = canvas.height = 48;
		return canvas.getContext('2d');
	})();
	const cacheIconChrome = function(lookupURL, cache, cacheURL) {
		return loadIcon('chrome://favicon/size/48@1x/' + lookupURL)
			.then(imageBitmap=>{
				if((imageBitmap.width == 16) && (imageBitmap.height == 16))
					return Promise.reject();
				const ctx = ctxFavicon;
				ctx.globalCompositeOperation = "copy";
				ctx.imageSmoothingEnabled = true;
				ctx.imageSmoothingQuality = "medium";
				ctx.drawImage(imageBitmap, 0, 0, ctx.canvas.width, ctx.canvas.height);
				return new Promise(resolve=>ctx.canvas.toBlob(resolve));
			})
			.then(blob => cache.put(cacheURL, new Response(blob)));
	}
	const ctxReplacement = (()=>{
		const canvas = document.createElement('canvas');
		canvas.width = canvas.height = ICON_SIZE;
		return canvas.getContext('2d');
	})();
	const cacheIconReplacement = function(url, cache, cacheURL) {
		return new Promise(resolve=>{
			const ctx = ctxReplacement;
			ctx.globalCompositeOperation = "source-over";
			let label = url, backgroundColor = "#2579da";
			try {
				if(url.startsWith("chrome-extension:")) {
					backgroundColor = "#80808e";
					label = 'EXT';
				}
				else if(url.startsWith("javascript:")) {
					backgroundColor = "#333347";
					label = '{JS}';
				}
				else {
					const t = api.uri.getHostname(url).split('.');
					if(t[0] == 'www')
						t.shift();
					if(t.length > 1)
						t.pop();
					label = t.join('.');
					const ascii0 = label.length ? label.charCodeAt(0) : 0;
					const ascii1 = (label.length>1) ? label.charCodeAt(1) : 0;
					backgroundColor = 'rgb(51,'+(100 + ascii0%30)+','+(150 + ascii1%70)+')';
				}
			}
			catch(error) {
				console.log(error);
				label = url;
			}
			if(label.length>ICON_REPLACEMENT_MAX_CHARS)
				label = label.substr(0,ICON_REPLACEMENT_MAX_CHARS) + '_';
			ctx.fillStyle = backgroundColor;
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			ctx.fillStyle = "#ffffff";
			ctx.textAlign = "center";
			const fontSize = Math.min(Math.floor(ctx.canvas.width/label.length*1.5), ctx.canvas.height*0.35);
			ctx.font = "lighter "+fontSize+"px Helvetica,Arial,sans";
			ctx.fillText(label, ctx.canvas.width/2, Math.floor(ctx.canvas.height/2 + fontSize/3));
			ctx.canvas.toBlob(resolve);
		})
		.then(blob => cache.put(cacheURL, new Response(blob)));
	}
	const ctxWatermark = (()=>{
		const canvas = document.createElement('canvas');
		canvas.width = canvas.height = ICON_SIZE;
		return canvas.getContext('2d');
	})();
	const addWatermark = function(imageBitmap, imageBitmapWatermark) {
		const ctx = ctxWatermark;
		ctx.globalCompositeOperation = "copy";
		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = "medium";
		ctx.drawImage(imageBitmap, 0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.globalCompositeOperation = "source-over";
		ctx.globalAlpha = 0.75;
		const ratio = imageBitmapWatermark.width / imageBitmapWatermark.height;
		let dx, dy, dWidth, dHeight;
		dWidth = ctx.canvas.width / 5;
		dHeight = dWidth/ratio;
		dx = ctx.canvas.width - dWidth - ctx.canvas.width/16;
		dy = ctx.canvas.height/16;
		ctx.drawImage(imageBitmapWatermark, dx, dy, dWidth, dHeight);
		ctx.globalAlpha = 1.0;
		return createImageBitmap(ctx.canvas);
	}
	const renderIcon = function(img, canvas, size) {
		canvas.width = canvas.height = (size || api.settings.get("icon-size")) * window.devicePixelRatio;
		const ctx = canvas.getContext('2d');
		if(img.width >= PREFERRED_MIN_SIZE) {
			if(img.width == img.height) {
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			}
			else {
				const hr = canvas.width / img.width;
				const vr = canvas.height / img.height;
				const r = Math.min(hr,vr);
				const tw = img.width*r;
				const th = img.height*r;
				var cx = ( canvas.width - tw ) / 2;
				var cy = ( canvas.height - th ) / 2;
				ctx.drawImage(img, 0,0, img.width, img.height, cx, cy, tw, th);
			}
		}
		else {
			ctx.fillStyle = "#536168";
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			ctx.imageSmoothingEnabled = false;
			ctx.drawImage(img, 2, Math.floor(img.height/2), 1, 1, 0, 0, canvas.width, canvas.height);
			ctx.imageSmoothingEnabled = true;
			ctx.fillStyle = "rgba(255,255,255,0.65)";
			ctx.beginPath();
			ctx.arc(ctx.canvas.width/2, ctx.canvas.height/2, ctx.canvas.width*0.3, ctx.canvas.height*0.3, 0, 2*Math.PI);
			ctx.fill();
			ctx.drawImage(img, ctx.canvas.width*0.35, ctx.canvas.height*0.35, ctx.canvas.width*0.3, ctx.canvas.height*0.3);
		}
	}
	defineAPI("iconsUtil", {
		await : ["uri"],
		getCacheURL,
		loadIcon,
		cacheIcon,
		cacheIconWA,
		cacheIconChrome,
		cacheIconReplacement,
		addWatermark,
		renderIcon
	});
}
{
	const ICONS_DIR = "icons";
	const ICON_SIZE = 160;
	let factories;
	let imageBitmaps = {};
	let cache;
	const countCached = function() {
		return cache.keys().then(keys=>keys.length);
	}
	const clearCache = function(url) {
		if(url) {
			for(let f of factories) {
				if(f.isApplicable(url)) {
					if(!f.getCacheURL)
						return Promise.resolve();
					const cacheURL = f.getCacheURL(url);
					if(!cacheURL)
						return Promise.resolve();
					delete imageBitmaps[cacheURL];
					return cache.delete(cacheURL)
						.then(()=>fetch(cacheURL, {cache:'reload'})) // this clears Chrome's the image cache!
				}
			}
			return Promise.resolve();
		}
		else {
			imageBitmaps = {};
			return cache.keys()
				.then(requests=>Promise.all(
					requests.map(request=>cache
						.delete(request)
						.then(()=>fetch(request, {cache:'reload'})) // this clears Chrome's image cache!
					)
				))
				.catch(console.log);
		}
	}
	const invalidate = function() {
		api.extensionEvent.dispatch("icons/invalidate");
	}
	const createFactories = function() {
		const factories = [];
		if(settings.get("icon-folder-thumbnails"))
			factories.push(api.iconsFactoryFolders.createFactory(settings.get("icon-folder-style"), getIconImageBitmap));
		factories.push(api.iconsFactoryTheme.createFactory(settings.get("theme")));
		const urlMapping = api.stringUtil.parseURLMapping(api.settings.get("icon-url-mapping"));
		const urlMappingPatterns = Object.keys(urlMapping);
		for(let p of urlMappingPatterns) {
			factories.push(api.iconsFactoryURLMapping.createFactory(p, urlMapping[p]));
		}
		const rules = api.settings.get("icon-rules");
		for(let r of rules) {
			factories.push(api.iconsFactorySiteRules.createFactory(r));
		}
		factories.push(api.iconsFactoryDefault.createFactory());
		return factories;
	}
	const resetFactories = function() {
		factories = createFactories();
		invalidate();
	}
	const getIconImageBitmap = function(url, id) {
		let factory;
		for(let f of factories) {
			if(f.isApplicable(url, id)) {
				factory = f;
				break;
			}
		}
		if(!factory)
			return Promise.reject("No Factory found");
		let cacheURL = factory.getCacheURL ? factory.getCacheURL(url, id) : null;
		if(cacheURL) {
			if(!imageBitmaps[cacheURL]) {
				imageBitmaps[cacheURL] = factory.createIcon(url, id, cache);
			}
			return imageBitmaps[cacheURL];
		}
		else {
			return factory.createIcon(url, id);
		}
	}
	const init = function() {
		factories = createFactories();
		addEventListener("settings/theme", resetFactories);
		addEventListener("settings/icon-folder-thumbnails", resetFactories);
		addEventListener("settings/icon-folder-style", resetFactories);
		addEventListener("settings/icon-folder-background-color", resetFactories);
		addEventListener("settings/icon-url-mapping", resetFactories);
		addEventListener("settings/icon-rules", resetFactories);
		addEventListener("bookmarks/change", invalidate);
		return caches.open('icon').then(_cache=>{cache=_cache});
	}
	defineAPI("icons", {
		await : [
			"uri",
			"settings",
			"extensionEvent",
			"bookmarks",
			"stringUtil",
			"serviceWorker",
			"iconsFactoryDefault",
			"iconsFactoryFolders",
			"iconsFactorySiteRules",
			"iconsFactoryTheme",
			"iconsFactoryURLMapping",
			"iconsFactorySiteRules"
		],
		init,
		getIconImageBitmap,
		countCached,
		clearCache,
		invalidate
	});
}
{
	const onRuntimeInstalled = function(details) {
		switch(details.reason) {
			case "install":
				chrome.tabs.create({
					url : "/page.html?ui=FirstrunUI&title=Favorites&withIcon",
					active : true
				});
			break;
		}
	}
	defineAPI("installation", {
		await:["style"],
		sessionListeners : {
			runtime : {
				onInstalled : onRuntimeInstalled
			}
		}
	})
}
{
	const get = function(ns, name) {
		return localStorage.getItem(ns + "/" + name);
	}
	const set = function(ns, name, value) {
		localStorage.setItem(ns + "/" + name, value);
	}
	const remove = function(ns, name) {
		localStorage.removeItem(ns + "/" + name);
	}
	const getKeys = function(ns) {
		var n = localStorage.length;
		var keys = [];
		var prefix = ns + "/";
		for(var i=0; i<n; i++) {
			var key = localStorage.key(i);
			if(key.startsWith(prefix))
				keys.push(key.substr(prefix.length));
		}
		return keys;
	}
	const getValues = function(ns) {
		return getKeys(ns).map(key=>get(ns, key));
	}
	const clear = function(ns) {
		getKeys(ns).forEach(key=>remove(ns, key));
	}
	const count = function(ns) {
		var c=0;
		var n=localStorage.length;
		for(var i=0; i<n; i++) {
			var key = localStorage.key(i);
			if(key.startsWith(ns))
				c++;
		}
		return c;
	}
	defineAPI("keyValueCache", {
		get,
		set,
		remove,
		getKeys,
		getValues,
		clear,
		count
	});
}
{
	let uri, settings, stringUtil, dictUtil, keyValueCache, extensionEvent;
	const KVNS = "search";
	const SEARCH_ENGINES = {
		"Google":		"https://www.google.de/search?q=",
		"Bing":			"https://www.bing.com/search?q=",
		"Duckduckgo":	"https://duckduckgo.com/?q="
	};
	let urlMapping, urlMappingKeys;
	const initURLMapping = function() {
		urlMapping = stringUtil.parseURLMapping(settings.get("search-url-mapping"));
		urlMappingKeys = Object.keys(urlMapping);
	}
	const updateURLMapping = function() {
		var newURLMapping = stringUtil.parseURLMapping(settings.get("search-url-mapping"));
		var changedURLS = dictUtil.diff(urlMapping, newURLMapping);
		clearCache(changedURLS);
		urlMapping = newURLMapping;
		urlMappingKeys = Object.keys(urlMapping);
		invalidate();
	}
	const getLookupURL = function(url) {
		for(var i=0; i<urlMappingKeys.length; i++) {
			if(url.startsWith(urlMappingKeys[i])) {
				return urlMappingKeys[i];
			}
		}
		return url;
	}
	const extractTemplate = function(url, doc) {
		var forms = Array.prototype.slice.apply(doc.querySelectorAll("form"))
			.map(form => ({
				element:form,
				p : 0,
				textInputs : Array.prototype.slice.apply(form.querySelectorAll("input[type=text], input[type=search], input:not([type])"))
					.filter(input=>input.hasAttribute("name"))
			}))
			.filter(
				form=>
				(form.textInputs.length>0) && (form.element.action != "post")
			);
		if(!forms.length)
			throw new Error("nothing found");
		forms.forEach((form, i)=>{
			var element = form.element;
			if(element.hasAttribute("role") && (element.getAttribute("role") == "search"))
				form.p+=10;
			if(element.hasAttribute("action") && (element.getAttribute("action").indexOf("search") >= 0))
				form.p+=1;
			if(element.hasAttribute("name") && (element.getAttribute("name").indexOf("search") >= 0))
				form.p+=1;
			if(element.hasAttribute("id") && (element.getAttribute("id").indexOf("search") >= 0))
				form.p+=1;
			if(element.hasAttribute("class") && (element.getAttribute("class").indexOf("search") >= 0))
				form.p+=1;
			form.p+=element.querySelectorAll("[id*=search], [class*=search], [name*=search], [alt*=search i], [title*=search i]").length;
			if(form.textInputs.length == 1)
				form.p+=3;
			if(i == 0)
				form.p+=1;
		})
		forms = forms
			.filter(form=>form.p>0)
			.sort((fa, fb)=> (fa.p-fb.p));
		const form = forms.pop();
		let action = uri.resolveRelative(url, form.element.getAttribute("action"));
		if(action.endsWith("?")) {
			console.log(action, action.split("?"), action.split("?").shift());
			action = action.split("?").shift();
		}
		const formData = new FormData(form.element);
		const searchInputName = form.textInputs[0].name;
		const parameters = [];
		for(var pair of formData.entries()) {
			if(pair[0] && pair[1] && (pair[0]!=searchInputName)) {
				parameters.push(encodeURIComponent(pair[0]) + "=" + encodeURIComponent(pair[1]));
			}
		}
		return action + '?' + (parameters.length?parameters.join("&")+"&":"") + encodeURIComponent(searchInputName) + '=';
	}
	const getEngineTemplate = function (engine) {
		return SEARCH_ENGINES[engine];
	}
	const getTemplate = function(url) {
		var lookupURL = getLookupURL(url);
		var template = keyValueCache.get(KVNS, lookupURL);
		if(template) {
			return Promise.resolve(template);
		}
		else {
			template = urlMapping[lookupURL];
			if(template) {
				keyValueCache.set(KVNS, lookupURL, template);
				return Promise.resolve(template);
			}
			return fetch(
					api.SERVER_URL + '/search/' + lookupURL, { mode : 'cors' }
				)
				.then(response=>(response && response.ok) ? response.text() : Promose.reject('no-search-url'))
				.then(template=>{
				 	keyValueCache.set(KVNS, lookupURL, template);
					return template;
				})
		}
	}
	const clearCache = function(urls) {
		if(urls) {
			urls.forEach(url=>keyValueCache.remove(KVNS, url))
		}
		else {
			keyValueCache.clear(KVNS);
		}
	}
	const countCached = function () {
		return keyValueCache.count(KVNS);
	}
	const invalidate = function() {
		extensionEvent.dispatch("search/invalidate");
	}
	const init = function() {
		settings = api.settings;
		stringUtil = api.stringUtil;
		dictUtil = api.dictUtil;
		uri = api.uri;
		keyValueCache = api.keyValueCache;
		extensionEvent = api.extensionEvent;
		addEventListener("settings/search-url-mapping", updateURLMapping);
		initURLMapping();
	}
	defineAPI("search", {
		await : ["settings", "stringUtil", "dictUtil", "uri", "keyValueCache", "extensionEvent"],
		init,
		getEngineTemplate,
		getTemplate,
		clearCache,
		countCached
	})
}
{
	const init = function() {
		navigator.serviceWorker.addEventListener("controllerchange", event=>{
			console.log("controller change!", event);
		});
		return navigator
			.serviceWorker
			.register('/sw.js')
			.then(registration=>navigator.serviceWorker.ready)
			.then(()=>
				navigator.serviceWorker.controller ? true : new Promise(resolve=>navigator.serviceWorker.oncontrollerchange = resolve)
			)
	}
	defineAPI("serviceWorker", {
		init
	})
}
{
	let settings;
	const THROTTLE_TIMEOUT = 2000; // ms
	let syncTimeout;
	const CHUNK_SIZE = 2000; // number of utf8 characters
	const chunkedNames = {
		"icon-url-mapping" : 16 // x*CHUNK_SIZE
	};
	const addChunkNames = function(names) {
		names.forEach(name=>{
			if(name in chunkedNames) {
				for(let i=1; i<chunkedNames[name]; i++ ) {
					names.push(name + '/chunk'+i);
				}
			}
		})
	}
	const mergeChunks = function(items) {
		for(let name in items) {
			if(name in chunkedNames) {
				for(let i=1; i<chunkedNames[name]; i++ ) {
					let k = name + '/chunk'+i;
					if(k in items) {
						items[name]+=items[k]||"";
						delete items[k];
					}
				}
			}
		}
	}
	const splitIntoChunks = function(items) {
		for(let name in items) {
			if(name in chunkedNames) {
				var chunks = [];
				var value = "" + items[name];
				items[name] = value.substring(0,CHUNK_SIZE);
				for(let i=1; i<chunkedNames[name]; i++ ) {
					items[name + '/chunk'+i] = value.substring(i*CHUNK_SIZE,(i+1)*CHUNK_SIZE);
				}
			}
		}
	}
	const syncLocalToCloud = function() {
		var names = settings.getSyncedKeys();
		if(names.length) {
			chrome.storage.local.get(names, items=>{
				if(chrome.runtime.lastError) {
					console.log(chrome.runtime.lastError);
				}
				else {
					splitIntoChunks(items);
					chrome.storage.sync.set(items, ()=>{
						if(chrome.runtime.lastError)
							console.log(chrome.runtime.lastError);
					})
				}
			})
		}
	}
	const syncLocalToCloudThrottled = function() {
		clearTimeout(syncTimeout);
		syncTimeout = setTimeout(
			()=>syncLocalToCloud(), THROTTLE_TIMEOUT
		);
	}
	const syncCloudToLocal = function() {
		var names = settings.getSyncedKeys();
		if(names.length) {
			addChunkNames(names);
			chrome.storage.sync.get(names, items=>{
				if(chrome.runtime.lastError) {
					console.log(chrome.runtime.lastError);
				}
				else {
					mergeChunks(items);
					chrome.storage.local.set(items, ()=>{
						if(chrome.runtime.lastError)
							console.log(chrome.runtime.lastError);
					})
				}
			})
		}
	}
	const preSyncPendingCloudToLocal = function(changes) {
		var namesPending = [];
		for(let name in changes) {
			if(name.endsWith("/synced") && (changes[name].newValue == true)) {
				namesPending.push(name.substr(0, name.length - "/synced".length));
			}
		}
		if(namesPending.length) {
			addChunkNames(namesPending);
			chrome.storage.sync.get(namesPending, items=>{
				if(chrome.runtime.lastError) {
					console.log(chrome.runtime.lastError);
				}
				else {
					if(Object.keys(items).length) {
						mergeChunks(items);
						chrome.storage.local.set(items, ()=>{
							if(chrome.runtime.lastError)
								console.log(chrome.runtime.lastError);
						})
					}
				}
			});
		}
	}
	const onStorageChanged = (changes, areaName) => {
		if(areaName == "local") {
			preSyncPendingCloudToLocal(changes);
			syncLocalToCloudThrottled();
		}
		else if(areaName == "sync")
			syncCloudToLocal();
	}
	const init = ()=>{
		settings = api.settings;
		syncCloudToLocal();
	}
	defineAPI("settingsSync", {
		await : ["settings"],
		init,
		listeners : {
			storage : {
				onChanged : onStorageChanged,
			}
		},
	});
}
{
	let win;
	const isWindows = function() {
	  return navigator.platform.indexOf('Win') > -1
	}
	const openPopup = function(url, name, width, height, callback) {
		var left = screen.left||0 + Math.round((screen.width - width) / 2);
		var top = screen.top||0 + Math.round((screen.height - height) / 2);
		chrome.windows.create(
			{
				url, left, top, width, height, type: 'popup', focused: true
			},
			callback
		)
	}
	const show = function (section) {
		let url = "/page.html?ui=SettingsUI&title=settings#"+(section || "favorites");
		let openNewWindow =
			()=>
			openPopup(
				url,
				"settings",
				 925 + (isWindows() ? 15 : 0),
				 550 + (isWindows() ? 40 : 0), // 925, 550 is correct but windows has wrong measures here
				 window => {
				 	win = window;
				 }
			);
		if(win) {
			chrome.windows.get(win.id, { populate:true }, (window)=>{
				if(chrome.runtime.lastError) {
					openNewWindow();
				}
				else {
					win = window;
					if(section) {
						chrome.tabs.update( win.tabs[0].id, { url, active : true } );
					}
					chrome.windows.update( win.id, { focused : true, state : "normal" } );
				}
			})
		}
		else {
			openNewWindow();
		}
	}
	defineAPI("settingsWindow", {
		show
	});
}
{
	let extensionEvent;
	const cache = {
		"root-folder" : "1",
		"show-navigation-bar" : false,
		"show-last-visited-folder" : false,
		"open-bookmarks-in-new-tab" : false,
		"browser-action" : "default",
		"columns-max" : 25,
		"column-gap" : 46,
		"row-gap" : 16,
		"theme" : "default_grey",
		"background-type" : "theme",
		"background-web" : null,
		"background-file" : null,
		"background-color" : "#909090",
		"background-filter-active" : false,
		"background-filter-color" : "rgba(255,255,255,0.7)",
		"background-filter-blend-mode" : "normal",
		"show-dock" : false,
		"dock-folder" : "2",
		"dock-dblclick": true,
		"dock-background-type": "theme",
		"dock-background-color": "#606060",
		"show-dash" : false,
		"dash-buttons" : ["bookmarks", "history", "downloads", "settings", "extensions", "games", "news"],
		"dash-clock" : "DC-1M",
		"icon-size" : 80,
		"icon-url-mapping" : "# Syntax: A > B\n# For each bookmark URL starting with A, an icon is loaded from B.\n# Lines starting with # are ignored and can be used for comments.\n\n",
		"icon-folder-thumbnails" : true,
		"icon-folder-style" : "Grid 3x3",
		"icon-folder-background-color" : "rgba(255,255,255,0.75)",
		"icon-rules" : [ "radio.net" ],
		"search-url-mapping" : "# Syntax: A > B\n# For each bookmark URL starting with A, a search URL is created \n# by appending a search term at the end of B.\n# Lines starting with # are ignored and can be used for comments.\n\nhttps://www.nytimes.com > https://www.nytimes.com/search?sort=best&query=\nhttps://www.google.de/maps > https://www.google.de/maps/place/\nhttps://www.google.com/maps > https://www.google.com/maps/place/\nhttps://www.youtube.com > https://www.youtube.com/results?search_query=\n",
		"search-engine" : "Google",
		"search-preferred-site" : "website",
		"search-dblclick": true,
		"search-site-shortcut-active": false,
		"search-open-folder-shortcut-active": false,
		"feeds-url-mapping" : "# Syntax: A > B\n# For each bookmark URL starting with A, a feed is loaded from B.\n# Lines starting with # are ignored and can be used for comments.\n\n",
		"feeds-expiration-time" : 30, // in minutes
		"feed-subscriptions" : {},
		"feed-subscriptions-update" : "on-newtab",
		"_pt_" : [],
		"_pt_/synced" : true
	};
	const cacheQuota = {
		"search-url-mapping" : 4000,
		"icon-url-mapping" : 32000,
		"feeds-url-mapping" : 4000
	}
	const storage = chrome.storage.local;
	const getStringSize = function(value) {
		value = String(value);
		let n = 0;
		for (let i = 0; i < value.length; i++) {
		    const c = value.charCodeAt(i);
		    n += c < (1 <<  7) ? 1 :
		               c < (1 << 11) ? 2 :
		               c < (1 << 16) ? 3 :
		               c < (1 << 21) ? 4 :
		               c < (1 << 26) ? 5 :
		               c < (1 << 31) ? 6 : Number.NaN;
		}
		return n;
	}
	const get = function(name) {
		return cache[name];
	}
	const set = function(name, value, callback) {
		if(cacheQuota[name]) {
			const size = getStringSize(value);
			if(size > cacheQuota[name])
				return callback("This setting could not be saved, because the storage quota has been exceeded for the underlying data field '"+name+"'!\nThe maximum allowed size for this field is "+cacheQuota[name]+" characters/bytes!\nPlease, remove items or shorten your entry!\n\nQuota limits are necessary to ensure that settings can be synced!");
		}
		var items = {};
		items[name] = value;
		var oldValue = cache[name];
		cache[name] = value;
		storage.set(items, ()=>{
			if(chrome.runtime.lastError) {
				cache[name] = oldValue;
				if(callback)
					callback(chrome.runtime.lastError);
			}
			else if(callback) {
				callback();
			}
		})
	}
	const isSynced = function(name) {
		var key = name + "/synced";
		return cache[key];
	}
	const setSynced = function(name, synced, callback) {
		var key = name + "/synced";
		set(key, synced, callback);
	}
	const getSyncedKeys = function() {
		return Object
			.keys(cache)
			.filter(key => key.endsWith('/synced') && cache[key])
			.map(key => key.substr(0, key.length-7));
	}
	const getExportKeys = function() {
		return Object
			.keys(cache)
			.filter(key => !(key.startsWith('_') || key.endsWith('/synced')));
	}
	const importFromJSON = function(json) {
		return new Promise((resolve,reject) => {
			var data = JSON.parse(json);
			var newValues = {};
			var oldValues = {};
			getExportKeys().forEach( key => {
				if(data[key] !== undefined) {
					oldValues[key] = cache[key];
					newValues[key] = data[key];
					let syncedKey = key + "/synced";
					oldValues[syncedKey] = cache[syncedKey];
					newValues[syncedKey] = data[syncedKey] || false;
				}
			});
			storage.set(newValues, ()=>{
				if(chrome.runtime.lastError) {
					Object.keys(oldValues).forEach( k => {
						cache[k] = oldValues[k];
					})
					reject(chrome.runtime.lastError);
				}
				else {
					resolve();
				}
			})
		})
	}
	const importFromFile = function(file) {
		return new Promise((resolve,reject) => {
			var reader = new FileReader();
			reader.onload = e => {
				resolve(e.target.result);
			}
			reader.onerror = reject;
			reader.readAsText(file);
		})
		.then(importFromJSON)
	}
	const exportToJSON = function() {
		var exportData = {};
		getExportKeys().forEach( key => {
			exportData[key] = cache[key];
			let syncedKey = key + "/synced";
			exportData[syncedKey] = cache[syncedKey] || false;
		});
		try {
			return JSON.stringify(exportData, null, 2);
		}
		catch(e) {
			return JSON.stringify({});
		}
	}
	const exportToFile = function() {
		return new Blob([exportToJSON()], {type : 'application/json' });
	}
	const onStorageChanged = function(changes, areaName) {
		if(areaName == "local") { // listen only to local changes
			for(let name in changes) {
				cache[name] = changes[name].newValue;
				extensionEvent.dispatch('settings/' + name, { value : cache[name] });
			}
		}
	}
	const onRuntimeInstalled = function(details) {
		switch(details.reason) {
			case "update":
				setTimeout(()=>{
					const callback = () => console.log( "settings upgrade ... ");
					const removeKeys = [
						"icon-folder-thumbnails-dim",
						"icon-folder-thumbnails-dim/synced",
						"24-hour-clock",
						"clock-style"
					];
					chrome.storage.local.remove(removeKeys, callback);
					chrome.storage.sync.remove(removeKeys, callback);
				},1000)
			break;
		}
	}
	const init = function() {
		extensionEvent = api.extensionEvent;
		return new Promise((resolve, reject)=>{
			storage.get(null, items=>{
				if(chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
				}
				else {
					for(let key in items) {
						cache[key] = items[key];
					}
					resolve();
				}
			})
		})
	}
	defineAPI("settings", {
		await : ["extensionEvent"],
		init,
		listeners : {
			storage : {
				onChanged : onStorageChanged,
			}
		},
		sessionListeners : {
			runtime : {
				onInstalled : onRuntimeInstalled
			}
		},
		get,
		set,
		isSynced,
		setSynced,
		getSyncedKeys,
		importFromFile,
		exportToFile,
		exportToJSON
	});
}
{
	const URL_MAPPING_INSERT = "Lines starting with # are ignored and can be used for comments.\n\n";
	const truncate = function( str, n ) {
		if (str.length <= n) {
			return str;
		}
		var subString = str.substr(0, n-1);
		return subString + " …";
	}
	const parseURLMapping = function(text) {
		var mapping = {};
		var lines = text.split("\n");
		for(var i=0; i<lines.length; i++) {
			var line = lines[i].trim();
			if(!line.length || (line.charAt(0) == "#"))
				continue;
			var t = line.split(">");
			if(t.length != 2)
				continue;
			mapping[t[0].trim()] = t[1].trim();
		}
		return mapping;
	}
	const removeURLMapping = function(text, url) {
		return text
			.split("\n")
			.filter(line=>{
				var t = line.split(">");
				return ((t.length == 2) && (t[0].trim() == url)) ? false : true;
			})
			.join("\n");
	}
	const addURLMapping = function(text, urlA, urlB) {
		var newLine = urlA+" > "+urlB+"\n";
		if(text.includes(URL_MAPPING_INSERT)) {
			var t = text.split(URL_MAPPING_INSERT);
			t[1] = newLine + t[1];
			return t.join(URL_MAPPING_INSERT);
		}
		else {
			return (urlA + " > " + urlB) + "\n" + text;
		}
	}
	const formatCounter1K = function(n) {
		if(n < 1000)
			return n;
		else if(n == 1000)
			return "1K";
		else
			return ">1K";
	}
	defineAPI("stringUtil", {
		truncate,
		parseURLMapping,
		removeURLMapping,
		addURLMapping,
		formatCounter1K
	})
}
{
	let settings, extensionEvent;
	const BACKGROUND_PLACEHOLDER_PATH = "/wallpapers/error.png";
	const BACKGROUND_WEB_CACHE_PATH = "background-web";
	const CACHE_URL_WEB = 'https://cache.web-accessories.com/wallpaper/web';
	const CACHE_URL_FS = 'https://cache.web-accessories.com/wallpaper/fs';
	const getStyleTheme = function(withoutBackground) {
		return fetch("/themes/" + settings.get("theme") + "/style"+ (withoutBackground ? "-wo-bgr": "") +".css")
			.then(response => response.ok ? response.text() : Promise.reject() )
	}
	const prepareBackgroundImage = function() {
		switch(settings.get("background-type")) {
			case "web":
				return caches
					.open('wallpaper')
					.then(cache =>
						fetch(CACHE_URL_WEB, {cache:'reload'}) // this clears Chrome's image cache!
							.then(response=>(response.ok ? response : Promise.reject('image-not-cached')))
							.catch(error=>
								fetch(settings.get("background-web").url, { mode : 'cors' })
									.catch(()=>fetch(settings.get("background-web").url, { mode : 'no-cors' }))
									.then(response=>cache.put(CACHE_URL_WEB, response))
							)
					)
					.then(()=>CACHE_URL_WEB)
					.catch(()=>BACKGROUND_PLACEHOLDER_PATH)
			break;
			case "file":
				if(!settings.get("background-file"))
					return Promise.resolve(BACKGROUND_PLACEHOLDER_PATH);
				return fetch(settings.get("background-file").url, {cache:'reload'}) // this clears Chrome's image cache!
					.then(response=>Promise.resolve(response.ok ? settings.get("background-file").url : BACKGROUND_PLACEHOLDER_PATH))
			break;
			default:
				return Promise.resolve(BACKGROUND_PLACEHOLDER_PATH);
			break;
		}
	}
	const prepareBackgroundImageThumb = function(backgroundImageURL) {
		return new Promise((resolve,reject)=>{
			var img = new Image();
			img.onerror = reject;
			img.onload = ()=>{
				var w = 60;
				var r = img.width / w;
				var h = Math.round(img.height / r);
				const canvas = document.createElement('canvas');
				canvas.width = w;
				canvas.height = h;
				var ctx = canvas.getContext('2d');
				ctx.imageSmoothingEnabled = true;
				ctx.imageSmoothingQuality = "medium";
				ctx.drawImage(img, 0,0, w, h);
				ctx.filter = 'blur(5px)';
				ctx.drawImage(img, 0,0, w, h);
				try {
					resolve(canvas.toDataURL('image/jpeg', .9));
				}
				catch(error) {
					reject(error);
				}
			};
			img.src = backgroundImageURL;
		})
		.catch(()=>Promise.resolve('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='))
	}
	const prepareBackgroundImages = function() {
		var urls = {};
		return prepareBackgroundImage()
			.then(url=>{
				urls.image = url;
				return prepareBackgroundImageThumb(url)
			})
			.then(urlThumb=>{
				urls.imageThumb = urlThumb;
			})
			.catch(console.log)
			.then(()=>urls)
	}
	const getStyleBackground = function() {
		switch(settings.get("background-type")) {
			case "theme":
				return Promise.resolve("");
			break;
			case "web":
			case "file":
				return prepareBackgroundImages()
				.then(urls=>{
					return `
						html:before, html:after {
							content:'';
							position:fixed;
							top:0;
							left:0;
							width:100%;
							height:100%;
							pointer-events:none;
							background-size:cover;
							background-repeat:no-repeat;
							background-position:center;
						}
						html:before {
							z-index:-3;
							background-image:url('${urls.imageThumb}');
						}
						html:after {
							z-index:-2;
							filter:opacity(0%);
						}
						html[data-preloaded-images~="${urls.image}"]:after {
							filter:opacity(100%);
							background-image:url('${urls.image}');
						}
						html.visible[data-preloaded-images~="${urls.image}"]:after {
							transition:filter 600ms linear;
						}
					`;
				})
				.catch(console.log)
			break;
			case "color":
				return Promise.resolve("html:before { background-color: "+settings.get("background-color")+"; background-image:none; }");
			break;
		}
	}
	const getStyleBackgroundFilter = function() {
		if(["web", "file"].includes(settings.get("background-type")) && settings.get("background-filter-active")) {
			const backgroundFilterColor = settings.get("background-filter-color");
			const backgroundFilterBlendMode = settings.get("background-filter-blend-mode");
			return Promise.resolve(`
				body:before {
					content:'';
					position:fixed;
					top:0;
					left:0;
					width:100%;
					height:100%;
					pointer-events:none;
					background-color:${backgroundFilterColor};
					mix-blend-mode:${backgroundFilterBlendMode};
					z-index:-1;
				}
			`);
		}
		else {
			return Promise.resolve("");
		}
	}
	const getStyleDock = function() {
		switch(settings.get("dock-background-type")) {
			case 'theme':
				return Promise.resolve("");
			break;
			case 'color':
				let dockBackgroundColor = settings.get("dock-background-color");
				return Promise.resolve(`:root { --theme-dock-background-color: ${dockBackgroundColor}; }`);
			break;
		}
	}
	let compilePromise = Promise.resolve(); // makes sure all compilations are in series ...
	const _compile = function(keepTheme, keepBackground, keepBackgroundFilter, keepDock) {
		extensionEvent.dispatch("style/compile-begin");
		compilePromise = compilePromise
			.then(()=> Promise.all([
				keepTheme ? localStorage.getItem('style/theme') : getStyleTheme(settings.get("background-type") != "theme"),
				keepBackground ? localStorage.getItem('style/background') : getStyleBackground(),
				keepBackgroundFilter ? localStorage.getItem('style/background-filter') : getStyleBackgroundFilter(),
				keepDock ? localStorage.getItem('style/dock') : getStyleDock()
			]))
			.then(css=>{
				localStorage.setItem('style/theme', css[0] || "");
				localStorage.setItem('style/background', css[1] || "");
				localStorage.setItem('style/background-filter', css[2] || "");
				localStorage.setItem('style/dock', css[3] || "");
				const images = [];
				const regEx = /html\[data-preloaded-images~=\"([^\"]*)\"\]/g;
				for(const str of css) {
					let match;
					while(match = regEx.exec(str)) {
						if(!images.includes(match[1]))
							images.push(match[1]);
					}
				}
				localStorage.setItem('style/preload-images', images.join(","));
				extensionEvent.dispatch("style/change");
			})
			.catch(console.log)
			.then(()=>{
				extensionEvent.dispatch("style/compile-end");
			})
	}
	let compileTimeout = null;
	const compile = function(keepTheme, keepBackground, keepBackgroundFilter, keepDock) {
		clearTimeout(compileTimeout);
		compileTimeout = setTimeout(()=>_compile(keepTheme, keepBackground, keepBackgroundFilter, keepDock),50);
	}
	const compileTheme = ()=>compile(false, true, true, true);
	const compileBackground = ()=>compile(true, false, true, true);
	const compileBackgroundFilter = ()=>compile(true, true, false, true);
	const compileDock = ()=>compile(true, true, true, false);
	const getCSS = function(name) {
		return localStorage.getItem('style/'+name)||'';
	}
	const getImagesToPreload = function() {
		return (localStorage.getItem('style/preload-images')||'').split(",");
	}
	const onRuntimeInstalled = function(details) {
		switch(details.reason) {
			case "update":
				setTimeout(()=>{
					compile();
				},1000);
			break;
		}
	}
	const init = function() {
		settings = api.settings;
		extensionEvent = api.extensionEvent;
		addEventListener("settings/background-type", ()=>compile());
		addEventListener("settings/background-web", ()=>{
			caches
				.open('wallpaper')
				.then(cache=>cache.delete(CACHE_URL_WEB))
				.catch(console.log)
				.then(compileBackground)
		});
		addEventListener("settings/background-file", compileBackground);
		addEventListener("settings/background-color", compileBackground);
		addEventListener("settings/background-filter-active", compileBackgroundFilter);
		addEventListener("settings/background-filter-color", compileBackgroundFilter);
		addEventListener("settings/background-filter-blend-mode", compileBackgroundFilter);
		addEventListener("settings/dock-background-type", compileDock);
		addEventListener("settings/dock-background-color", compileDock);
		addEventListener("settings/theme", compileTheme);
		if(!localStorage.getItem('style/theme')) {
			compile();
		}
		if((settings.get("background-type") == "web") && settings.get("background-web")) {
			setTimeout(()=>{
				let backgroundWeb = settings.get("background-web");
				let isExpired = backgroundWeb.expires ? (Date.now() > backgroundWeb.expires) : false;
				if(isExpired) {
					caches
						.open('wallpaper')
						.then(cache=>cache.delete(CACHE_URL_WEB))
						.catch(console.log)
						.then(compileBackground)
				}
			}, 3000)
		}
	}
	defineAPI("style", {
		await : ["settings", "extensionEvent"],
		init,
		sessionListeners : {
			runtime : {
				onInstalled : onRuntimeInstalled
			}
		},
		getCSS,
		getImagesToPreload
	});
}
{
	const DELAY = 3 * 60 * 1000;
	let timeout, f;
	const standby = function(standby) {
		if(standby) {
			if(!f.parentNode)
				document.body.appendChild(f);
		}
		else if(f.parentNode)
			f.remove();
	}
	const update = function() {
		clearTimeout(timeout);
		timeout = null;
		standby(true);
		if(chrome.extension.getViews({type : "tab"}).length == 0)
			timeout = setTimeout(()=>standby(false), DELAY);
	}
	const init = function() {
		const noop = () => {};
		f = document.createElement("iframe");
		f.onload = ()=>f.contentWindow.chrome.runtime.connect({name:"p"});
		f.src = "copyright.txt";
		chrome.runtime.onConnect.addListener(noop);
		chrome.runtime.onSuspend.addListener(()=>chrome.alarms.create("wakeup", { delayInMinutes : 1 }));
		chrome.runtime.onSuspendCanceled.addListener(()=>chrome.alarms.clear("wakeup"));
		chrome.alarms.onAlarm.addListener(noop);
		chrome.alarms.clear("wakeup");
		addEventListener("session/view-created", update);
		addEventListener("session/view-removed", ()=>setTimeout(update, 100));
		standby(true);
	}
	defineAPI("suspension", {
		await:[],
		init
	})
}
const THEMES = {
    "default_white": {
        "title": "Default – White",
        "chromeTheme": null
    },
    "default_grey": {
        "title": "Default – Grey",
        "chromeTheme": null
    },
    "default_dark": {
        "title": "Default – Dark",
        "chromeTheme": "bluish-grey/phbgkphllaheaghcobanelhehmlnilmc"
    },
    "sea_foam": {
        "title": "Sea Foam",
        "chromeTheme": "sea-foam/lahipjfggmgneaopcckkaipmoandaboo"
    },
    "rose": {
        "title": "Rose",
        "chromeTheme": "rose/aobcgffnbkbipbflopponndoiommhnch"
    },
    "slate": {
        "title": "Slate",
        "chromeTheme": "slate/cmhmcmgkegfffbbfobhjpdbimgmoohap"
    },
    "high_contrast_colorful": {
        "title": "High Contrast Colorful",
        "chromeTheme": "high-contrast-colorful/cdfdkmklcjlnnnlnplffpdiekfhkpbme"
    },
    "classic_blue": {
        "title": "Classic Blue",
        "chromeTheme": "classic-blue/mdifmgkofhcnndinbbdbaplplnmdalnc"
    },
    "oceanic": {
        "title": "Oceanic",
        "chromeTheme": "oceanic/gbbacdmgjdfajabgglpjifcedoajdimg"
    },
    "banana": {
        "title": "Banana",
        "chromeTheme": "banana/cdkecinaonohgbmhojlaeeoalomfhlal"
    },
    "marsala": {
        "title": "Marsala",
        "chromeTheme": "marsala/jjlfmldcaheghnjjpgpoadjfppefjmkj"
    },
    "pretty-in-pink": {
        "title": "Pretty in Pink",
        "chromeTheme": "pretty-in-pink/moncllbmpgeokdhbbekemjlmgcmcmmhb"
    },
    "serenity": {
        "title": "Serenity",
        "chromeTheme": "serenity/pjjaaonciccncnfeeecpnfgepojgmfpg"
    },
    "ultra-violet": {
        "title": "Ultra Violet",
        "chromeTheme": "ultra-violet/lcknjpenlfdlffeafcadkbjfodmmgdip"
    },
    "honeysuckle": {
        "title": "Honeysuckle",
        "chromeTheme": "honeysuckle/iplhdhfokhijhogcccokkeokchhooibk"
    },
    "just_black": {
        "title": "Just Black",
        "chromeTheme": "just-black/aghfnjkcakhmadgdomlmlhhaocbkloab"
    },
    "black_indigo": {
        "title": "Black Indigo",
        "chromeTheme": "black-indigo/chmljfkdmhknpmeeaebogdlcobdglihk"
    },
    "camo": {
        "title": "Camo",
        "chromeTheme": "camo/mlkdlonndpcdkfdinngnoiddngiagiph"
    },
    "summer_morning": {
        "title": "Summer – Morning",
        "chromeTheme": "early-morning/dhljjmpdaakcabbeofmndeeinjdclkjf"
    },
    "summer_noon": {
        "title": "Summer – Noon",
        "chromeTheme": "noon/diimngpkgkjhicbpljheffoknjljaahk"
    },
    "summer_evening": {
        "title": "Summer – Evening",
        "chromeTheme": "oceanic/gbbacdmgjdfajabgglpjifcedoajdimg"
    },
    "landscape_grey": {
        "title": "Landscape – Grey",
        "chromeTheme": "just-grey/lpfbmiakdjpihkappepbngjeeblibeco"
    },
    "landscape_sand": {
        "title": "Landscape – Sand",
        "chromeTheme": "sand/hgodgpkgnmfkokmmfpopkdphhekldkop"
    },
    "landscape_blue_grey": {
        "title": "Landscape – Blue Grey",
        "chromeTheme": null
    },
    "sunny": {
        "title": "Sunny",
        "chromeTheme": "skyblue/bnjafhcjhljoakkhcnefjmjokfpbmebl"
    },
    "sand": {
        "title": "Sand",
        "chromeTheme": "sand/hgodgpkgnmfkokmmfpopkdphhekldkop"
    },
    "soil": {
        "title": "Soil",
        "chromeTheme": "black-indigo/chmljfkdmhknpmeeaebogdlcobdglihk"
    },
    "ice_pop_orange": {
        "title": "Ice Pop – Orange",
        "chromeTheme": "juice/mdlnajhcdaebdhjcjcdjgakfjhkkojhj"
    },
    "ice_pop_sour": {
        "title": "Ice Pop – Sour",
        "chromeTheme": "black-indigo/chmljfkdmhknpmeeaebogdlcobdglihk"
    },
    "ice_pop_sweet": {
        "title": "Ice Pop – Sweet",
        "chromeTheme": "black-indigo/chmljfkdmhknpmeeaebogdlcobdglihk"
    },
    "pastel_1": {
        "title": "Pastel I",
        "chromeTheme": "sea-foam/lahipjfggmgneaopcckkaipmoandaboo"
    },
    "pastel_2": {
        "title": "Pastel II",
        "chromeTheme": "sea-foam/lahipjfggmgneaopcckkaipmoandaboo"
    },
    "pastel_3": {
        "title": "Pastel III",
        "chromeTheme": "sea-foam/lahipjfggmgneaopcckkaipmoandaboo"
    },
    "zigzag_blue_grey": {
        "title": "Zigzag – Blue Grey",
        "chromeTheme": "sunny-blue/lickmlblgejhimhgknmmmpannbigofjp"
    },
    "zigzag_blue": {
        "title": "Zigzag – Blue",
        "chromeTheme": "sunny-blue/lickmlblgejhimhgknmmmpannbigofjp"
    },
    "zigzag_blue_dark": {
        "title": "Zigzag – Blue Dark",
        "chromeTheme": "camo/mlkdlonndpcdkfdinngnoiddngiagiph"
    },
    "pop": {
        "title": "Pop",
        "chromeTheme": "just-black/aghfnjkcakhmadgdomlmlhhaocbkloab"
    },
    "toy": {
        "title": "Toy",
        "chromeTheme": "sand/hgodgpkgnmfkokmmfpopkdphhekldkop"
    },
    "gadget": {
        "title": "Gadget",
        "chromeTheme": "black-indigo/chmljfkdmhknpmeeaebogdlcobdglihk"
    },
    "lava_yellow": {
        "title": "Lava – Yellow",
        "chromeTheme": "black-indigo/chmljfkdmhknpmeeaebogdlcobdglihk"
    },
    "lava_pink": {
        "title": "Lava – Pink",
        "chromeTheme": "black-indigo/chmljfkdmhknpmeeaebogdlcobdglihk"
    },
    "lava_blue": {
        "title": "Lava – Blue",
        "chromeTheme": "black-indigo/chmljfkdmhknpmeeaebogdlcobdglihk"
    },
    "blue_dots": {
        "title": "Blue – Dots",
        "chromeTheme": "sunny-blue/lickmlblgejhimhgknmmmpannbigofjp"
    },
    "teal_dots": {
        "title": "Teal – Dots",
        "chromeTheme": "teal/cafneiijoiilkffkmcdgppiaedafdmna"
    },
    "grey_dots": {
        "title": "Grey – Dots",
        "chromeTheme": "just-grey/lpfbmiakdjpihkappepbngjeeblibeco"
    },
    "sunset": {
        "title": "Sunset",
        "chromeTheme": "black-indigo/chmljfkdmhknpmeeaebogdlcobdglihk"
    },
    "ocean": {
        "title": "Ocean",
        "chromeTheme": "black-indigo/chmljfkdmhknpmeeaebogdlcobdglihk"
    },
    "aurora": {
        "title": "Aurora",
        "chromeTheme": "black-indigo/chmljfkdmhknpmeeaebogdlcobdglihk"
    },
    "grey": {
        "title": "Grey",
        "chromeTheme": "just-grey/lpfbmiakdjpihkappepbngjeeblibeco"
    },
    "grey_dark": {
        "title": "Grey – Dark",
        "chromeTheme": "just-grey/lpfbmiakdjpihkappepbngjeeblibeco"
    },
    "grey_radiance": {
        "title": "Grey – Radiance",
        "chromeTheme": "just-grey/lpfbmiakdjpihkappepbngjeeblibeco"
    },
    "teal": {
        "title": "Teal",
        "chromeTheme": "teal/cafneiijoiilkffkmcdgppiaedafdmna"
    },
    "teal_dark": {
        "title": "Teal – Dark",
        "chromeTheme": "just-grey/lpfbmiakdjpihkappepbngjeeblibeco"
    },
    "teal_radiance": {
        "title": "Teal – Radiance",
        "chromeTheme": "teal/cafneiijoiilkffkmcdgppiaedafdmna"
    },
    "blue": {
        "title": "Blue",
        "chromeTheme": "sunny-blue/lickmlblgejhimhgknmmmpannbigofjp"
    },
    "blue_dark": {
        "title": "Blue – Dark",
        "chromeTheme": "just-grey/lpfbmiakdjpihkappepbngjeeblibeco"
    },
    "blue_radiance": {
        "title": "Blue – Radiance",
        "chromeTheme": "sunny-blue/lickmlblgejhimhgknmmmpannbigofjp"
    },
    "pink": {
        "title": "Pink",
        "chromeTheme": "passion-for-pink/cogfkcjpgcgbhkllpaednchppnjepmmm"
    },
    "pink_dark": {
        "title": "Pink – Dark",
        "chromeTheme": "just-grey/lpfbmiakdjpihkappepbngjeeblibeco"
    },
    "pink_radiance": {
        "title": "Pink – Radiance",
        "chromeTheme": "passion-for-pink/cogfkcjpgcgbhkllpaednchppnjepmmm"
    }
};
{
	const TIMEOUT_AFTER_PURCHASE = 4000;
	const ENV = "prod";
	const list = function() {
		return Object.keys(THEMES);
	}
	const getTitle = function(name) {
		return THEMES[name] ? THEMES[name]["title"] : undefined;
	}
	const getMatchingChromeTheme = function(name) {
		return (THEMES[name] && THEMES[name]["chromeTheme"])
			? 'https://chrome.google.com/webstore/detail/' + THEMES[name]["chromeTheme"]
			: 'https://chrome.google.com/webstore/category/themes'
		;
	}
	defineAPI("theme", {
		list,
		getTitle,
		getMatchingChromeTheme,
	});
}
{
	const a = document.createElement("a");
	const getHostname = function(url) {
		a.href = url;
		return a.hostname.toLowerCase();
	}
	const hasDomain = function(url, domain) {
		var hostname = getHostname(url);
		return (hostname == domain) || (hostname.endsWith("."+domain));
	}
	const matchDomains = function(url, domains) {
		var hostname = getHostname(url);
		for(var domain of domains) {
			if((hostname == domain) || (hostname.endsWith("."+domain)))
				return true;
		}
		return false;
	}
	const getProtocol = function(url) {
		a.href = url;
		return a.protocol.toLowerCase();
	}
	const getOrigin = function(url) {
		a.href = url;
		return a.origin.toLowerCase();
	}
	const removeQuery = function(url) {
		a.href = url;
		return a.protocol + '//' + a.host + a.pathname;
	}
	const getSearch = function(url) {
		a.href = url;
		return a.search;
	}
	const getSearchParams = function(url) {
		a.href = url;
		return new URLSearchParams(a.search);
	}
	const getParent = function(url) {
		var t = url.split("/");
		t.pop();
		return t.join("/");
	}
	const getRoot = function(url) {
		a.href = url;
		return a.protocol + '//' + a.host;
	}
	const getPathname = function(url) {
		a.href = url;
		return a.pathname;
	}
	const isValid = function(url) {
		try {
			new URL(url);
			return true;
		}
		catch(e) {
			return false;
		}
	}
	const resolveRelative = function(documentURL, relativeURL) {
		if(!relativeURL)
			return removeQuery(documentURL);
		if(relativeURL.startsWith("http"))
			return relativeURL;
		if(relativeURL.startsWith("chrome"))
			return relativeURL;
		if(relativeURL.startsWith("//"))
			return getProtocol(documentURL) + relativeURL;
		if(relativeURL.startsWith("/"))
			return getRoot(documentURL) + relativeURL;
		return getParent(documentURL) + "/" + relativeURL;
	}
	defineAPI("uri", {
		getParent,
		getRoot,
		resolveRelative,
		getHostname,
		hasDomain,
		matchDomains,
		getProtocol,
		getOrigin,
		getPathname,
		isValid,
		removeQuery,
		getSearch,
		getSearchParams
	})
}
{const t = document.createElement("template");t.innerHTML = `<style>:host{width:auto;min-width:400px}#message{white-space:pre-wrap}</style><a-topbar>	<h1 slot="left"></h1>	<a-button slot="right" title="i18n:close" data-icon="close" data-action="cancel"></a-button></a-topbar><div id="message" class="text"></div><div class="buttons">	<a-button data-action="ok" tabindex="1">OK</a-button></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initAlertDialogUI(window) {if(window.AlertDialogUI) return window.AlertDialogUI;initDialogUI(window);initTopbar(window);initButton(window);with(window) {class AlertDialogUI extends DialogUI {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._title = shadowRoot.querySelector("h1");
		this._message = shadowRoot.getElementById("message");
	}
	setValues(values) {
		this._title.textContent = values.title || "";
		this._message.textContent = values.message || "";
	}
}
window.showAlert = function(title, message, callback) {
	showDialog(AlertDialogUI, { title, message }, callback);
}
defineCustomElement("a-alert-dialog-ui", AlertDialogUI, t);return window.AlertDialogUI=AlertDialogUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>a-textfield{width:100%}</style><a-topbar>	<h1 slot="left"></h1>	<a-button slot="right" title="i18n:close" data-icon="close" data-action="cancel"></a-button></a-topbar><div class="form" data-option="custom">	<h2 data-i18n="name"></h2>	<a-textfield id="title" tabindex="1"></a-textfield>	<h2 data-i18n="url"></h2>	<a-textfield id="url" tabindex="2" data-placeholder="http://" data-type="url" data-required="required"></a-textfield></div><div class="buttons">	<a-button data-action="cancel" data-i18n="cancel" tabindex="4"></a-button>	<a-button data-action="ok" data-i18n="ok" tabindex="3"></a-button></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initBookmarkEditorUI(window) {if(window.BookmarkEditorUI) return window.BookmarkEditorUI;initDialogUI(window);initTopbar(window);initButton(window);initTextfield(window);with(window) {class BookmarkEditorUI extends DialogUI {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._dialogTitle = shadowRoot.querySelector("h1");
		this._title = shadowRoot.getElementById("title");
		this._url = shadowRoot.getElementById("url");
	}
	reportValidity() {
		return this._url.reportValidity();
	}
	ok() {
		if(!this.reportValidity())
			return;
		if(this._id) {
			api.bookmarks.update(this._id, { url : this._url.value, title : this._title.value }, node => {
				super.ok();
			});
		}
		else {
			api.bookmarks.safecreate({parentId : this._parentId, url : this._url.value, title : this._title.value, index : this._index }, node=> {
				this._index = node.index;
				this._id = node.id;
				super.ok();
			})
		}
	}
	update() {
		if(this._id) {
			return new Promise((resolve, reject)=>{
				api.bookmarks.getSingle(this._id, node=>{
					if(!node)
						return reject();
					this._title.value = node.title;
					this._url.value = node.url;
					this._index = node.index; // why?
					this._parentId = node.parentId; // why?
					resolve();
				})
			})
		}
	}
	setValues(values) {
		this._id = values.id;
		this._parentId = values.parentId;
		this._index = values.index;
		this._dialogTitle.textContent = chrome.i18n.getMessage(this._id ? "edit" : "add_page");
		return this.update();
	}
	getValues() {
		return {
			id : this._id,
			parentId : this._parentId,
			index : this._index,
			url : this._url.value,
			title : this._title.value,
		};
	}
}
defineCustomElement("a-bookmark-editor-ui", BookmarkEditorUI, t);return window.BookmarkEditorUI=BookmarkEditorUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>a-textfield{width:100%}</style><a-topbar>	<h1 slot="left"></h1>	<a-button slot="right" title="i18n:close" data-icon="close" data-action="cancel"></a-button></a-topbar><div class="form" data-option="custom">	<h2 data-i18n="name"></h2>	<a-textfield id="title" tabindex="1"></a-textfield></div><div class="buttons">	<a-button data-i18n="cancel" data-action="cancel" tabindex="4">Cancel</a-button>	<a-button data-i18n="ok" data-action="ok" tabindex="3">OK</a-button></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initBookmarkFolderEditorUI(window) {if(window.BookmarkFolderEditorUI) return window.BookmarkFolderEditorUI;initDialogUI(window);initTopbar(window);initButton(window);initTextfield(window);with(window) {class BookmarkFolderEditorUI extends DialogUI {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._dialogTitle = shadowRoot.querySelector("h1");
		this._title = shadowRoot.getElementById("title");
	}
	ok() {
		if(this._id) {
			api.bookmarks.update(this._id, { title : this._title.value }, node => {
				super.ok();
			});
		}
		else {
			api.bookmarks.safecreate({parentId : this._parentId, title : this._title.value, index : this._index }, node=> {
				this._index = node.index;
				this._id = node.id;
				super.ok();
			})
		}
	}
	update() {
		if(this._id) {
			return new Promise((resolve, reject)=>{
				api.bookmarks.getSingle(this._id, node=>{
					if(!node)
						return reject();
					this._title.value = node.title;
					this._index = node.index; // why?
					this._parentId = node.parentId; // why?
					resolve();
				})
			})
		}
	}
	setValues(values) {
		this._id = values.id;
		this._parentId = values.parentId;
		this._index = values.index;
		this._dialogTitle.textContent = chrome.i18n.getMessage(this._id ? "edit" : "add_folder");
		return this.update();
	}
	getValues() {
		return {
			id : this._id,
			parentId : this._parentId,
			index : this._index,
			title : this._title.value,
		};
	}
}
defineCustomElement("a-bookmark-folder-editor-ui", BookmarkFolderEditorUI, t);return window.BookmarkFolderEditorUI=BookmarkFolderEditorUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{width:400px;height:90vh}a-selector{border-bottom:1px solid #efefef}a-selector div{padding:10px 16px;border-bottom:1px solid #efefef}a-selector div:hover{background-color:#F8F9FA}a-selector div.-selected{background-color:#CAE2F9;color:#212B3B}</style><a-topbar>	<h1 slot="left" data-i18n="choose_folder_"></h1>	<a-button slot="right" data-icon="close" data-action="cancel"></a-button></a-topbar><a-selector class="content"></a-selector><div class="buttons">	<a-button data-action="cancel" tabindex="2"> Cancel </a-button>	<a-button data-action="ok" tabindex="1"> OK </a-button></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initBookmarkFolderSelectorUI(window) {if(window.BookmarkFolderSelectorUI) return window.BookmarkFolderSelectorUI;initDialogUI(window);initTopbar(window);initButton(window);initSelector(window);with(window) {class BookmarkFolderSelectorUI extends DialogUI {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._selector = shadowRoot.querySelector("a-selector");
	}
	addOptions(bookmarkTreeNodes, spaceBefore) {
		bookmarkTreeNodes.forEach(bookmarkTreeNode=>{
			if(bookmarkTreeNode.children) {
				if(bookmarkTreeNode.id != "0") {
					let div = document.createElement("div");
					div.innerHTML = spaceBefore + "▸&nbsp;&nbsp;" +  bookmarkTreeNode.title;
					div.dataset.option = bookmarkTreeNode.id;
					this._selector.appendChild(div);
				}
				if(bookmarkTreeNode.children && bookmarkTreeNode.children.length) {
					this.addOptions(bookmarkTreeNode.children, spaceBefore + "&nbsp;&nbsp;");
				}
			}
		})
	}
	updateSelector(id) {
		this._selector.innerHTML = "";
		return new Promise(resolve=>{
			chrome.bookmarks.getTree(bookmarkTreeNodes=>{
				this.addOptions(bookmarkTreeNodes, "");
				this._selector.value = id;
				resolve();
			});
		})
	}
	getValues() {
		return {
			id : this._selector.value
		}
	}
	setValues(values) {
		return this.updateSelector(values.id);
	}
}
defineCustomElement("a-bookmark-folder-selector-ui", BookmarkFolderSelectorUI, t);return window.BookmarkFolderSelectorUI=BookmarkFolderSelectorUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{cursor:pointer;white-space:nowrap}span{vertical-align:top;display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:8px 20px;border:1px solid #e8e8e8;background-color:white;margin-left:3px;border-radius:3px;min-width:200px;font-weight:500;width:300px}*{vertical-align:top}a-button{min-width:100px}</style><a-button data-i18n="select"></a-button><span>---</span>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initBookmarkFolderSelector(window) {if(window.BookmarkFolderSelector) return window.BookmarkFolderSelector;initCustomElement(window);initBookmarkFolderSelectorUI(window);initButton(window);with(window) {class BookmarkFolderSelector extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._label = shadowRoot.querySelector("span");
		this._button = shadowRoot.querySelector("a-button");
		this.addEventListener("click", this, true);
		this.onBookmarksUpdate = this.onBookmarksUpdate.bind(this);
		chrome.bookmarks.onRemoved.addListener(this.onBookmarksUpdate);
		chrome.bookmarks.onChanged.addListener(this.onBookmarksUpdate);
		if(this.dataset.value)
			this.value = this.dataset.value;
	}
	onBookmarksUpdate(id) {
		if(id == this._value) {
			this.value = this.value;
		}
	}
	get value() {
		return this._value;
	}
	set value(value) {
		this._value = value;
		chrome.bookmarks.get(value, bookmarkTreeNodes=>{
			this._label.textContent = chrome.runtime.lastError ? "Bookmark ("+value+") deleted!" : (bookmarkTreeNodes[0].title.length ? bookmarkTreeNodes[0].title : "No title");
		});
	}
	handleEvent(event) {
		event.stopPropagation();
		showDialog(BookmarkFolderSelectorUI, { id: this._value }, values=>{
			if(this._value != values.id) {
				this.value = values.id;
				this.dispatchEvent(new Event('change', { bubbles : true}));
			}
		});
	}
}
defineCustomElement("a-bookmark-folder-selector", BookmarkFolderSelector, t);return window.BookmarkFolderSelector=BookmarkFolderSelector;}}}
{const t = document.createElement("template");t.innerHTML = `<style>a-selector{padding:20px;width:500px;display:flex;flex-wrap:wrap;justify-content:center}a-selector [data-option]{display:block;width:80px;height:80px;border-radius:5px;margin:5px;text-align:center;background-repeat:no-repeat;background-size:80px 80px}a-selector [data-option].-selected{background-color:#CAE2F9;background-blend-mode:darken;box-shadow:0 0 3px 2px rgba(51,103,214,0.5)}</style><a-selector class="content">	<div data-option="Grid 1x1" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Grid_1x1.png)"></div>	<div data-option="Grid 2x2" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Grid_2x2.png)"></div>	<div data-option="Grid 3x3" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Grid_3x3.png)"></div>	<div data-option="Grid 4x4" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Grid_4x4.png)"></div>	<div data-option="Grid 5x5" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Grid_5x5.png)"></div>	<div data-option="Mosaic 3x3+NorthWest" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Mosaic_3x3+NorthWest.png)"></div>	<div data-option="Mosaic 4x4+NorthWest" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Mosaic_4x4+NorthWest.png)"></div>	<div data-option="Mosaic 5x5+NorthWest" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Mosaic_5x5+NorthWest.png)"></div>	<div data-option="Mosaic 4x4+Center" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Mosaic_4x4+Center.png)"></div>	<div data-option="Mosaic 5x5+Center" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Mosaic_5x5+Center.png)"></div>	<div data-option="Grid 2x2+Cover" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Grid_2x2+Cover.png)"></div>	<div data-option="Grid 3x3+Cover" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Grid_3x3+Cover.png)"></div>	<div data-option="Grid 4x4+Cover" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Grid_4x4+Cover.png)"></div>	<div data-option="Grid 5x5+Cover" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Grid_5x5+Cover.png)"></div>	<div data-option="Stack 1" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Stack_1.png)"></div>	<div data-option="Stack 2" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Stack_2.png)"></div>	<div data-option="Stack 3" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Stack_3.png)"></div>	<div data-option="Stack 4" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Stack_4.png)"></div>	<div data-option="Stack 5" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Stack_5.png)"></div>	<div data-option="Stack 6" style="background-image:url(/ui/bookmark-folder-style-selector-ui/icon-Stack_6.png)"></div></a-selector>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initBookmarkFolderStyleSelectorUI(window) {if(window.BookmarkFolderStyleSelectorUI) return window.BookmarkFolderStyleSelectorUI;initDialogSelectorUI(window);initSelector(window);with(window) {class BookmarkFolderStyleSelectorUI extends DialogSelectorUI {}
defineCustomElement("a-bookmark-folder-style-selector-ui", BookmarkFolderStyleSelectorUI, t);return window.BookmarkFolderStyleSelectorUI=BookmarkFolderStyleSelectorUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:inline-block}</style><a-button></a-button>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initBookmarkFolderStyleSelector(window) {if(window.BookmarkFolderStyleSelector) return window.BookmarkFolderStyleSelector;initCustomElement(window);initBookmarkFolderStyleSelectorUI(window);initButton(window);with(window) {class BookmarkFolderStyleSelector extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._button = shadowRoot.querySelector("a-button");
		this.addEventListener("click", this, true);
		if(this.dataset.value)
			this.value = this.dataset.value;
	}
	get value() {
		return this._value;
	}
	set value(value) {
		this._value = value;
		this._button.textContent = chrome.i18n.getMessage("style") + ": " + value;
	}
	handleEvent(event) {
		event.stopPropagation();
		showDialog(BookmarkFolderStyleSelectorUI, { selectedStyle: this._value }, values=>{
			if(this._value != values.selectedStyle) {
				this.value = values.selectedStyle;
				this.dispatchEvent(new Event('change', { bubbles : true}));
			}
		});
	}
}
defineCustomElement("a-bookmark-folder-style-selector", BookmarkFolderStyleSelector, t);return window.BookmarkFolderStyleSelector=BookmarkFolderStyleSelector;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:inline-block;box-sizing:border-box;box-sizing:content-box !important}#canvas{width:100%;height:100%}</style><canvas id="canvas" width="0" height="0"></canvas>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initBookmarkIcon(window) {if(window.BookmarkIcon) return window.BookmarkIcon;initCustomElement(window);with(window) {class BookmarkIcon extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._canvas = shadowRoot.getElementById("canvas");
	}
	loadIcon() {
		return api.icons.getIconImageBitmap(this.dataset.url, this.dataset.id)
			.then(imageBitmap=>{
				api.iconsUtil.renderIcon(imageBitmap, this._canvas, 160);
			})
	}
}
defineCustomElement("a-bookmark-icon", BookmarkIcon, t);return window.BookmarkIcon=BookmarkIcon;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:inline-block;cursor:pointer;width:calc(var(--bookmark-icon-size) + 40px);height:calc(var(--bookmark-icon-size) + 60px);transition:filter 200ms, transform 200ms}:host *{pointer-events:none}:host #icon{display:block;width:var(--bookmark-icon-size, 80px);height:var(--bookmark-icon-size, 80px);margin:20px auto 0 auto;filter:var(--theme-icon-filter);border-radius:var(--theme-icon-border-radius)}:host img#icon:not([src]){visibility:hidden}:host #label{display:-webkit-box;text-align:center;line-height:15px;margin:7px auto 0 auto;text-overflow:ellipsis;overflow:hidden;width:auto;padding:0 0 2px 0;box-sizing:border-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;color:var(--theme-text-color);text-shadow:var(--theme-text-shadow)}:host #badge{display:block;position:absolute;z-index:1000;right:6px;top:6px;min-width:28px;min-height:28px;padding:0 7px 0 8px;color:white;border-radius:100px;font-family:'Helvetica Neue',Arial;text-align:center;font-size:14px;line-height:28px;white-space:nowrap;box-shadow:0 0 3px 1px rgba(0,0,0,0.15);box-sizing:border-box;transform-origin:center;pointer-events:auto;color:transparent;transform:scale(0);background-color:transparent}:host(.-selected){background-color:rgba(51,103,214,0.25);box-shadow:inset 0 0 3px rgba(0,0,0,0.6);border-radius:3px}:host(.signal-drag-open){cursor:wait}:host(.signal-drag-open) #icon{transition:all .15s .2s;width:calc(var(--bookmark-icon-size, 80px) + 22px);height:calc(var(--bookmark-icon-size, 80px) + 22px)}:host(.loading){cursor:progress}:host(.-active){filter:brightness(.8)}:host(.-active) #icon{filter:none}:host([data-badge]) #badge{color:white;transform:scale(1);background-color:#D8072B}:host([data-badge]) #badge:hover{transform:translate3d(0, 0, 0) scale(1.25)}:host([data-badge="0"]) #badge{background-color:#066ccb;background-image:url(ui/bookmark/bookmark-feed.svg);background-repeat:no-repeat;background-position:center}:host-context(:not(.-busy)) #badge{transition:transform .15s,color .3s .25s}:host-context(a-bookmarks-dock) #label{-webkit-line-clamp:1}:host-context(.dnd) #badge{pointer-events:none}</style><canvas id="icon"></canvas><span id="label"></span><span id="badge"></span>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initBookmark(window) {if(window.Bookmark) return window.Bookmark;initCustomElement(window);with(window) {class Bookmark extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._icon = shadowRoot.getElementById("icon");
		this._label = shadowRoot.getElementById("label");
		this._badge = shadowRoot.getElementById("badge"); // really???
		if(this.dataset.label)
			this.label = this.dataset.label;
		if(this.dataset.badge)
			this.badge = this.dataset.badge;
		if(this.dataset.icon)
			this.icon = this.dataset.icon;
		this.tabIndex = -1;
	}
	loadIcon() {
		this.busy = true;
		return api.icons.getIconImageBitmap(this.url, this.id)
			.then(imageBitmap=>{
				api.iconsUtil.renderIcon(imageBitmap, this._icon);
				this.busy = false;
			})
	}
	set icon(iconURL) {
		const image = new Image();
		image.onload = ()=> {
			api.iconsUtil.renderIcon(image, this._icon);
			this.busy = false;
		}
		image.src = iconURL;
	}
	set label(text) {
		this._label.textContent = text;
		this.setAttribute("title", text);
	}
	get label() {
		return this._label.textContent;
	}
	set title(text) {
		this.label = text;
	}
	get title() {
		return this.label;
	}
	set badge(str) {
		if(str == null) {
			delete this.dataset.badge;
			this._badge.onclick = null;
			this._badge.onmousedown = null;
		}
		else {
			this.dataset.badge = str;
			if(!this._badge.onclick) {
				this._badge.onclick = event=>{
					if(!this.dispatchEvent(new Event('badgeclick', { bubbles : true, cancelable : true })))
						event.stopPropagation();
				};
				this._badge.onmousedown = event => event.stopPropagation();
			}
		}
		this._badge.textContent = str || '';
	}
	set id(text) {
		this.dataset.id = text;
	}
	get id() {
		return this.dataset.id;
	}
	get href() {
		return this.url ? this.url : "chrome://newtab/#bookmarks?"+this.id;
	}
	destroy() {
		this._icon.width = this._icon.height = 0;
		this._icon.remove();
		this._label.remove();
		this._badge.remove();
	}
}
Bookmark.Create = function(node) {
	let bookmark = new Bookmark();
	bookmark.dataset.id = node.id;
	bookmark.dataset.label = node.title || "";
	bookmark.url = node.url;
	return bookmark;
}
defineCustomElement("a-bookmark", Bookmark, t);return window.Bookmark=Bookmark;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{overflow:hidden !important;background-color:var(--theme-dock-background-color, var(--theme-overlay-color));background-image:var(--theme-dock-background-image);box-shadow:var(--theme-dock-box-shadow);border-top:var(--theme-dock-border-top)}</style>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initBookmarksDock(window) {if(window.BookmarksDock) return window.BookmarksDock;initBookmarksGridview(window);with(window) {class BookmarksDock extends BookmarksGridview {
	init(shadowRoot) {
		super.init(shadowRoot);
		this.paddingV = 0;
		this.rowsMax = 1;
		this._disableMouseSelection = true;
		shadowRoot.addEventListener("dblclick", event=>{
			if((event.target.id == "container") && api.settings.get("dock-dblclick")) {
				window.location.hash = '#bookmarks?' + this.folderId;
				event.stopPropagation();
			}
		},true)
		this._folderChange = this._folderChange.bind(this);
		this._updateHeight = this._updateHeight.bind(this);
		this._updateHeight();
	}
	_folderChange(event) {
		this.loadBookmarks();
	}
	_updateHeight() {
		this.height = (settings.get("icon-size") + 60) || 140;
		this.style.height = this.height + "px";
	}
	bind() {
		addEventListener("settings/"+ this.bindingKey, this._folderChange);
		addEventListener("settings/icon-size", this._updateHeight);
		return super.bind();
	}
	unbind() {
		super.unbind();
		removeEventListener("settings/"+ this.bindingKey, this._folderChange);
		removeEventListener("settings/icon-size", this._updateHeight);
	}
	get rowHeight() { return this.height; }
	set rowHeight(_) {}
}
defineCustomElement("a-bookmarks-dock", BookmarksDock, t);return window.BookmarksDock=BookmarksDock;}}}
{const t = document.createElement("template");t.innerHTML = `<style></style><a-button data-i18n="edit_bookmarks"></a-button>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initBookmarksForInternalPagesButton(window) {if(window.BookmarksForInternalPagesButton) return window.BookmarksForInternalPagesButton;initCustomElement(window);initBookmarksForInternalPagesUI(window);initButton(window);with(window) {class BookmarksForInternalPagesButton extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		shadowRoot.querySelector("a-button").addEventListener("click", this);
	}
	handleEvent(event) {
		showDialog(
			BookmarksForInternalPagesUI,
			{ folderId : ""+this.value }
		)
	}
}
defineCustomElement("a-bookmarks-for-internal-pages-button", BookmarksForInternalPagesButton, t);return window.BookmarksForInternalPagesButton=BookmarksForInternalPagesButton;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{width:auto;min-width:400px}</style><a-topbar>	<h1 slot="left" data-i18n="bookmarks_for_internal_pages"></h1>	<a-button slot="right" data-icon="close" data-action="cancel"></a-button></a-topbar><div class="form">	<a-option data-url="chrome://newtab/#games">Games</a-option><br>	<a-option data-url="chrome://history/" data-i18n="history"></a-option><br>	<a-option data-url="chrome://downloads/" data-i18n="downloads"></a-option><br>	<a-option data-url="chrome://bookmarks/" data-i18n="bookmark_manager"></a-option><br>	<a-option data-url="chrome://extensions/" data-i18n="extensions"></a-option><br>	<a-option data-url="chrome://apps/" data-i18n="apps"></a-option><br>	<a-option data-url="chrome://settings/" data-i18n="settings"></a-option><br></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initBookmarksForInternalPagesUI(window) {if(window.BookmarksForInternalPagesUI) return window.BookmarksForInternalPagesUI;initDialogUI(window);initTopbar(window);initButton(window);initOption(window);with(window) {class BookmarksForInternalPagesUI extends DialogUI {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._toggles = shadowRoot.querySelectorAll("a-option");
		shadowRoot.addEventListener("change", this);
		this.update = this.update.bind(this);
		chrome.bookmarks.onChanged.addListener(this.update);
		chrome.bookmarks.onCreated.addListener(this.update);
		chrome.bookmarks.onRemoved.addListener(this.update);
		chrome.bookmarks.onMoved.addListener(this.update);
	}
	closeCallback(isCancel) {
		chrome.bookmarks.onChanged.removeListener(this.update);
		chrome.bookmarks.onCreated.removeListener(this.update);
		chrome.bookmarks.onRemoved.removeListener(this.update);
		chrome.bookmarks.onMoved.removeListener(this.update);
	}
	handleEvent(event) {
		let toggle = event.target;
		if(!toggle.dataset.url)
			return;
		if(toggle.checked) {
			chrome.bookmarks.create({parentId : this._folderId, url: toggle.dataset.url, title: event.target.textContent, index:0 })
		}
		else {
			chrome.bookmarks.getChildren(this._folderId, nodes=>{
				nodes.forEach(node=>{
					if(node.url == toggle.dataset.url)
						chrome.bookmarks.removeTree(node.id);
				});
			})
		}
	}
	update() {
		return new Promise(resolve=>{
			chrome.bookmarks.getChildren(this._folderId, nodes=>{
				var bookmarkedUrls = nodes.map(node=>node.url);
				for(let toggle of this._toggles) {
					toggle.checked = bookmarkedUrls.includes(toggle.dataset.url);
				}
				resolve();
			})
		})
	}
	setValues(values) {
		this._folderId = values.folderId;
		return this.update();
	}
}
defineCustomElement("a-bookmarks-for-internal-pages-ui", BookmarksForInternalPagesUI, t);return window.BookmarksForInternalPagesUI=BookmarksForInternalPagesUI;}}}
{function initBookmarksGridview01Base(window) {if(window.BookmarksGridview01Base) return window.BookmarksGridview01Base;initGridview(window);with(window) {class BookmarksGridview01Base extends Gridview {
	init(shadowRoot) {
		super.init(shadowRoot);
	}
	updateBookmarkIcon(bookmark) {
		bookmark.loadIcon();
	}
	updateAllBookmarkIcons() {
		return Promise.all(Array.from(this.children).map(bookmark=>bookmark.loadIcon()));
	}
	updateBookmark(bookmark, node) {
		if(node.title)
			bookmark.title = node.title || "";
		if(node.id)
			bookmark.id = node.id;
		if(node.url)
			bookmark.url = node.url;
		this.updateBookmarkIcon(bookmark);
	}
	addBookmark(node) {
		let bookmark = new Bookmark.Create(node);
		bookmark.draggable = true;
		this.insertBefore(bookmark, this.children[node.index]);
		this.updateBookmarkIcon(bookmark);
	}
	removeBookmark(bookmark) {
		this.removeChild(bookmark);
	}
	getBookmark(id) {
		return this.querySelector("[data-id='"+id+"']");
	}
	hasBookmark(id) {
		return !!this.getBookmark(id);
	}
	moveBookmark(bookmark, newIndex) {
		var oldIndex = Array.prototype.indexOf.call(this.children, bookmark);
		if(oldIndex == newIndex)
			return
		var bookmarkRef = this.children[oldIndex < newIndex ? newIndex+1 : newIndex];
		this.insertBefore(bookmark, bookmarkRef);
	}
	openBookmarkInCurrentTab(bookmark) {
		if(bookmark.url)
			api.browser.openInCurrentTab(bookmark.url);
		else
			location.hash = "#bookmarks?" + bookmark.id;
	}
	openBookmarkInNewTab(bookmark, active) {
		api.browser.openInNewTab(bookmark.href, window, active);
	}
	openBookmarkInNewWindow(bookmark, incognito) {
		api.browser.openInNewWindow(bookmark.href, incognito);
	}
	openBookmark(bookmark) {
		if(settings.get("open-bookmarks-in-new-tab")) {
			if(bookmark.url)
				this.openBookmarkInNewTab(bookmark, true);
			else
				location.hash = "#bookmarks?" + bookmark.id;
		}
		else {
			this.openBookmarkInCurrentTab(bookmark);
		}
	}
	highlightBookmark(id) {
		const bookmark = this.getBookmark(id);
		if(bookmark) {
			bookmark.scrollIntoViewIfNeeded();
			bookmark.classList.add("-highlight");
		}
	}
	determineFolderId() {
		return "1";
	}
	clear() {
		while(this.firstChild) {
			var bookmark = this.firstChild;
			bookmark.remove();
			bookmark.destroy();
		}
	}
	loadBookmarks() {
		const folderId = this.determineFolderId();
		if(folderId === this.folderId)
			return Promise.resolve();
		this.folderId = folderId;
		this.clear();
		return api.bookmarks.getChildren(folderId)
 			.then(nodes=>{
 				if(!nodes) {
 					this.error = chrome.i18n.getMessage("deleted");
 					return;
 				}
				const documentFragment = document.createDocumentFragment();
				for(let node of nodes) {
					let bookmark = Bookmark.Create(node);
					bookmark.draggable = true;
					documentFragment.appendChild(bookmark);
				}
				this.appendChild(documentFragment);
				this.error = null;
			})
	}
}
return window.BookmarksGridview01Base=BookmarksGridview01Base;}}}
{function initBookmarksGridview02Model(window) {if(window.BookmarksGridview02Model) return window.BookmarksGridview02Model;initBookmarksGridview01Base(window);with(window) {class BookmarksGridview02Model extends BookmarksGridview01Base {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._onBookmarkCreated = this._onBookmarkCreated.bind(this);
		this._onBookmarkRemoved = this._onBookmarkRemoved.bind(this);
		this._onBookmarkChanged = this._onBookmarkChanged.bind(this);
		this._onBookmarkMoved = this._onBookmarkMoved.bind(this);
		this._onChildrenReordered = this._onChildrenReordered.bind(this);
	}
	bind() {
		super.bind();
		addEventListener("bookmarks/created", this._onBookmarkCreated);
		addEventListener("bookmarks/removed", this._onBookmarkRemoved);
		addEventListener("bookmarks/changed", this._onBookmarkChanged);
		addEventListener("bookmarks/moved", this._onBookmarkMoved);
		addEventListener("bookmarks/childrenReordered", this._onChildrenReordered);
	}
	unbind() {
		super.unbind();
		removeEventListener("bookmarks/created", this._onBookmarkCreated);
		removeEventListener("bookmarks/removed", this._onBookmarkRemoved);
		removeEventListener("bookmarks/changed", this._onBookmarkChanged);
		removeEventListener("bookmarks/moved", this._onBookmarkMoved);
		removeEventListener("bookmarks/childrenReordered", this._onChildrenReordered)
	}
	_onBookmarkCreated(event) {
		let id = event.detail.id;
		let node = event.detail.bookmark;
		if(node.parentId == this.folderId) {
			this.addBookmark(node, api.feedSubscriptionsStats.getUnreadItems(id));
			this.clearSelection();
		}
		else if(this.hasBookmark(node.parentId)) {
			this.updateBookmarkIcon(this.getBookmark(node.parentId));
		}
	}
	_onBookmarkRemoved(event) {
		let id = event.detail.id;
		let node = event.detail.removeInfo;
		if(id==this.folderId) {
			this.loadBookmarks();
		}
		else if(this.hasBookmark(id)) {
			this.removeBookmark(this.getBookmark(id));
			this.clearSelection();
		}
		else if(this.hasBookmark(node.parentId)) {
			this.updateBookmarkIcon(this.getBookmark(node.parentId));
		}
	}
	_onBookmarkChanged(event) {
		let id = event.detail.id;
		let node = event.detail.changeInfo;
		if(this.hasBookmark(id)) {
			this.updateBookmark(this.getBookmark(id), node);
		}
		else {
			api.bookmarks.getSingle(id, node=>{
				if(this.hasBookmark(node.parentId)) {
					this.updateBookmarkIcon(this.getBookmark(node.parentId));
				}
			})
		}
	}
	_onBookmarkMoved(event) {
		let id = event.detail.id;
		let node = event.detail.moveInfo;
		if((node.parentId == this.folderId) && (node.oldParentId == this.folderId)) {
			this.moveBookmark(this.getBookmark(id), node.index);
		}
		else if((node.parentId != this.folderId) && (node.oldParentId == this.folderId)) {
			this.removeBookmark(this.getBookmark(id));
		}
		else if((node.parentId == this.folderId) && (node.oldParentId != this.folderId)) {
			api.bookmarks.getSingle(id, node=>{
				this.addBookmark(node, api.feedSubscriptionsStats.getUnreadItems(id));
			})
		}
		if(this.hasBookmark(node.parentId)) {
			this.updateBookmarkIcon(this.getBookmark(node.parentId));
		}
		if(this.hasBookmark(node.oldParentId)) {
			this.updateBookmarkIcon(this.getBookmark(node.oldParentId));
		}
	}
	_onChildrenReordered(event) {
		let id = event.detail.id;
		let node = event.detail.reorderInfo;
		if(id == this.folderId) {
			reorderInfo.childIds.forEach((id, i) => {
				this.moveBookmark(this.getBookmark(id), i);
			})
			this.clearSelection();
		}
		else if(this.hasBookmark(id)) {
			this.updateBookmarkIcon(this.getBookmark(id));
		}
	}
}
return window.BookmarksGridview02Model=BookmarksGridview02Model;}}}
{function initBookmarksGridview03Clipboard(window) {if(window.BookmarksGridview03Clipboard) return window.BookmarksGridview03Clipboard;initBookmarksGridview02Model(window);with(window) {const DT_TS = "web-accessories.com/ts";
class BookmarksGridview03Clipboard extends BookmarksGridview02Model {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._onGridviewCopyOrCut = this._onGridviewCopyOrCut.bind(this);
		this._onGridviewPaste = this._onGridviewPaste.bind(this);
	}
	bind() {
		super.bind();
		this.addEventListener("gridview-copy", this._onGridviewCopyOrCut);
		this.addEventListener("gridview-cut", this._onGridviewCopyOrCut);
		this.addEventListener("gridview-paste", this._onGridviewPaste);
	}
	unbind() {
		super.unbind();
		this.removeEventListener("gridview-copy", this._onGridviewCopyOrCut);
		this.removeEventListener("gridview-paste", this._onGridviewCopyOrCut);
		this.removeEventListener("gridview-cut", this._onGridviewPaste);
	}
	_onGridviewCopyOrCut(event) {
		api.dataExport.exportToEventData(event.detail.clipboardData, event.detail.elements);
		var ts = Date.now();
		event.detail.clipboardData.setData(DT_TS, ts);
		Promise.all(event.detail.elements.map(element=>
			element.url
			?
			{
				url : element.url,
				title : element.title,
				id : element.id
			}
			:
			new Promise((resolve, reject) => api.bookmarks.getSubTree(element.id, nodes=>(nodes && nodes.length) ? resolve(nodes[0]) : reject()))
		))
		.then(nodes => {
			api.clipboardutil.setData(ts, nodes);
			if(event.type == "gridview-cut") {
				nodes.forEach(node=>api.bookmarks.removeTree(node.id));
				setTimeout(()=>this.focus(), 100);
			}
		})
	}
	_onGridviewPaste(event) {
		var callback = (nodesCreated) => {
			if(nodesCreated.length) {
				setTimeout(()=>{
					var firstBookmarkCreated = this.getBookmark(nodesCreated[0].id);
					if(firstBookmarkCreated) {
						firstBookmarkCreated.focus();
					}
				},200)
			}
		}
		if(
			event.detail.clipboardData.types.includes(DT_TS) &&
			(event.detail.clipboardData.getData(DT_TS) == api.clipboardutil.getTS())
		) {
			api.bookmarks.safecreatemany(this.folderId, event.detail.index, api.clipboardutil.getData(), callback);
		}
		else {
			api.dataImport.importFromEventData(event.detail.clipboardData, this.folderId, event.detail.index, callback);
		}
	}
}
return window.BookmarksGridview03Clipboard=BookmarksGridview03Clipboard;}}}
{function initBookmarksGridview04DND(window) {if(window.BookmarksGridview04DND) return window.BookmarksGridview04DND;initBookmarksGridview03Clipboard(window);with(window) {const DRAG_OVER_FOLDER_OPEN_TIMEOUT = 700;
const DRAG_OVER_FOLDER_MOVE_TIMEOUT = 150;
class BookmarksGridview04DND extends BookmarksGridview03Clipboard {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._onGridviewDragover = this._onGridviewDragover.bind(this);
		this._onGridviewDrop = this._onGridviewDrop.bind(this);
		this._onGridviewDragenter = this._onGridviewDragenter.bind(this);
		this._onGridviewDragleave = this._onGridviewDragleave.bind(this);
		this._onGridviewDragstart = this._onGridviewDragstart.bind(this);
		this._onGridviewDragend = this._onGridviewDragend.bind(this);
		this._hideDraggedBookmarks = this._hideDraggedBookmarks.bind(this);
	}
	bind() {
		super.bind();
		this.addEventListener("gridview-dragover", this._onGridviewDragover);
		this.addEventListener("gridview-drop", this._onGridviewDrop);
		this.addEventListener("gridview-dragenter", this._onGridviewDragenter);
		this.addEventListener("gridview-dragleave", this._onGridviewDragleave);
		this.addEventListener("gridview-dragstart", this._onGridviewDragstart);
		this.addEventListener("gridview-dragend", this._onGridviewDragend);
	}
	unbind() {
		super.unbind();
		this.removeEventListener("gridview-dragover", this._onGridviewDragover);
		this.removeEventListener("gridview-drop", this._onGridviewDrop);
		this.removeEventListener("gridview-dragenter", this._onGridviewDragenter);
		this.removeEventListener("gridview-dragleave", this._onGridviewDragleave);
		this.removeEventListener("gridview-dragstart", this._onGridviewDragstart);
		this.removeEventListener("gridview-dragend", this._onGridviewDragend);
	}
	cancelFolderOpenEffect() {
		if(this._folderBookmark) {
			this._folderBookmark.classList.remove("signal-drag-open");
			this._folderBookmark = null;
		}
	}
	doFolderOpenEffect(folder) {
		this._folderBookmark = folder;
		this._folderBookmark.classList.add("signal-drag-open");
	}
	_onGridviewDragover(event) {
		let x = event.detail.x;
		let y = event.detail.y;
		this.cancelFolderOpenEffect();
		var childAtIndex = this.getChildAtGridIndex(event.detail.index);
		if(childAtIndex && (!childAtIndex.url)) {
			let center = this.indexToPoint(event.detail.index);
			let isOverFolderCenter = (Math.abs(x-center.x)<40) && (Math.abs(y-center.y)<40);
			let holdOverFolderDT;
			if((this._oldDragX != x) || (this._oldDragY != y)) {
				this._holdOverFolderStart = Date.now();
				this._holdOverFolderDT = 0;
			}
			else {
				this._holdOverFolderDT = Date.now() - this._holdOverFolderStart;
			}
			if(isOverFolderCenter) {
				this.doFolderOpenEffect(childAtIndex);
				event.preventDefault();
				if(this._holdOverFolderDT > DRAG_OVER_FOLDER_OPEN_TIMEOUT) {
					this.openBookmarkInCurrentTab(childAtIndex);
				}
			}
			else if(this._holdOverFolderDT < DRAG_OVER_FOLDER_MOVE_TIMEOUT) {
				event.preventDefault();
			}
		}
		this._oldDragX = x;
		this._oldDragY = y;
	}
	_onGridviewDrop(event) {
	 	this.cancelFolderOpenEffect();
		var childAtIndex = this.getChildAtGridIndex(event.detail.index);
		let index;
		let parentId;
		if(childAtIndex && (!childAtIndex.url)) {
			index = Number.MAX_VALUE;
			parentId = childAtIndex.id;
		}
		else {
			index = this.getDOMDragOverIndex(event.detail.index);
			parentId = this.folderId;
		}
		if(api.dndutil.hasData()) {
			api.bookmarks.moveMany(
				api.dndutil.getData(),
				parentId,
				index,
				nMoved=>{
					if(!nMoved) {
						this.showAllChildren();
						this.update()
					}
				}
			);
			event.preventDefault();
		}
		else if(api.dataImport.importFromEventData(event.detail.dataTransfer, parentId, index)) {
			event.preventDefault();
		}
	}
	_hideDraggedBookmarks() {
		if(api.dndutil.hasData()) {
			var draggedItems = api.dndutil.getData();
			this.hideChildren(bookmark=>draggedItems.includes(bookmark.id));
		}
	}
	_onGridviewDragenter(event) {
		this._hideDraggedBookmarks();
	}
	_onGridviewDragleave(event) {
		this.showAllChildren();
	 	this.update();
	 	this.cancelFolderOpenEffect();
	}
	_onGridviewDragstart(event) {
		api.dataExport.exportToEventData(event.detail.dataTransfer, event.detail.elements);
		api.dndutil.setData(event.detail.elements.map(bookmark=>bookmark.id));
	}
	_onGridviewDragend(event) {
		event.preventDefault();
		api.dndutil.clearData();
	}
	loadBookmarks()	{
		return super.loadBookmarks().then(this._hideDraggedBookmarks)
	}
}
return window.BookmarksGridview04DND=BookmarksGridview04DND;}}}
{function initBookmarksGridview05Links(window) {if(window.BookmarksGridview05Links) return window.BookmarksGridview05Links;initBookmarksGridview04DND(window);with(window) {class BookmarksGridview05Links extends BookmarksGridview04DND {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._onClick = this._onClick.bind(this);
		this._onMouseup = this._onMouseup.bind(this);
		this._onKeydown = this._onKeydown.bind(this);
	}
	bind() {
		super.bind();
		this.addEventListener("click", this._onClick);
		this.addEventListener("mouseup", this._onMouseup);
		this.addEventListener("keydown", this._onKeydown);
	}
	unbind() {
		super.unbind();
		this.removeEventListener("click", this._onClick);
		this.removeEventListener("mouseup", this._onMouseup);
		this.removeEventListener("keydown", this._onKeydown);
	}
	_onClick(event) {
		if(event.target.tagName=="A-BOOKMARK") {
			if(event.detail>1)
				return;
			if(event.ctrlKey || event.metaKey)
				this.openBookmarkInNewTab(event.target);
			else if(event.shiftKey)
				this.openBookmarkInNewWindow(event.target);
			else
				this.openBookmark(event.target);
			event.stopPropagation();
			event.stopImmediatePropagation();
			event.preventDefault();
		}
	}
	_onMouseup(event) {
		if((event.target.tagName == "A-BOOKMARK") && (event.which == 2)) {
			event.preventDefault();
			this.openBookmarkInNewTab(event.target);
		}
	}
	_onKeydown(event) {
		if(event.keyCode == 13) {
			var selectedChildren = this.getSelectedChildren();
			var n = selectedChildren.length;
			if(n) {
				if(n>1) {
					for(let child of selectedChildren) {
						this.openBookmarkInNewTab(child);
					}
				}
				else
					this.openBookmarkInCurrentTab(selectedChildren[0]);
			}
		}
	}
}
return window.BookmarksGridview05Links=BookmarksGridview05Links;}}}
{function initBookmarksGridview06FolderSetting(window) {if(window.BookmarksGridview06FolderSetting) return window.BookmarksGridview06FolderSetting;initBookmarksGridview05Links(window);with(window) {class BookmarksGridview06FolderSetting extends BookmarksGridview05Links {
	determineFolderId() {
		return api.settings.get(this.bindingKey) || super.determineFolderId();
	}
}
return window.BookmarksGridview06FolderSetting=BookmarksGridview06FolderSetting;}}}
{function initBookmarksGridview07Layout(window) {if(window.BookmarksGridview07Layout) return window.BookmarksGridview07Layout;initBookmarksGridview06FolderSetting(window);with(window) {class BookmarksGridview07Layout extends BookmarksGridview06FolderSetting {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._disableLayoutSettings = this.dataset.disableLayoutSettings ? (this.dataset.disableLayoutSettings == "true") : false;
		this._onLayoutSettingChange = this._onLayoutSettingChange.bind(this);
	}
	bind() {
		super.bind();
		this._loadLayoutParameters();
		addEventListener("settings/icon-size", this._onLayoutSettingChange);
		addEventListener("settings/column-gap", this._onLayoutSettingChange);
		addEventListener("settings/row-gap", this._onLayoutSettingChange);
		addEventListener("settings/columns-max", this._onLayoutSettingChange);
	}
	unbind() {
		super.unbind();
		removeEventListener("settings/icon-size", this._onLayoutSettingChange);
		removeEventListener("settings/column-gap", this._onLayoutSettingChange);
		removeEventListener("settings/row-gap", this._onLayoutSettingChange);
		removeEventListener("settings/columns-max", this._onLayoutSettingChange);
	}
	_loadLayoutParameters() {
		const BOOKMARK_MIN_GAP = 4;
		const iconSize = settings.get("icon-size");
		this.style.setProperty('--bookmark-icon-size', iconSize + "px");
		let columnWidth = iconSize + 40 + BOOKMARK_MIN_GAP;
		let rowHeight = iconSize + 60 + BOOKMARK_MIN_GAP;
		let columnsMax = 1000;
		if(!this._disableLayoutSettings) {
			columnWidth += api.settings.get("column-gap");
			rowHeight += api.settings.get("row-gap");
			columnsMax = api.settings.get("columns-max");
		}
		this.columnWidth = columnWidth;
		this.rowHeight = rowHeight;
		this.columnsMax = columnsMax;
	}
	_onLayoutSettingChange() {
		this._loadLayoutParameters();
		this.update();
	}
}
return window.BookmarksGridview07Layout=BookmarksGridview07Layout;}}}
{function initBookmarksGridview08Edit(window) {if(window.BookmarksGridview08Edit) return window.BookmarksGridview08Edit;initBookmarksGridview07Layout(window);initBookmarkEditorUI(window);initBookmarkFolderEditorUI(window);initConfirmDialogUI(window);with(window) {class BookmarksGridview08Edit extends BookmarksGridview07Layout {
	init(shadowRoot) {
		super.init(shadowRoot);
		this.addEventListener("keydown", this._BookmarksGridview08Edit_onKeydown.bind(this));
	}
	_focusBookmark(id) {
		setTimeout(()=>{
			var bookmark = this.getBookmark(id);
			if(bookmark)
				bookmark.focus()
		}, 300)
	}
	createBookmark(index, title, url) {
		if(title || url)
			api.bookmarks.safecreate( { parentId : this.folderId, url, title, index }, node => this._focusBookmark(node.id) );
		else
			showDialog(BookmarkEditorUI, { parentId : this.folderId, index }, values=>this._focusBookmark(values.id));
	}
	createFolder(index) {
		showDialog(BookmarkFolderEditorUI, { parentId : this.folderId, index }, values=>this._focusBookmark(values.id));
	}
	edit(bookmark) {
		showDialog(bookmark.url ? BookmarkEditorUI : BookmarkFolderEditorUI, { id : bookmark.id });
	}
	deleteBookmarks(bookmarks) {
		bookmarks = bookmarks ? bookmarks : this.getSelectedChildren();
		if(bookmarks.length) {
			showConfirm(
				chrome.i18n.getMessage("delete"),
				(bookmarks.length == 1) ?
				chrome.i18n.getMessage("delete_item_confirm_single", api.stringUtil.truncate(bookmarks[0].title, 25)) :
				chrome.i18n.getMessage("delete_item_confirm_many", ""+bookmarks.length),
				() => {
					bookmarks.forEach(bookmark=>api.bookmarks.removeTree(bookmark.id));
				}
			);
		}
	}
	reorderByTitle() {
		showConfirm(
			chrome.i18n.getMessage("reorder_by_title"),
			chrome.i18n.getMessage("confirm_changes"),
			() => {
				api.bookmarks.reorderByTitle(this.folderId, console.log)
			}
		)
	}
	_BookmarksGridview08Edit_onKeydown(event) {
		if([8, 46].indexOf(event.keyCode) >=0) {
			this.deleteBookmarks();
		}
	}
}
return window.BookmarksGridview08Edit=BookmarksGridview08Edit;}}}
{function initBookmarksGridview09Badges(window) {if(window.BookmarksGridview09Badges) return window.BookmarksGridview09Badges;initBookmarksGridview08Edit(window);with(window) {class BookmarksGridview09Badges extends BookmarksGridview08Edit {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._onFeedSubscriptionsStatsChange = this._onFeedSubscriptionsStatsChange.bind(this);
		this.updateBookmarkBadges = this.updateBookmarkBadges.bind(this);
		this.addEventListener("badgeclick", this.onBadgeclick.bind(this));
	}
	onBadgeclick(event) {
		if(event.target.url) {
			if(settings.get("open-bookmarks-in-new-tab")) {
				api.browser.openInNewTab("chrome://newtab/#news?" + event.target.id, window, true);
			}
			else {
				api.browser.openInCurrentTab("chrome://newtab/#news?" + event.target.id);
			}
			event.preventDefault();
		}
	}
	updateBookmarkBadges() {
		for(let bookmark of this.children) {
			bookmark.badge = bookmark.url ?
				(
					api.feedSubscriptions.exists(bookmark.url) ? api.feedSubscriptionsStats.getUnreadItems(bookmark.id) : null
				)
				:
				(
					api.feedSubscriptionsStats.getUnreadItems(bookmark.id) || null
				)
		}
	}
	loadBookmarks() {
		return super.loadBookmarks()
			.then(this.updateBookmarkBadges)
	}
	_onFeedSubscriptionsStatsChange() {
		this.updateBookmarkBadges();
	}
	bind() {
		super.bind();
		addEventListener("feedSubscriptionsStats/change", this._onFeedSubscriptionsStatsChange);
	}
	unbind() {
		super.unbind();
		removeEventListener("feedSubscriptionsStats/change", this._onFeedSubscriptionsStatsChange);
	}
}
return window.BookmarksGridview09Badges=BookmarksGridview09Badges;}}}
{function initBookmarksGridview10Icons(window) {if(window.BookmarksGridview10Icons) return window.BookmarksGridview10Icons;initBookmarksGridview09Badges(window);with(window) {class BookmarksGridview10Icons extends BookmarksGridview09Badges {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._onIconsInvalidate = this._onIconsInvalidate.bind(this);
		this._screenResolutionQuery = matchMedia('screen and (min-resolution: 1.5dppx)');
	}
	bind() {
		super.bind();
		addEventListener("icons/invalidate", this._onIconsInvalidate);
		addEventListener("settings/icon-size", this._onIconsInvalidate);
		this._screenResolutionQuery.addListener(this._onIconsInvalidate);
	}
	unbind() {
		super.unbind();
		removeEventListener("icons/invalidate", this._onIconsInvalidate);
		removeEventListener("settings/icon-size", this._onIconsInvalidate);
		this._screenResolutionQuery.removeListener(this._onIconsInvalidate);
	}
	_onIconsInvalidate() {
		this.updateAllBookmarkIcons();
	}
}
return window.BookmarksGridview10Icons=BookmarksGridview10Icons;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host(.-busy) #container{opacity:0}</style><!-- <a-bookmark> -->`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initBookmarksGridview(window) {if(window.BookmarksGridview) return window.BookmarksGridview;initBookmarksGridview10Icons(window);initBookmark(window);with(window) {class BookmarksGridview extends BookmarksGridview10Icons {
	bind() {
		super.bind();
		return this.loadBookmarks();
	}
	unbind() {
		super.unbind();
		this.clear();
		this.folderId = null;
	}
	loadBookmarks() {
		this.busy = true;
		return super.loadBookmarks()
			.then(()=>
				new Promise(r=>{
					setTimeout(r, 1000);
					this.updateAllBookmarkIcons().then(r);
				})
			)
			.catch(console.log)
			.then(()=>{
				this.busy = false;
				this.focus();
			})
	}
	get offsetWidth() { return window.innerWidth; }
	set offsetWidth(_) {}
}
defineCustomElement("a-bookmarks-gridview", BookmarksGridview, t);return window.BookmarksGridview=BookmarksGridview;}}}
{function initBookmarksMainview01LastVisitedFolder(window) {if(window.BookmarksMainview01LastVisitedFolder) return window.BookmarksMainview01LastVisitedFolder;initBookmarksGridview(window);with(window) {class BookmarksMainview01LastVisitedFolder extends BookmarksGridview {
	determineFolderId() {
		return (api.settings.get("show-last-visited-folder") && localStorage.getItem('navigation/last-visited-folder'))
			? localStorage.getItem('navigation/last-visited-folder')
			: super.determineFolderId();
	}
	loadBookmarks() {
		return super.loadBookmarks().then(()=>{
			localStorage.setItem('navigation/last-visited-folder', this.folderId);
		});
	}
}
return window.BookmarksMainview01LastVisitedFolder=BookmarksMainview01LastVisitedFolder;}}}
{function initBookmarksMainview02LocationHash(window) {if(window.BookmarksMainview02LocationHash) return window.BookmarksMainview02LocationHash;initBookmarksMainview01LastVisitedFolder(window);with(window) {class BookmarksMainview02LocationHash extends BookmarksMainview01LastVisitedFolder {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._onHashChange = this._onHashChange.bind(this);
	}
	bind() {
		addEventListener("hashchange#bookmarks", this._onHashChange);
		return super.bind();
	}
	unbind() {
		super.unbind();
		removeEventListener("hashchange#bookmarks", this._onHashChange);
	}
	_onHashChange(event) {
		this.loadBookmarks();
	}
	_parseQuery() {
		let t = location.hash.split("?");
		t = t[1] || '';
		t = t.split('&');
		this._queryId = t[0];
		this._queryHighlightId = t[1];
	}
	determineFolderId() {
		this._parseQuery();
		return this._queryId || super.determineFolderId();
	}
	loadBookmarks() {
		return super.loadBookmarks().then(()=>{
			history.replaceState(history.state, null, "#bookmarks?" + this.determineFolderId());
			if(this._queryHighlightId) {
				this.highlightBookmark(this._queryHighlightId);
			}
		});
	}
}
return window.BookmarksMainview02LocationHash=BookmarksMainview02LocationHash;}}}
{function initBookmarksMainview03ScrollPosition(window) {if(window.BookmarksMainview03ScrollPosition) return window.BookmarksMainview03ScrollPosition;initBookmarksMainview02LocationHash(window);with(window) {class BookmarksMainview03ScrollPosition extends BookmarksMainview02LocationHash {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._onScroll = this._onScroll.bind(this);
		this._rememberScrollPos = this._rememberScrollPos.bind(this);
	}
	bind() {
		this.addEventListener("scroll", this._onScroll);
		return super.bind();
	}
	unbind() {
		super.unbind();
		this.removeEventListener("scroll", this._onScroll);
	}
	_resetScrollPos() {
		var state = history.state;
		if(state && state["scrollTop-"+this.id])
			this.scrollTop = state["scrollTop-"+this.id];
	}
	_rememberScrollPos() {
		var state = history.state || {};
		state["scrollTop-"+this.id] = this.scrollTop;
		history.replaceState(state, null);
	}
	_onScroll(event) {
		clearTimeout(this.__onScrollThrottleTimout);
		this.__onScrollThrottleTimout = setTimeout(this._rememberScrollPos, 500);
	}
	loadBookmarks() {
		return super.loadBookmarks().then(()=>this._resetScrollPos());
	}
}
return window.BookmarksMainview03ScrollPosition=BookmarksMainview03ScrollPosition;}}}
{const t = document.createElement("template");t.innerHTML = `<style></style>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initBookmarksMainview(window) {if(window.BookmarksMainview) return window.BookmarksMainview;initBookmarksMainview03ScrollPosition(window);with(window) {class BookmarksMainview extends BookmarksMainview03ScrollPosition {
	init(shadowRoot) {
		super.init(shadowRoot);
		this.tabIndex = -1;
		this._onFocus = this._onFocus.bind(this);
		this._onDblClick = this._onDblClick.bind(this);
	}
	_onFocus(event) {
		this.beginSelection(0);
	}
	_onDblClick(event) {
		if(api.settings.get("search-dblclick"))
			location.hash = "#search";
	}
	bind() {
		const p = super.bind();
		document.body.addEventListener("focus", this._onBodyFocus);
		this.addEventListener("dblclick", this._onDblClick);
		return p;
	}
	unbind() {
		super.unbind();
		document.body.removeEventListener("focus", this._onBodyFocus);
		this.removeEventListener("dblclick", this._onDblClick);
	}
}
defineCustomElement("a-bookmarks-mainview", BookmarksMainview, t);return window.BookmarksMainview=BookmarksMainview;}}}
{const t = document.createElement("template");t.innerHTML = `<style>@keyframes blink{50%{opacity:0}}:host{width:100%;min-height:56px;height:56px;text-align:center;overflow:hidden;white-space:nowrap;background-color:var(--theme-overlay-color);position:relative;padding:0 25px;color:var(--theme-text-color);text-shadow:var(--theme-text-shadow)}#container{display:inline-flex;margin:0 auto;max-width:100%;overflow:hidden;height:20px;margin-top:20px;line-height:20px}#list{flex:1;overflow:hidden;-webkit-mask-image:linear-gradient(to right, transparent, black 10px, black 50%, transparent 50%),linear-gradient(to left, transparent, black 10px, black 50%, transparent 50%)}#list span{display:inline-block;text-decoration:none;white-space:nowrap;overflow:hidden}#list span:after{display:block;content:attr(name);font-weight:bold;overflow:hidden;height:0;visibility:hidden}#list .link,#list .current{margin:0 10px;max-width:150px;text-overflow:ellipsis}#list .link{cursor:pointer;opacity:.9}#list .link.dragtarget{animation:blink .5s steps(5, start) infinite}#list .link:hover{opacity:1;text-decoration:underline}#list .current{font-weight:bold}#list .separator{font-size:1.2em}#list .badge{background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="7" height="8"><circle style="fill:%23D8072B" cx="3" cy="3" r="3" /></svg>');background-position:right center;background-repeat:no-repeat;padding-right:12px}.btn{width:20px;height:20px;margin-left:6px;background-color:currentColor;cursor:pointer;display:none}#scroll-left-btn,#scroll-right-btn{-webkit-mask-image:url('ui/bookmarks-navbar/bookmarks-navbar-scroll-icon.svg');visibility:hidden}#scroll-left-btn{transform:scaleX(-1)}#search-btn{-webkit-mask-image:url("data:image/svg+xml;charset=UTF-8,%3Csvg%0A%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20version%3D%221.1%22%0A%20%20viewBox%3D%220%200%2020%2020%22%0A%20%20width%3D%2220%22%0A%20%20height%3D%2220%22%0A%20%20%3E%0A%20%3Cpath%0A%20%20%20d%3D%22m%208.5162275%2C3.6701235%20c%20-2.722289%2C0%20-4.945915%2C2.22214%20-4.945915%2C4.944426%200%2C2.7222925%202.223626%2C4.9459115%204.945915%2C4.9459115%201.075005%2C0%202.0693685%2C-0.351251%202.8826325%2C-0.93853%20l%203.992483%2C3.707945%201.038344%2C-1.118788%20-3.944812%2C-3.661766%20c%200.610593%2C-0.822685%200.977263%2C-1.8364785%200.977263%2C-2.9347725%200%2C-2.722286%20-2.223627%2C-4.944426%20-4.9459105%2C-4.944426%20z%20m%200%2C1.525488%20c%201.8978505%2C0%203.4204255%2C1.521088%203.4204255%2C3.418938%200%2C1.8978495%20-1.522576%2C3.4204265%20-3.4204255%2C3.4204265%20-1.897852%2C0%20-3.420427%2C-1.522577%20-3.420427%2C-3.4204265%200%2C-1.89785%201.522575%2C-3.418938%203.420427%2C-3.418938%20z%22%0A%20%20%20style%3D%22fill%3A%23ffffff%22%0A%2F%3E%0A%3C%2Fsvg%3E%0A")}</style><div id="container">	<div id="scroll-left-btn" class="btn"></div>	<div id="list"></div>	<div id="scroll-right-btn" class="btn"></div>	<div id="search-btn" class="btn"></div></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initBookmarksNavbar(window) {if(window.BookmarksNavbar) return window.BookmarksNavbar;initCustomElement(window);with(window) {class BookmarksNavbar extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this.update = this.update.bind(this);
		this._listEl = shadowRoot.getElementById("list");
		this._searchBtn = shadowRoot.getElementById("search-btn");
		this._scrollLeftBtn = shadowRoot.getElementById("scroll-left-btn");
		this._scrollRightBtn = shadowRoot.getElementById("scroll-right-btn");
		this.updateScrollButtons = this.updateScrollButtons.bind(this);
		this.updateScrollButtonsThrottled = this.updateScrollButtonsThrottled.bind(this);
		shadowRoot.addEventListener("click", this.onClick.bind(this));
		shadowRoot.addEventListener("dragenter", event=>{
			if(event.target.nodeId !== undefined) {
				event.target.classList.add("dragtarget");
				const nodeId = event.target.nodeId;
				event.target.dragOp = setTimeout(()=>{
					location.hash = "#bookmarks?" + nodeId;
				}, 1200);
			}
			else if(event.target.id == 'scroll-left-btn') {
				event.target.classList.add("dragtarget");
				event.target.dragOp = setInterval(()=>this.scrollToLeft(), 750);
			}
			else if(event.target.id == 'scroll-right-btn') {
				event.target.classList.add("dragtarget");
				event.target.dragOp = setInterval(()=>this.scrollToRight(), 750);
			}
		});
		shadowRoot.addEventListener("dragleave", event=>{
			if(event.target.dragOp) {
				event.target.classList.remove("dragtarget");
				clearInterval(event.target.dragOp);
				clearTimeout(event.target.dragOp);
				delete event.target.dragOp;
			}
		});
		this._listEl.addEventListener('scroll', this.updateScrollButtonsThrottled);
	}
	determineCurrentFolderId() {
		let t = location.hash.split("?");
		t = t[1] || '';
		t = t.split('&');
		let id = t[0];
		if(id)
			return id;
		if(api.settings.get("show-last-visited-folder") && localStorage.getItem('navigation/last-visited-folder'))
			return localStorage.getItem('navigation/last-visited-folder')
		id = api.settings.get(this.bindingKey);
		if(id)
			return id;
		return "1";
	}
	determineRootFolderId() {
		return api.settings.get(this.bindingKey);
	}
	render(nodes, offset, separator) {
		offset = offset || 0;
		let currentEl;
		const oldElements = Array.from(this._listEl.children);
		if(nodes) {
			for(let i=offset; i<nodes.length; i++) {
				let node = nodes[i];
				let link = oldElements.shift();
				if(!link) {
					link = document.createElement("span");
					this._listEl.appendChild(link);
				}
				if(node.id == this.folderId) {
					currentEl = link;
					link.className = "current";
				}
				else {
					link.className = "link";
				}
				const label = (node.id == "0") ? chrome.i18n.getMessage("bookmarks") : (node.title || "Untitled");
				link.textContent = label;
				link.setAttribute("name", label);
				link.nodeId = node.id;
				const unreadItems = api.feedSubscriptionsStats.getUnreadItems(node.id);
				if(unreadItems) {
					link.classList.add("badge");
					link.title = node.title + " (" + unreadItems + ")";
				}
				else {
					link.title = "";
				}
				if(separator && (i<(nodes.length - 1))) {
					var separatorEl = oldElements.shift();
					if(!separatorEl) {
						 separatorEl = document.createElement("span");
						 this._listEl.appendChild(separatorEl);
					}
					separatorEl.className = "separator";
					separatorEl.textContent = separator;
					separatorEl.setAttribute("name", "");
				}
			}
		}
		for(let i=0; i<oldElements.length; i++) {
			oldElements[i].remove();
		}
		if(currentEl)
			currentEl.scrollIntoView();
	}
	update() {
		this.folderId = this.determineCurrentFolderId();
		this._rootFolderId = this.determineRootFolderId();
		const showSiblingsInRoot = api.settings.get("show-navigation-bar");
		let rootNode;
		if(!showSiblingsInRoot && (this.folderId == this._rootFolderId)) {
			this._listEl.innerHTML = "";
			this.style.display = "none";
		}
		else {
			this.style.display = null;
			api.bookmarks
				.getSingle(this._rootFolderId)
				.then(_rootNode => {
					if(!_rootNode)
						throw "No root!";
					rootNode = _rootNode;
					return api.bookmarks.getPath(this.folderId);
				})
				.then(path => {
					if(!path || !path.length)
						throw "No path!";
					if(showSiblingsInRoot && (path[path.length-1].parentId == rootNode.parentId)) {
						this.showSearchBtn(true);
						return api.bookmarks
							.getChildren(rootNode.parentId)
							.then(siblings => this.render(siblings ? siblings.filter(node=>(node.url == undefined)) : null))
					}
					else {
						let offset = 0;
						for(let i=0; i<path.length; i++) {
							if(
								( showSiblingsInRoot && (path[i].parentId == rootNode.parentId) )
								||
								(path[i].id == rootNode.id)
							)
								break;
							offset++;
						}
						let isOutsideHierarchy = (offset == path.length);
						this.showSearchBtn(false);
						if(isOutsideHierarchy)
							this.render([rootNode, path[path.length-1]], 0, "↳");
						else
							this.render(path, offset, "/");
					}
				})
				.catch(err=>{
					const nodes = [];
					if(rootNode)
						nodes.push(rootNode);
					nodes.push({
						title : "( Deleted )", id : this.folderId
					})
					this.showSearchBtn(false);
					this.render(nodes, 0, "↯");
				})
				.finally(()=>this.updateScrollButtons())
		}
 	}
	showSearchBtn(show) {
		this._searchBtn.style.display = show ? "block" : null;
	}
 	updateScrollButtons() {
 		const isScrollable = (this._listEl.scrollWidth > this._listEl.clientWidth);
		const canScrollLeft = this._listEl.scrollLeft > 0;
		const canScrollRight = ((this._listEl.scrollWidth-this._listEl.scrollLeft)>this._listEl.clientWidth);
		this._scrollRightBtn.style.display = isScrollable ? "block" : null;
		this._scrollLeftBtn.style.display = isScrollable ? "block" : null;
		this._scrollLeftBtn.style.visibility = canScrollLeft ? "visible" : null;
		this._scrollRightBtn.style.visibility = canScrollRight ? "visible" : null;
 	}
 	updateScrollButtonsThrottled() {
		clearTimeout(this._updateScrollButtonsTimeout);
		this._updateScrollButtonsTimeout = setTimeout(this.updateScrollButtons, 150);
 	}
	open(id) {
		location.hash = "#bookmarks?" + id;
	}
	scrollToLeft() {
		this._listEl.scrollBy({ left:-(this._listEl.clientWidth-75), behavior: 'smooth' });
	}
	scrollToRight() {
		this._listEl.scrollBy({ left:+(this._listEl.clientWidth-75), behavior: 'smooth' });
	}
	onClick(event) {
		switch(event.target.id) {
			case 'scroll-left-btn':
				this.scrollToLeft();
			break;
			case 'scroll-right-btn':
				this.scrollToRight();
			break;
			case 'search-btn':
				location.hash = "#search";
			break;
			default:
				if(event.target.nodeId)
					this.open(event.target.nodeId);
			break;
		}
	}
	bind() {
		addEventListener("settings/" + this.bindingKey, this.update);
		addEventListener("settings/show-navigation-bar", this.update);
		addEventListener("bookmarks/change", this.update);
		addEventListener("hashchange#bookmarks", this.update);
		addEventListener("feedSubscriptionsStats/change", this.update);
		addEventListener("resize", this.updateScrollButtonsThrottled);
		this.update();
	}
	unbind() {
		removeEventListener("settings/" + this.bindingKey, this.update)
		removeEventListener("settings/show-navigation-bar", this.update);
		removeEventListener("bookmarks/change", this.update);
		removeEventListener("hashchange#bookmarks", this.update);
		removeEventListener("feedSubscriptionsStats/change", this.update);
		removeEventListener("resize", this.updateScrollButtonsThrottled);
	}
}
defineCustomElement("a-bookmarks-navbar", BookmarksNavbar, t);return window.BookmarksNavbar=BookmarksNavbar;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:flex;flex-direction:column;width:100%;height:100%;position:relative}:host(.-busy){opacity:0}a-bookmark,a-bookmarks-navbar{font-family:"Segoe UI",Helvetica,Arial;font-size:12px;font-stretch:condensed}a-bookmarks-mainview{height:100%;flex:1}a-bookmarks-mainview::-webkit-scrollbar{width:24px}a-bookmarks-mainview::-webkit-scrollbar-thumb:vertical{border-radius:12px;background-clip:padding-box;border:9px solid transparent;min-height:100px}a-bookmarks-mainview::-webkit-scrollbar-thumb{background-color:var(--theme-scrollbar-thumb-background-color)}a-bookmarks-mainview::-webkit-scrollbar-thumb:hover{background-color:var(--theme-scrollbar-thumb-background-color-hover)}a-menu[data-menu="link"]>:not([data-menu~="link"]){display:none}a-menu[data-menu="chrome-link"]>:not([data-menu~="chrome-link"]){display:none}a-menu[data-menu="folder-link"]>:not([data-menu~="folder-link"]){display:none}a-menu[data-menu="navbar"]>:not([data-menu~="navbar"]){display:none}a-menu[data-menu="main"]>:not([data-menu~="main"]){display:none}a-menu[data-menu="dock"]>:not([data-menu~="dock"]){display:none}a-menu[data-menu="none"]{display:none}@keyframes blink-animation{50%{opacity:0}}a-bookmark.-highlight{animation:blink-animation 600ms linear 500ms 5 alternate}</style><!--	require ...	<a-bookmarks-dock>--><a-menu id="menu">	<a-menuitem data-menu="dock" data-action="show-all" data-i18n="show_all"></a-menuitem>	<a-menuitem data-menu="navbar main dock" data-action="back" data-i18n="back"></a-menuitem>	<a-menuitem data-menu="navbar main dock" data-action="forward" data-i18n="forward"></a-menuitem>	<hr data-menu="navbar main dock">	<a-menuitem data-menu="navbar main dock" data-action="search" data-i18n="search"></a-menuitem>	<a-menuitem data-menu="navbar main dock" data-action="news" data-i18n="news"></a-menuitem>	<hr data-menu="main dock">	<a-menuitem data-menu="main dock">		<span data-i18n="add_bookmark"></span>		<a-menu id="menu-add-bookmark">			<a-menuitem data-action="create-bookmark" data-i18n="add_page"></a-menuitem>			<hr>			<a-menuitem data-action="add-games">Games</a-menuitem>			<a-menuitem data-action="add-history" data-i18n="history"></a-menuitem>			<a-menuitem data-action="add-downloads" data-i18n="downloads"></a-menuitem>			<a-menuitem data-action="add-bookmarks" data-i18n="bookmark_manager"></a-menuitem>			<a-menuitem data-action="add-extensions" data-i18n="extensions"></a-menuitem>			<a-menuitem data-action="add-apps" data-i18n="apps"></a-menuitem>			<a-menuitem data-action="add-settings" data-i18n="settings"></a-menuitem>		</a-menu>	</a-menuitem>	<a-menuitem data-menu="main dock" data-action="create-folder" data-i18n="add_folder"></a-menuitem>	<a-menuitem data-menu="navbar main dock" data-action="open-bookmark-manager" data-i18n="bookmark_manager"></a-menuitem>	<hr data-menu="main dock">	<a-menuitem data-menu="main dock" data-action="paste" data-i18n="paste"></a-menuitem>	<hr data-menu="main dock">	<a-menuitem data-menu="main dock" data-action="reorder-by-title" data-i18n="reorder_by_title"></a-menuitem>	<hr data-menu="navbar main dock">	<a-menuitem data-menu="navbar main dock" data-action="settings" data-i18n="settings"></a-menuitem>	<hr data-menu="navbar main dock">	<a-menuitem data-menu="navbar main dock">		<span data-i18n="help"></span>		<a-menu>			<a-menuitem data-menu="navbar main dock" data-action="help" data-i18n="help"></a-menuitem>			<a-menuitem data-menu="navbar main dock" data-action="support" data-i18n="support"></a-menuitem>			<a-menuitem data-menu="navbar main dock" data-action="about" data-i18n="about"></a-menuitem>		</a-menu>	</a-menuitem>	<a-menuitem data-menu="link chrome-link folder-link" data-action="open-link-in-new-tab" data-i18n="open_in_new_tab"></a-menuitem>	<a-menuitem data-menu="link chrome-link folder-link" data-action="open-link-in-new-window" data-i18n="open_in_new_window"></a-menuitem>	<a-menuitem data-menu="link" data-action="open-link-in-new-incognito-window" data-i18n="open_in_incognito_window"></a-menuitem>	<hr data-menu="link chrome-link folder-link">	<a-menuitem data-menu="link" data-action="open-search" data-i18n="search_"></a-menuitem>	<hr data-menu="link">	<a-menuitem data-menu="folder-link" data-action="open-all-links" data-i18n="open_all_links"></a-menuitem>	<a-menuitem data-menu="folder-link" data-action="open-all-links-in-new-window" data-i18n="open_all_links_in_new_window"></a-menuitem>	<a-menuitem data-menu="folder-link" data-action="open-all-links-in-new-incognito-window" data-i18n="open_all_links_in_new_incognito_window"></a-menuitem>	<hr data-menu="folder-link">	<a-menuitem data-menu="link chrome-link folder-link" data-action="cut" data-i18n="cut"></a-menuitem>	<a-menuitem data-menu="link chrome-link folder-link" data-action="copy" data-i18n="copy"></a-menuitem>	<a-menuitem data-menu="link chrome-link folder-link" data-action="paste" data-i18n="paste"></a-menuitem>	<hr data-menu="link chrome-link folder-link">	<a-menuitem data-menu="link chrome-link folder-link" data-action="edit" data-i18n="edit"></a-menuitem>	<a-menuitem data-menu="link chrome-link folder-link" data-action="delete" data-i18n="delete"></a-menuitem>	<hr data-menu="link">	<a-menuitem data-menu="link" data-action="open-feed" data-i18n="feed_"></a-menuitem>	<a-menuitem data-menu="link" data-action="open-icon">Icon...</a-menuitem></a-menu><!--<a-bookmarks-navbar data-binding-key="root-folder"></a-bookmarks-navbar><a-bookmarks-mainview data-binding-key="root-folder"></a-bookmarks-mainview>-->`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initBookmarksUI(window) {if(window.BookmarksUI) return window.BookmarksUI;initCustomElement(window);initSearchDialogUI(window);initFeedDialogUI(window);initIconDialogUI(window);initBookmarksDock(window);initMenu(window);initBookmarksNavbar(window);initBookmarksMainview(window);with(window) {class BookmarksUI extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._disableDock = this.dataset.disableDock ? (this.dataset.disableDock == "true") : false;
		this._menu = shadowRoot.querySelector("a-menu");
		this._navbar = document.createElement("a-bookmarks-navbar");
		this._navbar.dataset.bindingKey = "root-folder";
		this._navbar.dataset.contextmenu = "menu";
		shadowRoot.appendChild(this._navbar);
		this._mainview = document.createElement("a-bookmarks-mainview");
		this._mainview.dataset.bindingKey = "root-folder";
		this._mainview.dataset.contextmenu = "menu";
		this._dock = document.createElement("a-bookmarks-dock");
		this._dock.dataset.bindingKey = "dock-folder";
		this._dock.dataset.contextmenu = "menu";
		if(this.dataset.disableLayoutSettings) {
			this._mainview.dataset.disableLayoutSettings = this.dataset.disableLayoutSettings;
			this._dock.dataset.disableLayoutSettings = this.dataset.disableLayoutSettings;
		}
		if(this.dataset.paddingV) {
			this._mainview.dataset.paddingV = this.dataset.paddingV;
			this._dock.dataset.paddingV = this.dataset.paddingV;
		}
		if(this.dataset.paddingH) {
			this._mainview.dataset.paddingH = this.dataset.paddingH;
			this._dock.dataset.paddingH = this.dataset.paddingH;
		}
		shadowRoot.appendChild(this._mainview);
		this.update = this.update.bind(this);
		this.onContextmenu = this.onContextmenu.bind(this);
		shadowRoot.addEventListener("contextmenu", this.onContextmenu, true);
		this.onAction = this.onAction.bind(this);
		shadowRoot.addEventListener("action", this.onAction, true);
		this._rootFolderChange = this._rootFolderChange.bind(this);
	}
	_rootFolderChange(event) {
		location.hash = "#bookmarks?" + api.settings.get("root-folder");;
	}
	bind() {
		super.bind();
		addEventListener("settings/show-dock", this.update);
		addEventListener("settings/root-folder", this._rootFolderChange);
		this.update();
		this.busy = true;
		return Promise.all([
			this._mainview.isReady,
			this._dock.isReady
		]).then(()=>{
			this.busy = false;
		});
	}
	unbind() {
		super.unbind();
		removeEventListener("settings/show-dock", this.update);
		removeEventListener("settings/root-folder", this._rootFolderChange);
	}
	update() {
		if(!this._disableDock) {
			if(api.settings.get("show-dock")) {
				if(!this._dock.parentNode)
					this._mainview.parentNode.appendChild(this._dock);
			}
			else if(this._dock.parentNode)
				this._dock.remove();
		}
	}
	onContextmenu(event) {
		let menutype;
		if(event.target.tagName == "A-BOOKMARK") {
			if(event.target.url) {
				if(event.target.url.startsWith("chrome://"))
					menutype = "chrome-link";
				else
					menutype = "link";
			}
			else {
				menutype = "folder-link";
			}
		}
		else if(event.target == this._mainview) {
			menutype = "main";
		}
		else if(event.target == this._dock) {
			menutype = "dock";
		}
		else if(event.target == this._navbar) {
			menutype = "navbar";
		}
		else {
			menutype = "none";
		}
		this._menu.dataset.menu = menutype;
	}
	onAction(event) {
		event.preventDefault();
		var context = event.detail.context;
		switch(event.detail.name) {
			case "search":
				location.hash = "#search";
			break;
			case "news":
				location.hash = "#news";
			break;
			case "show-all":
				api.browser.openInCurrentTab("chrome://newtab/#bookmarks?" + context.target.folderId);
			break;
			case "back":
				history.back();
			break;
			case "forward":
				history.forward();
			break;
			case "create-bookmark":
				context.target.createBookmark(context.target.clientPointToIndex(context.clientX, context.clientY));
			break;
			case "add-games":
				context.target.createBookmark(context.target.clientPointToIndex(context.clientX, context.clientY), "Games", "chrome://newtab/#games");
			break;
			case "add-history":
				context.target.createBookmark(context.target.clientPointToIndex(context.clientX, context.clientY), chrome.i18n.getMessage("history"), "chrome://history");
			break;
			case "add-downloads":
				context.target.createBookmark(context.target.clientPointToIndex(context.clientX, context.clientY), chrome.i18n.getMessage("downloads"), "chrome://downloads");
			break;
			case "add-bookmarks":
				context.target.createBookmark(context.target.clientPointToIndex(context.clientX, context.clientY), chrome.i18n.getMessage("bookmark_manager"), "chrome://bookmarks");
			break;
			case "add-extensions":
				context.target.createBookmark(context.target.clientPointToIndex(context.clientX, context.clientY), chrome.i18n.getMessage("extensions"), "chrome://extensions");
			break;
			case "add-apps":
				context.target.createBookmark(context.target.clientPointToIndex(context.clientX, context.clientY), chrome.i18n.getMessage("apps"), "chrome://apps");
			break;
			case "add-settings":
				context.target.createBookmark(context.target.clientPointToIndex(context.clientX, context.clientY), chrome.i18n.getMessage("settings"), "chrome://settings");
			break;
			case "edit":
				context.target.parentNode.edit(context.target);
			break;
			case "delete":
				context.target.parentNode.deleteBookmarks(
					context.target.parentNode.getSelectionSize() ?
					context.target.parentNode.getSelectedChildren() :
					[context.target]
				);
			break;
			case "create-folder":
				context.target.createFolder(context.target.clientPointToIndex(context.clientX, context.clientY));
			break;
			case "open-bookmark-manager":
				api.browser.openInNewTab("chrome://bookmarks/?id=" + context.target.folderId, window, true)
			break;
			case "copy":
				context.target.parentNode.copy();
			break;
			case "cut":
				context.target.parentNode.cut();
			break;
			case "paste":
				let target = context.target instanceof Bookmark ? context.target.parentNode : context.target;
				target.paste(
					target.clientPointToIndex(context.clientX, context.clientY)
				);
			break;
			case "reorder-by-title":
				context.target.reorderByTitle();
			break;
			case "settings":
				api.settingsWindow.show((context.target == this._dock) ? "dock" : "favorites");
			break;
			case "help":
				api.helpDoc.show(window);
			break;
			case "support":
				api.helpDoc.show(window, "support");
			break;
			case "about":
				api.helpDoc.show(window, "about");
			break;
			case "open-link-in-new-tab":
				api.browser.openInNewTab(
					context.target.parentNode.getSelectionSize() ?
					context.target.parentNode.getSelectedChildren().map(bookmark=>bookmark.href) :
					context.target.href,
					window
				);
			break;
			case "open-link-in-new-window":
				api.browser.openInNewWindow(
					context.target.parentNode.getSelectionSize() ?
					context.target.parentNode.getSelectedChildren().map(bookmark=>bookmark.href) :
					context.target.href
				);
			break;
			case "open-link-in-new-incognito-window":
				api.browser.openInNewWindow(
					context.target.parentNode.getSelectionSize() ?
					context.target.parentNode.getSelectedChildren().map(bookmark=>bookmark.href) :
					context.target.href,
					true
				);
			break;
			case "open-all-links":
				api.bookmarks.getAllURLS(
					(context.target.parentNode.getSelectionSize() ? context.target.parentNode.getSelectedChildren().map(bookmark => bookmark.id) : context.target.id),
					urls => api.browser.openInNewTab(urls, window)
				);
			break;
			case "open-all-links-in-new-window":
				api.bookmarks.getAllURLS(
					(context.target.parentNode.getSelectionSize() ? context.target.parentNode.getSelectedChildren().map(bookmark => bookmark.id) : context.target.id),
					urls => api.browser.openInNewWindow(urls)
				);
			break;
			case "open-all-links-in-new-incognito-window":
				api.bookmarks.getAllURLS(
					(context.target.parentNode.getSelectionSize() ? context.target.parentNode.getSelectedChildren().map(bookmark => bookmark.id) : context.target.id),
					urls => api.browser.openInNewWindow(urls, true)
				);
			break;
			case "open-search":
				showDialog(SearchDialogUI, { url : context.target.url, title : context.target.title  });
			break;
			case "open-feed":
				showDialog(FeedDialogUI, { url : context.target.url, id : context.target.id, title : context.target.title  });
			break;
			case "open-icon":
				showDialog(IconDialogUI, { url : context.target.url, title : context.target.title });
			break;
			default:
				console.log("newtab-ui action ", event.detail.name, "not implemented");
			break;
		}
	}
}
defineCustomElement("a-bookmarks-ui", BookmarksUI, t);return window.BookmarksUI=BookmarksUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:inline-block;background-color:#3367D6;border:1px solid rgba(0,0,0,0.05);border-radius:3px;font-weight:500;text-align:center;cursor:pointer;white-space:nowrap;color:rgba(255,255,255,0.93)}:host(:not(:empty)){padding:8px 20px}:host(:hover){color:white}:host(:active){filter:brightness(90%)}:host(.invert){background-color:white;color:#3367D6;border-color:#3367D6}*{pointer-events:none}</style><!--require<a-icon>--><span tabindex="0"><a-icon id="icon"></a-icon><slot tabindex="0"></slot></span>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initButton(window) {if(window.Button) return window.Button;initCustomElement(window);initIcon(window);with(window) {class Button extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._label = shadowRoot.querySelector("span");
		this.addEventListener("keydown", this);
		this._icon = shadowRoot.getElementById("icon");
		if(this.dataset.icon)
			this.icon = this.dataset.icon;
	}
	get label() {
		return this.textContent;
	}
	set label(text) {
		while(this.childNodes.length)
			this.firstChild.remove();
		this.appendChild(document.createTextNode(text));
	}
	set icon(name) {
		this._icon.dataset.icon = name;
	}
	get icon() {
		return this._icon.dataset.name;
	}
	handleEvent(event) {
		switch(event.type) {
			case "keydown":
				switch(event.keyCode) {
					case 13:
					case 32:
						event.preventDefault();
						this.click();
					break;
				}
			break;
		}
	}
}
defineCustomElement("a-button", Button, t);return window.Button=Button;}}}
{const t = document.createElement("template");t.innerHTML = `<style>svg{fill:var(--theme-text-color)}#hands #seconds{fill:#f80000;shape-rendering:geometricPrecision}#sm{opacity:.4}</style><svg id="dial" viewBox="-175 -175 350 350" xmlns:xlink="http://www.w3.org/1999/xlink">	<g id="s4h">		<g id="s2h">			<g id="s1h">				<rect id="sm" ry="0.5" rx="0.5" x="-0.5" y="-125" width="1" height="5"/>				<rect x="-1.25" y="-125" rx="1.25" ry="1.25" width="2.5" height="18" />				<use transform="rotate(6)" xlink:href="#sm" />				<use transform="rotate(12)" xlink:href="#sm" />				<use transform="rotate(18)" xlink:href="#sm" />				<use transform="rotate(24)" xlink:href="#sm" />			</g>			<use transform="rotate(180)" xlink:href="#s1h" />		</g>		<use transform="rotate(30)" xlink:href="#s2h" />	</g>	<use transform="rotate(60)" xlink:href="#s4h" />	<use transform="rotate(120)" xlink:href="#s4h" /></svg><svg id="hands" viewBox="-175 -175 350 350">	<circle r="6" />	<rect id="hours" x="-3" y="-77" rx="3" ry="3" width="6" height="80" />	<rect id="minutes" x="-2" y="-113" rx="2" ry="2" width="4" height="115" />	<g id="seconds">		<rect width="2" height="133" x="-1" y="-118" rx="1" ry="1"/>		<circle r="3" />	</g></svg>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initClockAnalog1(window) {if(window.ClockAnalog1) return window.ClockAnalog1;initClockAnalog(window);with(window) {class ClockAnalog1 extends ClockAnalog {
}
defineCustomElement("a-clock-analog-1", ClockAnalog1, t);return window.ClockAnalog1=ClockAnalog1;}}}
{const t = document.createElement("template");t.innerHTML = `<style>#hands{fill:var(--clock-analog-2-hands-color, var(--theme-text-color))}#hands rect{fill:var(--clock-analog-2-hands-inner-color, var(--theme-background-color))}#hands #seconds,#hands #minutes,#hands #hours,#hands circle{filter:url(#hands-shadow)}#hands #seconds *{fill:var(--clock-analog-seconds-color, #f80000);shape-rendering:geometricPrecision}#dial{fill:var(--clock-analog-2-dial-color, var(--theme-scrollbar-thumb-background-color))}</style><svg id="dial" viewBox="-175 -175 350 350" xmlns:xlink="http://www.w3.org/1999/xlink">	<g id="dial-t6">	 <g id="dial-t2">	 	<rect id="dial-t1" width="2" height="25" x="-1" y="110" rx="1" ry="1"/>	 	<use xlink:href="#dial-t1" transform="rotate(180,0,0)"/>	 </g>	 <use xlink:href="#dial-t2" transform="rotate(30,0,0)"/>	 <use xlink:href="#dial-t2" transform="rotate(60,0,0)"/>	</g>	<use xlink:href="#dial-t6" transform="rotate(90,0,0)"/></svg><svg id="hands" viewBox="-175 -175 350 350">	<filter id="hands-shadow" x="-25" y="-150" width="50" height="200" filterUnits="userSpaceOnUse">		<feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="#000000" flood-opacity="0.15" />    </filter>    <g id="minutes">		<path d="m 2,-5 v -3 c 0,-6 4,-7 4,-13 v -93 c 0,-3.324 -2.676,-6 -6,-6 -3.324,0 -6,2.676 -6,6 v 93 c 0,6 4,7 4,13 v 3 z" />		<rect width="8" height="100" x="-4" y="-118" rx="4" ry="4"/>    </g>    <g id="hours">		<path d="m 2,-5 v -3 c 0,-6 4,-7 4,-13 v -43 c 0,-3.324 -2.676,-6 -6,-6 -3.324,0 -6,2.676 -6,6 v 43 c 0,6 4,7 4,13 v 3 z" />		<rect width="8" height="50" x="-4" y="-68" rx="4" ry="4"/>    </g>	<circle r="6" />	<g id="seconds">		<rect width="2" height="137" x="-1" y="-122" rx="1" ry="1"/>		<circle r="3" />	</g></svg>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initClockAnalog2(window) {if(window.ClockAnalog2) return window.ClockAnalog2;initClockAnalog(window);with(window) {class ClockAnalog2 extends ClockAnalog {
}
defineCustomElement("a-clock-analog-2", ClockAnalog2, t);return window.ClockAnalog2=ClockAnalog2;}}}
{const t = document.createElement("template");t.innerHTML = `<style>#dial{stroke:var(--clock-analog-3-dial-color, var(--theme-overlay-color))}#hands{fill:var(--clock-analog-3-hands-color, var(--theme-text-color))}#hands #seconds *{fill:var(--clock-analog-seconds-color, #d40000);shape-rendering:geometricPrecision}</style><svg id="dial" viewBox="-175 -175 350 350" xmlns:xlink="http://www.w3.org/1999/xlink">	<circle cx="0" cy="0" r="120" stroke-width="22" style="fill:none;" /></svg><svg id="hands" viewBox="-175 -175 350 350">  <path    d="M 0 -19 A 19 19 0 0 0 -19 0 A 19 19 0 0 0 0 19 A 19 19 0 0 0 19 0 A 19 19 0 0 0 0 -19 z M 0 -15 A 15 15 0 0 1 15 0 A 15 15 0 0 1 0 15 A 15 15 0 0 1 -15 0 A 15 15 0 0 1 0 -15 z "    />	<path id="minutes" d="m 3.75,-15 v -101.25 c 0,-2.0775 -1.6725,-3.75 -3.75,-3.75 -2.0775,0 -3.75,1.6725 -3.75,3.75 V -15 Z" />	<path id="hours" d="M 7.5,-15 V -57.5 C 7.5,-61.655 4.155,-65 0,-65 c -4.155,0 -7.5,3.345 -7.5,7.5 V -15 Z" />	<circle r="6" />	<g id="seconds">		<rect width="2" height="120" x="-1" y="-120" rx="1" ry="1"/>		<circle r="7" />	</g></svg>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initClockAnalog3(window) {if(window.ClockAnalog3) return window.ClockAnalog3;initClockAnalog(window);with(window) {class ClockAnalog3 extends ClockAnalog {}
defineCustomElement("a-clock-analog-3", ClockAnalog3, t);return window.ClockAnalog3=ClockAnalog3;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:block;position:relative}svg{position:absolute;width:350px;height:350px;top:50%;left:50%;transform:translate(-50%, -50%)}#seconds{display:none}:host([data-show-seconds]) #seconds{display:inline}</style>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initClockAnalog(window) {if(window.ClockAnalog) return window.ClockAnalog;initCustomElement(window);with(window) {// ABSTRACT !!!
class ClockAnalog extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._hours = shadowRoot.getElementById("hours");
		this._minutes = shadowRoot.getElementById("minutes");
		this._seconds = shadowRoot.getElementById("seconds");
		const handsSVG = shadowRoot.getElementById("hands");
		this._transformHours = handsSVG.createSVGTransform();
		this._hours.transform.baseVal.appendItem(this._transformHours);
		this._transformMinutes = handsSVG.createSVGTransform();
		this._minutes.transform.baseVal.appendItem(this._transformMinutes);
		if(this._seconds && this.dataset.showSeconds) {
			this._transformSeconds = handsSVG.createSVGTransform();
			this._seconds.transform.baseVal.appendItem(this._transformSeconds);
		}
		this._onVisibilityChange = this._onVisibilityChange.bind(this);
	}
	_update(now) {
		const minutesOfHour = now.getHours() * 60 +  now.getMinutes();
		const hoursA = minutesOfHour / 2;
		if(this._transformHours.angle != hoursA)
			this._transformHours.setRotate(hoursA, 0, 0);
		const secondsOfHour = now.getMinutes() * 60 + now.getSeconds();
		const minutesA = secondsOfHour / 10;
		if(this._transformMinutes.angle != minutesA)
			this._transformMinutes.setRotate(minutesA, 0, 0);
		if(this._transformSeconds) {
			const secondsA = now.getSeconds() * 6;
			this._transformSeconds.setRotate(secondsA, 0, 0);
		}
	}
	_start() {
		const d = 1000;
		const imax = 60;
		let date = new Date();
		let t, t0, i=0;
		let tick = ()=>{
			i = i % imax;
			t = i ? (t0 + i*d) : (t0 = Date.now());
			date.setTime(t);
			this._update(date);
			i++;
		};
		tick();
		this._interval = setInterval(tick, d);
	}
	_stop() {
		clearInterval(this._interval);
	}
	_onVisibilityChange() {
		if(document.hidden)
			this._stop();
		else
			this._start();
	}
	bind() {
		super.bind();
		this._start();
		addEventListener("visibilitychange", this._onVisibilityChange);
	}
	unbind() {
		super.unbind();
		this._stop();
		removeEventListener("visibilitychange", this._onVisibilityChange);
	}
}
defineCustomElement("a-clock-analog", ClockAnalog, t);return window.ClockAnalog=ClockAnalog;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:block;font-family:"Roboto";transition:filter 840ms 0ms linear;filter:opacity(0%)}:host(.ready){filter:opacity(100%)}#time{font-weight:100;font-size:126px;letter-spacing:-4px;margin-top:85px}#time .one{letter-spacing:-16px}#date{font-weight:300;font-size:28px;margin-top:-7px;letter-spacing:-0.1px;transform:translateX(-2px)}#date .one{letter-spacing:-1.2px}</style><div id="time"></div><div id="date"></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initClockDigital(window) {if(window.ClockDigital) return window.ClockDigital;initCustomElement(window);with(window) {class ClockDigital extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._timeEl = shadowRoot.getElementById("time");
		this._dateEl = shadowRoot.getElementById("date");
		this.start = this.start.bind(this);
	}
	strToHTML(str) {
		return str
			.split("")
			.map(c => (c=="1")?'<span class="one">'+c+'</span>':c)
			.join("");
	}
	start() {
		var date = new Date();
		const is24HourClock = this.dataset.h24 !== undefined;
		const seconds = date.getSeconds();
		const minutes = date.getMinutes();
		const hours = is24HourClock?date.getHours():(date.getHours()%12||12);
		const dayOfMonth = date.getDate();
		const hoursStr = ((is24HourClock && (hours<10))?"0":"") + hours;
		const minutesStr = ((minutes<10)?"0":"") + minutes;
		const timeStr = hoursStr + ":" + minutesStr;
		this._timeEl.innerHTML = this.strToHTML(timeStr);
		let marginLeft = 0;
		if(hoursStr.length == 1)
			marginLeft+=-4;
		else
			marginLeft+=-4;
		if(hoursStr.charAt(0)=="1")
			marginLeft+=-10;
		if(minutesStr.charAt(minutesStr.length-1)=="1")
			marginLeft+=2;
		if(minutesStr.charAt(minutesStr.length-1)=="7")
			marginLeft+=4;
		this._timeEl.style.transform = "translateX("+marginLeft+"px)";
		if(this._dateEl.dayOfMonth != dayOfMonth) {
			this._dateEl.innerHTML = this.strToHTML(api.i18n.formatDateShort(date));
			this._dateEl.dayOfMonth = dayOfMonth;
		}
		clearTimeout(this._timeout);
		this._timeout = setTimeout(this.start, (60 - seconds) * 1000);
	}
	stop() {
		clearTimeout(this._timeout);
	}
	bind() {
		super.bind();
		this.start();
		return Promise.all([
			document.fonts.load('100 1em Roboto'),
			document.fonts.load('300 1em Roboto')
		])
		.catch(console.log)
		.then(()=>{
			this.classList.add("ready");
		});
	}
	unbind() {
		super.unbind();
		this.stop();
	}
}
defineCustomElement("a-clock-digital", ClockDigital, t);return window.ClockDigital=ClockDigital;}}}
{const t = document.createElement("template");t.innerHTML = `<style>a-selector{padding:30px 20px 0 20px;display:flex;flex-wrap:wrap;justify-content:left;width:656px}a-selector [data-option]{width:124px;height:124px;border-radius:5px;margin:0 15px 50px 15px;text-align:center;background-color:#F9FCFE;background-repeat:no-repeat;background-size:124px;border:1px solid #EBF5FC}a-selector [data-option].-selected{background-color:#CAE2F9;background-blend-mode:darken;box-shadow:0 0 3px 2px rgba(51,103,214,0.5)}a-selector [data-option]:after{content:attr(data-option);text-align:center;margin-top:134px;display:block;font-size:9px;color:#666}</style><a-selector class="content">	<div data-option="DC-1" style="background-image:url(/ui/clock-selector-ui/icon-dc-1.png)"></div>	<div data-option="AC-1" style="background-image:url(/ui/clock-selector-ui/icon-ac-1.png)"></div>	<div data-option="AC-2" style="background-image:url(/ui/clock-selector-ui/icon-ac-2.png)"></div>	<div data-option="AC-3" style="background-image:url(/ui/clock-selector-ui/icon-ac-3.png)"></div>	<div data-option="DC-1M" style="background-image:url(/ui/clock-selector-ui/icon-dc-1m.png)"></div>	<div data-option="AC-1S" style="background-image:url(/ui/clock-selector-ui/icon-ac-1s.png)"></div>	<div data-option="AC-2S" style="background-image:url(/ui/clock-selector-ui/icon-ac-2s.png)"></div>	<div data-option="AC-3S" style="background-image:url(/ui/clock-selector-ui/icon-ac-3s.png)"></div></a-selector>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initClockSelectorUI(window) {if(window.ClockSelectorUI) return window.ClockSelectorUI;initDialogSelectorUI(window);initSelector(window);with(window) {class ClockSelectorUI extends DialogSelectorUI {}
defineCustomElement("a-clock-selector-ui", ClockSelectorUI, t);return window.ClockSelectorUI=ClockSelectorUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:inline-block;white-space:nowrap}a-colorpicker,span{vertical-align:middle}span{margin-left:10px}a-rangeslider{width:100px}</style><a-colorpicker></a-colorpicker>&nbsp;<span data-i18n="opacity"></span>:&nbsp;<a-rangeslider class="hide-value" data-min="0" data-max="100"></a-rangeslider>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initColorpickerWithAlpha(window) {if(window.ColorpickerWithAlpha) return window.ColorpickerWithAlpha;initCustomElement(window);initColorpicker(window);initRangeslider(window);with(window) {class ColorpickerWithAlpha extends CustomElement {
	static ParseColor(color) {
		try {
			var color = color.replace(/\s+/g, ''),
				matches;
			if(matches = /^rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(color))
				return [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3]),1];
			else if(matches = /^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(color))
				return [parseInt(matches[1]),parseInt(matches[2]),parseInt(matches[3]),matches[4]];
			else if(matches = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color))
				return [parseInt(matches[1], 16), parseInt(matches[2], 16), parseInt(matches[3], 16), 1];
			else if(matches = /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(color))
				return [parseInt(matches[1], 16) * 17, parseInt(matches[2], 16) * 17, parseInt(matches[3], 16) * 17, 1];
		}
		catch(e) {}
		return [0,0,0,0];
	}
	static RGBAToString(color) {
		return "rgba("+color.join()+")";
	}
	static ByteToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}
	init(shadowRoot) {
		super.init(shadowRoot);
		this._colorpicker = shadowRoot.querySelector("a-colorpicker");
		this._colorpicker.addEventListener("change", this);
		this._rangeslider = shadowRoot.querySelector("a-rangeslider");
		this._rangeslider.addEventListener("change", this);
		if(this.dataset.value)
			this.value = this.dataset.value;
	}
	get value() {
		var rgba = ColorpickerWithAlpha.ParseColor(this._colorpicker.value);
		rgba[3] = this._rangeslider.value/100;
		return ColorpickerWithAlpha.RGBAToString(rgba);
	}
	set value(value) {
		var rgba = ColorpickerWithAlpha.ParseColor(value);
		this._colorpicker.value = "#" + ColorpickerWithAlpha.ByteToHex(rgba[0]) + ColorpickerWithAlpha.ByteToHex(rgba[1]) + ColorpickerWithAlpha.ByteToHex(rgba[2]);
		this._rangeslider.value = rgba[3]*100;
	}
	handleEvent(event) {
		switch(event.type) {
			case "change":
				this.dispatchEvent(new Event('change', { bubbles : true}));
			break;
		}
	}
}
defineCustomElement("a-colorpicker-with-alpha", ColorpickerWithAlpha, t);return window.ColorpickerWithAlpha=ColorpickerWithAlpha;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:inline-block;min-width:40px;height:30px;vertical-align:top}input{display:block;-webkit-appearance:none;margin:0;padding:0;width:100%;height:100%;border:none;outline:none}</style><input type="color"></input>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initColorpicker(window) {if(window.Colorpicker) return window.Colorpicker;initCustomElement(window);with(window) {class Colorpicker extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._input = shadowRoot.querySelector("input");
		this._input.onchange = () => {
			this.dispatchEvent(new Event('change', { bubbles : true}));
		}
		if(this.dataset.value)
			this.value = this.dataset.value;
	}
	get value() {
		return this._input.value;
	}
	set value(value) {
		this._input.value = value;
	}
}
defineCustomElement("a-colorpicker", Colorpicker, t);return window.Colorpicker=Colorpicker;}}}
{const t = document.createElement("template");t.innerHTML = `<style></style><a-topbar>	<h1 slot="left"></h1>	<a-button slot="right" title="i18n:close" data-icon="close" data-action="cancel"></a-button></a-topbar><div id="message" class="text"></div><div class="buttons">	<a-button data-i18n="cancel" data-action="cancel" tabindex="2"></a-button>	<a-button data-i18n="ok" data-action="ok" tabindex="1"></a-button></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initConfirmDialogUI(window) {if(window.ConfirmDialogUI) return window.ConfirmDialogUI;initDialogUI(window);initTopbar(window);initButton(window);with(window) {class ConfirmDialogUI extends DialogUI {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._title = shadowRoot.querySelector("h1");
		this._message = shadowRoot.getElementById("message");
	}
	setValues(values) {
		this._title.textContent = values.title || "";
		this._message.textContent = values.message || "";
	}
}
window.showConfirm = function(title, message, callback, cancelCallback) {
	showDialog(ConfirmDialogUI, { title, message }, callback, cancelCallback);
}
defineCustomElement("a-confirm-dialog-ui", ConfirmDialogUI, t);return window.ConfirmDialogUI=ConfirmDialogUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host,*{box-sizing:border-box;outline:none}:host([data-disabled]){filter:grayscale(100%);pointer-events:none;opacity:.5}:host-context(.-busy),:host-context(.-busy) *,:host-context(.-busy)::slotted(*){cursor:wait !important}</style>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initCustomElement(window) {if(window.CustomElement) return window.CustomElement;with(window) {const IS_READY = Promise.resolve();
class CustomElement extends HTMLElement {
		init(shadowRoot) {
		if(this.dataset.binding)
			this.binding = this.dataset.binding;
		if(this.dataset.bindingKey)
			this.bindingKey = this.dataset.bindingKey;
		if(this.dataset.action)
			this.action = this.dataset.action;
		if(this.dataset.menu)
			this.menu = this.dataset.menu;
		if(this.dataset.contextmenu)
			this.contextmenu = this.dataset.contextmenu;
		this._isInitialized = true;
	}
	set bindingClass(bindingClass) {
		if(this._binding)
			this._binding.unbind();
		this._binding = new bindingClass(this);
	}
	set binding(name) {
		this.bindingClass = DataBinding.Get(name);
	}
	__delegateFocus(event) {
		if(event.type == "focus") {
			const focusInShadow = this.shadowRoot.querySelector(":focus, .-focus");
			if(!focusInShadow) {
				const fel = this.shadowRoot.querySelector("input,select,textarea,a,button,[tabindex]");
				if(fel)
					fel.focus();
			}
			this.classList.add("-focus");
		}
		else {
			this.classList.remove("-focus");
		}
	}
	connectedCallback() {
		if(!this._wasConnected) {
			this._wasConnected = true;
			if(this.constructor._templates.length) {
				let shadowRoot = this.attachShadow({mode: 'open'});
				this.addEventListener("focus", this.__delegateFocus);
				this.addEventListener("blur", this.__delegateFocus);
			 	for(let t of this.constructor._templates)
			 		shadowRoot.appendChild(document.importNode(t.content, true));
				this.init(shadowRoot);
				if(!this._isInitialized)
					throw("error! "+this.tagName+" doesn't call super.init()!");
			}
		}
		this._isReady = this.bind();
	}
	get isReady() {
		return this._isReady || IS_READY;
	}
	disconnectedCallback() {
		this.unbind();
	}
	bind() {
		if(this._binding && !this.standby)
			this._binding.bind();
	}
	unbind() {
		if(this._binding && !this.standby)
			this._binding.unbind();
	}
	set disabled(value) {
		if(value)
			this.dataset.disabled = "true";
		else
			delete this.dataset.disabled;
	}
	get disabled() {
		return this.dataset.disabled !== undefined;
	}
	set busy(value) {
		if(value)
			this.classList.add("-busy");
		else
			this.classList.remove("-busy");
	}
	get busy() {
		return this.classList.contains("-busy");
	}
	_cloneEvent(event) {
		return { target : event.target, clientX : event.clientX, clientY : event.clientY };
	}
	_dispatchActionEvent(name, click, context) {
		if(
			click.target.dispatchEvent(new CustomEvent('action', { bubbles : true, cancelable : true, detail : { name, click, context } }))
		) {
			var host = this.getRootNode().host;
			if(host && (typeof host[name] === "function")) {
				host[name]();
			}
		}
	}
	set action(name) {
		if(this._actionHandler) {
			this.removeEventListener("click", this._actionHandler)
		}
		this._actionHandler = event => this._dispatchActionEvent(name, this._cloneEvent(event));
		this.addEventListener("click", this._actionHandler);
	}
	initMenu(eventType, menuOrId, target) {
		var handlerName = "_menu" + eventType;
		target = target || this;
		if(target[handlerName]) {
			target.removeEventListener(eventType, target[handlerName])
		}
		target[handlerName] = context => {
			context.preventDefault();
			var root = this.getRootNode();
			var menu = (typeof menuOrId == "string")  ? root.getElementById(menuOrId) : menuOrId;
			context = this._cloneEvent(context);
			menu.show(context.clientX, context.clientY, click=>{
				if(click.target.dataset.action) {
					this._dispatchActionEvent(click.target.dataset.action, this._cloneEvent(click), context);
				}
			});
		}
		target.addEventListener(eventType, target[handlerName]);
	}
	set menu(menuOrId) {
		this.initMenu("click", menuOrId);
	}
	set contextmenu(menuOrId) {
		this.initMenu("contextmenu", menuOrId);
	}
}
window.defineCustomElement = function(name, elementClass, template) {
	elementClass._template = template;
	elementClass._templates = [];
	var constructor = elementClass;
	while(constructor) {
		if(constructor.hasOwnProperty("_template"))
			elementClass._templates.unshift(constructor._template);
		constructor = Object.getPrototypeOf(constructor);
	}
	customElements.define(name, elementClass);
}
window.defineCustomElement.templates = (typeof templates === 'undefined') ? {} : templates;
defineCustomElement("a-custom-element", CustomElement, t);return window.CustomElement=CustomElement;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:block;width:100%;height:100%;color:var(--theme-text-color);cursor:pointer}#layout{width:100%;height:100%}#layout>*{position:absolute;width:100%;text-align:center}#clock{top:50%;margin-top:-220px;height:350px}#buttons{bottom:60px;height:48px;display:inline-flex;justify-content:center}#buttons>*{position:relative;width:64px;height:48px}#buttons>* svg{width:48px;height:48px;pointer-events:none;border-radius:24px;background-color:var(--dash-icon-background-color, var(--theme-overlay-color))}#buttons>* svg path{fill:var(--dash-icon-color, var(--theme-text-color))}#buttons>*[data-badge]:after{content:attr(data-badge);position:absolute;display:inline-block;background-color:#E00606;color:white;height:22px;line-height:18px;font-size:9px;font-weight:bold;box-sizing:border-box;border-radius:11px;padding:1px 7px;top:-5px;right:-5px;border:1px solid transparent;overlfow:hidden}#buttons>*[data-name="bookmarks"]:hover svg{background-color:var(--theme-icon-bookmarks-background-color)}#buttons>*[data-name="bookmarks"]:hover path{fill:var(--theme-icon-bookmarks-color)}#buttons>*[data-name="history"]:hover svg{background-color:var(--theme-icon-history-background-color)}#buttons>*[data-name="history"]:hover path{fill:var(--theme-icon-history-color)}#buttons>*[data-name="downloads"]:hover svg{background-color:var(--theme-icon-downloads-background-color)}#buttons>*[data-name="downloads"]:hover path{fill:var(--theme-icon-downloads-color)}#buttons>*[data-name="settings"]:hover svg{background-color:var(--theme-icon-settings-background-color)}#buttons>*[data-name="settings"]:hover path{fill:var(--theme-icon-settings-color)}#buttons>*[data-name="extensions"]:hover svg{background-color:var(--theme-icon-extensions-background-color)}#buttons>*[data-name="extensions"]:hover path{fill:var(--theme-icon-extensions-color)}#buttons>*[data-name="apps"]:hover svg{background-color:var(--theme-icon-apps-background-color)}#buttons>*[data-name="apps"]:hover path{fill:var(--theme-icon-apps-color)}#buttons>*[data-name="games"]:hover svg{background-color:var(--theme-icon-games-background-color)}#buttons>*[data-name="games"]:hover path{fill:var(--theme-icon-games-color)}#buttons>*[data-name="news"]:hover svg{background-color:var(--theme-icon-news-background-color)}#buttons>*[data-name="news"]:hover path{fill:var(--theme-icon-news-color)}#tooltip{bottom:22px;height:20px;font-family:"Segoe UI",Helvetica,Arial;font-size:12px;font-stretch:condensed;opacity:.55}@media (max-height:450px){#clock{display:none}}</style><a-menu id="menu">	<a-menuitem data-action="back" data-i18n="back"></a-menuitem>	<a-menuitem data-action="forward" data-i18n="forward"></a-menuitem>	<hr>	<a-menuitem data-action="search" data-i18n="search"></a-menuitem>	<a-menuitem data-action="news" data-i18n="news"></a-menuitem>	<hr>	<a-menuitem data-action="settings" data-i18n="settings"></a-menuitem>	<hr>	<a-menuitem>		<span data-i18n="help"></span>		<a-menu>			<a-menuitem data-action="help" data-i18n="help"></a-menuitem>			<a-menuitem data-action="support" data-i18n="support">Support</a-menuitem>			<a-menuitem data-action="about" data-i18n="about"></a-menuitem>		</a-menu>	</a-menuitem></a-menu><div id="layout">	<div id="buttons">		<div data-name="bookmarks"><svg><path d="m 23.983014,11.997173 2.932444,7.822835 8.345974,0.371584 -6.533626,5.206387 2.225655,8.052481 -6.970447,-4.60513 -6.970444,4.60513 2.225655,-8.052481 -6.533628,-5.206387 8.345976,-0.371584 z" /></svg></div>		<div data-name="history"><svg><path d="M 24,12 A 12,12 0 0 0 11.999932,23.999206 12,12 0 0 0 24,36 12,12 0 0 0 36,23.999206 12,12 0 0 0 24,12 Z m -0.0091,5.389433 a 0.6,0.6 0 0 1 0.607022,0.61056 v 5.3988 h 3.003523 a 0.6001512,0.6001512 0 0 1 0,1.200008 h -4.198836 v -6.59959 a 0.6,0.6 0 0 1 0.527335,-0.607022 0.6,0.6 0 0 1 0.061,-0.0046 z" /></svg></div>		<div data-name="downloads">			<svg><path d="m 20.4,15 v 9 H 15 l 9,9 9,-9 h -5.4 v -9 z" /></svg>		</div>		<div data-name="settings">			<svg><path d="m 24,12 a 12,12 0 0 0 -1.816406,0.147656 c 0.09774,1.373148 0.08686,2.82771 -1.627734,3.537891 -1.712172,0.709183 -2.748165,-0.307893 -3.64922,-1.346484 a 12,12 0 0 0 -2.56875,2.567577 c 1.038796,0.901191 2.057021,1.93664 1.347657,3.64922 -0.709161,1.712035 -2.160585,1.724928 -3.532032,1.627734 A 12,12 0 0 0 12,24 a 12,12 0 0 0 0.147656,1.817578 c 1.373148,-0.09774 2.82771,-0.08797 3.537891,1.626562 0.709205,1.71224 -0.307938,2.74812 -1.346484,3.64922 a 12,12 0 0 0 2.567577,2.569921 c 0.901259,-1.038954 1.936436,-2.058261 3.64922,-1.348828 1.712103,0.709206 1.72495,2.160607 1.627734,3.532032 A 12,12 0 0 0 24,36 12,12 0 0 0 25.816406,35.852344 c -0.09774,-1.373171 -0.08684,-2.827733 1.627734,-3.537891 1.712444,-0.709319 2.748074,0.308929 3.64922,1.347657 a 12,12 0 0 0 2.56875,-2.567579 c -1.039,-0.901258 -2.057157,-1.937494 -1.347657,-3.650391 0.709161,-1.712035 2.160607,-1.72495 3.532032,-1.627734 A 12,12 0 0 0 36,24 12,12 0 0 0 35.852344,22.183594 c -1.373148,0.09774 -2.82771,0.08686 -3.537891,-1.627734 -0.709364,-1.71258 0.308861,-2.748029 1.347657,-3.64922 a 12,12 0 0 0 -2.56875,-2.56875 c -0.901191,1.038796 -1.936663,2.056976 -3.64922,1.347657 -1.71208,-0.709206 -1.72495,-2.160607 -1.627734,-3.532032 A 12,12 0 0 0 24,12 Z m 0,6 a 6,6 0 0 1 6,6 6,6 0 0 1 -6,6 A 6,6 0 0 1 18.001172,24 6,6 0 0 1 24,18 Z m 3,6 a 3,3 0 0 1 -3,3 3,3 0 0 1 -3,-3 3,3 0 0 1 3,-3 3,3 0 0 1 3,3 z" /></svg>		</div>		<div data-name="extensions">			<svg><path d="m 23.979991,11.40114 c -0.406669,0.01134 -0.806717,0.113386 -1.194134,0.278884 -0.746033,0.318705 -1.09,1.052084 -1.096871,1.934748 -0.0046,0.531847 0.02041,0.620651 0.355078,1.289038 0.238428,0.47774 0.357415,0.813725 0.357415,1.006685 v 0.289451 h -5.601577 c -0.332538,0 -0.599993,0.267477 -0.599993,0.599992 v 5.200804 h 0.253123 c 0.168718,0 0.463272,-0.104314 0.881258,-0.312899 0.584867,-0.291833 0.661991,-0.31392 1.127349,-0.309362 0.772317,0.0068 1.413287,0.306958 1.692194,0.959766 0.289655,0.677936 0.363038,1.399432 0,2.123401 -0.31823,0.634553 -0.919877,0.950695 -1.692194,0.959743 -0.465358,0.0046 -0.542482,-0.01814 -1.127349,-0.309339 -0.417986,-0.208857 -0.712449,-0.3129 -0.881258,-0.3129 h -0.253123 v 6.400812 c 0,0.332447 0.267455,0.600038 0.599993,0.600038 h 5.800796 c 0,0 -2.3e-5,-0.167811 0,-0.253304 0,-0.170079 -0.104315,-0.463068 -0.312899,-0.881235 -0.291788,-0.584844 -0.31299,-0.661946 -0.309362,-1.127214 0.0068,-0.772316 0.306981,-1.413309 0.959765,-1.692193 0.67798,-0.289678 1.399499,-0.363106 2.123445,0 0.63453,0.318183 0.952713,0.919877 0.959766,1.692193 0.0046,0.465268 -0.01814,0.54237 -0.309385,1.127214 -0.20863,0.418167 -0.312899,0.712517 -0.312899,0.881235 0,0.08391 0,0.253304 0,0.253304 h 5.800796 c 0.332538,0 0.599992,-0.267591 0.599992,-0.600038 v -6.400812 h -0.253122 c -0.168718,0 -0.463272,0.104089 -0.881258,0.3129 -0.584889,0.291946 -0.661991,0.313081 -1.127327,0.309339 -0.772339,-0.0091 -1.373964,-0.32519 -1.692193,-0.959743 -0.363039,-0.723969 -0.289678,-1.445465 0,-2.123401 0.278884,-0.652808 0.919854,-0.953757 1.692193,-0.959766 0.465336,-0.0046 0.542438,0.01814 1.127327,0.309362 0.417986,0.20863 0.712427,0.312899 0.881258,0.312899 h 0.253122 v -5.200804 c 0,-0.332515 -0.267454,-0.599992 -0.599992,-0.599992 h -5.601578 v -0.289451 c 0,-0.192983 0.119056,-0.528945 0.357438,-1.006685 0.333627,-0.668387 0.359297,-0.757191 0.355079,-1.289038 -0.0068,-0.882664 -0.371701,-1.571097 -1.096872,-1.934748 -0.413699,-0.207497 -0.827308,-0.289383 -1.234001,-0.278884 z" /></svg>		</div>		<div  data-name="apps">			<svg><path d="m 15.6,27.6 h 4.8 v 4.8 h -4.8 z m 6,0 h 4.8 v 4.8 h -4.8 z m 6,0 h 4.8 v 4.8 h -4.8 z m -12,-6 h 4.8 v 4.8 h -4.8 z m 6,0 h 4.8 v 4.8 h -4.8 z m 6,0 h 4.8 v 4.8 h -4.8 z m 0,-6 h 4.8 v 4.8 h -4.8 z m -6,0 h 4.8 v 4.8 h -4.8 z m -6,0 h 4.8 v 4.8 h -4.8 z" /></svg>		</div>		<div data-name="games">			<svg><path d="m 18.350431,13.796495 c -2.458908,0 -5.429093,1.318904 -6.950391,4.800008 -1.5213202,3.481401 -3.226144,13.080802 1.274999,13.649772 4.50117,0.569197 5.655504,-5.427258 9.524978,-5.849734 h 3.599999 c 3.869495,0.422476 5.023854,6.418931 9.524999,5.849734 4.501145,-0.56897 2.796299,-10.168371 1.275001,-13.649772 -1.52132,-3.481104 -4.491485,-4.800008 -6.950393,-4.800008 -2.967239,0 -3.849607,1.800113 -5.049592,1.800113 h -1.200008 c -1.200006,0 -2.082376,-1.800113 -5.049592,-1.800113 z m 11.349581,3.376176 c 0.618678,0 1.125059,0.506382 1.125014,1.124947 -1.14e-4,0.618633 -0.506427,1.125014 -1.125014,1.125014 -0.618565,0 -1.124878,-0.506381 -1.124992,-1.125014 -4.5e-5,-0.618565 0.506313,-1.124947 1.124992,-1.124947 z m -11.39997,0.224504 c 0.498603,0 0.900014,0.401318 0.900014,0.899989 v 1.499868 h 1.499956 c 0.498603,0 0.900011,0.401386 0.900011,0.900057 0,0.498671 -0.401408,0.900056 -0.900011,0.900056 h -1.499956 v 1.500097 c 0,0.498444 -0.401411,0.89983 -0.900014,0.89983 -0.498603,0 -0.899986,-0.401386 -0.899986,-0.89983 v -1.500097 h -1.500007 c -0.4986,0 -0.900009,-0.401385 -0.900009,-0.900056 0,-0.498671 0.401409,-0.900057 0.900009,-0.900057 h 1.500007 v -1.499868 c 0,-0.498671 0.401383,-0.899989 0.899986,-0.899989 z m 8.999977,2.17626 c 0.618679,0 1.12506,0.506154 1.124992,1.124788 6.8e-5,0.618633 -0.506313,1.125014 -1.124992,1.125014 -0.618701,0 -1.125036,-0.506381 -1.124991,-1.125014 -4.5e-5,-0.618634 0.50629,-1.124788 1.124991,-1.124788 z m 4.801165,0 c 0.618678,0 1.125059,0.506154 1.125014,1.124788 4.5e-5,0.618633 -0.506336,1.125014 -1.125014,1.125014 -0.618702,0 -1.125037,-0.506381 -1.124992,-1.125014 -4.5e-5,-0.618634 0.50629,-1.124788 1.124992,-1.124788 z m -2.401172,2.401059 c 0.618587,0 1.1249,0.50638 1.125014,1.125016 4.5e-5,0.618633 -0.506336,1.125014 -1.125014,1.125014 -0.618679,0 -1.125037,-0.506381 -1.124992,-1.125014 1.14e-4,-0.618636 0.506427,-1.125016 1.124992,-1.125016 z" /></svg>		</div>		<div data-name="news">			<svg><path d="m 15.6,19.2 v 3.6 a 9.6,9.6 0 0 1 9.6,9.6 h 3.6 A 13.2,13.2 0 0 0 15.6,19.2 Z m 5.7,10.35 A 2.85,2.85 0 0 1 18.45,32.4 2.85,2.85 0 0 1 15.6,29.55 2.85,2.85 0 0 1 18.45,26.7 2.85,2.85 0 0 1 21.3,29.55 Z M 15.6,12.6 v 3.6 a 16.2,16.2 0 0 1 16.2,16.2 h 3.6 A 19.8,19.8 0 0 0 15.6,12.6 Z" /></svg>		</div>	</div>	<div id="tooltip"></div></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initDashUI(window) {if(window.DashUI) return window.DashUI;initCustomElement(window);initMenu(window);with(window) {class DashUI extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._layoutEl = shadowRoot.getElementById("layout");
		this._timeEl = shadowRoot.getElementById("time");
		this._dateEl = shadowRoot.getElementById("date");
		this._buttonsEl = shadowRoot.getElementById("buttons");
		this._tooltipEl = shadowRoot.getElementById("tooltip");
		this._updateButtons = this._updateButtons.bind(this);
		this._updateClock = this._updateClock.bind(this);
		shadowRoot.addEventListener("mouseover", this._onMouseover.bind(this));
		shadowRoot.addEventListener("mouseout", this._onMouseout.bind(this));
		shadowRoot.addEventListener("click", this._onClick.bind(this));
		this.initMenu("contextmenu", shadowRoot.getElementById('menu'), shadowRoot);
		shadowRoot.addEventListener("action", this._onAction.bind(this), true);
		this._updateClock();
		this._updateButtons();
		this._updateTooltip();
	}
	_updateClock() {
		const oldClock = this._layoutEl.querySelector("#clock");
		if(oldClock)
			oldClock.remove();
		let newClock;
		switch(settings.get("dash-clock")) {
			case "AC-1":
				initClockAnalog1(window);
				newClock = document.createElement("a-clock-analog-1");
			break;
			case "AC-1S":
				initClockAnalog1(window);
				newClock = document.createElement("a-clock-analog-1");
				newClock.dataset.showSeconds = true;
			break;
			case "AC-2":
				initClockAnalog2(window);
				newClock = document.createElement("a-clock-analog-2");
			break;
			case "AC-2S":
				initClockAnalog2(window);
				newClock = document.createElement("a-clock-analog-2");
				newClock.dataset.showSeconds = true;
			break;
			case "AC-3":
				initClockAnalog3(window);
				newClock = document.createElement("a-clock-analog-3");
			break;
			case "AC-3S":
				initClockAnalog3(window);
				newClock = document.createElement("a-clock-analog-3");
				newClock.dataset.showSeconds = true;
			break;
			case "DC-1":
				initClockDigital(window);
				newClock = document.createElement("a-clock-digital");
			break;
			case "DC-1M":
			default:
				initClockDigital(window);
				newClock = document.createElement("a-clock-digital");
				newClock.dataset.h24 = true;
			break;
		}
		newClock.id = "clock";
		this._layoutEl.insertBefore(newClock, this._layoutEl.firstChild);
		this._clockEl = newClock;
	}
	_updateButtons() {
		const buttonsEnabled = api.settings.get("dash-buttons") || [];
		const buttons = this._buttonsEl.children;
		for(let button of buttons) {
			if(buttonsEnabled.includes(button.dataset.name)) {
				button.style.display = null;
				if(button.dataset.name == "news") {
					const unreadItems = api.feedSubscriptionsStats.getUnreadItems();
					if(unreadItems)
						button.dataset.badge = unreadItems;
				}
			}
			else
				button.style.display = "none";
		}
	}
	_updateTooltip(key) {
		var text;
		switch(key) {
			case "bookmarks":
				text = chrome.i18n.getMessage("bookmark_manager");
			break;
			default:
				text = key ? chrome.i18n.getMessage(key) : chrome.i18n.getMessage("click_to_open_x", chrome.i18n.getMessage("favorites"));
			break;
		}
		this._tooltipEl.textContent = text;
	}
	_onMouseover(event) {
		this._updateTooltip(event.target.dataset.name);
	}
	_onMouseout(event) {
		this._updateTooltip(event.target.dataset.name);
	}
	_onClick(event) {
		switch(event.target.dataset.name) {
			case "bookmarks":
				api.browser.openInCurrentTab("chrome://bookmarks");
			break;
			case "history":
				api.browser.openInCurrentTab("chrome://history");
			break;
			case "downloads":
				api.browser.openInCurrentTab("chrome://downloads");
			break;
			case "settings":
				api.browser.openInCurrentTab("chrome://settings");
			break;
			case "extensions":
				api.browser.openInCurrentTab("chrome://extensions");
			break;
			case "apps":
				api.browser.openInCurrentTab("chrome://apps");
			break;
			case "games":
				api.browser.openInCurrentTab("chrome://newtab/#games");
			break;
			case "news":
				api.browser.openInCurrentTab("chrome://newtab/#news");
			break;
			default:
				location.hash = "#bookmarks";
			break;
		}
	}
	_onAction(event) {
		event.preventDefault();
		var context = event.detail.context;
		switch(event.detail.name) {
			case "search":
				location.hash = "#search";
			break;
			case "news":
				location.hash = "#news";
			break;
			case "back":
				history.back();
			break;
			case "forward":
				history.forward();
			break;
			case "settings":
				api.settingsWindow.show("dash");
			break;
			case "help":
				api.helpDoc.show(window);
			break;
			case "support":
				api.helpDoc.show(window, "support");
			break;
			case "about":
				api.helpDoc.show(window, "about");
			break;
			default:
				console.log(event.detail.name, event);
			break;
		}
	}
	bind() {
		super.bind();
		addEventListener("settings/dash-buttons", this._updateButtons);
		addEventListener("feedSubscriptionsStats/change", this._updateButtons);
		addEventListener("settings/dash-clock", this._updateClock);
		history.replaceState(history.state, null, "#dash");
	}
	unbind() {
		super.unbind();
		removeEventListener("settings/dash-buttons", this._updateButtons);
		removeEventListener("feedSubscriptionsStats/change", this._updateButtons);
		removeEventListener("settings/dash-clock", this._updateClock);
	}
}
defineCustomElement("a-dash-ui", DashUI, t);return window.DashUI=DashUI;}}}
{function initDataBindingLocationHash(window) {if(window.DataBindingLocationHash) return window.DataBindingLocationHash;initDataBinding(window);with(window) {class DataBindingLocationHash extends DataBinding {
	handleEvent(event) {
		switch(event.type) {
			case "change":
				this.updateModel();
			break;
			case "hashchange":
				this.updateElement();
			break;
		}
	}
	updateElement() {
		this.element.value = location.hash.substr(1);
	}
	updateModel() {
		location.hash = "#"+this.element.value;
	}
	bind() {
		addEventListener("hashchange", this);
		this.element.addEventListener("change", this);
		this.updateElement();
	}
	unbind() {
		removeEventListener("hashchange", this);
		this.element.removeEventListener("change", this);
	}
}
defineDataBinding("location-hash", DataBindingLocationHash);
return window.DataBindingLocationHash=DataBindingLocationHash;}}}
{function initDataBindingSettingFile(window) {if(window.DataBindingSettingFile) return window.DataBindingSettingFile;initDataBindingSetting(window);with(window) {const CACHE_URL = 'https://cache.web-accessories.com';
class DataBindingSettingFile extends DataBindingSetting {
	updateElement() {
		const fileProps = api.settings.get(this.element.bindingKey);
		if(fileProps)
			this.element.value = fileProps.name;
	}
	updateModel() {
		const file = this.element.file;
		if(!file)
			return;
		const cacheName = this.element.dataset.bindingCache || 'file';
		const cacheURL = CACHE_URL + '/' + cacheName + '/settings://' + this.element.bindingKey
		caches
			.open(cacheName)
			.then(cache=>{
				return cache.put(
					cacheURL,
					new Response(
						file,
						{
							headers : new Headers({
								'Content-Type':'image/*',
								'Content-Length': file.size
							})
						}
					)
				)
			})
			.then(()=>
				api.settings.set(
					this.element.bindingKey,
					{
						name : file.name,
						size : file.size,
						lastModified : file.lastModified,
						url : cacheURL
					}
				)
			)
			.catch(console.log)
	}
}
defineDataBinding("setting-file", DataBindingSettingFile);
return window.DataBindingSettingFile=DataBindingSettingFile;}}}
{function initDataBindingSettingJson(window) {if(window.DataBindingSettingJson) return window.DataBindingSettingJson;initDataBindingSetting(window);with(window) {class DataBindingSettingJson extends DataBindingSetting {
	parseInput(data) {
		return JSON.parse(data);
	}
	stringifyInput(data) {
		return JSON.stringify(data);
	}
}
defineDataBinding("setting-json", DataBindingSettingJson);
return window.DataBindingSettingJson=DataBindingSettingJson;}}}
{function initDataBindingSetting(window) {if(window.DataBindingSetting) return window.DataBindingSetting;initDataBinding(window);with(window) {class DataBindingSetting extends DataBinding {
	handleEvent(event) {
		switch(event.type) {
			case "change":
				this.updateModel();
			break;
			default:
				this.updateElement();
			break;
		}
	}
	parseInput(data) {
		return data;
	}
	stringifyInput(data) {
		return data;
	}
	updateElement() {
		this.element.value = this.stringifyInput(api.settings.get(this.element.bindingKey));
	}
	updateModel() {
		api.settings.set(this.element.bindingKey, this.parseInput(this.element.value), err=>{
			if(err)
				alert(err);
		});
	}
	bind() {
		addEventListener("settings/" + this.element.bindingKey, this);
		this.element.addEventListener("change", this);
		this.updateElement()
	}
	unbind() {
		removeEventListener("settings/" + this.element.bindingKey, this);
		this.element.removeEventListener("change", this);
	}
}
defineDataBinding("setting", DataBindingSetting);
return window.DataBindingSetting=DataBindingSetting;}}}
{function initDataBinding(window) {if(window.DataBinding) return window.DataBinding;with(window) {class DataBinding {
	constructor(element) {
		this.element = element;
		this.init();
	}
	static Get(name) {
		return DataBinding._classes[name];
	}
	init() {}
	bind() {}
	unbind() {}
}
DataBinding._classes = {};
window.defineDataBinding = function(name, c) {
	DataBinding._classes[name] = c;
}
return window.DataBinding=DataBinding;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:block}::slotted(*:not(.-selected)){display:none !important}</style><slot></slot>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initDeck(window) {if(window.Deck) return window.Deck;initCustomElement(window);with(window) {class Deck extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		if(this.dataset.value)
			this.value = this.dataset.value;
	}
	set value(value) {
		for(let child of this.children) {
			if(child.dataset.option == value) {
				child.classList.add("-selected");
			}
			else {
				child.classList.remove("-selected");
			}
		}
	}
	get value() {
		for(let child of this.children) {
			if(child.classList.contains("-selected"))
				return child.dataset.option;
		}
	}
}
defineCustomElement("a-deck", Deck, t);return window.Deck=Deck;}}}
{const t = document.createElement("template");t.innerHTML = `<style></style><a-topbar>	<h1 slot="left"></h1>	<a-button slot="right" data-icon="close" data-action="cancel"></a-button></a-topbar>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initDialogSelectorUI(window) {if(window.DialogSelectorUI) return window.DialogSelectorUI;initDialogUI(window);initTopbar(window);initButton(window);with(window) {class DialogSelectorUI extends DialogUI {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._selector = shadowRoot.querySelector("a-selector");
		this._selector.addEventListener("change", ()=>{
			this.dispatchEvent(new Event('change', { bubbles : true }));
		})
		this.titleEL = shadowRoot.querySelector("h1");
	}
	getValues() {
		return {
			selected : this._selector.value
		}
	}
	setValues(values) {
		this.titleEL.textContent = values.title;
		this._selector.value = values.selected;
	}
}
defineCustomElement("a-dialog-selector-ui", DialogSelectorUI, t);return window.DialogSelectorUI=DialogSelectorUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:inline-block}</style><a-button></a-button>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initDialogSelector(window) {if(window.DialogSelector) return window.DialogSelector;initCustomElement(window);initButton(window);with(window) {class DialogSelector extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._button = shadowRoot.querySelector("a-button");
		this.addEventListener("click", this, true);
		if(this.dataset.value)
			this.value = this.dataset.value;
	}
	get value() {
		return this._value;
	}
	set value(value) {
		this._value = value;
		this._button.textContent = value;
	}
	handleEvent(event) {
		switch(event.type) {
			case "click":
			{
				event.stopPropagation();
				const dialogUI = this.firstElementChild.cloneNode();
				dialogUI.addEventListener("change", this);
				dialogUI.show({
					title :  this.title || chrome.i18n.getMessage("select"),
					selected : this._value
				});
			}
			break;
			case "change":
			{
				const values = event.target.getValues();
				if(this._value != values.selected) {
					this.value = values.selected;
					this.dispatchEvent(new Event('change', { bubbles : true}));
				}
			}
			break;
		}
	}
}
defineCustomElement("a-dialog-selector", DialogSelector, t);return window.DialogSelector=DialogSelector;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{font-family:'Roboto';display:flex;flex-direction:column;min-height:200px;max-height:100vh;min-width:340px;max-width:100vw;color:#333}.content,.form,.text{flex:1;overflow:auto}.form h1,.form h2{font-size:12px;font-weight:normal;margin:0 0 8px 0}.form h1:not(:first-child),.form h2:not(:first-child){margin-top:2em}.form,.text{padding:30px 30px 10px 30px}.form:last-child,.text:last-child{padding-bottom:30px}.buttons{align-items:flex-start;flex-shrink:0;display:flex;flex-direction:row;padding:30px 25px 30px 25px}.buttons>*{margin-left:5px;margin-right:5px;width:100%}</style>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initDialogUI(window) {if(window.DialogUI) return window.DialogUI;initCustomElement(window);with(window) {class DialogUI extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		shadowRoot.addEventListener("keydown", event=>{
			if(event.keyCode == 13) {
				this.ok();
			}
		})
	}
	setValues(values) {}
	getValues() {return {}}
	closeCallback(isCancel) {}
	get dialog() {
		var dialog = this.parentNode;
		return (dialog instanceof HTMLDialogElement) ? dialog : null;
	}
	ok() {
		this.dialog.close();
	}
	cancel() {
		this.dialog.dispatchEvent(new Event('cancel'));
		this.dialog.close();
	}
	show(values, callback, cancelCallback) {
		window.showDialog(this, values, callback, cancelCallback);
	}
}
DialogUI.CancelAll = function() {
	document.querySelectorAll("dialog").forEach(dialog=>dialog.dispatchEvent(new Event('cancel')))
}
window.showDialog = function(dialogUI, values, callback, cancelCallback) {
	let dialog = document.createElement("dialog");
	dialog.addEventListener("click", event=>{
		if(event.target == dialog) {
			var rect = dialog.getBoundingClientRect(), x=event.clientX, y=event.clientY;
			if((x<rect.left) || (y<rect.top) || (x>rect.right) || (y>rect.bottom)) {
				dialog.dispatchEvent(new Event('cancel'));
				dialog.close();
			}
		}
	});
	let ui;
	if(typeof dialogUI == "string") {
		ui = document.createElement(dialogUI);
	}
	else if(dialogUI instanceof HTMLElement) {
		ui = dialogUI;
	}
	else {
		ui = new (dialogUI)();
	}
	dialog.appendChild(ui);
	document.body.appendChild(dialog);
	Promise.all([
			document.fonts.load('normal 1em Roboto'),
			document.fonts.load('500 1em Roboto'),
		])
		.then(()=>ui.setValues(values))
		.then(()=>{
			var finalize = () => {
				dialog.remove();
				dialog.removeEventListener("close", onclose);
				dialog.removeEventListener("cancel", oncancel);
				document.body.style.overflow = null;
			}
			var onclose = ()=>{
				ui.closeCallback();
				finalize();
				if(callback)
					callback(ui.getValues());
			}
			var oncancel = ()=>{
				ui.closeCallback(true);
				finalize();
				if(cancelCallback)
					cancelCallback();
			}
			dialog.addEventListener("close", onclose);
			dialog.addEventListener("cancel", oncancel);
			document.body.style.overflow = "hidden";
			dialog.showModal();
			ui.focus();
		})
	return ui;
}
defineCustomElement("a-dialog-ui", DialogUI, t);return window.DialogUI=DialogUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{font-family:"Roboto";display:block;width:100%;height:100%;direction:ltr;color:#333;background-color:#F8F9FA}:host *{filter:opacity(0%)}:host(.ready) *{filter:opacity(100%)}:host-context(.visible):host *{transition:filter 100ms 0ms linear}a-topbar{height:56px}a-topbar h1{width:280px;font-weight:normal}a-topbar-search-field{width:100%;max-width:680px}#content{position:absolute;top:56px;bottom:0;left:0;right:0}#menu,#doc{position:absolute;top:0;bottom:0;overflow-y:auto;min-height:100%}#menu{left:0;width:300px}#menu>*{min-width:100%;float:left;clear:left}#menu>:hover{color:black}#menu>.-selected{color:#3367D6}#menu .rank-1{font-size:14px;line-height:2em;font-weight:500;margin-top:25px;padding:8px 20px 2px 20px}#menu .rank-1:not(:first-child){border-top:1px solid #EDEEEF}#menu .rank-2{font-size:12px;line-height:1em;padding:7px 20px 7px 20px}#doc{left:295px;top:0;right:0;overflow-y:scroll;padding:0 0 0 5px}section{background-color:white;padding:40px 40px 40px 40px;box-shadow:0 1px 1px 1px rgba(0,0,0,0.1);border-radius:3px;margin:20px 0 20px 0;min-height:100%;width:100%;max-width:680px}section h1{font-size:36px;font-weight:300;margin:0 0 10px 0;padding-top:20px}section h2{font-size:inherit;margin:30px 0 10px 0}section h1+h2{margin-top:20px}section h3{font-style:italic;font-weight:normal;font-size:1em;margin:1em 0}section a{color:#3367D6;text-decoration:none}section a:hover{text-decoration:underline}section a.youtube,section a.with-icon{display:block;border:1px solid #d3dbe0;color:black;border-radius:3px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}section a.youtube:hover,section a.with-icon:hover{background-color:#ECF1FB;border:1px solid #89A7E7;color:#3367D6;text-decoration:none}section a.youtube{position:relative;width:300px;width:100%;height:40px;padding:0 60px 0 20px;line-height:40px;margin:0 0 5px 0;font-size:13px}section a.youtube:after{position:absolute;content:attr(data-length);right:20px;color:#a3b1be;font-size:12px}section a.with-icon{display:block;width:100%;height:68px;margin:0 0 10px 0;background-repeat:no-repeat;background-size:48px 48px;background-position:10px 10px;padding-left:78px;line-height:68px;font-size:14px;background-color:#f8f9fa}</style><!--require:<a-bookmark-icon>--><a-topbar>	<h1 slot="left">Favorites – Help</h1>	<a-topbar-search-field slot="center" data-placeholder="i18n:search_"></a-topbar-search-field></a-topbar><div id="content" tabindex="-1">	<a-selector id="menu">		<div data-option="ficki">Ficki</div>	</a-selector>	<div id="doc">		<section>		<h1>Headline</h1>		here is the the doc????		</section>		<section>		<h1>Headline</h1>		here is the the doc????		</section>	</div></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initDocViewerUI(window) {if(window.DocViewerUI) return window.DocViewerUI;initCustomElement(window);initYoutubePlayerUI(window);initBookmarkIcon(window);initTopbar(window);initTopbarSearchField(window);initSelector(window);with(window) {class DocViewerUI extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._titleEl = shadowRoot.querySelector("a-topbar h1");
		this._menuEl = shadowRoot.getElementById("menu");
		this._docEl = shadowRoot.getElementById("doc");
		this._searchField = shadowRoot.querySelector("a-topbar-search-field");
		if(this.dataset.src)
			this.src = this.dataset.src;
		this.onHashChange = this.onHashChange.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this._searchField.addEventListener("change", this.onSearch);
		this._searchField.addEventListener("input", this.onSearch);
		this._menuEl.addEventListener("change", this.onMenuEntrySelected.bind(this));
		this._docEl.addEventListener("click", this.onDocClick.bind(this));
		this._intersectionObserver = new IntersectionObserver( this.onIntersection.bind(this), { root : this._docEl, threshold : 1 } );
	}
	loadDocument(url) {
		return fetch(url)
			.then(response => response.text()
				.then(text => {
					const parser = new DOMParser();
					const doc = parser.parseFromString(text, "text/html");
					if(!doc.querySelector("base")) {
						const base = doc.createElement("base");
						base.setAttribute("href", url);
						doc.head.insertBefore(base, doc.head.firstChild);
					}
					return doc;
				})
			)
	}
	load() {
		const uiLang = chrome.i18n.getUILanguage();
		const pathUILang = this.src + "/" + uiLang + ".html";
		const pathDefaultLang = this.src + "/en.html";
		return this.loadDocument(pathUILang)
			.catch(()=>this.loadDocument(pathDefaultLang))
			.then(doc=>{
				this._titleEl.textContent = doc.title;
				this._menuEl.innerHTML = "";
				doc
					.querySelectorAll("h1,h2")
					.forEach((headlineEl, i) => {
						var menuEntry = document.createElement("div");
						menuEntry.className = "rank-" + headlineEl.tagName.substr(1);
						var id = headlineEl.id || (headlineEl.id = "item-" + i);
						menuEntry.dataset.option = id;
						menuEntry.textContent = headlineEl.textContent;
						this._menuEl.appendChild(menuEntry);
					});
				this._docEl.innerHTML = doc.body.innerHTML;
				this._docEl.querySelectorAll("h1,h2").forEach(hEl=>this._intersectionObserver.observe(hEl))
				this.onHashChange();
			})
			.catch(console.log)
	}
	onDocClick(event) {
		if(
			(event.target instanceof HTMLAnchorElement) &&
			event.target.classList.contains("youtube") &&
			!event.shiftKey && !event.metaKey && !event.ctrlKey
		)
		{
			event.preventDefault();
			showDialog(YoutubePlayerUI, { src: event.target.href, title : event.target.textContent, autoplay : true })
		}
	}
	onSearch() {
		const marked = Array.from(this._docEl.querySelectorAll("mark"));
		marked.forEach(m => m.replaceWith(m.textContent))
		const searchValue = this._searchField.value.toLowerCase();
		if(searchValue.length >= 2) {
			const nodeIterator = document.createNodeIterator(
				this._docEl,
				NodeFilter.SHOW_TEXT,
				node=>node.textContent.toLowerCase().indexOf(searchValue)>=0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
			);
			let nodes = [];
			let node;
			while(node = nodeIterator.nextNode()) nodes.push(node);
			for(let t of nodes) {
				const m = document.createElement("mark");
				m.textContent = t.textContent;
				t.replaceWith(m);
			}
		}
		const firstMarked = this._docEl.querySelector("mark");
		if(firstMarked)
			firstMarked.scrollIntoView();
		else
			this._docEl.scrollTop = 0;
	}
	onIntersection(entries) {
		entries.forEach(entry=>{
			if(entry.intersectionRatio >= 1)
				entry.target.classList.add("-visible");
			else
				entry.target.classList.remove("-visible");
		})
		const topmost = this._docEl.querySelector(".-visible");
		if(topmost) {
			for(const menuEntryEl of this._menuEl.children) {
				if(menuEntryEl.dataset.option == topmost.id) {
					menuEntryEl.classList.add("-selected");
					history.replaceState(history.state, null, "#help?" + topmost.id);
				}
				else
					menuEntryEl.classList.remove("-selected");
			}
		}
	}
	onHashChange(event) {
		let t = location.hash.split("?");
		t = t[1] || '';
		t = t.split('&');
		const v = t[0];
		try {
			this._menuEl.value = v;
			const hEL = this._docEl.querySelector("#" + v);
			if(hEL) {
				hEL.scrollIntoView();
				this._docEl.scrollTop-=30;
			}
		}
		catch(e) {
			this._docEl.scrollTop = 0;
		}
	}
	onMenuEntrySelected(event) {
		location.hash = "help?"+this._menuEl.value;
	}
	bind() {
		super.bind();
		addEventListener("hashchange#help", this.onHashChange);
		return Promise.all([
			document.fonts.load('300 1em Roboto'),
			document.fonts.load('normal 1em Roboto'),
			document.fonts.load('bold 1em Roboto'),
			this.load()
		])
		.then(()=>{
			this.classList.add("ready");
		});
	}
	unbind() {
		super.unbind();
		removeEventListener("hashchange#help", this.onHashChange);
	}
}
defineCustomElement("a-doc-viewer-ui", DocViewerUI, t);return window.DocViewerUI=DocViewerUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{width:400px;height:320px;max-height:75vh;max-width:75vh}:host(.loading){background-image:url(/ui/feed-dialog-ui/feed-dialog-ui-preloader.svg);background-position:center;background-repeat:no-repeat}:host(.loading) #status{display:none}:host([data-status=available]) #status-icon{background-color:#3367D6}:host([data-status=subscribed]) #status-icon{background-color:#43a047}#status{width:100%;height:100%;overflow-y:auto;transition:opacity .3s;position:relative;overflow:hidden}#status-message{position:absolute;top:50%;color:#333;font-size:12px;text-align:center;width:100%;margin-top:42px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding:0 30px}#status-icon{width:100%;height:100%;-webkit-mask-image:url(/ui/feed-dialog-ui/feed-dialog-ui-error.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-position:center;background-color:#C0C0C0}.buttons{z-index:1}</style><a-menu id="menu">	<a-menuitem data-i18n="reload" data-action="reload"></a-menuitem>	<a-menuitem data-i18n="settings" data-action="openSettings"></a-menuitem></a-menu><a-topbar>	<a-button slot="left" data-icon="contextmenu" data-menu="menu"></a-button>	<h1 slot="center"></h1>	<a-button slot="right" title="i18n:close" data-icon="close" data-action="cancel"></a-button></a-topbar><div id="status" class="content">	<div id="status-icon"></div>	<div id="status-message"></div></div><div class="buttons">	<a-button data-i18n="subscribe" data-action="subscribe" tabindex="4"></a-button>	<a-button data-i18n="unsubscribe" data-action="unsubscribe" tabindex="4"></a-button>	<a-button data-i18n="open" data-action="open" tabindex="3"></a-button></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initFeedDialogUI(window) {if(window.FeedDialogUI) return window.FeedDialogUI;initDialogUI(window);initAlertDialogUI(window);initMenu(window);initTopbar(window);initButton(window);with(window) {const MAX_TEXT_LENGTH = 150;
const PRELOAD_IMAGES_TIMEOUT = 3000;
class FeedDialogUI extends DialogUI {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._messageEl = shadowRoot.getElementById("status-message");
		this._title = shadowRoot.querySelector("h1");
		this._buttonSubscribe = shadowRoot.querySelector("a-button[data-action=subscribe]");
		this._buttonUnsubscribe = shadowRoot.querySelector("a-button[data-action=unsubscribe]");
		this._buttonOpen = shadowRoot.querySelector("a-button[data-action=open]");
		this._feedURL = null;
	}
	loadFeedURL() {
		this.classList.add("loading");
		this.update();
		api.feeds.getFeedURL(this._url)
			.then(feedURL => { this._feedURL = feedURL; })
			.catch(()=> { this._feedURL = null; })
			.then(()=> {
				this.classList.remove("loading");
				this.update();
			})
	}
	update() {
		if(this._feedURL) {
			if(api.feedSubscriptions.exists(this._url)) {
				this.dataset.status = "subscribed";
				this._buttonSubscribe.style.display = "none";
				this._buttonUnsubscribe.style.display = null;
				this._buttonOpen.style.display = null;
			}
			else {
				this.dataset.status = "available";
				this._buttonSubscribe.style.display = null;
				this._buttonUnsubscribe.style.display = "none";
				this._buttonOpen.style.display = "none";
			}
			this._messageEl.textContent = this._feedURL;
		}
		else {
			delete this.dataset.status;
			this._buttonSubscribe.style.display = "none";
			this._buttonUnsubscribe.style.display = "none";
			this._buttonOpen.style.display = "none";
			this._messageEl.textContent = chrome.i18n.getMessage("not_found");
		}
		if(!this._id) {
			this._buttonOpen.disabled = true;
		}
	}
	openSettings() {
		api.settingsWindow.show("news");
	}
	reload() {
		api.feeds.clearCache([this._url]).then(()=>this.loadFeedURL()).catch(console.log);
	}
	subscribe() {
		new Promise((resolve, reject)=>chrome.permissions.request({ origins: [this._feedURL] }, granted=> ( granted ? resolve() : reject() )))
			.then(()=>api.feedSubscriptions.add(this._url, 0))
			.catch(error=>{
				showAlert(chrome.i18n.getMessage("error"), error)
			})
	}
	unsubscribe() {
		Promise.resolve()
			.then(()=>api.feedSubscriptions.remove(this._url))
			.catch(error=>{
				showAlert(chrome.i18n.getMessage("error"), error)
			})
	}
	open() {
		this.dialog.close();
		setTimeout(()=>{
			location.hash = "#news?"+this._id;
		}, 200)
	}
	handleEvent(event) {
		switch(event.type) {
			case "settings/feed-subscriptions":
				this.update();
			break;
			case "feeds/invalidate":
				this.loadFeedURL();
			break;
		}
	}
	bind() {
		addEventListener("settings/feed-subscriptions", this);
		addEventListener("feeds/invalidate", this);
	}
	unbind() {
		removeEventListener("settings/feed-subscriptions", this);
		removeEventListener("feeds/invalidate", this);
	}
	setValues(values) {
		this._id =  values.id;
		this._url = values.url;
		this._title.textContent = api.stringUtil.truncate(values.title ? values.title : api.uri.getHostname(this._url), 50);
		this._title.title = this._url;
		this.loadFeedURL();
	}
}
defineCustomElement("a-feed-dialog-ui", FeedDialogUI, t);return window.FeedDialogUI=FeedDialogUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>.content{background-color:white;text-align:center;padding:40px 20px 0 20px}.content img{width:485px;height:230px}</style><div class="content">	<h1>		<span data-i18n="help"></span>: <span data-i18n="subscribe"></span>	</h1>	<img src="/ui/feed-subscription-tutorial-ui/feed-subscription-tutorial-ui-image.png">	<p>		(1) <span data-i18n="context_menu"></span> (<span data-i18n="bookmark"></span>) → '<span data-i18n="feed_"></span>'<br>		(2) '<span data-i18n="subscribe"></span>'	</p></div><div class="buttons">	<a-button data-i18n="got_it" data-action="ok"></a-button></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initFeedSubscriptionTutorialUI(window) {if(window.FeedSubscriptionTutorialUI) return window.FeedSubscriptionTutorialUI;initDialogUI(window);initButton(window);with(window) {class FeedSubscriptionTutorialUI extends DialogUI {
}
defineCustomElement("a-feed-subscription-tutorial-ui", FeedSubscriptionTutorialUI, t);return window.FeedSubscriptionTutorialUI=FeedSubscriptionTutorialUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{cursor:pointer;white-space:nowrap}span{vertical-align:top;display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:8px 20px;border:1px solid #e8e8e8;background-color:white;margin-left:3px;border-radius:3px;min-width:200px;font-weight:500;width:300px}*{vertical-align:top}:host(.no-label) span{display:none}a-button{min-width:100px}</style><a-button data-i18n="select"></a-button><span>---</span>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initFileSelector(window) {if(window.FileSelector) return window.FileSelector;initCustomElement(window);initButton(window);with(window) {
class FileSelector extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._label = shadowRoot.querySelector("span");
		this._button = shadowRoot.querySelector("a-button");
		this._button.addEventListener("click", this, true);
		if(this.dataset.value)
			this.value = this.dataset.value;
	}
	get value() {
		return this._value;
	}
	set value(value) {
		this._value = value;
		this._label.textContent = value || "---";
	}
	get file() {
		return this._file;
	}
	showDialog() {
		let input = this._input = document.createElement("input");
		input = document.createElement("input");
		input.type = "file";
		input.value = "";
		input.onchange = event => {
			if(input.files.length) {
				input.files[0];
				this._file = input.files[0];
				this.value = this._file.name;
				this.dispatchEvent(new Event('change', { bubbles : true}));
			}
		};
		input.click();
	}
	handleEvent(event) {
		event.stopPropagation();
		this.showDialog();
	}
}
defineCustomElement("a-file-selector", FileSelector, t);return window.FileSelector=FileSelector;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{background-color:#F1F3F4;color:#54575C;text-align:center;display:block;width:100%;height:100%;margin:0;padding:0;border:none;padding:80px 0 0 0}:host h1{font-weight:100;font-size:50px;margin:0 0 20px 0}:host img,:host a-button{display:block;margin:0 auto}:host img{margin-bottom:40px}:host a-button{width:200px;transform:scale(1.5)}</style><h1 data-i18n="context_menu"></h1><img src="/ui/firstrun-ui/firstrun-ui-context-menu.png" draggable="false"><a-button data-i18n="ok"></a-button>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initFirstrunUI(window) {if(window.FirstrunUI) return window.FirstrunUI;initCustomElement(window);initButton(window);with(window) {class FirstrunUI extends CustomElement {
	init(shadowRoot) {
		super.init();
		let button = shadowRoot.querySelector("a-button");
		button.addEventListener("click", ()=>{
			chrome.tabs.update(null, {url:"chrome://newtab"})
		});
		api.bookmarks.getChildren(api.settings.get("root-folder"), nodes=>{
			Promise.all( nodes.map( node => api.icons.getIconImageBitmap(node.url, node.id) ) )
			.then(()=>console.log("All icons cached!"));
		})
	}
}
defineCustomElement("a-firstrun-ui", FirstrunUI, t);return window.FirstrunUI=FirstrunUI;}}}
{function initGridview01Base(window) {if(window.Gridview01Base) return window.Gridview01Base;initCustomElement(window);with(window) {class Gridview01Base extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this.paddingH = this.dataset.paddingH ? parseInt(this.dataset.paddingH) : 20;
		this.paddingV = this.dataset.paddingV ? parseInt(this.dataset.paddingV) : 20;
		this.columnWidth = this.dataset.columnWidth ? parseInt(this.dataset.columnWidth) : 180;
		this.rowHeight = this.dataset.rowHeight ? parseInt(this.dataset.rowHeight) : 180;
		this.columnsMax = this.dataset.columnsMax ? parseInt(this.dataset.columnsMax) : 10;
		this.rowsMax = this.dataset.rowsMax ? parseInt(this.dataset.rowsMax) : undefined;
		this._container = shadowRoot.querySelector("#container");
		this.update = this.update.bind(this);
		this._onResize = this._onResize.bind(this);
		new MutationObserver(mutations=>{
			for(let mutation of mutations) {
				for(let removedChild of mutation.removedNodes) {
					removedChild.classList.remove("visible", "hidden");
				}
			}
			this.update();
		})
		.observe(this, { childList:true });
		if(this.children.length) // avoid relayouts
			this.update();
	}
	hideChildren(filter) {
		for(let child of this.children) {
			if(filter && filter(child)) {
				child.classList.add("hidden");
			}
			else
				child.classList.remove("hidden");
		}
	}
	showAllChildren() {
		this.hideChildren();
	}
	hasFocus() {
		return !!(this.matches(":focus") || this.querySelector(":focus"));
	}
	set error(value) {
		if(value)
			this.dataset.error = value;
		else
			delete this.dataset.error;
	}
	get error() {
		return this.dataset.error;
	}
	_onResize() {
		clearTimeout(this._resizeTimeout);
		this._resizeTimeout = setTimeout(this.update, 200);
	}
	bind() {
		super.bind();
		addEventListener("resize", this._onResize);
	}
	unbind() {
		super.unbind();
		removeEventListener("resize", this._onResize);
	}
}
return window.Gridview01Base=Gridview01Base;}}}
{function initGridview02Grid(window) {if(window.Gridview02Grid) return window.Gridview02Grid;initGridview01Base(window);with(window) {class Gridview02Grid extends Gridview01Base  {
	pointToGridCoords(pleft, ptop, round) {
		round = round || Math.round;
		var x = Math.max(0, Math.min(this.columns-1, round((pleft-this.left) / this.columnWidth)));
		var y = round((ptop-this.top) / this.rowHeight);
		return { x, y };
	}
	clientPointToIndex(x, y) {
		var r = this.getBoundingClientRect();
		x = x - r.left + this.scrollLeft;
		y = y - r.top + this.scrollTop;
		return this.pointToIndex(x, y);
	}
	pointToIndex(pleft, ptop) {
		var c = this.pointToGridCoords(pleft, ptop);
		return  c.y * this.columns + c.x;
	}
	rectToIndices(pleft, ptop, width, height) {
		var c1 = this.pointToGridCoords(pleft, ptop, Math.ceil);
		var c2 = this.pointToGridCoords(pleft + width, ptop + height, Math.floor);
		var result = [];
		for(var y=c1.y; y<=c2.y; y++) {
			for(var x=c1.x; x<=c2.x; x++) {
				result.push(y * this.columns + x);
			}
		}
		return result;
	}
	indexToGridCoords(index) {
		return {
			x : index % this.columns,
			y : Math.floor(index / this.columns)
		}
	}
	indexToPoint(index) {
		var pointToGridCoords = this.indexToGridCoords(index);
		return {
			x : this.left + pointToGridCoords.x * this.columnWidth,
			y : this.top + pointToGridCoords.y * this.rowHeight
		}
	}
	getChildAtGridIndex(index) {
		return this.querySelector("[data-grid-index='"+index+"']");
	}
	getDOMDragOverIndex(index) {
		let gi = 0;
		for(let i=0; i<this.children.length; i++) {
			let child = this.children[i];
			if(index == gi)
				return i;
			if(!child.classList.contains("hidden"))
				gi++;
		}
		return this.children.length;
	}
	update(dragOverIndex) {
		if(!this.children.length) {
			this._container.style.height = null;
			return;
		}
		let offsetWidth = this.offsetWidth;
		this.columnsMaxPossible =  Math.floor( (offsetWidth - 2 * this.paddingH) / this.columnWidth );
		this.columns = Math.min( this.columnsMaxPossible, this.columnsMax );
		this.left = Math.round((offsetWidth - ( this.columns * this.columnWidth ))/2 + this.columnWidth/2);
		this.top = Math.round(this.paddingV + this.rowHeight/2);
		this.width = this.columns * this.columnWidth
		let gi = 0;
		for(let child of this.children) {
			if(child.classList.contains("hidden")) {
				child.dataset.gridIndex = -1;
				continue;
			}
			if(gi === dragOverIndex)
				gi++;
			child.dataset.gridIndex = gi;
			var xi = gi % this.columns;
			var yi = Math.floor(gi / this.columns);
			if(!this.rowsMax || (yi<this.rowsMax)) {
				child.style.display = null;
				let x = this.left + xi*this.columnWidth;
				let y = this.top + yi*this.rowHeight;
				child.classList.add("visible");
				child.style.transform = "translate(-50%, -50%) translate("+x+"px,"+y+"px)";
			}
			else {
				child.style.display = "none";
			}
			gi++;
		}
		this._container.style.height = (2*this.paddingV + Math.ceil(this.children.length/this.columns)*this.rowHeight) + "px";
	}
}
return window.Gridview02Grid=Gridview02Grid;}}}
{function initGridview03Selection(window) {if(window.Gridview03Selection) return window.Gridview03Selection;initGridview02Grid(window);with(window) {class Gridview03Selection extends Gridview02Grid  {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._selectionOrigin = null
	}
	clearSelection() {
		this._selectionOrigin = null;
		for(let child of this.children)
			child.classList.remove("-selected")
		this.focus();
	}
	getSelectedChildren() {
		var items = [];
		for(let child of this.children) {
			if(child.classList.contains("-selected"))
				items.push(child);
		}
		return items;
	}
	setSelectionOrigin(index) {
		this._selectionOrigin = index;
	}
	getSelectionOrigin() {
		return this._selectionOrigin;
	}
	getSelectionEnd() {
		for(let i=0; i<this.children.length; i++) {
			var child = this.children[i];
			if(child.matches(":focus"))
				return i;
		}
		return -1;
	}
	beginSelection(index) {
		this._selectionOrigin = index;
		for(let i=0; i<this.children.length; i++) {
			let child = this.children[i];
			if(i == index) {
				child.classList.add("-selected")
				child.focus();
			}
			else
				child.classList.remove("-selected")
		}
	}
	expandSelection(toIndex) {
		if(this._selectionOrigin === null) {
			this.beginSelection(toIndex);
		}
		else {
			var i_0 = Math.min(this._selectionOrigin, toIndex);
			var i_n = Math.max(this._selectionOrigin, toIndex);
			for(let i=0; i<this.children.length; i++) {
				let child = this.children[i];
				if((i<i_0) || (i>i_n))
					 child.classList.remove("-selected")
				else {
					 child.classList.add("-selected")
				}
				 if(i==toIndex)
				 	child.focus();
			}
		}
	}
	toggleChildSelection(child) {
		if(child.parentNode == this)
			child.classList.toggle("-selected")
	}
	isChildSelected(child) {
		return (child.parentNode == this) && child.classList.contains("-selected");
	}
	select(fromIndex, toIndex) {
		this.beginSelection(fromIndex);
		this.expandSelection(toIndex);
	}
	selectAll() {
		if(this.children.length) {
			this._selectionOrigin = 0;
			for(let child of this.children)
				child.classList.add("-selected")
		}
		this.children[this.children.length-1].focus();
	}
	getSelectionSize() {
		return this.getSelectedChildren().length;
	}
	toggleSelectionRect(x1, y1, x2, y2) {
		const scrollLeft = this.scrollLeft;
		const scrollTop = this.scrollTop;
		const rect = this.getBoundingClientRect();
		const left = Math.min(x1, x2) - scrollLeft,
			top = Math.min(y1, y2) - scrollTop,
			right = Math.max(x1, x2) - scrollLeft,
			bottom = Math.max(y1, y2) - scrollTop
		;
		let iFirst = -1, iLast = -1;
 		for(let i=0; i<this.children.length; i++) {
			const child = this.children[i];
			const rc = child.getBoundingClientRect();
			const xc = rc.left + rc.width/2 - rect.left;
			const yc = rc.top + rc.height/2 - rect.top;
			if((left<xc) && (right>xc) && (top<yc) && (bottom>yc)) {
				child.classList.toggle("-selected")
				if(iFirst == -1)
					iFirst = i;
				iLast = i;
			}
		}
		if((iFirst >= 0) && (iLast >= 0)) {
			if(y1 <= y2) {
				this.setSelectionOrigin(iFirst);
				this.children[iLast].focus();
			}
			else {
				this.setSelectionOrigin(iLast);
				this.children[iFirst].focus();
			}
		}
	}
}
return window.Gridview03Selection=Gridview03Selection;}}}
{function initGridview04SelectionKeyboard(window) {if(window.Gridview04SelectionKeyboard) return window.Gridview04SelectionKeyboard;initGridview03Selection(window);with(window) {// TODO should children get focus in class Selection???
const IS_MAC = navigator.platform.toUpperCase().indexOf('MAC')>=0;
const KEY_TAB=9, KEY_LEFT=37, KEY_RIGHT=39, KEY_UP=38, KEY_DOWN=40, KEY_HOME=36, KEY_END=35, KEY_PAGE_UP=33, KEY_PAGE_DOWN=34, KEY_A=65, KEY_ESC=27;
const SELECTION_KEYS = [KEY_TAB, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN, KEY_HOME, KEY_END, KEY_PAGE_UP, KEY_PAGE_DOWN];
class Gridview04SelectionKeyboard extends Gridview03Selection {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._onKeyDown = this._onKeyDown.bind(this);
		this.addEventListener("keydown", this._onKeyDown);
	}
	_onKeyDown(event) {
		if((event.keyCode == KEY_LEFT) && event.altKey)
			return;
		if(SELECTION_KEYS.indexOf(event.keyCode) >= 0) {
			var n = this.children.length;
			if(!n)
				return;
			event.preventDefault();
			var index = this.getSelectionEnd();
			switch(event.keyCode) {
				case KEY_TAB:
					if(event.shiftKey)
						index--;
					else
						index++;
				break;
				case KEY_UP:
					index-=this.columns;
				break;
				case KEY_DOWN:
					index+=this.columns;
				break;
				case KEY_LEFT:
					if(event.ctrlKey || event.metaKey)
						index=0;
					else
						index--;
				break;
				case KEY_RIGHT:
					if(event.ctrlKey || event.metaKey)
						index=n-1;
					else
						index++;
				break;
				case KEY_HOME:
					index=0;
				break;
				case KEY_END:
					index=n-1;
				break;
				case KEY_PAGE_UP:
					index-=3*this.columns;
				break;
				case KEY_PAGE_DOWN:
					index+=3*this.columns;
				break;
			}
			index = Math.min(n-1, Math.max(0, index));
			if(
				(event.keyCode == KEY_TAB) ||
				((event.keyCode != KEY_TAB) && (!event.shiftKey))
			)
				this.beginSelection(index);
			else
				this.expandSelection(index);
		}
		else if(
			((IS_MAC && event.metaKey) || (!IS_MAC && event.ctrlKey))
			&&
			(event.keyCode == KEY_A)
		) {
			if(this.children.length) {
				this.selectAll();
			}
		}
		else if(
			(event.keyCode == KEY_ESC)
		) {
			if(this.children.length) {
				this.clearSelection();
			}
		}
	}
}
return window.Gridview04SelectionKeyboard=Gridview04SelectionKeyboard;}}}
{function initGridview05SelectionMouse(window) {if(window.Gridview05SelectionMouse) return window.Gridview05SelectionMouse;initGridview04SelectionKeyboard(window);with(window) {const SCROLL_V = 1;	// Pixel per ms
class Gridview05SelectionMouse extends Gridview04SelectionKeyboard {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._disableMouseSelection = false;
		this._rect = shadowRoot.getElementById("selection-rect");
		this._startX = 0;
		this._startY = 0;
		this._endX = 0;
		this._endY = 0;
		this._clientX = 0;
		this._clientY = 0;
		this._scrollDir = 0;
		this._onMouseUp = this._onMouseUp.bind(this);
		this._onPointerDown = this._onPointerDown.bind(this);
		this._onSelectionResize = this._onSelectionResize.bind(this);
		this._onSelectionEnd = this._onSelectionEnd.bind(this);
		this._scroll = this._scroll.bind(this);
		this._onWindowClick = this._onWindowClick.bind(this)
		this._onWindowContextmenu = this._onWindowContextmenu.bind(this);
		this.addEventListener("mouseup", this._onMouseUp);
		this._container = shadowRoot.getElementById("container");
		this._container.addEventListener("pointerdown", this._onPointerDown);
	}
	_onSelectionStart(event) {
		if(this._disableMouseSelection)
			return;
		this.setPointerCapture(event.pointerId);
		this.classList.add("dnd");
		var r = this.getBoundingClientRect();
		this._endX = this._startX = event.clientX - r.left + this.scrollLeft;
		this._endY = this._startY = event.clientY - r.top + this.scrollTop;
		if(!(event.ctrlKey || event.shiftKey || event.metaKey)) {
			this.clearSelection();
		}
		window.addEventListener("mousemove", this._onSelectionResize);
		window.addEventListener("mouseup", this._onSelectionEnd);
		window.addEventListener("contextmenu", this._onWindowContextmenu, true);
		this.addEventListener("scroll", this._onSelectionResize);
	}
	_onSelectionResize(event) {
		var r = this.getBoundingClientRect();
		this._clientX = event.clientX || this._clientX;
		this._clientY = event.clientY || this._clientY;
		this._endX = Math.min(this.scrollWidth, Math.max(0, this._clientX - r.left + this.scrollLeft));
		this._endY = Math.min(this.scrollHeight, Math.max(0, this._clientY - r.top + this.scrollTop));
		this._rect.style.display = "block";
		this._rect.style.left = Math.min(this._endX, this._startX) + "px";
		this._rect.style.top = Math.min(this._endY, this._startY) + "px";
		this._rect.style.width = Math.abs(this._endX - this._startX) + 'px';
		this._rect.style.height = Math.abs(this._endY - this._startY) + 'px';
		var scrollDir;
		if(this._clientY < r.top)
			scrollDir = -1;
		else if(this._clientY > r.bottom)
			scrollDir = 1;
		else
			scrollDir = 0;
		if(scrollDir != this._scrollDir) {
			if(this._scrollDir)
				this._stopScrolling();
			this._scrollDir = scrollDir;
			if(this._scrollDir)
				this._startScrolling();
		}
	}
	_onSelectionEnd(event) {
		this._stopScrolling();
		this.classList.remove("dnd");
		window.removeEventListener("mousemove", this._onSelectionResize);
		window.removeEventListener("mouseup", this._onSelectionEnd);
		window.removeEventListener("contextmenu", this._onWindowContextmenu, true);
		this.removeEventListener("scroll", this._onSelectionResize);
		this.toggleSelectionRect(this._startX, this._startY, this._endX, this._endY);
		this._rect.style.display = null;
	}
	_onPointerDown(event) {
		if(event.which == 2) {
			this.clearSelection();
		}
		if(event.target == this._container) {
			if(event.which == 1)
				this._onSelectionStart(event);
		}
		else {
			if(event.target.parentNode != this)
				return;
			var target = event.target;
			if(event.shiftKey || event.ctrlKey || event.metaKey) {
				event.preventDefault();
				if(this.getSelectionSize()) {
					window.addEventListener("click", this._onWindowClick, true);
					if(event.shiftKey) {
						this.expandSelection(Array.from(this.children).indexOf(target));
					}
					else {
						this.toggleChildSelection(target);
					}
				}
			}
			else if(!this.isChildSelected(target)) {
				this.clearSelection();
			}
		}
	}
	_onWindowClick(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		window.removeEventListener("click", this._onWindowClick, true);
	}
	_onWindowContextmenu(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
	}
	_onMouseUp(event) {
		if(event.which == 2)
			event.preventDefault();
		if((event.which == 1) && !(event.shiftKey || event.ctrlKey || event.metaKey)) {
			this.clearSelection();
		}
	}
	_scroll() {
		var ti = Date.now();
		var dt = ti - this._scrollT;
		var dy = this._scrollDir * SCROLL_V * dt;
		this.scrollTop += Math.round(dy);
		this._scrollT = ti;
		this._scrollAnimationFrameId = requestAnimationFrame(this._scroll);
	}
	_startScrolling() {
		this._scrollT = Date.now();
		this._scroll();
	}
	_stopScrolling() {
		this._scrollDir = 0;
		cancelAnimationFrame(this._scrollAnimationFrameId);
	}
}
return window.Gridview05SelectionMouse=Gridview05SelectionMouse;}}}
{function initGridview06DND(window) {if(window.Gridview06DND) return window.Gridview06DND;initGridview05SelectionMouse(window);with(window) {class Gridview06DND extends Gridview05SelectionMouse {
	init(shadowRoot) {
		super.init(shadowRoot);
		this.ghostSelection = shadowRoot.getElementById("ghost-selection");
		this._onDragEnd = this._onDragEnd.bind(this);
		this.addEventListener("dragenter", this._onDragEnter.bind(this));
		this.addEventListener("dragleave", this._onDragLeave.bind(this));
		this.addEventListener("dragover", this._onDragOver.bind(this));
		this.addEventListener("drop", this._onDrop.bind(this));
		this.addEventListener("dragstart", this._onDragStart.bind(this));
	}
	_createCustomEvent(event, elements) {
		var r = this.getBoundingClientRect();
		let x = event.clientX - r.left + this.scrollLeft;
		let y = event.clientY - r.top + this.scrollTop;
		return new CustomEvent(
			'gridview-' + event.type, {
				bubbles : true,
				cancelable: true,
				detail : {
					x,
					y,
					dataTransfer : event.dataTransfer,
					index : this.pointToIndex(x, y),
					elements
				}
			}
		)
	}
	_onDragEnter(event) {
		event.stopImmediatePropagation();
		if(event.target==this) {
			this.classList.add("dnd");
			this.dispatchEvent(this._createCustomEvent(event));
		}
	}
	_onDragLeave(event) {
		event.stopImmediatePropagation();
		if(event.target==this) {
			this.classList.remove("dnd");
			this.dispatchEvent(this._createCustomEvent(event));
		}
	}
	_onDragOver(event) {
		event.stopImmediatePropagation();
		event.preventDefault();
		if(event.target!==this)
			return;
		var customEvent = this._createCustomEvent(event);
		if(this.dispatchEvent(customEvent)) {
			this.update(customEvent.detail.index);
		}
	}
	_onDrop(event) {
		this.classList.remove("dnd")
		event.preventDefault();
		if(this.dispatchEvent(this._createCustomEvent(event))) {
			this.update();
		}
	}
	_onDragStart(event) {
		if(event.target.parentNode != this)
			return;
		event.stopImmediatePropagation();
		this._dragTarget = event.target;
		this._dragTarget.addEventListener("dragend", this._onDragEnd);
		var elements;
		if(this.isChildSelected( this._dragTarget)) {
			elements = this.getSelectedChildren();
			this.ghostSelection.dataset.selectionSize = elements.length;
			event.dataTransfer.setDragImage(this.ghostSelection, 0, 0);
		}
		else {
			elements = [this._dragTarget];
		}
		var customEvent = this._createCustomEvent(event, elements);
		if(this.dispatchEvent(customEvent)) {
			this.clearSelection();
			requestAnimationFrame(()=>{
				this.hideChildren(child=>elements.includes(child));
				this.update(customEvent.detail.index);
			});
		}
	}
	_onDragEnd(event) {
		event.stopImmediatePropagation();
		event.target.removeEventListener("dragend", this._onDragEnd);
		this._dragTarget = null;
		if(this.dispatchEvent(this._createCustomEvent(event))) {
			this.update();
		}
	}
}
return window.Gridview06DND=Gridview06DND;}}}
{function initGridview07Clipboard(window) {if(window.Gridview07Clipboard) return window.Gridview07Clipboard;initGridview06DND(window);with(window) {class Gridview07Clipboard extends Gridview06DND {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._onCopyOrCutOrPaste = this._onCopyOrCutOrPaste.bind(this);
	}
	bind() {
		super.bind();
		addEventListener("copy", this._onCopyOrCutOrPaste);
		addEventListener("cut", this._onCopyOrCutOrPaste);
		addEventListener("paste", this._onCopyOrCutOrPaste);
	}
	unbind() {
		super.unbind();
		removeEventListener("copy", this._onCopyOrCutOrPaste);
		removeEventListener("cut", this._onCopyOrCutOrPaste);
		removeEventListener("paste", this._onCopyOrCutOrPaste);
	}
	_onCopyOrCutOrPaste(event) {
		if(!(this.hasFocus() || this._executesCommand))
			return;
		let executesCommand = this._executesCommand;
		this._executesCommand = false;
		event.preventDefault();
		switch(event.type) {
			case "copy":
			case "cut":
				var elements = this.getSelectedChildren();
				if(!elements.length) {
					for(let child of this.children) {
						if(child.matches(":focus")) {
							elements.push(child);
							break;
						}
					}
				}
				if(!elements.length)
					return;
				this.dispatchEvent(new CustomEvent(
					'gridview-' + event.type, {
						bubbles : true,
						cancelable: true,
						detail : { clipboardData : event.clipboardData, elements }
					}
				));
			break;
			case "paste":
				var index;
				if(executesCommand)
					index = this._pasteIndex;
				else
					index = Number.MAX_VALUE;
				this.dispatchEvent(new CustomEvent(
					'gridview-paste', {
						bubbles : true,
						cancelable: true,
						detail : { clipboardData : event.clipboardData, index }
					}
				));
			break;
		}
	}
	_execCommand(permission, cmd) {
		this._executesCommand = true;
		chrome.permissions.request(
			{
				permissions: [permission]
			},
			function(granted) {
				if(granted) {
					document.execCommand(cmd, true);
				}
			}
		);
	}
	copy() {
		this._execCommand('clipboardWrite', 'copy');
	}
	cut() {
		this._execCommand('clipboardWrite', 'cut');
	}
	paste(index) {
		this._pasteIndex = index;
		this._execCommand('clipboardRead', 'paste');
	}
}
return window.Gridview07Clipboard=Gridview07Clipboard;}}}
{function initGridview08ChildActive(window) {if(window.Gridview08ChildActive) return window.Gridview08ChildActive;initGridview07Clipboard(window);with(window) {class Gridview08ChildActive extends Gridview07Clipboard {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._onActiveEnd = this._onActiveEnd.bind(this);
		this.addEventListener("mousedown", this._onMouseDown.bind(this));
	}
	_onActiveEnd() {
		if(this._activeChild) {
			this._activeChild.classList.remove("-active")
			this._activeChild = null;
		}
	}
	_onMouseDown(event) {
		if((event.target.parentNode == this) && !(event.shiftKey || event.ctrlKey || event.metaKey) && (event.which < 3)) {
			this._activeChild = event.target;
			this._activeChild.classList.add("-active");
		}
	}
	bind() {
		super.bind();
		window.addEventListener("mouseup", this._onActiveEnd, true);
		window.addEventListener("dragend", this._onActiveEnd, true);
	}
	unbind() {
		super.unbind();
		window.removeEventListener("mouseup", this._onActiveEnd, true);
		window.removeEventListener("dragend", this._onActiveEnd, true);
	}
}
return window.Gridview08ChildActive=Gridview08ChildActive;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:block;width:100%;overflow-y:overlay;overflow-x:hidden;position:relative}:host(.dnd) ::slotted(*){pointer-events:none}:host([data-error]):after{content:attr(data-error);position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);padding:10px 20px;border-radius:5px;z-index:1;background-color:rgba(0,0,0,0.4);color:white;font-size:14px;font-weight:500;display:inline-block;text-align:center}#container{width:100%;min-height:100%;position:relative;direction:ltr}::slotted(*){position:absolute;transition:transform 250ms}::slotted(:not(.visible)){display:none}::slotted(.hidden){display:none}#selection-rect{display:none;position:absolute;z-index:10000000;border:1px solid #3367D6;background-color:rgba(51,103,214,0.25);border:1px solid rgba(0,0,0,0.3);transform:translate3d(0, 0, 0);pointer-events:none}#ghost-selection{display:block;position:fixed;top:100px;left:100px;left:-1000px;top:-1000px;width:400px;height:80px;background-color:transparent}#ghost-selection:after{content:attr(data-selection-size);display:inline-block;position:absolute;top:5px;left:5px;padding:10px 20px;font-size:25px;font-weight:bold;border-radius:1000px;border:5px solid white;color:white;text-align:center;background-color:#3367D6;box-shadow:2px 2px 5px 3px rgba(0,0,0,0.1)}</style><div id="container"><slot></slot><div id="selection-rect"></div></div><div id="ghost-selection"></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initGridview(window) {if(window.Gridview) return window.Gridview;initGridview08ChildActive(window);with(window) {class Gridview extends Gridview08ChildActive {
}
defineCustomElement("a-gridview", Gridview, t);return window.Gridview=Gridview;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{width:360px}#droparea{width:300px;margin:30px 30px 0 30px;border:1px dashed #cccccc}#icon{display:block;margin:35px auto 0 auto;width:80px;height:80px;-webkit-filter:drop-shadow(0 0 4px rgba(0,0,0,0.3));pointer-events:none}:host(.-busy) #icon{filter:grayscale(100%) opacity(50%)}#droparea-message,#url{margin:20px auto 20px auto;text-align:center}#droparea-message{font-style:italic;font-size:15px;color:#b3b3b3}#url{font-size:12px;display:none}:host([data-has-mapping]) #droparea-message{display:none}:host([data-has-mapping]) #url{display:block}#url-remove-btn{display:inline-block;width:18px;height:18px;margin:0 0 -3px 3px;background-color:black;border-radius:9px;background-image:url(/ui/icon/icon-close.svg);background-position:center;background-size:20px 20px;background-repeat:no-repeat;cursor:pointer;opacity:.6}#url-remove-btn:hover{opacity:1}</style><a-menu id="menu">	<a-menuitem data-i18n="reload" data-action="reload"></a-menuitem>	<a-menuitem data-i18n="settings" data-action="openSettings"></a-menuitem></a-menu><a-topbar>	<a-button slot="left" data-icon="contextmenu" data-menu="menu"></a-button>	<h1 slot="center"></h1>	<a-button slot="right" title="i18n:close" data-icon="close" data-action="cancel"></a-button></a-topbar><div id="droparea" class="content">	<a-bookmark-icon id="icon"></a-bookmark-icon>	<div id="droparea-message">Drop web image or click to enter URL</div>	<div id="url">		<span id="url-text"></span>		<span id="url-remove-btn" title="i18n:remove"></span>	</div></div><div class="buttons">	<a-button tabindex="1" data-action="searchTheWeb" data-i18n="search_the_web"></a-button></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initIconDialogUI(window) {if(window.IconDialogUI) return window.IconDialogUI;initDialogUI(window);initAlertDialogUI(window);initPromptDialogUI(window);initMenu(window);initTopbar(window);initButton(window);initBookmarkIcon(window);with(window) {const searchURLTemplate = "https://duckduckgo.com/?iar=images&iax=images&ia=images&q=";
let _searchWindow;
class IconDialogUI extends DialogUI {
	init(shadowRoot) {
		super.init(shadowRoot);
		this.update = this.update.bind(this);
		var droparea = shadowRoot.getElementById("droparea", this);
		droparea.addEventListener("dragover", this.onDropareaDragOver.bind(this));
		droparea.addEventListener("drop", this.onDropareaDrop.bind(this));
		droparea.addEventListener("click", this.onDropareaClick.bind(this));
		this._urlText = shadowRoot.getElementById("url-text");
		this._icon = shadowRoot.getElementById("icon");
		this._title = shadowRoot.querySelector("h1");
		this._urlRemoveButton = shadowRoot.getElementById("url-remove-btn");
		this._urlRemoveButton.addEventListener("click", this.onRemoveCustomURLMapping.bind(this));
	}
	bind() {
		super.bind();
		addEventListener("icons/invalidate", this.update);
	}
	unbind() {
		super.unbind();
		removeEventListener("icons/invalidate", this.update);
	}
	setCustomMapping(iconURL) {
		this.busy = true;
		api.iconsURLMapping.setCustomURLMapping(this._url, iconURL)
			.catch(errorMessage=>showAlert(chrome.i18n.getMessage("error"), errorMessage))
			.then(()=>{
				this.busy = false;
			})
	}
	onDropareaDragOver(event) {
		event.preventDefault();
	}
	onDropareaDrop(event) {
		event.preventDefault();
		var iconURL = event.dataTransfer.getData("text/plain") || event.dataTransfer.getData("text/uri-list"); // fixes macOS
		this.setCustomMapping(iconURL);
	}
	onDropareaClick() {
		showPrompt( chrome.i18n.getMessage("custom_url"), api.iconsURLMapping.getCustomURLMapping(this._url) || "", "URL", iconURL => this.setCustomMapping(iconURL))
	}
	onRemoveCustomURLMapping(event) {
		event.stopPropagation();
		this.setCustomMapping();
	}
	searchTheWeb() {
		var searchStrTokens;
		if(this._url.startsWith("chrome-extension://")) {
			searchStrTokens = ["chrome", "extension"];
		}
		else {
			searchStrTokens = api.uri.getHostname(this._url).split('.').filter(t=>(t!='www'));
			if(searchStrTokens.length >= 2)
				searchStrTokens.pop();
		}
		var searchURL = searchURLTemplate + encodeURIComponent(searchStrTokens.join(' ') + " icon");
		if(_searchWindow != null) {
			chrome.windows.remove(_searchWindow.id);
			_searchWindow = null;
		}
		const pw = 650;
		let x,y,w,h;
		if( (outerWidth >= 1700) && (outerHeight >= 900)) {
			x = (screenX + outerWidth) - pw;
			y = screenY;
			w = pw;
			h = outerHeight;
		}
		else {
			x = (screen.width-pw);
			y = 0;
			w = pw;
			h = screen.height;
		}
		chrome.windows.create(
			{
				url:  searchURL,
				left:x, top:y, width:w, height:h,
				focused:true
			},
			win=>{
				_searchWindow = win;
			}
		);
	}
	update() {
		var customIconURL = api.iconsURLMapping.getCustomURLMapping(this._url);
		if(customIconURL) {
			this._urlText.textContent = (customIconURL.length > 35) ? customIconURL.substr(0, 16) + " ... " + customIconURL.substr(-16) : customIconURL;
			this.dataset.hasMapping = true;
		}
		else {
			this._urlText.textContent = "";
			delete this.dataset.hasMapping;
		}
		this.busy = true;
		this._icon.dataset.url = this._url;
		this._icon
			.loadIcon()
			.catch(console.log)
			.then(()=>{ this.busy = false; })
	}
	reload() {
		api.icons.clearCache(this._url)
			.then(api.icons.invalidate)
	}
	openSettings() {
		api.settingsWindow.show("icons");
	}
	setValues(values) {
		this._url = values.url;
		this._title.textContent = api.stringUtil.truncate(values.title ? values.title : api.uri.getHostname(this._url), 50);
		this._title.title = this._url;
		this.busy = false;
		this.update();
	}
}
defineCustomElement("a-icon-dialog-ui", IconDialogUI, t);return window.IconDialogUI=IconDialogUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:inline-block;width:40px;height:40px;background-repeat:no-repeat;background-size:cover;background-position:center;vertical-align:top;filter:invert(var(--icon-invert, 0%))}:host(:not([data-icon])){display:none}:host([data-icon=close]){background-image:url('ui/icon/icon-close.svg')}:host([data-icon=menu]){background-image:url('ui/icon/icon-menu.svg')}:host([data-icon=contextmenu]){background-image:url('ui/icon/icon-contextmenu.svg')}:host([data-icon=reload]){background-image:url('ui/icon/icon-reload.svg')}:host([data-icon=settings]){background-image:url('ui/icon/icon-settings.svg')}:host([data-icon=loading]){background-image:url('ui/icon/icon-loading.svg')}</style><!-- Icon -->`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initIcon(window) {if(window.Icon) return window.Icon;initCustomElement(window);with(window) {class Icon extends CustomElement {}
defineCustomElement("a-icon", Icon, t);return window.Icon=Icon;}}}
{const t = document.createElement("template");t.innerHTML = `<style>.job{border-bottom:1px solid #ccc;display:flex;align-items:center;padding:5px}.job .job-title{font-size:14px;width:300px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1;margin-right:20px}.job a-button{min-width:160px}.job a-button a-icon{width:14px;height:14px;margin:0 10px 0 0}</style><a-topbar>	<h1 slot="left">Jobs</h1></a-topbar><div id="job-queue" class="content"></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initJobQueueDialogUI(window) {if(window.JobQueueDialogUI) return window.JobQueueDialogUI;initDialogUI(window);initTopbar(window);with(window) {class JobQueueDialogUI extends DialogUI {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._title = shadowRoot.querySelector("h1");
		this._jobQueue = shadowRoot.getElementById("job-queue");
		this._jobQueue.addEventListener("click", this._onJobQueueClick.bind(this));
	}
	setValues(values) {
		this._title.textContent = values.title;
		this.updateJobs(values.jobs);
	}
	_addJob(title, status, cancelCallback) {
		var jobEl = document.createElement("div");
		jobEl.className = "job";
		var jobTitleEl = document.createElement("span");
		jobTitleEl.className = "job-title";
		jobTitleEl.textContent = title;
		jobEl.appendChild(jobTitleEl);
		var jobButton =  document.createElement("a-button");
		switch(status) {
			case "complete":
				jobButton.dataset.disabled = true;
				jobButton.textContent = chrome.i18n.getMessage("complete");
			break;
			case "cancelled":
				jobButton.dataset.disabled = true;
				jobButton.textContent = chrome.i18n.getMessage("cancelled");
			break;
			default:
				jobButton.textContent = chrome.i18n.getMessage("cancel");
				var spinner = document.createElement("a-icon");
				spinner.dataset.icon = "loading";
				jobButton.insertBefore(spinner, jobButton.firstChild)
				jobButton.cancelCallback = cancelCallback;
			break;
		}
		jobEl.appendChild(jobButton);
		this._jobQueue.appendChild(jobEl);
	}
	updateJobs(jobs) {
		this._jobQueue.innerHTML = "";
		for(let job of jobs) {
			this._addJob(
				job.title,
				job.status,
				job.cancelCallback
			);
		}
	}
	_onJobQueueClick(event) {
		if(event.target.cancelCallback) {
			event.target.cancelCallback();
		}
	}
}
defineCustomElement("a-job-queue-dialog-ui", JobQueueDialogUI, t);return window.JobQueueDialogUI=JobQueueDialogUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{font-family:"Roboto";display:block;width:100%;height:100%;direction:ltr;color:#333}#container{width:100%;height:100%;background-color:#F8F9FA}a-topbar{height:56px}a-topbar h1{width:280px}.btn{display:inline-block;height:30px;border:1px solid #3367D6;border-radius:3px;font-size:13px;line-height:30px;text-align:center;color:#3367D6;cursor:pointer}.btn{background-position:center;background-repeat:no-repeat}.btn:hover{background-color:rgba(51,103,214,0.07)}.btn.invert{background-color:#3367D6;color:white}.btn.invert:hover{background-color:rgba(51,103,214,0.93)}.btn *{pointer-events:none}.loading{background-position:center;background-repeat:no-repeat;background-image:url(/ui/link-directory-ui/link-directory-ui-preloader.svg);background-size:auto}a-topbar-search-field{width:100%;max-width:500px}#content{position:absolute;top:56px;bottom:0;left:0;right:0}#categories,#list{position:absolute;top:0;bottom:0;overflow-y:auto;padding:20px 0 0 0;min-height:100%}#categories{left:0;width:300px;font-size:14px;line-height:2em;font-weight:500}#categories>*{padding:5px 20px;min-width:200px;float:left;clear:left}#categories>:hover{color:black}#categories>.-selected{color:#3367D6}#list{left:300px;right:0}#list .entries{min-height:100%}#list .entry{width:170px;height:250px;margin:0 20px 20px 3px;padding:10px;background-color:white;box-shadow:0 0 5px 1px rgba(0,0,0,0.1);float:left;position:relative;cursor:pointer}#list .entry *{position:absolute;overflow:hidden}#list .entry .thumb{top:10px;left:10px;width:150px;height:150px;background-color:#ccc;background-size:cover;background-repeat:no-preat;pointer-events:none}#list .entry .title{top:170px;left:10px;width:150px;height:30px;font-size:13px;font-weight:500;pointer-events:none}#list .entry .btn{width:70px;bottom:10px;background-size:auto 20px}#list .entry .bookmark-btn{left:10px;background-image:url(/ui/link-directory-ui/link-directory-ui-star-outline-icon.svg)}#list .entry.is-bookmarked .bookmark-btn{background-image:url(/ui/link-directory-ui/link-directory-ui-star-icon.svg)}#list .entry .open-btn{right:10px;background-image:url(/ui/link-directory-ui/link-directory-ui-play-icon.svg)}#list .error-message{margin-top:40px;color:#6e6e6e;font-size:14px;font-weight:500}#list .footnote{clear:both;display:block;margin-top:-3em;margin-bottom:1em;bottom:0;color:#777;text-decoration:none;font-size:10px}#list .footnote:hover{text-decoration:underline}@keyframes detail-view-fadein{0%{opacity:0;background-image:none}25%{opacity:1}100%{background-image:none}}@keyframes detail-view-inner-fadein{from{opacity:0;transform:scale(.95)}}#detail-view{display:none;background-color:rgba(0,0,0,0.7);position:fixed;top:0;left:0;width:100%;height:100%;z-index:20000;animation:detail-view-fadein 400ms ease-out}#detail-view.is-bookmarked #detail-view-bookmark-btn{background-image:url(/ui/link-directory-ui/link-directory-ui-star-icon.svg)}#detail-view.is-bookmarked #detail-view-bookmark-btn span[data-i18n=add]{display:none}#detail-view.is-bookmarked #detail-view-bookmark-btn span[data-i18n=edit]{display:inline}#detail-view-inner{top:50%;height:auto;max-width:730px;margin:0 auto;position:relative;max-height:460px;background-color:white;margin-top:-230px;animation:detail-view-inner-fadein 150ms ease-out}#detail-view-inner>*{position:absolute}#detail-view-previous-btn,#detail-view-next-btn{position:absolute;top:50%;height:80px;margin-top:-40px;width:60px;background-color:black;cursor:pointer;background-image:url(/ui/link-directory-ui/link-directory-ui-next-icon.svg);background-position:center;background-repeat:no-repeat;border-radius:6px 0 0 6px;opacity:.5}#detail-view-previous-btn:hover,#detail-view-next-btn:hover{opacity:1}#detail-view-previous-btn{left:0;transform:scaleX(-1)}#detail-view-next-btn{right:0}#detail-view-close{width:32px;height:32px;border-radius:16px;background-color:#3367D6;top:-16px;right:-16px;z-index:1000;background-image:url(/ui/link-directory-ui/link-directory-ui-close-icon.svg);background-repeat:no-repeat;background-position:center;cursor:pointer;box-shadow:0 0 3px 3px rgba(0,0,0,0.1)}#detail-view-banner{height:180px;width:100%;background-color:black;background-size:cover;background-repeat:no-repeat;background-position:center top;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=);transition:background-image 250ms}#detail-view-text{top:180px;width:100%;height:280px;background-color:white;overflow-y:auto;overflow-x:hidden;padding:30px 240px 40px 45px}#detail-view-text h1{font-size:36px;font-weight:400;margin:0}#detail-view-text p{font-size:13px;line-height:1.25em}#detail-view-icon{top:90px;right:40px;width:180px;height:180px;background-color:white;background-size:cover;border:5px solid white}#detail-view-bookmark-btn,#detail-view-open-btn{right:45px;width:170px;text-align:left;padding-left:42px;background-position:12px center;height:40px;font-size:14px;line-height:40px;background-size:auto 25px;font-weight:500}#detail-view-bookmark-btn{top:300px;background-image:url(/ui/link-directory-ui/link-directory-ui-star-outline-icon.svg)}#detail-view-bookmark-btn span[data-i18n=add]{display:inline}#detail-view-bookmark-btn span[data-i18n=edit]{display:none}#detail-view-open-btn{top:355px;background-image:url(/ui/link-directory-ui/link-directory-ui-play-icon.svg)}</style><!-- tabindex fixes focus-scroll --><div id="container">	<a-topbar>		<h1 slot="left">Games</h1>		<a-topbar-search-field slot="center" data-placeholder="i18n:search_"></a-topbar-search-field>	</a-topbar>	<div id="content" tabindex="-1">		<a-selector id="categories"></a-selector>		<div id="list"></div>	</div></div><div id="detail-view" tabindex="-1">	<div id="detail-view-inner">		<div id="detail-view-banner"></div>		<div id="detail-view-text"><h1></h1><p></p></div>		<div id="detail-view-close"></div>		<div id="detail-view-icon"></div>		<div id="detail-view-bookmark-btn" class="btn big"><span data-i18n="add"></span><span data-i18n="edit"></span></div>		<div id="detail-view-open-btn" class="btn big">Play</div>	</div>	<div id="detail-view-previous-btn"></div>	<div id="detail-view-next-btn"></div></div><a-popover-bookmark-editor></a-popover-bookmark-editor>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initLinkDirectoryUI(window) {if(window.LinkDirectoryUI) return window.LinkDirectoryUI;initCustomElement(window);initTopbar(window);initTopbarSearchField(window);initSelector(window);initPopoverBookmarkEditor(window);with(window) {class LinkDirectoryUI extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._searchField = shadowRoot.querySelector("a-topbar-search-field");
		this._categorySelector = shadowRoot.getElementById("categories");
		this._listEl = shadowRoot.getElementById("list");
		this._bookmarkEditor = shadowRoot.querySelector("a-popover-bookmark-editor");
		this._detailView = shadowRoot.getElementById("detail-view");
		this._footnote = shadowRoot.getElementById("footnote");
		this.onPopstate = this.onPopstate.bind(this);
		this.onBookmarkChange = this.onBookmarkChange.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onCategoryChange = this.onCategoryChange.bind(this);
		this.onListClick = this.onListClick.bind(this);
		this.onDetailViewClick = this.onDetailViewClick.bind(this);
		let searchInputTimeout;
		this._searchField.addEventListener("change", ()=>{
			clearTimeout(searchInputTimeout);
			this.onSearch();
		});
		this._searchField.addEventListener("input", () => {
			clearTimeout(searchInputTimeout);
			searchInputTimeout = setTimeout(this.onSearch, 200);
		});
		this._categorySelector.addEventListener("change", this.onCategoryChange);
		this._listEl.addEventListener("click", this.onListClick);
		this._detailView.addEventListener("click", this.onDetailViewClick);
		if(this.dataset.src)
			this.src = this.dataset.src;
	}
	getCategory() {
		return this._state.category;
	}
	getSearchWord() {
		return this._state.searchWord;
	}
	getDetailURL() {
		return this._state.detailURL;
	}
	getDetailEntries() {
		var url = this._state.detailURL;
		if(url) {
			var entries = this.getEntries();
			for(let i=0; i<entries.length; i++) {
				if(entries[i].url == url) {
					return {
						current : entries[i],
						previous : entries[i-1],
						next : entries[i+1]
					}
				}
			}
		}
	}
	getEntries() {
		var searchWord = this.getSearchWord();
		if(searchWord) {
			searchWord = searchWord.toLowerCase()
			return this._data.entries.filter(entry=>entry.name.toLowerCase().includes(searchWord));
		}
		else {
			var category = this.getCategory();
			return category ? this._data.entries.filter(entry=>entry.categories.includes(category)) : this._data.entries;
		}
	}
	getInfo() {
		return this._data.info;
	}
	updateCategoryList() {
		this._categorySelector.innerHTML = "";
		this._data.categories.forEach(categoryName => {
			var div = document.createElement("div");
			div.textContent = categoryName;
			div.dataset.option = categoryName;
			this._categorySelector.appendChild(div);
		})
	}
	updateCategory() {
		this._categorySelector.value = this.getCategory();
		this._categorySelector.style.display = this.getSearchWord() ? "none" : null;
	}
	updateSearchField() {
		this._searchField.value = this.getSearchWord();
	}
	updateList() {
		this._listEl.innerHTML = "";
		let entries = this.getEntries();
		if(entries.length) {
			let entriesDiv = document.createElement("div");
			entriesDiv.className = "entries";
			for(let entry of entries) {
				var el = document.createElement("div");
				el.entry = entry;
				el.classList.add("entry");
				if(entry.isBookmarked)
					el.classList.add("is-bookmarked");
				var thumb = document.createElement("div");
				thumb.className = "thumb";
				thumb.style.backgroundImage = "url(" + entry.icon + ")";
				el.appendChild(thumb);
				var title = document.createElement("div");
				title.className = "title";
				title.textContent = entry.name;
				el.appendChild(title);
				var btn;
				btn = document.createElement("div");
				btn.className = "btn bookmark-btn";
				el.appendChild(btn);
				btn = document.createElement("div");
				btn.className = "btn open-btn";
				el.appendChild(btn);
				entriesDiv.appendChild(el);
			}
			this._listEl.appendChild(entriesDiv);
			var info = this.getInfo();
			if(info) {
				let footnote = document.createElement("a");
				footnote.className = "footnote";
				footnote.href = info.url;
				footnote.textContent = info.text;
				this._listEl.appendChild(footnote);
			}
		}
		else {
			let errorMessage = document.createElement("div");
			errorMessage.className = "error-message";
			errorMessage.textContent = chrome.i18n.getMessage("no_search_results_found");
			this._listEl.appendChild(errorMessage);
		}
	}
	updateListBookmarks() {
		this._listEl.querySelectorAll(".entry").forEach(el=>{
			var entry = el.entry;
			if(entry.isBookmarked)
				el.classList.add("is-bookmarked");
			else
				el.classList.remove("is-bookmarked");
		})
	}
	updateDetailView() {
		var entries = this.getDetailEntries();
		if(entries) {
			this._detailView.style.display = "block";
			this._detailView.querySelector("#detail-view-previous-btn").style.display = entries.previous ? null : "none";
			this._detailView.querySelector("#detail-view-next-btn").style.display = entries.next ? null : "none";
			var innerEl = this._detailView.querySelector("#detail-view-inner");
			innerEl.style.display = "none";
			this._detailView.classList.add("loading");
			if(entries.current.isBookmarked)
				this._detailView.classList.add("is-bookmarked");
			else
				this._detailView.classList.remove("is-bookmarked");
			innerEl.querySelector("#detail-view-banner").style.backgroundImage = null;
			innerEl.querySelector("#detail-view-icon").style.backgroundImage = "url("+entries.current.icon+")";
			innerEl.querySelector("#detail-view-text h1").textContent = entries.current.name;
			innerEl.querySelector("#detail-view-text p").textContent = entries.current.description;
			new Promise(r=>{
				setTimeout(r,1000);
				var img = new Image();
				img.onload = r;
				img.onerror = r;
				img.src = entries.current.banner;
			})
			.then(()=>{
				innerEl.querySelector("#detail-view-banner").style.backgroundImage = "url("+entries.current.banner+")";
				innerEl.style.display = null;
				this._detailView.classList.remove("loading");
			})
		}
		else {
			this._detailView.style.display = null;
		}
	}
	updateDetailViewBookmark() {
		var entries = this.getDetailEntries();
		if(entries) {
			if(entries.current.isBookmarked)
				this._detailView.classList.add("is-bookmarked");
			else
				this._detailView.classList.remove("is-bookmarked");
		}
	}
	openURL(url) {
		location.href = url;
	}
	showBookmarkEditor(entry, x,y) {
		this._bookmarkEditor.show(entry.url, entry.name, x,y);
	}
	loadData() {
		return fetch(this.src)
			.then(response=>response.json())
			.then(json=>{
				this._data = json;
			})
	}
	loadBookmarks() {
		return api.bookmarks.getAllURLS("0")
			.then(urls=>{
				this._data.entries.forEach(entry => {
					entry.isBookmarked = urls.includes(entry.url);
				})
			})
	}
	initState() {
		this._state = {};
		this.updateState({
			category : (history.state && history.state.category) ? history.state.category : this._data.categories[0],
			searchWord : (history.state && history.state.searchWord) ? history.state.searchWord : null,
			detailURL : (history.state && history.state.detailURL) ? history.state.detailURL : null,
		});
	}
	updateState(state, push) {
		if(state.category !== undefined) {
			this._state.category = state.category;
		}
		if(state.searchWord !== undefined) {
			this._state.searchWord = state.searchWord;
			this.updateSearchField();
		}
		if(state.detailURL !== undefined) {
			this._state.detailURL = state.detailURL;
			this.updateDetailView();
		}
		if((state.category !== undefined) || (state.searchWord !== undefined)) {
			this.updateCategory();
			this.updateList();
		}
		if(push)
			history.pushState(this._state, null);
		else
			history.replaceState(this._state, null);
	}
	onPopstate(event) {
		if(event.state && event.state.hasOwnProperty("category"))
			this.initState();
	}
	onSearch() {
		if(this._state.searchWord == this._searchField.value)
			return;
		this._lastSearchTS = this._lastSearchTS || 0;
		var now = Date.now();
		var dt = now - this._lastSearchTS;
		if((!this._searchField.value) || (dt > 5000)) {
			this._lastSearchTS = now;
			this.updateState({ searchWord : this._searchField.value }, true);
		}
		else {
			this.updateState({ searchWord : this._searchField.value }, false);
		}
	}
	onCategoryChange() {
		this.updateState({ category : this._categorySelector.value }, true);
	}
	onBookmarkChange() {
		this.loadBookmarks().then(()=>{
			this.updateListBookmarks();
			this.updateDetailViewBookmark();
		})
		.catch(console.log)
	}
	onEntryClick(entry) {
		this.updateState({ detailURL : entry.url }, true);
	}
	onListClick(event) {
		if(event.target.classList.contains("open-btn")) {
			this.openURL(event.target.parentNode.entry.url);
		}
		else if(event.target.classList.contains("bookmark-btn")) {
			this.showBookmarkEditor(event.target.parentNode.entry, event.clientX, event.clientY);
		}
		else if(event.target.classList.contains("entry")) {
			this.onEntryClick(event.target.entry);
		}
	}
	onDetailViewClick(event) {
		switch(event.target.id) {
			case "detail-view-previous-btn": {
				let entries = this.getDetailEntries();
				if(entries && entries.previous)
					this.updateState({ detailURL : entries.previous.url }, true);
			}
			break;
			case "detail-view-next-btn": {
				let entries = this.getDetailEntries();
				if(entries && entries.next)
					this.updateState({ detailURL : entries.next.url }, true);
			}
			break;
			case "detail-view-bookmark-btn": {
				let entries = this.getDetailEntries();
				this.showBookmarkEditor(entries.current, event.clientX, event.clientY);
			}
			break;
			case "detail-view-open-btn":
				this.openURL(this.getDetailURL());
			break;
			case "detail-view":
			case "detail-view-close":
				this.updateState({ detailURL : null }, true);
			break;
		}
	}
	bind() {
		addEventListener("popstate", this.onPopstate);
		addEventListener("bookmarks/created", this.onBookmarkChange);
		addEventListener("bookmarks/removed", this.onBookmarkChange);
		addEventListener("bookmarks/changed", this.onBookmarkChange);
		addEventListener("bookmarks/moved", this.onBookmarkChange);
		addEventListener("bookmarks/childrenReordered", this.onBookmarkChange);
		return this.loadData()
			.then(()=>
				this.loadBookmarks()
			)
			.then(()=> {
				this.updateCategoryList();
				this.initState();
			})
			.catch(error=>{
				console.log("ERROR! ", error);
			})
	}
	unbind() {
		this._data = null;
		removeEventListener("popstate", this.onPopstate);
		removeEventListener("bookmarks/created", this.onBookmarkChange);
		removeEventListener("bookmarks/removed", this.onBookmarkChange);
		removeEventListener("bookmarks/changed", this.onBookmarkChange);
		removeEventListener("bookmarks/moved", this.onBookmarkChange);
		removeEventListener("bookmarks/childrenReordered", this.onBookmarkChange);
	}
}
defineCustomElement("a-link-directory-ui", LinkDirectoryUI, t);return window.LinkDirectoryUI=LinkDirectoryUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{font-family:'Roboto';font-size:13px;line-height:200%;min-width:100px;color:black;background-color:white;border-radius:2px;white-space:nowrap;text-align:left;padding:10px 0}::slotted(a-menuitem){display:block;position:relative}::slotted(hr){border:0;height:1px;background-color:#eee}::slotted(a-menuitem:not([data-action]))::after{content:'▸';display:block;top:0;position:absolute}::slotted(a-menuitem:hover){background-color:#F0F0F0}::slotted(a-menuitem:active){background-color:#e0e0e0}:host-context([data-bidi=rtl]) ::slotted(a-menuitem){padding-right:19px;padding-left:40px}:host-context([data-bidi=rtl]) ::slotted(a-menuitem:not([data-action]))::after{left:15px}:host-context(:not([data-bidi=rtl])) ::slotted(a-menuitem){padding-left:19px;padding-right:40px}:host-context(:not([data-bidi=rtl])) ::slotted(a-menuitem:not([data-action]))::after{right:15px}</style><slot></slot>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initMenu(window) {if(window.Menu) return window.Menu;initPopover(window);with(window) {class Menu extends Popover {
	init(shadowRoot) {
		super.init(shadowRoot);
		this.addEventListener("mousedown", this);
		this.addEventListener("mouseup", this);
		this.addEventListener("mouseover", this);
		this.addEventListener("contextmenu", this);
		this.addEventListener("click", this);
	}
	handleEvent(event) {
		switch(event.type) {
			case "mousedown":
				event.stopPropagation();
				event.preventDefault();
				this.rightButtonEnabled = true;
			break;
			case "mouseup":
				if(
					((event.which==1) || this.rightButtonEnabled) && (event.target.dataset.action != undefined)
				) {
					if(this._callback)
						this._callback(event);
					this.hide();
				}
			break;
			case "mouseover":
				if(this._submenu && (event.target.parentNode == this)) {
					this._submenu.hide();
					delete this._submenu;
				}
				let submenu = (event.target.tagName == "A-MENUITEM") ? event.target.querySelector("A-MENU") : null;
				if(submenu) {
					let rect = event.target.getBoundingClientRect();
					submenu.show(rect.right - 10, rect.top - 10);
					this._submenu = submenu;
				}
			break;
			case "contextmenu":
				event.preventDefault();
			break;
			case "click":
				event.stopImmediatePropagation();
				this.hide();
			break;
		}
	}
	show(x, y, callback) {
		document.fonts
			.load('normal 1em Roboto')
			.then(()=>{
				super.show(x, y);
				this.rightButtonEnabled = false;
				this._callback = callback;
			})
	}
}
defineCustomElement("a-menu", Menu, t);return window.Menu=Menu;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:block;width:100%;height:100%}</style><slot></slot><!-- <a-dialog-ui> -->`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initMultiviewUI(window) {if(window.MultiviewUI) return window.MultiviewUI;initCustomElement(window);initDialogUI(window);with(window) {class MultiviewUI extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		addEventListener("hashchange", this._onHashChange.bind(this));
	}
	bind() {
		this.updateViewId();
		return this.updateView();
	}
	updateViewId() {
		this.viewId = location.hash.substr(1).split("?").shift();
	}
	updateView() {
		while(this.firstChild)
			this.firstChild.remove();
		const view = this.createView(this.viewId);
		this.appendChild(view);
		if(view.documentTitle)
			document.title = view.documentTitle;
		return view.isReady;
	}
	_onHashChange(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		DialogUI.CancelAll();
		var oldViewId = this.viewId;
		this.updateViewId();
		if(this.viewId != oldViewId) {
			this.updateView();
		}
		else {
			window.dispatchEvent(new CustomEvent("hashchange#"+this.viewId));
		}
	}
}
defineCustomElement("a-multiview-ui", MultiviewUI, t);return window.MultiviewUI=MultiviewUI;}}}
{function initNewsUI01Base(window) {if(window.NewsUI01Base) return window.NewsUI01Base;initCustomElement(window);with(window) {class NewsUI01Base extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this.updateColorScheme();
	}
	openItemInNewTab(itemEl) {
		api.browser.openInNewTab(itemEl.item.link, window);
	}
	openItemInNewWindow(itemEl, incognito) {
		api.browser.openInNewWindow(itemEl.item.link, incognito);
	}
	openItemInCurrentTab(itemEl) {
		api.browser.openInCurrentTab(itemEl.item.link);
	}
	updateColorScheme() {
		this.dataset.colorScheme = localStorage.getItem("news-ui/color-scheme") || "default";
	}
	setColorScheme(scheme) {
		localStorage.setItem("news-ui/color-scheme", scheme);
		this.updateColorScheme();
	}
}
return window.NewsUI01Base=NewsUI01Base;}}}
{function initNewsUI02Topbar(window) {if(window.NewsUI02Topbar) return window.NewsUI02Topbar;initNewsUI01Base(window);with(window) {class NewsUI02Topbar extends NewsUI01Base {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._title = shadowRoot.getElementById("title");
		this._topbar = shadowRoot.querySelector("a-topbar");
		this._topbar.addEventListener("click", this._onTopbarClick.bind(this));
		this._btnSidebar = shadowRoot.getElementById("btn-sidebar");
		this._btnSidebar.addEventListener("click", this._onSidebarButtonClick.bind(this));
	}
	updateTitle() {
		this._title.textContent = (this.selectedBookmarkId && this.selectedBookmark) ? this.selectedBookmark.title : "";
	}
	updateSidebarButtonBadge() {
		this._btnSidebar.dataset.badge = api.feedSubscriptionsStats.getUnreadItems() || "";
	}
	showTopbarShadow() {
		if(!this._topbar.classList.contains("shadow"))
			this._topbar.classList.add("shadow");
	}
	hideTopbarShadow() {
		if(this._topbar.classList.contains("shadow"))
			this._topbar.classList.remove("shadow");
	}
	_onTopbarClick(event) {
		if((event.target == this._title) && (this.selectedBookmark)) {
			location.href = this.selectedBookmark.url;
		}
		else if((event.target == this._topbar) || (event.target.slot == "center") ) {
			this.scrollToTop();
		}
	}
	_onSidebarButtonClick() {
		this.showSidebar();
	}
}
return window.NewsUI02Topbar=NewsUI02Topbar;}}}
{function initNewsUI03Sidebar(window) {if(window.NewsUI03Sidebar) return window.NewsUI03Sidebar;initNewsUI02Topbar(window);with(window) {class NewsUI03Sidebar extends NewsUI02Topbar {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._sidebar = shadowRoot.getElementById("sidebar");
		this._sidebar.addEventListener("click", this._onSidebarClick.bind(this));
	}
	createSidebarBookmarkItem(node) {
		var div = document.createElement("div");
		div.bookmarkNode = node;
		div.className = "sidebar-item sidebar-bookmark";
		var icon = document.createElement("a-bookmark-icon");
		icon.className = "sidebar-item-icon";
		icon.dataset.size = 40;
		icon.dataset.url = node.url;
		icon.loadIcon();
		div.appendChild(icon);
		var title = document.createElement("span");
		title.className = "sidebar-item-title";
		title.textContent = node.title;
		div.appendChild(title);
		return div;
	}
	updateSidebarBookmarks() {
		let sidebarBookmarks = this._sidebar.querySelector("#sidebar-bookmarks");
		sidebarBookmarks.innerHTML = "";
		const uniqueBookmarksMap = {};
		this.bookmarks.forEach(node=>{
			if(!uniqueBookmarksMap[node.url])
				uniqueBookmarksMap[node.url] = node;
		})
		Object.values(uniqueBookmarksMap).forEach(node=>
			sidebarBookmarks.appendChild(this.createSidebarBookmarkItem(node))
		)
	}
	updateSidebarSelected() {
		this._sidebar.querySelectorAll(".sidebar-bookmark").forEach(item=>{
			if(this.selectedBookmark && (item.bookmarkNode.url == this.selectedBookmark.url))
				item.classList.add("-selected");
			else
				item.classList.remove("-selected");
		});
		let sidebarShowAll = this._sidebar.querySelector("#sidebar-show-all");
		if(this.selectedBookmarkId)
			sidebarShowAll.classList.remove("-selected");
		else
			sidebarShowAll.classList.add("-selected");
	}
	updateSidebarBadges() {
		let sidebarShowAll = this._sidebar.querySelector("#sidebar-show-all");
		sidebarShowAll.dataset.badge = api.feedSubscriptionsStats.getUnreadItems() || "";
		let sidebarBookmarks = this._sidebar.querySelector("#sidebar-bookmarks");
		for(let child of sidebarBookmarks.children) {
			child.dataset.badge = api.feedSubscriptionsStats.getUnreadItemsByURL(child.bookmarkNode.url) || "";
		}
	}
	showSidebar() {
		this._sidebar.show();
	}
	_onSidebarClick(event) {
		if(event.target.bookmarkNode) {
			location.hash = location.hash.split("?").shift() + "?" + event.target.bookmarkNode.id;
		}
		else if(event.target.id == "sidebar-show-all") {
			location.hash = location.hash.split("?").shift();
		}
	}
}
return window.NewsUI03Sidebar=NewsUI03Sidebar;}}}
{function initNewsUI04List(window) {if(window.NewsUI04List) return window.NewsUI04List;initNewsUI03Sidebar(window);initJobQueueDialogUI(window);initAlertDialogUI(window);with(window) {const JOB_QUEUE_DIALOG_TIMEOUT = 3000;
const MARK_AS_READ_TIMEOUT = 1000;
const NEWS_DATE_OPTIONS = {  year: 'numeric', month: 'long', day: 'numeric' };
const NEWS_TIME_OPTIONS = { hour:'numeric', minute:'numeric' };
const DAY_IN_MS = 24 * 60 * 60 * 1000;
const TITLE_LINE_MAX_CHARS = 25;
const TITLE_LINE_HEIGHT = 20;
const TEXT_MAX_HEIGHT = 150;
const DESCRIPTION_LINE_HEIGHT = 15;
const ITEMS_MAX = 500;
const IMAGE_BACKGROUND_COLORS = ["#5f6170", "#5c657e", "#58656e", "#55597a", "#4b5e78", "#585c77", "#585f70", "#5f6576", "#575f6f", "#5f6d76"];
class NewsUI04List extends NewsUI03Sidebar {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._list = shadowRoot.getElementById("list");
		this._rememberScrollPos = this._rememberScrollPos.bind(this);
		this._onListClick = this._onListClick.bind(this);
		this._list.addEventListener("click", this._onListClick);
		this._list.addEventListener("auxclick", this._onListClick);
		this._list.addEventListener("scroll", this._onScroll.bind(this));
		this._intersectionObserver = new IntersectionObserver( this._onIntersection.bind(this), { root : this._list, threshold : 0, rootMargin : "50px 60px 100px 60px" } );
		this._showJobQueueDialogAfterTimeout = this._showJobQueueDialogAfterTimeout.bind(this);
	}
	createListItemEl(item, lastMidnight) {
		var el = document.createElement("div");
		el.item = item;
		el.className = "item";
		if(item.published > item.feed.lastReadItemPublished)
			el.classList.add("item-unread");
		var imageEl = document.createElement("div");
		imageEl.className = "item-image";
		el.style.setProperty("--item-image-background-color", IMAGE_BACKGROUND_COLORS[Math.floor(Math.random() * (IMAGE_BACKGROUND_COLORS.length - 1))]);
		el.appendChild(imageEl);
		var titleEl = document.createElement("h2");
		titleEl.className = "item-title";
		if(!this.selectedBookmarkId) {
			var pubNameEl = document.createElement("span");
			pubNameEl.className = "item-publisher";
			pubNameEl.textContent = item.feed.publisher.name;
			el.appendChild(pubNameEl);
		}
		const titleRowCount = Math.ceil(item.title.length / TITLE_LINE_MAX_CHARS);
		const descriptionMaxHeight = TEXT_MAX_HEIGHT - titleRowCount*TITLE_LINE_HEIGHT;
		const descriptionMaxLines = Math.floor(descriptionMaxHeight / DESCRIPTION_LINE_HEIGHT);
		el.style.setProperty("--item-description-max-lines", descriptionMaxLines);
		titleEl.appendChild(document.createTextNode(item.title));
		el.appendChild(titleEl);
		var descriptionEl = document.createElement("p");
		descriptionEl.className = "item-description";
		descriptionEl.textContent = item.description;// + bla;
		el.appendChild(descriptionEl);
		var pubTimeEl = document.createElement("div");
		pubTimeEl.className = "item-publication-time";
		var pubDate = new Date(item.published);
		var timestampStr;
		if(item.published >= (lastMidnight-DAY_IN_MS)) {
			timestampStr = chrome.i18n.getMessage((item.published >= lastMidnight) ? "today" : "yesterday")
				+ " – "
				+ pubDate.toLocaleTimeString(navigator.language, NEWS_TIME_OPTIONS);
		}
		else {
			timestampStr = pubDate.toLocaleDateString(navigator.language, NEWS_DATE_OPTIONS);
		}
		timestampStr = timestampStr;
		pubTimeEl.textContent = timestampStr;
		el.appendChild(pubTimeEl);
		this._intersectionObserver.observe(el);
		return el;
	}
	clear() {
		while(this._list.firstChild) {
			this._intersectionObserver.unobserve(this._list.firstChild);
			this._list.firstChild.remove();
		}
	}
	scrollToTop() {
		this._list.scrollTop = 0;
	}
	_clearJobQueue() {
		this._jobs = [];
		if(this._cancelAllJobs)
			this._cancelAllJobs();
		clearTimeout(this._jobQueueDialogTimeout);
		if(this._jobQueueDialogUI) {
			this._jobQueueDialogUI.cancel();
		}
	}
	_addToJobQueue(job) {
		this._jobs.push(job);
	}
	_showJobQueueDialogAfterTimeout() {
		this._jobQueueDialogTimeout = setTimeout(
			()=>{
				this._jobQueueDialogUI = showDialog(JobQueueDialogUI, { title:"Feeds", jobs:this._jobs }, this._showJobQueueDialogAfterTimeout, this._showJobQueueDialogAfterTimeout);
			},
			JOB_QUEUE_DIALOG_TIMEOUT
		);
	}
	_updateJobStatus(job, status) {
		job.status = status;
		if(this._jobQueueDialogUI)
			this._jobQueueDialogUI.updateJobs(this._jobs);
	}
	unbind() {
		super.unbind();
		this._clearJobQueue();
	}
	updateList() {
		const uniqueBookmarksMap = {};
		this.sourceBookmarks.forEach(node=>{
			if(!uniqueBookmarksMap[node.url])
				uniqueBookmarksMap[node.url] = node;
		})
		var urls = Object.keys(uniqueBookmarksMap);
		this.clear();
		if(!urls.length) {
			this._list.classList.add("error");
			return;
		}
		this._list.classList.remove("error");
		this._list.classList.remove("truncated");
		this.classList.add("loading");
		this._clearJobQueue();
		this._showJobQueueDialogAfterTimeout();
		return new Promise((resolve, reject) => {
			this._cancelAllJobs = reject;
			Promise.all(
				urls.map(
					url=>{
						let job = { title : uniqueBookmarksMap[url].title || url };
						return new Promise((resolve, reject)=>{
							job.cancelCallback = reject;
							this._addToJobQueue(job);
							api.feeds.getFeed(url)
								.then(feed => {
									feed.url = url;
									feed.lastReadItemPublished = api.feedSubscriptions.getLastReadItemPublished(url);
									feed.publisher = {
										name : (uniqueBookmarksMap[url].title || url),
										url : url
									};
									return feed;
								})
								.catch(error=>{
									showAlert(chrome.i18n.getMessage("error"), "The following feed could not be loaded: \n" + url + "\n\nError:\n" + error);
								})
								.then(resolve)
						})
						.then(feed=>{
							this._updateJobStatus(job, "complete");
							return feed;
						})
						.catch(()=>this._updateJobStatus(job, "cancelled"))
					}
				)
			)
			.then(resolve)
		})
		.then(feeds=>{
			this.classList.remove("loading");
			this._clearJobQueue();
			feeds = feeds.filter(feed=>!!feed);
			if(!feeds.length) {
				this._list.classList.add("error");
				return;
			}
			var items = [];
			var lastMidnight = new Date();
			lastMidnight.setHours(0,0,0,0);
			for(let feed of feeds) {
				for(let item of feed.items)	{
					item.feed = feed;
					items.push(item);
				}
			}
			items
				.sort((a,b) => (b.published-a.published));
			var isTruncated = false;
			if(items.length > ITEMS_MAX) {
				isTruncated = true;
				items = items.slice(0, ITEMS_MAX);
				this._list.classList.add("truncated");
			}
			items.forEach((item, i) => {
				var element = this.createListItemEl(item, lastMidnight);
				element.style.opacity = 0;
				this._list.appendChild(element)
			});
			this._resetScrollPos();
			setTimeout(()=>feeds.forEach(feed=>api.feedSubscriptions.reset(feed.url, feed.latestItemPublished)), MARK_AS_READ_TIMEOUT);
		})
	}
	_onIntersection(entries) {
		let i = 0;
		for(let entry of entries) {
			const itemEl = entry.target;
			if(entry.isIntersecting) {
				itemEl.style.transition = "opacity 250ms "+((i++)*20)+"ms";
				const item = itemEl.item;
				if(item.image) {
					const img = new Image();
					img.onload = ()=>{
						itemEl.style.setProperty("--item-image", "url("+item.image+")");
						itemEl.classList.add("image-loaded");
					}
					img.src = item.image;
				}
				this._intersectionObserver.unobserve(itemEl);
			}
			itemEl.style.opacity = null;
		}
	}
	_onListClick(event) {
		switch(event.which) {
			case 1:
				if(event.target.classList.contains("item")) {
					if(event.ctrlKey || event.metaKey)
						this.openItemInNewTab(event.target);
					else if(event.shiftKey)
						this.openItemInNewWindow(event.target);
					else
						this.openItemInCurrentTab(event.target);
				}
			break
			case 2:
				this.openItemInNewTab(event.target);
			break;
		}
	}
	_resetScrollPos() {
		var state = history.state;
		if(state && state["scrollTop-"+this.id])
			this._list.scrollTop = state["scrollTop-"+this.id];
		else
			this._list.scrollTop = 0;
	}
	_rememberScrollPos() {
		var state = history.state || {};
		state["scrollTop-"+this.id] = this._list.scrollTop;
		history.replaceState(state, null);
	}
	_onScroll(event) {
		if(this._list.scrollTop)
			this.showTopbarShadow();
		else
			this.hideTopbarShadow();
		clearTimeout(this.__onScrollThrottleTimout);
		this.__onScrollThrottleTimout = setTimeout(this._rememberScrollPos, 500);
	}
}
return window.NewsUI04List=NewsUI04List;}}}
{function initNewsUI05ReloadButton(window) {if(window.NewsUI05ReloadButton) return window.NewsUI05ReloadButton;initNewsUI04List(window);with(window) {class NewsUI05ReloadButton extends NewsUI04List  {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._reload = shadowRoot.getElementById("reload");
		this._reload.addEventListener("click", this._onReloadButtonClick.bind(this));
	}
	updateReloadButton() {
		this._reload.textContent = api.feedSubscriptionsStats.getUnreadItems(this.selectedBookmark ? this.selectedBookmark.id : null) || "";
	}
	hideReloadButton() {
		this._reload.textContent = "";
	}
	_onReloadButtonClick() {
		this.hideReloadButton();
		this.updateList();
	}
}
return window.NewsUI05ReloadButton=NewsUI05ReloadButton;}}}
{function initNewsUI06Binding(window) {if(window.NewsUI06Binding) return window.NewsUI06Binding;initNewsUI05ReloadButton(window);initAlertDialogUI(window);with(window) {class NewsUI06Binding extends NewsUI05ReloadButton {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._onHashChange = this._onHashChange.bind(this);
		this._onFeedSubscriptionsBookmarksChange = this._onFeedSubscriptionsBookmarksChange.bind(this);
		this._onFeedSubscriptionsStatsChange = this._onFeedSubscriptionsStatsChange.bind(this);
	}
	checkHostPermissions() {
		return api.feedSubscriptions
			.getFeedsWithoutHostPermissions()
			.then(urls=>
				new Promise((resolve,reject)=>
					urls.length
					?
					showAlert(chrome.i18n.getMessage("error"), "The news feed could not be loaded because the extension has not the permission to download it.\n\nClick OK to grant missing permissions.", ()=>chrome.permissions.request({origins:urls}, granted => granted ? resolve() : reject()))
					:
					resolve()
				)
			)
	}
	_update() {
		var bookmarks, selectedBookmarkId, selectedBookmark, sourceBookmarks;
		bookmarks = api
			.feedSubscriptionsBookmarks
			.getBookmarks()
			.sort((a, b) => {
				var ta = a.title ? a.title.toUpperCase() : "ZZZ";
				var tb = b.title ? b.title.toUpperCase() : "ZZZ";
				return (ta < tb) ? -1 : ((ta > tb) ? 1 : 0)
			});
		var t = location.hash.split("?")
		selectedBookmarkId = (t.length == 2) ? t[1] : null;
		if(selectedBookmarkId) {
			for(let node of bookmarks) {
				if(node.id == selectedBookmarkId) {
					selectedBookmark = node;
					break;
				}
			}
		}
		sourceBookmarks = selectedBookmarkId ? (selectedBookmark ? [selectedBookmark] : []) : bookmarks;
		var bookmarksChange, selectedBookmarkIdChange, selectedBookmarkChange, sourceBookmarksChange;
		bookmarksChange = JSON.stringify(bookmarks) != JSON.stringify(this._bookmarks);
		this._bookmarks = bookmarks;
		selectedBookmarkIdChange = selectedBookmarkId !== this._selectedBookmarkId;
		this._selectedBookmarkId = selectedBookmarkId;
		selectedBookmarkChange = JSON.stringify(selectedBookmark) != JSON.stringify(this._selectedBookmark);
		this._selectedBookmark = selectedBookmark;
		sourceBookmarksChange = JSON.stringify(sourceBookmarks) != JSON.stringify(this._sourceBookmarks);
		this._sourceBookmarks = sourceBookmarks;
		if(bookmarksChange) {
			this.updateSidebarBookmarks();
			this.updateSidebarBadges();
			this.updateSidebarButtonBadge();
		}
		if(selectedBookmarkIdChange || selectedBookmarkChange) {
			this.updateTitle();
			this.updateSidebarSelected();
		}
		if(sourceBookmarksChange) {
			this.updateList();
		}
		this.updateReloadButton();
		this.hideReloadButton();
	}
	update() {
		return this.checkHostPermissions()
			.then(()=>this._update())
	}
	get bookmarks() {
		return this._bookmarks;
	}
	get selectedBookmarkId() {
		return this._selectedBookmarkId;
	}
	get selectedBookmark() {
		return this._selectedBookmark;
	}
	get sourceBookmarks() {
		return this._sourceBookmarks;
	}
	_onHashChange(event) {
		this.update();
	}
	_onFeedSubscriptionsBookmarksChange(event) {
		this.update();
	}
	_onFeedSubscriptionsStatsChange(event) {
		this.updateSidebarBadges();
		this.updateSidebarButtonBadge();
		this.updateReloadButton();
	}
	bind() {
		super.bind();
		addEventListener("hashchange#news", this._onHashChange);
		addEventListener("feedSubscriptionsBookmarks/change", this._onFeedSubscriptionsBookmarksChange);
		addEventListener("feedSubscriptionsStats/change", this._onFeedSubscriptionsStatsChange);
		this.update();
	}
	unbind() {
		super.unbind();
		removeEventListener("hashchange#news", this._onHashChange);
		removeEventListener("feedSubscriptionsBookmarks/change", this._onFeedSubscriptionsBookmarksChange);
		removeEventListener("feedSubscriptionsStats/change", this._onFeedSubscriptionsStatsChange);
		this.clear();
		this._bookmarks = null;
		this._selectedBookmarkId = null;
		this._selectedBookmark = null;
		this._sourceBookmarks = null;
	}
}
return window.NewsUI06Binding=NewsUI06Binding;}}}
{function initNewsUI07Menu(window) {if(window.NewsUI07Menu) return window.NewsUI07Menu;initNewsUI06Binding(window);with(window) {class NewsUI07Menu extends NewsUI06Binding {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._menu = shadowRoot.getElementById('menu')
		this.initMenu("contextmenu", this._menu, shadowRoot);
		shadowRoot.addEventListener("action", this._onAction.bind(this), true);
		this._onMenu = this._onMenu.bind(this);
		shadowRoot.addEventListener("contextmenu", this._onMenu, true);
		shadowRoot.getElementById("btn-menu").addEventListener("click", this._onMenu, true);
	}
	_onMenu(event) {
		this._menu.dataset.menu = event.target.classList.contains("item") ? "item" : "list";
	}
	_onAction(event) {
		event.preventDefault();
		var context = event.detail.context;
		switch(event.detail.name) {
			case "back":
				history.back();
			break;
			case "forward":
				history.forward();
			break;
			case "color-scheme-default":
				this.setColorScheme("default");
			break;
			case "color-scheme-dark":
				this.setColorScheme("dark");
			break;
			case "settings":
				api.settingsWindow.show("news");
			break;
			case "help":
				api.helpDoc.show(window);
			break;
			case "support":
				api.helpDoc.show(window, "support");
			break;
			case "about":
				api.helpDoc.show(window, "about");
			break;
			case "open-link-in-new-tab":
				this.openItemInNewTab(context.target);
			break;
			case "open-link-in-new-window":
				this.openItemInNewWindow(context.target);
			break;
			case "open-link-in-new-incognito-window":
				this.openItemInNewWindow(context.target, true);
			break;
			default:
				console.log(event.detail.name, event);
			break;
		}
	}
}
return window.NewsUI07Menu=NewsUI07Menu;}}}
{const t = document.createElement("template");t.innerHTML = `<style>@keyframes fadeIn{to{opacity:1}}:host([data-color-scheme=default]){--news-background-color:#F2F2F2;--news-background-color-components:white;--news-color:#313131;--news-color-highlight:black;--news-sidebar-background-color-highlight:#f3f7fe;--icon-invert:100%;--scrollbar-color:#ccc;--scrollbar-color-hover:#aaa;--sidebar-background-color:white;--sidebar-border-color:#eee}:host([data-color-scheme=dark]){--news-background-color:#0f0f0f;--news-background-color-components:#191919;--news-color:white;--news-color-highlight:white;--news-sidebar-background-color-highlight:#333;--icon-invert:0%;--scrollbar-color:#555;--scrollbar-color-hover:#999;--sidebar-background-color:#191919;--sidebar-border-color:#333}#container{width:100%;height:100%;background-color:var(--news-background-color)}:host{font-family:"Roboto";display:block;width:100%;height:100%}a-menu[data-menu="item"]>:not([data-menu~="item"]){display:none}a-menu[data-menu="list"]>:not([data-menu~="list"]){display:none}a-topbar{position:absolute;z-index:1;background-color:var(--news-background-color-components);color:var(--news-color-highlight)}a-topbar h1{font-size:14px}a-topbar a-button{background-color:var(--news-background-color-components);color:var(--news-color);margin:0 10px}a-topbar #title:not(:empty):after{content:'|';margin-left:10px}a-topbar #title:not(:empty)~a-timestamp{margin-left:10px;font-weight:normal}a-topbar #title:not(:empty):hover{text-decoration:underline;cursor:pointer}#reload{z-index:2;position:fixed;top:56px;left:50%;transform:translateX(-50%);background-color:#E00606;color:white;padding:10px 20px 10px 40px;border-radius:6px;box-shadow:0 0 3px 3px rgba(0,0,0,0.1);font-size:14px;font-weight:500;text-align:right;background-image:url('ui/icon/icon-reload.svg');background-repeat:no-repeat;background-size:35px;background-position:5px 0;cursor:pointer}#reload:after{content:'';position:absolute;top:0;left:50%;border:10px solid transparent;border-bottom-color:#E00606;transform:translate(-50%, -100%)}#reload:empty{display:none}#list-container{position:absolute;top:56px;bottom:0;left:0;width:100%;overflow-y:overlay;padding:50px 60px 100px 60px}#list-container::-webkit-scrollbar{width:24px}#list-container::-webkit-scrollbar-thumb:vertical{border-radius:12px;background-clip:padding-box;border:9px solid transparent;min-height:100px}#list-container::-webkit-scrollbar-thumb{background-color:var(--scrollbar-color)}#list-container::-webkit-scrollbar-thumb:hover{background-color:var(--scrollbar-color-hover)}#list{display:grid;grid-gap:40px 20px;grid-template-columns:repeat(auto-fill, 300px);grid-auto-rows:500px;justify-content:center;color:var(--news-color)}#list .item{position:relative;background-color:var(--news-background-color-components);box-shadow:0 0 3px 3px rgba(0,0,0,0.04);cursor:pointer;padding:251px 30px 26px 30px}#list .item>*{left:0;width:100%;pointer-events:none}#list .item:after,#list .item:before{position:absolute;display:block;content:''}#list .item.item-unread:after{background-color:#E00606;width:16px;height:16px;border-radius:8px;top:26px;right:30px}#list .item:before{top:0;left:0;height:225px;width:100%;background-color:var(--item-image-background-color, #333)}#list .item-image{position:absolute;top:0;height:225px;width:100%;background-image:var(--item-image);background-size:cover;background-repeat:no-repeat;background-position:center;transition:filter 150ms;filter:opacity(0%)}#list .item.image-loaded .item-image{filter:opacity(100%)}#list .item-publisher,#list .item-publication-time,#list .item-description,#list .item-title{text-overflow:ellipsis;overflow:hidden}#list .item-title,#list .item-description{display:-webkit-box;-webkit-box-orient:vertical}#list .item-title{font-weight:bold;font-size:18px;-webkit-line-clamp:5;line-height:20px;max-height:100px;margin:0}#list .item-publisher,#list .item-publication-time{display:block;font-size:10px;white-space:nowrap;width:100%}#list .item-publisher{font-weight:500;margin:0 0 16px 0}#list .item-description{-webkit-line-clamp:var(--item-description-max-lines, 5);font-size:12px;line-height:15px;max-height:calc(var(--item-description-max-lines)*15px)}#list .item-publication-time{position:absolute;left:30px;bottom:26px;color:#8c8c8c}#list.error{background-image:url(ui/news-ui/news-ui-feed-error.svg);background-position:center;background-repeat:no-repeat}#list.truncated:after{content:"List is truncated! (Maximum number of items: 500)";display:block;border-top:1px solid #555;padding:20px 0 0 0;color:var(--news-color)}:host(.loading) #list:after{content:'';display:block;opacity:0;position:absolute;width:100px;height:100px;left:50%;top:50%;transform:translate(-50%, -50%);background-image:url(/ui/news-ui/news-ui-preloader.svg);background-position:center;background-repeat:no-repeat;animation:.3s linear 1s forwards fadeIn}[data-badge]:not([data-badge=""]):after{content:attr(data-badge);display:inline-block;height:22px;border-radius:11px;background-color:#E00606;color:white;font-size:9px;line-height:21px;padding:1px 14px;font-weight:bold;box-sizing:border-box}#btn-sidebar{position:relative}#btn-sidebar:after{position:absolute;padding:1px 9px;left:26px;top:0}#sidebar{position:absolute;z-index:3;color:var(--news-color)}#sidebar>*{overflow:hidden}#sidebar .sidebar-item{min-height:56px;max-width:400px;min-width:300px;display:flex;align-items:center;justify-content:stretch;padding:10px 24px 10px 24px;cursor:pointer}#sidebar .sidebar-item:hover{color:var(--news-color-highlight)}#sidebar .sidebar-item *{pointer-events:none}#sidebar .sidebar-item.-selected{background-color:var(--news-background-color)}#sidebar .sidebar-item-icon{width:40px;height:40px;border:1px solid var(--news-background-color);border-radius:3px;margin-right:10px;vertical-align:middle}#sidebar .sidebar-item-title{flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:40px}#sidebar-bookmarks{padding:20px 0}:host-context([data-bidi=rtl]) #list .item-publication-time{left:auto;right:30px}</style><!--	require ...	<a-job-queue-dialog-ui>	<a-bookmark-icon>	tabindex fixes focus-scroll--><a-menu id="menu">	<a-menuitem data-menu="item" data-action="open-link-in-new-tab" data-i18n="open_in_new_tab"></a-menuitem>	<a-menuitem data-menu="item" data-action="open-link-in-new-window" data-i18n="open_in_new_window"></a-menuitem>	<a-menuitem data-menu="item" data-action="open-link-in-new-incognito-window" data-i18n="open_in_incognito_window"></a-menuitem>	<a-menuitem data-menu="list" data-action="back" data-i18n="back"></a-menuitem>	<a-menuitem data-menu="list" data-action="forward" data-i18n="forward"></a-menuitem>	<hr data-menu="list">	<a-menuitem data-menu="list">		<span data-i18n="colors_"></span>		<a-menu id="menu">			<a-menuitem data-action="color-scheme-default" data-i18n="default"></a-menuitem>			<a-menuitem data-action="color-scheme-dark" data-i18n="dark"></a-menuitem>		</a-menu>	</a-menuitem>	<hr data-menu="list">	<a-menuitem data-menu="list" data-action="settings" data-i18n="settings"></a-menuitem>	<hr data-menu="list">	<a-menuitem data-menu="list">		<span data-i18n="help"></span>		<a-menu>			<a-menuitem data-action="help" data-i18n="help"></a-menuitem>			<a-menuitem data-action="support" data-i18n="support">Support</a-menuitem>			<a-menuitem data-action="about" data-i18n="about"></a-menuitem>		</a-menu>	</a-menuitem></a-menu><div id="container">	<a-topbar>		<a-button id="btn-sidebar" data-icon="menu" slot="left"></a-button>		<h1 slot="center"><span id="title"></span><a-timestamp></a-timestamp></h1>		<a-button id="btn-menu" data-icon="contextmenu" data-menu="menu" slot="right"></a-button>	</a-topbar>	<div id="list-container">		<div id="list"></div>	</div>	<div id="reload"></div>	<a-sidebar id="sidebar">		<h1 slot="header">News</h1>		<div id="sidebar-show-all" class="sidebar-item">			<span class="sidebar-item-title" data-i18n="show_all"></span>		</div>		<div id="sidebar-bookmarks"></div>	</a-sidebar></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initNewsUI(window) {if(window.NewsUI) return window.NewsUI;initNewsUI07Menu(window);initFeedSubscriptionTutorialUI(window);initJobQueueDialogUI(window);initBookmarkIcon(window);initMenu(window);initTopbar(window);initButton(window);initTimestamp(window);initSidebar(window);with(window) {class NewsUI extends NewsUI07Menu {
	init(shadowRoot) {
		super.init(shadowRoot);
	}
	bind() {
		super.bind();
		if(!api.feedSubscriptionsBookmarks.getBookmarks().length) {
			showDialog(FeedSubscriptionTutorialUI, {}, ()=>{
				history.back();
			});
		}
	}
}
defineCustomElement("a-news-ui", NewsUI, t);return window.NewsUI=NewsUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style></style>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initNewtabUI(window) {if(window.NewtabUI) return window.NewtabUI;initMultiviewUI(window);with(window) {const I18N_NEWTAB = chrome.i18n.getMessage("new_tab");
const I18N_HELP = chrome.i18n.getMessage("help");
class NewtabUI extends MultiviewUI {
	init(shadowRoot) {
		super.init(shadowRoot);
		addEventListener("settings/show-dash", ()=>{
			if(api.settings.get("show-dash")) {
				if(!location.hash.startsWith("#dash"))
					location.hash = "#dash";
			}
			else if(location.hash.startsWith("#dash")) {
				location.hash = "#bookmarks";
			}
		})
		addEventListener("settings/show-dock", ()=>{
			if(!location.hash.startsWith("#bookmarks"))
				location.hash = "#bookmarks";
		});
	}
	createView(viewId) {
		let v;
		switch(viewId) {
			case "dash":
				initDashUI(window);
				v = document.createElement("a-dash-ui");
				v.id = "dash";
				v.documentTitle = I18N_NEWTAB;
				return v;
			break;
			case "bookmarks":
				initBookmarksUI(window);
				v = document.createElement("a-bookmarks-ui");
				v.id = "bookmarks";
				v.dataset.disableLayoutSettings = false;
				v.documentTitle = I18N_NEWTAB;
				return v;
			break;
			case "search":
				initSearchUI(window);
				v = document.createElement("a-search-ui");
				v.dataset.useRedirect = true;
				v.id = "search";
				v.documentTitle = I18N_NEWTAB;
				return v;
			break;
			case "news":
				initNewsUI(window);
				v = document.createElement("a-news-ui");
				v.id = "news";
				v.documentTitle = "News";
				return v;
			break;
			case "games":
				initLinkDirectoryUI(window);
				v = document.createElement("a-link-directory-ui");
				v.id = "games";
				v.dataset.src = "/data/games.json";
				v.documentTitle = "Games";
				return v;
			break;
			case "help":
				initDocViewerUI(window);
				v = document.createElement("a-doc-viewer-ui");
				v.id = "help";
				v.dataset.src = "/help";
				v.documentTitle = I18N_HELP;
				return v;
			break;
		}
		return this.createView(api.settings.get("show-dash") ? "dash" : "bookmarks");
	}
}
defineCustomElement("a-newtab-ui", NewtabUI, t);return window.NewtabUI=NewtabUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:inline-block;vertical-align:top;margin-bottom:.5em;cursor:pointer}span::before{content:' ';display:inline-block;vertical-align:middle;width:16px;height:16px;border:1px solid #e8e8e8;margin:0 10px 0 0;background-color:white;background-repeat:no-repeat}:host(.-selected) span::before{background-color:#3367D6}::slotted(:not([slot=ui])){pointer-events:none}:host(:not(.-selected)) ::slotted([slot=ui]){filter:grayscale(100%);pointer-events:none;opacity:.5}:host-context(a-selector:not([data-multiple])):host(.-selected){pointer-events:none}:host-context(a-selector:not([data-multiple])):host(.-selected) ::slotted([slot=ui]){pointer-events:all}:host(.-selected) span::before{background-image:url(ui/option/option_checkmark.svg)}:host-context(a-selector:not([data-multiple])) span::before{border-radius:30px}:host-context(a-selector:not([data-multiple])):host(.-selected) span::before{background-image:url(ui/option/option_radio.svg)}:host-context([data-bidi=rtl]) span::before{margin:0 0 0 10px}</style><span tabindex="0"></span><slot></slot><slot name="ui"></slot>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initOption(window) {if(window.Option) return window.Option;initCustomElement(window);with(window) {class Option extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this.addEventListener("click", this);
		this.addEventListener("keyup", this);
		this.addEventListener("keydown", this);
		if(this.dataset.value)
			this.value = this.dataset.value;
	}
	handleEvent(event) {
		switch(event.type) {
			case "click":
				if(event.target == this)
					this.toggle();
			break;
			case "keyup":
				if(event.keyCode == 32)
					this.toggle();
			break;
			case "keydown":
				if(event.keyCode == 32)
					event.preventDefault();
			break;
		}
	}
	toggle() {
		this.checked = !this.checked;
		this.dispatchEvent(new Event('change', { bubbles : true}));
	}
	get checked() {
		return this.classList.contains("-selected");
	}
	set checked(value) {
		if(value)
			this.classList.add("-selected");
		else
			this.classList.remove("-selected");
	}
	get value() {
		return this.checked ? "true" : "false";
	}
	set value(value) {
		this.checked = (value == "true");
	}
}
defineCustomElement("a-option", Option, t);return window.Option=Option;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{padding:20px;background-color:white;width:250px}a-popover-bookmark-folder-selector{width:100%;margin:0 0 10px 0}a-button{width:100px}a-button[data-i18n="remove"]{margin-right:10px}</style><a-popover-bookmark-folder-selector></a-popover-bookmark-folder-selector><br><a-button data-i18n="remove" class="invert"></a-button><a-button data-i18n="ok"></a-button>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initPopoverBookmarkEditor(window) {if(window.PopoverBookmarkEditor) return window.PopoverBookmarkEditor;initPopover(window);initPopoverBookmarkFolderSelector(window);initButton(window);with(window) {class PopoverBookmarkEditor extends Popover {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._folderSelector = shadowRoot.querySelector("a-popover-bookmark-folder-selector");
		shadowRoot.addEventListener("click", this);
	}
	show(url, title, x,y) {
		api.bookmarks.search({url}, nodes=>{
			if(nodes && nodes.length) {
				this._node = nodes[0];
				this._folderSelector.value = this._node.parentId;
				super.show(x,y);
			}
			else {
				api.bookmarks.safecreate({
					url,
					title,
					parentId : localStorage.getItem('popover-bookmark-editor/folder') || "1"
				},
				node=>{
					if(node) {
						this._node = node;
						this._folderSelector.value = this._node.parentId;
						super.show(x,y);
					}
					else {
						console.log("PopoverBookmarkEditor: cannot create bookmark!");
					}
				})
			}
		})
	}
	handleEvent(event) {
		switch(event.target.dataset.i18n) {
			case "ok":
				if(this._node.parentId != this._folderSelector.value) {
					localStorage.setItem('popover-bookmark-editor/folder', this._folderSelector.value);
					api.bookmarks.move(this._node.id, {
						parentId : this._folderSelector.value
					});
				}
				this.hide();
			break;
			case "remove":
				api.bookmarks.remove(this._node.id);
				this.hide();
			break;
		}
	}
}
defineCustomElement("a-popover-bookmark-editor", PopoverBookmarkEditor, t);return window.PopoverBookmarkEditor=PopoverBookmarkEditor;}}}
{const t = document.createElement("template");t.innerHTML = `<style></style>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initPopoverBookmarkFolderSelector(window) {if(window.PopoverBookmarkFolderSelector) return window.PopoverBookmarkFolderSelector;initPopoverSelector(window);with(window) {class PopoverBookmarkFolderSelector extends PopoverSelector {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._loadBookmarks();
		if(this.dataset.value)
			this.value = this.dataset.value;
	}
	_loadBookmarks() {
		this._bookmarksReady = new Promise(resolve=>{
			chrome.bookmarks.getTree(bookmarkTreeNodes=>{
				this.innerHTML = ""; // clear
				this._addOptions(bookmarkTreeNodes, "");
				resolve();
			});
		})
	}
	_addOptions(bookmarkTreeNodes, spaceBefore) {
		bookmarkTreeNodes.forEach(bookmarkTreeNode=>{
			if(bookmarkTreeNode.children) {
				if(bookmarkTreeNode.id != "0") {
					let div = document.createElement("div");
					div.innerHTML = spaceBefore + "▸&nbsp;&nbsp;" +  bookmarkTreeNode.title;
					div.dataset.option = bookmarkTreeNode.id;
					this.appendChild(div);
				}
				if(bookmarkTreeNode.children && bookmarkTreeNode.children.length) {
					this._addOptions(bookmarkTreeNode.children, spaceBefore + "&nbsp");
				}
			}
		})
	}
	set value(value) {
		this._value = value;
		this._bookmarksReady.then(()=>{
			super.value = this._value;
		})
	}
	get value() {
		return this._value;
	}
	handlEvent(event) {
		_loadBookmarks();
	}
	bind() {
		addEventListener("bookmarks/created", this);
		addEventListener("bookmarks/removed", this);
		addEventListener("bookmarks/changed", this);
		addEventListener("bookmarks/moved", this);
		addEventListener("bookmarks/childrenReordered", this);
	}
	uinbind() {
		removeEventListener("bookmarks/created", this);
		removeEventListener("bookmarks/removed", this);
		removeEventListener("bookmarks/changed", this);
		removeEventListener("bookmarks/moved", this);
		removeEventListener("bookmarks/childrenReordered", this);
	}
}
defineCustomElement("a-popover-bookmark-folder-selector", PopoverBookmarkFolderSelector, t);return window.PopoverBookmarkFolderSelector=PopoverBookmarkFolderSelector;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:inline-block}#button{width:100%;display:inline-block;padding:8px 30px 8px 20px;color:inherit;background-color:white;border:1px solid #ccc;vertical-align:middle;border-radius:3px;font-weight:500;text-align:left;cursor:pointer;white-space:nowrap;overflow:hidden;position:relative}#button(:focus),#button(:hover){background-color:#5580dd}#button(:active){background-color:#285bc7}#button:after{width:30px;height:100%;background-color:white;content:'▾';position:absolute;right:0;top:0;text-align:center;line-height:30px}#popover{display:none;position:fixed;background:white;box-shadow:3px 3px 3px 3px rgba(0,0,0,0.2);overflow-y:auto;z-index:1000}#popover.open{display:block}::slotted([data-option]){padding:8px 20px;cursor:pointer}::slotted([data-option]:hover){background-color:#F8F9FA}::slotted([data-option].-selected){background-color:#CAE2F9;color:#212B3B}</style><span id="button"></span><div id="popover"><slot></slot></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initPopoverSelector(window) {if(window.PopoverSelector) return window.PopoverSelector;initCustomElement(window);with(window) {class PopoverSelector extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._shadowRoot = shadowRoot;
		this._popover = shadowRoot.getElementById("popover");
		this._button = shadowRoot.querySelector("#button");
		this._button.addEventListener("mousedown", this, true);
		this.addEventListener("mousedown", this);
		this.addEventListener("mouseup", this);
		this.addEventListener("mouseover", this);
		this.addEventListener("mouseout", this);
		this.addEventListener("keydown", this);
		new MutationObserver(()=>{ this.value = this.value;	}).observe(this, { childList:true, subtree:true });
		if(this.dataset.value)
			this.value = this.dataset.value;
	}
	updateButton(label) {
		this._button.textContent = label;
	}
	get items() {
		return Array.from(this.querySelectorAll("*[data-option]"));
	}
	get value() {
		let items = this.items;
		for(let i=0; i<items.length; i++) {
			if(items[i].classList.contains("-selected")) {
				return isNaN(+items[i].dataset.option) ? items[i].dataset.option : +items[i].dataset.option;
			}
		}
		return null;
	}
	set value(value) {
		value = ""+value;
		let items = this.items;
		let label = "---";
		for(let i=0; i<items.length; i++) {
			if(value == items[i].dataset.option) {
				items[i].classList.add("-selected")
				label = items[i].textContent;
			}
			else
				items[i].classList.remove("-selected")
		}
		this.updateButton(label);
	}
	selectItem(item) {
		if(!item.classList.contains("-selected") && item.dataset.option) {
			this.value = item.dataset.option;
			this.dispatchEvent(new Event('change', { bubbles : true}));
		}
		this.hidePopover();
	}
	highlightItem(items, item, scrollIntoView) {
		for(let i=0; i<items.length; i++) {
			if(item == items[i]) {
				items[i].classList.add("-highlighted")
				if(scrollIntoView)
					items[i].scrollIntoView();
			}
			else
				items[i].classList.remove("-highlighted")
		}
	}
	highlightItemIndex(items, si, scrollIntoView) {
		this.highlightItem(items, items[si], scrollIntoView);
	}
	getHighlightedItem(items) {
		for(let i=0; i<items.length; i++) {
			if(items[i].classList.contains("-highlighted"))
				return items[i];
		}
		return null;
	}
	getHighlightedItemIndex(items) {
		return items.indexOf(this.getHighlightedItem(items));
	}
	highlightPrevious(items) {
		let si = this.getHighlightedItemIndex(items);
		si--;
		if(si<0)
			si = items.length - 1;
		this.highlightItemIndex(items, si, true);
	}
	highlightNext(items) {
		let si = this.getHighlightedItemIndex(items);
		si++;
		if(si>=items.length)
			si = 0;
		this.highlightItemIndex(items, si, true);
	}
	isPopoverVisible() {
		return this._popover.classList.contains("open");
	}
	showPopover() {
		this._popover.style.left = "0px";
		this._popover.style.top = "0px";
		this._popover.classList.add("open");
		this._popover.style.opacity = "0";
		var rp = this._popover.getBoundingClientRect();
		var rb = this._button.getBoundingClientRect();
		this._popover.style.minWidth = rb.width + "px";
		this._popover.style.left = (rb.left-rp.left) + "px";
		if((document.documentElement.clientHeight-rb.bottom)>100) {
			this._popover.style.top = (rb.bottom-rp.top) + "px";
			this._popover.style.bottom = Math.max(0, document.documentElement.clientHeight-(rb.bottom+rp.height)-rp.top) + "px";
		}
		else {
			this._popover.style.top = Math.max(0, (rb.top-rp.top-rp.height)) + "px";
			this._popover.style.bottom = (document.documentElement.clientHeight-rb.top-rp.top) + "px";
		}
		this._popover.style.opacity = null;
/*
		var rect = this._button.getBoundingClientRect();
		var popoverHeight = this._popover.clientHeight;
		this._popover.style.minWidth = rect.width + "px";
		this._popover.style.left = rect.left + "px";
		if((document.documentElement.clientHeight-(rect.y + rect.height))>100) {
			this._popover.style.top = (rect.y + rect.height) + "px";
			this._popover.style.bottom = Math.max(0, document.documentElement.clientHeight - (rect.y + rect.height + popoverHeight)) + "px";
		}
		else {
			this._popover.style.top = Math.max(0, (rect.y - popoverHeight)) + "px";
			this._popover.style.bottom = (document.documentElement.clientHeight-rect.y) + "px";
		}
*/
		window.addEventListener("mousedown", this);
		window.addEventListener("scroll", this);
		window.addEventListener("resize", this);
		this.addEventListener("blur", this);
	}
	hidePopover() {
		this._popover.classList.remove("open");
		this.highlightItem(this.items);
		window.removeEventListener("mousedown", this);
		window.removeEventListener("scroll", this);
		window.removeEventListener("resize", this);
		this.removeEventListener("blur", this);
		this._popover.style.top = null;
		this._popover.style.bottom = null;
	}
	handleEvent(event) {
		switch(event.type) {
			case "mousedown":
				if(event.target == this._button) {
					event.stopPropagation();
					if(this.isPopoverVisible())
						this.hidePopover();
					else
						this.showPopover();
				}
				else if(this.contains(event.target))
					event.stopPropagation();
				else
					this.hidePopover();
			break;
			case "mouseover":
				this.highlightItem(this.items, event.target);
			break;
			case "mouseout":
				event.target.classList.remove("-highlighted");
			break;
			case "mouseup":
				if(event.target.dataset.option) {
					this.selectItem(event.target);
				}
			break;
			case "keydown":
				switch(event.keyCode) {
					case 37: // left
					case 38: // up
						if(!this.isPopoverVisible())
							this.showPopover();
						this.highlightPrevious(this.items);
						event.preventDefault();
					break;
					case 39: // right
					case 40: // down
						if(!this.isPopoverVisible())
							this.showPopover();
						this.highlightNext(this.items);
						event.preventDefault();
					break;
					case 9: // tab
						if(!this.isPopoverVisible())
							break;
						event.preventDefault();
					case 32: // space
					case 13: // enter
						if(!this.isPopoverVisible())
							this.showPopover();
						else {
							let item = this.getHighlightedItem(this.items);
							if(item)
								this.selectItem(item);
						}
					break;
					case 27:
						if(this.isPopoverVisible())
							this.hidePopover();
					break;
				}
			break;
			case "resize":
			case "scroll":
			case "blur":
				this.hidePopover();
			break;
		}
	}
}
defineCustomElement("a-popover-selector", PopoverSelector, t);return window.PopoverSelector=PopoverSelector;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:none;position:fixed;z-index:1000000;min-width:100px;left:0;box-shadow:2px 2px 4px 3px rgba(0,0,0,0.15)}:host(.-visible){display:block}</style>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initPopover(window) {if(window.Popover) return window.Popover;initCustomElement(window);with(window) {const PAGE_OFFSET = 20;
const POINTER_OFFSET = 10;
class Popover extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._onMousedownOrResizeOrWheel = this._onMousedownOrResizeOrWheel.bind(this);
		this._mouseInside = false;
		this.addEventListener("mouseenter", ()=>{
			this._mouseInside = true;
		});
		this.addEventListener("mouseleave", ()=>{
			this._mouseInside = false;
		});
	}
	show(x, y) {
		this.style.left = "0px";
		this.style.top = "0px";
		this.style.opacity = "0";
		this.classList.add("-visible");
		requestAnimationFrame(()=>{
		var rect = this.getBoundingClientRect();
		if((x + rect.width) > (document.documentElement.clientWidth - PAGE_OFFSET))
			this.style.left = (document.documentElement.clientWidth - rect.width - rect.x - POINTER_OFFSET) + "px";
		else
			this.style.left = (x - rect.x + POINTER_OFFSET) + "px";
		if((y + rect.height) > (document.documentElement.clientHeight - PAGE_OFFSET))
			this.style.top = (document.documentElement.clientHeight - rect.height - rect.y - POINTER_OFFSET) + "px";
		else
			this.style.top = (y - rect.y + POINTER_OFFSET) + "px";
		window.addEventListener("mousedown", this._onMousedownOrResizeOrWheel);
		window.addEventListener("resize", this._onMousedownOrResizeOrWheel);
		window.addEventListener("wheel", this._onMousedownOrResizeOrWheel, {passive: true, capture: true});
		this.style.opacity = null;
		});
	}
	_onMousedownOrResizeOrWheel(event) {
		switch(event.type) {
			case "wheel":
			case "mousedown":
				if(!this._mouseInside)
					this.hide();
			break;
			default:
				this.hide();
			break;
		}
	}
	hide() {
		this.classList.remove("-visible");
		window.removeEventListener("mousedown", this._onMousedownOrResizeOrWheel);
		window.removeEventListener("resize", this._onMousedownOrResizeOrWheel);
		window.removeEventListener("wheel", this._onMousedownOrResizeOrWheel, {passive: true, capture: true});
	}
}
defineCustomElement("a-popover", Popover, t);return window.Popover=Popover;}}}
{const t = document.createElement("template");t.innerHTML = `<style></style>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initPopupUI(window) {if(window.PopupUI) return window.PopupUI;initMultiviewUI(window);with(window) {class PopupUI extends MultiviewUI {
	createView(viewId) {
		let v;
		switch(viewId) {
			case "search":
				initSearchUI(window);
				v = document.createElement("a-search-ui");
				v.id = "search";
				return v;
			break;
			case "bookmarks":
				initBookmarksUI(window);
				v = document.createElement("a-bookmarks-ui");
				v.id = "bookmarks";
				v.dataset.disableLayoutSettings = true;
				v.dataset.disableDock = true;
				v.dataset.paddingV = 8;
				v.dataset.paddingH = 0;
				return v;
			break;
		}
		return this.createView("bookmarks");
	}
	bind() {
		addEventListener("browser/open", ()=>setTimeout(()=>window.close(), 50));
		const waitForResize = () => ( (window.innerWidth < 750) ? requestAnimationFrame(waitForResize) : super.bind() );
		waitForResize();
	}
}
defineCustomElement("a-popup-ui", PopupUI, t);return window.PopupUI=PopupUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style></style><a-topbar>	<h1 slot="left"></h1>	<a-button slot="right" title="i18n:close" data-icon="close" data-action="cancel"></a-button></a-topbar><div class="form">	<a-textfield tabindex="1"></a-textfield></div><div class="buttons">	<a-button data-action="cancel" tabindex="3" data-i18n="cancel"></a-button>	<a-button data-action="ok" tabindex="2" data-i18n="ok"></a-button></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initPromptDialogUI(window) {if(window.PromptDialogUI) return window.PromptDialogUI;initDialogUI(window);initTopbar(window);initButton(window);initTextfield(window);with(window) {class PromptDialogUI extends DialogUI {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._title = shadowRoot.querySelector("h1");
		this._textfield = shadowRoot.querySelector("a-textfield");
	}
	setValues(values) {
		this._title.textContent = values.title || "";
		this._textfield.placeholder = values.placeholder;
		this._textfield.value = values.value;
	}
	getValues() {
		return {
			value : this._textfield.value
		}
	}
}
window.showPrompt = function(title, value, placeholder, callback) {
	showDialog(PromptDialogUI, { title, value, placeholder }, values => callback(values.value));
}
defineCustomElement("a-prompt-dialog-ui", PromptDialogUI, t);return window.PromptDialogUI=PromptDialogUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:inline-block;position:relative;height:20px;min-width:40px}input{-webkit-appearance:none;width:100%;background:transparent;padding-right:10px;cursor:pointer}input::-webkit-slider-thumb{-webkit-appearance:none;height:16px;width:16px;border-radius:8px;background:#3367D6;margin-top:-8px;box-shadow:1px 1px 1px rgba(0,0,0,0.5)}input::-webkit-slider-runnable-track{width:100%;height:3px;background:#e8e8e8;border-radius:100px}span{display:block;position:absolute;right:0;top:-1.25em;z-index:1;background-color:white;text-align:right}:host(.hide-value) span{display:none}</style><input type="range"></input><span></span>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initRangeslider(window) {if(window.Rangeslider) return window.Rangeslider;initCustomElement(window);with(window) {class Rangeslider extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._input = shadowRoot.querySelector("input");
		this._input.onchange = () => {
			this.dispatchEvent(new Event('change', { bubbles : true}));
		}
		this._display = shadowRoot.querySelector("span");
		this._input.oninput = () => {
			this._display.textContent = this._input.value;
		}
		if(this.dataset.value)
			this.value = this.dataset.value;
		if(this.dataset.min)
			this.min = parseInt(this.dataset.min);
		if(this.dataset.max)
			this.max = parseInt(this.dataset.max);
		if(this.dataset.step)
			this.step = parseInt(this.dataset.step);
	}
	get value() {
		return this._input.value;
	}
	set value(value) {
		this._input.value = value;
		this._display.textContent = this._input.value;
	}
	get min() {
		return this._input.min
	}
	set min(value) {
		this._input.min = value;
	}
	get max() {
		return this._input.max
	}
	set max(value) {
		this._input.max = value;
	}
	get step() {
		return this._input.step
	}
	set step(value) {
		this._input.step = value;
	}
}
defineCustomElement("a-rangeslider", Rangeslider, t);return window.Rangeslider=Rangeslider;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{text-align:center}a-textfield{width:400px}a-option[data-option="website"]{margin-left:20px}a-option[data-option="website"][data-disabled] span{text-decoration:line-through}a-option[data-option="website"][data-disabled].loading{background-image:url("/ui/search-dialog-ui/search-dialog-ui-preloader.svg");background-repeat:no-repeat;background-position:26px center;background-size:40px 5px;color:transparent}:host-context(:not([data-bidi=rtl])) a-option[data-option="website"]{margin-left:20px}:host-context([data-bidi=rtl]) a-option[data-option="website"]{margin-right:20px}</style><a-menu id="menu">	<a-menuitem data-i18n="reload" data-action="reload"></a-menuitem>	<a-menuitem data-i18n="settings" data-action="openSettings"></a-menuitem></a-menu><a-topbar>	<a-button slot="left" data-icon="contextmenu" data-menu="menu"></a-button>	<h1 slot="center"></h1>	<a-button slot="right" title="i18n:close" data-icon="close" data-action="cancel"></a-button></a-topbar><div class="form">	<a-textfield data-placeholder="i18n:search_" tabindex="1"></a-textfield><br>	<br>	<a-selector id="search-target">		<a-option data-option="engine"></a-option>		<a-option data-option="website"><span></span></a-option>	</a-selector></div><div class="buttons">	<a-button data-action="cancel" data-i18n="cancel" tabindex="3"></a-button>	<a-button data-action="ok" data-i18n="search" tabindex="2"></a-button></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initSearchDialogUI(window) {if(window.SearchDialogUI) return window.SearchDialogUI;initDialogUI(window);initMenu(window);initTopbar(window);initButton(window);initTextfield(window);initSelector(window);initOption(window);with(window) {class SearchDialogUI extends DialogUI {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._selector = shadowRoot.querySelector('a-selector');
		this._optionEngine = shadowRoot.querySelector('[data-option="engine"]');
		this._optionWebsite = shadowRoot.querySelector('[data-option="website"]');
		this._searchWord = shadowRoot.querySelector('a-textfield');
		this._title = shadowRoot.querySelector("h1");
	}
	updateSearchEngine() {
		var searchEngine = api.settings.get("search-engine");
		this._engineSearchURL = api.search.getEngineTemplate(searchEngine);
		if(this._engineSearchURL) {
			this._optionEngine.textContent = searchEngine;
			this._optionEngine.disabled = false;
		}
		else {
			this._optionEngine.disabled = true;
		}
	}
	update() {
		this.updateSearchEngine();
		this._selector.value = "engine";
		this._optionWebsite.disabled = true;
		this._domain = api.uri.getHostname(this._url);
		if(this._domain.startsWith("www."))
			this._domain = this._domain.substr(4);
		this._optionWebsite.firstChild.textContent = this._domain;
		this._optionWebsite.classList.add("loading");
		api.search.getTemplate(this._url)
			.then(searchUrl => {
				this._websiteSearchURL = searchUrl;
				this._optionWebsite.disabled = false;
				if(api.settings.get("search-preferred-site") == "website")
					this._selector.value = "website";
			})
			.catch(console.log)
			.then(()=>{
				this._optionWebsite.classList.remove("loading");
			});
	}
	handleEvent(event) {
		switch(event.type) {
			case "search/invalidate":
				this.update();
			break;
			case "settings/search-engine":
				this.updateSearchEngine();
			break;
		}
	}
	bind() {
		addEventListener("search/invalidate", this);
		addEventListener("settings/search-engine", this);
	}
	unbind() {
		removeEventListener("search/invalidate", this);
		removeEventListener("settings/search-engine", this);
	}
	openSettings() {
		api.settingsWindow.show("search");
	}
	reload() {
		api.search.clearCache([this._url]);
		this.update();
	}
	ok() {
		var searchString = this._searchWord.value;
		var href;
		switch(this._selector.value) {
			case "website":
				href = this._websiteSearchURL + encodeURIComponent(searchString);
			break;
			case "engine":
				href = this._engineSearchURL + encodeURIComponent("site:" + this._domain + " " + searchString);
			break;
		}
		href = this._redirect ? "r.html?" + encodeURIComponent(href) : href;
		api.browser.openInCurrentTab(href);
		super.ok();
	}
	setValues(values) {
		this._url = values.url;
		this._redirect = values.redirect;
		this._title.textContent = api.stringUtil.truncate(values.title ? values.title : api.uri.getHostname(this._url), 50);
		this._title.title = this._url;
		this.update();
	}
}
defineCustomElement("a-search-dialog-ui", SearchDialogUI, t);return window.SearchDialogUI=SearchDialogUI;}}}
{function initSearchUI01Base(window) {if(window.SearchUI01Base) return window.SearchUI01Base;initCustomElement(window);initSearchDialogUI(window);with(window) {class SearchUI01Base extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._useRedirect = this.dataset.useRedirect ? (this.dataset.useRedirect == "true") : false;
		this._contentEl = shadowRoot.getElementById("content");
		this._searchField = shadowRoot.querySelector("a-topbar-search-field");
	}
	openLinkInCurrentTab(link) {
		if(link.url) {
			if(this._useRedirect)
				location.href = "r.html?"+encodeURIComponent(link.url);
			else
				api.browser.openInCurrentTab(link.url);
		}
		else {
			location.hash = "#bookmarks?"+link.id+(link.highlightId?"&"+link.highlightId:"");
		}
	}
	openLinkInNewTab(link, active) {
		api.browser.openInNewTab(link.url ? link.url : "chrome://newtab/#bookmarks?"+link.id+(link.highlightId?"&"+link.highlightId:""), window, active);
	}
	openLinkInNewWindow(link, incognito) {
		api.browser.openInNewWindow(link.url ? link.url : "chrome://newtab/#bookmarks?"+link.id+(link.highlightId?"&"+link.highlightId:""), incognito);
	}
	showSearchDialog(link) {
		showDialog(SearchDialogUI, {url : link.url, title : link.title, redirect : true}, null, ()=>this._searchField.focus());
	}
}
return window.SearchUI01Base=SearchUI01Base;}}}
{function initSearchUI02State(window) {if(window.SearchUI02State) return window.SearchUI02State;initSearchUI01Base(window);with(window) {class SearchUI02State extends SearchUI01Base {
	init(shadowRoot) {
		super.init(shadowRoot);
		this.onPopstate = this.onPopstate.bind(this);
		this.historyReplaceState = this.historyReplaceState.bind(this);
		this.onStateChange = this.onStateChange.bind(this);
		this._bookmarks = [];
	}
	getSearchWord() {
		return this._state.searchWord;
	}
	getBookmarks() {
		return this._bookmarks;
	}
	getSelectedIndex() {
		return this._state.selectedIndex;
	}
	initState() {
		this._state = {};
		return this.updateState({
			searchWord : (history.state && history.state.searchWord) ? history.state.searchWord : undefined,
			selectedIndex : (history.state && history.state.selectedIndex) ? history.state.selectedIndex : 0,
		});
	}
	updateState(state) {
		this._state.searchWord = (state.searchWord === undefined) ? this._state.searchWord : state.searchWord;
		this._state.selectedIndex = (state.selectedIndex === undefined) ? this._state.selectedIndex : state.selectedIndex;
		clearTimeout(this._historyReplaceStateTimeout);
		this._historyReplaceStateTimeout = setTimeout(this.historyReplaceState, 100);
		return (
			(state.searchWord !== undefined)
			? new Promise(r=>{
				api.bookmarks.search( { query : this._state.searchWord }, bookmarks=> {
					this._bookmarks = bookmarks;
					r(state);
				})
			})
			: Promise.resolve(state)
		)
		.then(this.onStateChange)
	}
	historyReplaceState() {
		history.replaceState(this._state, null);
	}
	onStateChange(stateChange) {}
	onPopstate(event) {
		this.initState();
	}
	bind() {
		super.bind();
		addEventListener("popstate", this.onPopstate);
		this.busy = true;
		return this.initState().then(()=>{
			this.busy = false;
		})
	}
	unbind() {
		super.unbind();
		removeEventListener("popstate", this.onPopstate);
	}
}
return window.SearchUI02State=SearchUI02State;}}}
{function initSearchUI03SearchField(window) {if(window.SearchUI03SearchField) return window.SearchUI03SearchField;initSearchUI02State(window);with(window) {const THROTTLE_TIMEOUT = 200;
class SearchUI03SearchField extends SearchUI02State {
	init(shadowRoot) {
		super.init(shadowRoot);
		let searchInputTimeout;
		this._searchField.addEventListener("change", () => {
			clearTimeout(searchInputTimeout);
			searchInputTimeout = null;
			this.onSearch();
		});
		let throttledOnSearch = ()=>{
			searchInputTimeout = null;
			this.onSearch();
		}
		this._searchField.addEventListener("input", () => {
			if(!searchInputTimeout) {
				searchInputTimeout = setTimeout(throttledOnSearch, THROTTLE_TIMEOUT);
			}
		});
	}
	updateSearchField() {
		this._searchField.value = this.getSearchWord();
	}
	onStateChange(stateChange) {
		super.onStateChange(stateChange);
		if(stateChange.searchWord !== undefined)
			this.updateSearchField();
	}
	onSearch() {
		if(this.getSearchWord() == this._searchField.value)
			return;
		this.updateState({ searchWord : this._searchField.value, selectedIndex : 0 }, false);
	}
	bind() {
		this._searchField.focus();
		return super.bind();
	}
}
return window.SearchUI03SearchField=SearchUI03SearchField;}}}
{function initSearchUI04SearchResult(window) {if(window.SearchUI04SearchResult) return window.SearchUI04SearchResult;initSearchUI03SearchField(window);with(window) {const MAX_ENTRIES = 150;
class SearchUI04SearchResult extends SearchUI03SearchField {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._resultEl = shadowRoot.getElementById("search-result");
		this._intersectionObserver = new IntersectionObserver( this.onIntersection.bind(this), { root : this._contentEl } );
		this._onThemeChange = this._onThemeChange.bind(this);
	}
	_createEntry(bookmark) {
		var el = document.createElement("div");
		el.classList.add("entry");
		el.link = bookmark;
		const icon = document.createElement("a-bookmark-icon");
		if(bookmark.url)
			icon.dataset.url = bookmark.url;
		else
			icon.dataset.id = bookmark.id;
		icon.dataset.size = 60;
		el.appendChild(icon);
		el.icon = icon;
		const title = document.createElement("div");
		title.className = "title";
		title.textContent = bookmark.title;
		el.appendChild(title);
		/*
		const folder = document.createElement("div");
		folder.className = "folder";
		el.appendChild(folder);
		el.folder = folder;
		*/
		this._intersectionObserver.observe(el);
		return el;
	}
	updateSearchResult() {
		const bookmarks = this.getBookmarks();
		const oldEntries = {};
		while(this._resultEl.hasChildNodes()) {
			const oldEntry = this._resultEl.firstChild;
			oldEntry.remove();
			oldEntries[oldEntry.link.id] = oldEntry;
		}
		for(let i=0; i<bookmarks.length; i++) {
			if(i>=MAX_ENTRIES)
				break;
			const bookmark = bookmarks[i];
			const entry = oldEntries[bookmark.id] ? oldEntries[bookmark.id] : this._createEntry(bookmark);
			this._resultEl.appendChild(entry);
		}
		for(let oldEntry of Object.values(oldEntries)) {
			if(!oldEntry.parentNode)
				this._intersectionObserver.unobserve(oldEntry);
		}
	}
	_onThemeChange() {
		this._resultEl.querySelectorAll("a-bookmark-icon").forEach(icon => icon.loadIcon());
	}
	onStateChange(stateChange) {
		super.onStateChange(stateChange);
		if(stateChange.searchWord !== undefined)
			this.updateSearchResult();
	}
	onIntersection(entries) {
		let i = 0;
		for(let entry of entries) {
			if(entry.isIntersecting) {
				const el = entry.target;
				el.icon.loadIcon();
				this._intersectionObserver.unobserve(el);
			}
		}
	}
	bind() {
		super.bind();
		addEventListener("settings/theme", this._onThemeChange);
	}
	unbind() {
		super.unbind();
		removeEventListener("settings/theme", this._onThemeChange);
	}
}
return window.SearchUI04SearchResult=SearchUI04SearchResult;}}}
{function initSearchUI05SearchDefaultEntries(window) {if(window.SearchUI05SearchDefaultEntries) return window.SearchUI05SearchDefaultEntries;initSearchUI04SearchResult(window);with(window) {class SearchUI05SearchDefaultEntries extends SearchUI04SearchResult {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._defaultEntriesEl = shadowRoot.getElementById("search-default-entries");
		this._createDefaultEntries();
	}
	_getSearchTheWebURL() {
		const searchEngine = api.settings.get("search-engine");
		const engineSearchURL = api.search.getEngineTemplate(searchEngine);
		const href = engineSearchURL + encodeURIComponent(this.getSearchWord());
		return href;
	}
	_createDefaultEntries() {
		this._defaultEntries = [];
		var el = document.createElement("div");
		el.classList.add("entry");
		el.textContent = chrome.i18n.getMessage("search_the_web");
		el.link = {};
		Object.defineProperty(el.link, 'url', { get: () => this._getSearchTheWebURL() });
		this._defaultEntries.push(el);
	}
	_appendDefaultEntries() {
		for(let entry of this._defaultEntries) {
			this._defaultEntriesEl.appendChild(entry);
		}
	}
	_removeDefaultEntries() {
		for(let entry of this._defaultEntries) {
			entry.remove();
		}
	}
	_hasDefaultEntries() {
		return !!this._defaultEntriesEl.children.length;
	}
	updateDefaultEntries() {
		if(this.getSearchWord()) {
			if(!this._hasDefaultEntries())
				this._appendDefaultEntries();
		}
		else {
			if(this._hasDefaultEntries())
				this._removeDefaultEntries();
		}
	}
	onStateChange(stateChange) {
		super.onStateChange(stateChange);
		this.updateDefaultEntries();
	}
}
return window.SearchUI05SearchDefaultEntries=SearchUI05SearchDefaultEntries;}}}
{function initSearchUI06List(window) {if(window.SearchUI06List) return window.SearchUI06List;initSearchUI05SearchDefaultEntries(window);with(window) {class SearchUI06List extends SearchUI05SearchDefaultEntries {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._contentEl.addEventListener("click", this.onClick.bind(this));
		this._contentEl.addEventListener("mouseup", this.onMouseup.bind(this));
	}
	getEntries() {
		return this._contentEl.querySelectorAll(".entry");
	}
	getListLength() {
		return this.getEntries().length;
	}
	getLinkByIndex(index) {
		const entry =  this._contentEl.querySelectorAll(".entry")[index];
		return entry ? entry.link : null;
	}
	getSelectedLink() {
		return this.getLinkByIndex(this.getSelectedIndex());
	}
	getIndexOfEntry(entry) {
		return Array.from(this._contentEl.querySelectorAll(".entry")).indexOf(entry);
	}
	updateListSelectedIndex() {
		const selectedIndex = this.getSelectedIndex();
		const n = this.getListLength();
		let i=0;
		for(let entry of this.getEntries()) {
			if(selectedIndex == i) {
				entry.classList.add("-selected");
				if(i == 0)
					this._contentEl.scrollTop = 0;
				else if(i == (n-1))
					this._contentEl.scrollTop = Number.MAX_SAFE_INTEGER;
				else
					entry.scrollIntoViewIfNeeded();
			}
			else
				entry.classList.remove("-selected");
			i++;
		}
	}
	onStateChange(stateChange) {
		super.onStateChange(stateChange);
		this.updateListSelectedIndex();
	}
	onClick(event) {
		if(event.target.link) {
			if(event.ctrlKey || event.metaKey)
				this.openLinkInNewTab(event.target.link);
			else if(event.shiftKey)
				this.openLinkInNewWindow(event.target.link);
			else
				this.openLinkInCurrentTab(event.target.link);
		}
	}
	onMouseup(event) {
		if(event.target.link && (event.which == 2)) {
			event.preventDefault();
			this.openLinkInNewTab(event.target.link);
		}
	}
}
return window.SearchUI06List=SearchUI06List;}}}
{function initSearchUI07Keyboard(window) {if(window.SearchUI07Keyboard) return window.SearchUI07Keyboard;initSearchUI06List(window);with(window) {const KEY_TAB=9, KEY_UP=38, KEY_DOWN=40, KEY_PAGE_UP=33, KEY_PAGE_DOWN=34, KEY_ESC=27, KEY_ENTER=13;
const NAVIGATION_KEYS = [KEY_TAB, KEY_UP, KEY_DOWN, KEY_PAGE_UP, KEY_PAGE_DOWN, KEY_ESC, KEY_ENTER];
class SearchUI07Keyboard extends SearchUI06List {
	init(shadowRoot) {
		super.init(shadowRoot);
		this.addEventListener("keydown", this._onKeyDown.bind(this));
	}
	_onKeyDown(event) {
		if(NAVIGATION_KEYS.indexOf(event.keyCode) >= 0) {
			event.preventDefault();
			switch(event.keyCode) {
				case KEY_TAB:
				{
					if(event.shiftKey) {
						if(api.settings.get("search-open-folder-shortcut-active")) {
							const link = this.getSelectedLink();
							if(link && link.parentId)
								this.openLinkInCurrentTab({ id : link.parentId, highlightId : link.id });
						}
						else {
							this.updateState( { selectedIndex : ( Math.max(0, this.getSelectedIndex()-1) ) } );
						}
					}
					else {
						if(api.settings.get("search-site-shortcut-active")) {
							const link = this.getSelectedLink();
							if(link && link.id && link.url)
								this.showSearchDialog(link);
						}
						else {
							this.updateState( { selectedIndex : ( Math.min(this.getListLength()-1, this.getSelectedIndex()+1) ) } );
						}
					}
				}
				break;
				case KEY_UP:
					this.updateState( { selectedIndex : ( Math.max(0, this.getSelectedIndex()-1) ) } );
				break;
				case KEY_DOWN:
					this.updateState( { selectedIndex : ( Math.min(this.getListLength()-1, this.getSelectedIndex()+1) ) } );
				break;
				case KEY_PAGE_UP:
					this.updateState( { selectedIndex : ( Math.max(0, this.getSelectedIndex()-5) ) } );
				break;
				case KEY_PAGE_DOWN:
					this.updateState( { selectedIndex : ( Math.min(this.getListLength()-1, this.getSelectedIndex()+5) ) } );
				break;
				case KEY_ENTER:
				{
					const link = this.getSelectedLink();
					if(link)
						this.openLinkInCurrentTab(link);
				}
				break;
				case KEY_ESC:
					if(this.getSearchWord())
						this.updateState( { searchWord : "" } );
					else
						history.back();
				break;
			}
		}
	}
}
return window.SearchUI07Keyboard=SearchUI07Keyboard;}}}
{function initSearchUI08Menu(window) {if(window.SearchUI08Menu) return window.SearchUI08Menu;initSearchUI07Keyboard(window);with(window) {class SearchUI08Menu extends SearchUI07Keyboard {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._menu = shadowRoot.querySelector("a-menu");
		this.initMenu("contextmenu", shadowRoot.getElementById('menu'), shadowRoot);
		shadowRoot.addEventListener("action", this._onAction.bind(this), true);
		this.onContextmenu = this.onContextmenu.bind(this);
		shadowRoot.addEventListener("contextmenu", this.onContextmenu, true);
	}
	onContextmenu(event) {
		let menutype;
		if(event.target.classList.contains("entry") && event.target.link) {
			const entry = event.target;
			const index = this.getIndexOfEntry(entry);
			this.updateState( { selectedIndex : index } );
			if(entry.link.id) {
				if(entry.link.url) {
					if(entry.link.url.startsWith("chrome://"))
						menutype = "chrome-link";
					else
						menutype = "bookmark-link";
				}
				else {
					menutype = "folder-link";
				}
			}
			else {
				menutype = "link";
			}
		}
		else {
			menutype = "main";
		}
		this._menu.dataset.menu = menutype;
	}
	_onAction(event) {
		event.preventDefault();
		var context = event.detail.context;
		switch(event.detail.name) {
			case "back":
				history.back();
			break;
			case "forward":
				history.forward();
			break;
			case "settings":
				api.settingsWindow.show("search");
			break;
			case "help":
				api.browser.openInNewTab("chrome://newtab/#help",window,true);
			break;
			case "open-link-in-new-tab":
				this.openLinkInNewTab(context.target.link);
			break;
			case "open-link-in-new-window":
				this.openLinkInNewWindow(context.target.link);
			break;
			case "open-link-in-new-incognito-window":
				this.openLinkInNewWindow(context.target.link, true);
			break;
			case "show-in-folder":
				if(context.target.link.parentId)
					this.openLinkInCurrentTab({ id : context.target.link.parentId, highlightId : context.target.link.id });
			break;
			case "open-search":
				this.showSearchDialog(context.target.link);
			break;
			default:
				console.log(event.detail.name, event);
			break;
		}
	}
}
return window.SearchUI08Menu=SearchUI08Menu;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{font-family:"Segoe UI",Helvetica,Arial;font-size:12px;font-stretch:condensed;color:var(--theme-text-color);--theme-overlay-rgb:255,255,255}:host(.-busy) *{opacity:0}a-topbar{background-color:var(--theme-overlay-color)}a-topbar-search-field{width:100%;max-width:700px;margin:0 auto;border-radius:20px;color:var(--theme-text-color);background-color:var(--theme-overlay-color-input)}#content{position:absolute;top:56px;bottom:0;left:0;right:0;overflow-y:overlay;overflow-x:hidden;text-align:center;-webkit-mask-image:linear-gradient(to bottom, transparent, black 26px)}#content::-webkit-scrollbar{width:24px}#content::-webkit-scrollbar-thumb:vertical{border-radius:12px;background-clip:padding-box;border:9px solid transparent;min-height:100px}#content::-webkit-scrollbar-thumb{background-color:var(--theme-scrollbar-thumb-background-color)}#content::-webkit-scrollbar-thumb:hover{background-color:var(--theme-scrollbar-thumb-background-color-hover)}.list{max-width:700px;border-radius:5px;overflow:hidden;background-color:var(--theme-overlay-color)}.list:not(:empty){margin:25px auto}.list .entry{cursor:pointer;font-size:14px;text-align:left;display:flex;flex-direction:row}.list .entry>*{pointer-events:none}.list .entry:not(:first-child){border-top:1px solid var(--theme-overlay-color-border)}.list .entry:not(:last-child):hover,.list .entry:not(:last-child).-selected{border-bottom:1px solid var(--theme-overlay-color-border)}.list .entry:not(:last-child):hover+.entry,.list .entry:not(:last-child).-selected+.entry{border-top:none}.list .entry:hover{background-color:var(--theme-overlay-color-hover)}.list .entry.-selected{background-color:var(--theme-overlay-color-selected)}#search-result .entry a-bookmark-icon{width:60px;height:60px;border-radius:3px;margin:16px;vertical-align:middle;flex-shrink:0;overflow:hidden}#search-result .entry .title,#search-result .entry .folder{margin-top:38px;line-height:20px;height:20px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#search-result .entry .title{flex-grow:2}#search-default-entries .entry{padding:16px 18px}a-menu[data-menu="link"]>:not([data-menu~="link"]){display:none}a-menu[data-menu="bookmark-link"]>:not([data-menu~="bookmark-link"]){display:none}a-menu[data-menu="chrome-link"]>:not([data-menu~="chrome-link"]){display:none}a-menu[data-menu="folder-link"]>:not([data-menu~="folder-link"]){display:none}a-menu[data-menu="main"]>:not([data-menu~="main"]){display:none}</style><!--	require ...	<a-bookmark-icon>--><a-menu id="menu">	<a-menuitem data-menu="main" data-action="back" data-i18n="back"></a-menuitem>	<a-menuitem data-menu="main" data-action="forward" data-i18n="forward"></a-menuitem>	<hr data-menu="main">	<a-menuitem data-menu="main" data-action="settings" data-i18n="settings"></a-menuitem>	<hr data-menu="main">	<a-menuitem data-menu="main" data-action="help" data-i18n="help"></a-menuitem>	<a-menuitem data-menu="link bookmark-link chrome-link folder-link" data-action="open-link-in-new-tab" data-i18n="open_in_new_tab"></a-menuitem>	<a-menuitem data-menu="link bookmark-link chrome-link folder-link" data-action="open-link-in-new-window" data-i18n="open_in_new_window"></a-menuitem>	<a-menuitem data-menu="link bookmark-link" data-action="open-link-in-new-incognito-window" data-i18n="open_in_incognito_window"></a-menuitem>	<hr data-menu="bookmark-link chrome-link folder-link">	<a-menuitem data-menu="bookmark-link chrome-link folder-link" data-action="show-in-folder" data-i18n="show_in_folder"></a-menuitem>	<a-menuitem data-menu="bookmark-link" data-action="open-search" data-i18n="search_"></a-menuitem></a-menu><a-topbar>	<a-topbar-search-field slot="center" data-placeholder="i18n:search_" tabindex="-1"></a-topbar-search-field></a-topbar><div id="content">	<div id="search-result" class="list"></div>	<div id="search-default-entries" class="list"></div></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initSearchUI(window) {if(window.SearchUI) return window.SearchUI;initSearchUI08Menu(window);initBookmarkIcon(window);initMenu(window);initTopbar(window);initTopbarSearchField(window);with(window) {class SearchUI extends SearchUI08Menu {}
defineCustomElement("a-search-ui", SearchUI, t);return window.SearchUI=SearchUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{outline:none;display:inline-block}::slotted(*){cursor:pointer}</style><slot></slot>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initSelector(window) {if(window.Selector) return window.Selector;initCustomElement(window);with(window) {class Selector extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this.addEventListener("click", this, true);
		this.addEventListener("keydown", this);
		if(this.dataset.multiple)
			this.multiple = (this.dataset.multiple == "true");
		if(this.dataset.value)
			this.value = this.dataset.value;
	}
	get items() {
		return Array.from(this.querySelectorAll("*[data-option]"));
	}
	getSelected() {
		return this.items
			.filter(item => item.classList.contains("-selected"))
			.map(item => item.dataset.option);
	}
	setSelected(values) {
		this.items
			.forEach(item=>{
				if(values.includes(item.dataset.option)) {
					item.classList.add("-selected");
					item.tabIndex = 0;
					if(this.contains(this.querySelector("*:focus")))
						item.focus();
				}
				else {
					item.classList.remove("-selected");
					item.tabIndex = -1;
				}
			})
	}
	get value() {
		let values = this.getSelected();
		return this.multiple ? JSON.stringify(values) : values[0];
	}
	set value(value) {
		let values = this.multiple ? JSON.parse(value) : [""+value];
		this.setSelected(values);
	}
	handleEvent(event) {
		switch(event.type) {
			case "click":
				if(event.target.dataset.option) {
					let item = event.target;
					if(!item.classList.contains("-selected")) {
						this.setSelected(this.multiple ? this.getSelected().concat(item.dataset.option) : [item.dataset.option]);
						this.dispatchEvent(new Event('change', { bubbles : true}));
						event.stopPropagation();
					}
					else if(this.multiple) {
						this.setSelected(this.getSelected().filter(v=>v!=item.dataset.option));
						this.dispatchEvent(new Event('change', { bubbles : true}));
						event.stopPropagation();
					}
				}
			break;
			case "keydown":
				if(event.keyCode == 32)
					event.preventDefault();
				if(this.multiple)
					return;
				if(![37,38,39,40].includes(event.keyCode))
					return;
				event.preventDefault();
				let items = this.items;
				let selectedIndex = -1;
				for(let i=0; i<items.length; i++) {
					if(items[i].classList.contains("-selected")) {
						selectedIndex = i;
						break;
					}
				}
				switch(event.keyCode) {
					case 37:
					case 38:
						selectedIndex = ((selectedIndex-1) < 0) ? items.length-1 : selectedIndex-1;
					break;
					case 39:
					case 40:
						selectedIndex = (selectedIndex+1) % items.length;
					break;
				}
				this.value = items[selectedIndex].dataset.option;
				this.dispatchEvent(new Event('change', { bubbles : true}));
			break;
		}
	}
}
defineCustomElement("a-selector", Selector, t);return window.Selector=Selector;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{font-family:'Roboto';font-size:11px;display:block;width:100%;height:100%;color:#333;filter:opacity(0%);background-color:white}:host-context(.background-ready):host(.ready){filter:opacity(100%)}:host-context(.visible):host{transition:filter 300ms}*::-webkit-scrollbar{width:24px}*::-webkit-scrollbar-thumb:vertical{border-radius:12px;background-clip:padding-box;border:9px solid transparent;min-height:100px}*::-webkit-scrollbar-thumb{background-color:#D1D3D4}*::-webkit-scrollbar-thumb:hover{background-color:#C0C1C2}#menu{position:absolute;left:0;top:0;width:200px;height:100%;background-color:#F8F9FA;overflow-y:overlay;border-right:1px solid #EDEEEF;padding:30px 0 0 0}#menu>div{padding:0 50px}#menu>div:hover{color:black}#menu>div.-selected{color:#3367D6}#menu>div.mi1{font-size:12px;line-height:40px;font-weight:500;background-image:url("ui/settings-ui/settings-ui_icons.svg");background-repeat:no-repeat;height:40px;overflow:hidden;padding-left:49px}#menu>div.mi1:not(:first-child){border-top:1px solid #EDEEEF}#menu>div.mi1:hover{background-position-x:-200px}#menu>div.mi1.-selected{background-position-x:-400px}#menu>div[data-option="favorites"]{background-position:0 0}#menu>div[data-option="theme"]{background-position:0 -40px}#menu>div[data-option="dash"]{background-position:0 -80px}#menu>div[data-option="search"]{background-position:0 -120px}#menu>div[data-option="news"]{background-position:0 -160px}#menu>div[data-option="popup"]{background-position:0 -200px}#menu>div[data-option="sync"]{background-position:0 -240px}#menu>div.mi2{font-size:11px;height:25px;line-height:25px}#menu>div.mi2+.mi1{margin-top:20px}#deck{position:absolute;left:200px;right:0;top:0;height:100%}section{width:100%;height:100%;overflow-y:overlay;padding:40px 35px 60px 35px}section h1{font-size:24px;font-weight:300;margin:0 0 30px -2px}section h2{font-size:12px;font-weight:500;margin:2em 0 8px 0}.group{border:1px solid #ddd;margin-top:30px;padding:0 30px 20px 30px;border-radius:5px}h2[data-advanced]{cursor:pointer;position:relative}h2[data-advanced]:after{content:'advanced';background-color:#ddd;color:#3367D6;padding:3px 8px;font-size:8px;margin-left:8px;vertical-align:top;text-transform:uppercase}h2[data-advanced]:before{position:absolute;color:#555;left:-16px;top:-1px;content:'▸'}h2[data-advanced][data-advanced="expanded"]:before{content:'▾'}h2[data-advanced]:not([data-advanced="expanded"])+*{display:none}.footnote{color:#333;margin:3em 0 4em 0;font-size:.8em}.footnote:before{content:"_________________";display:block;margin:0 0 1em 0}a,.link{color:#3367D6;cursor:pointer}a:hover,.link:hover{text-decoration:underline}.bottom-bar{background-color:#FAFBFC;border-top:1px solid #EDEEEF;height:56px;padding:12px 0 0 35px;color:#333333;z-index:10000}.bottom-bar a-button{background-color:#D11B59;margin-right:10px}.bottom-bar a,.bottom-bar .link{line-height:32px;margin-right:14px}.bottom-bar a::after,.bottom-bar .link::after{content:'';background-image:url("ui/settings-ui/settings-ui_icon-external-link.svg");background-repeat:no-repeat;display:inline-block;width:11px;height:11px;margin-left:5px}a-textarea{width:100%}section a-option[data-enables="siblings"]:not(.-selected)~*{filter:grayscale(100%);pointer-events:none;opacity:.5}section[data-option="layout"] a-rangeslider{width:100%}section[data-option="background"] a-option>span{display:inline-block;min-width:110px}section[data-option="background"] a-selector[data-binding-key="background-type"]{margin-top:10px}section[data-option="background"] a-selector[data-binding-key="background-type"] a-option{height:34px;width:100%;white-space:nowrap}section[data-option="background"] a-option[data-binding-key="background-filter-active"] span[slot=ui] *{vertical-align:middle}section[data-option="background"] a-option[data-binding-key="background-filter-active"] span[slot=ui] a-button{margin-right:10px}section[data-option="background"] a-option[data-binding-key="background-filter-active"] span[slot=ui] a-colorpicker-with-alpha{margin-left:10px}section[data-option="background"] a-option[data-binding-key="background-filter-active"] span[slot=ui] a-popover-selector{width:120px;margin-left:10px}section[data-option="background"] a-colorpicker{width:100px}:host(.hide-background-filter) a-selector[data-binding-key="background-type"]~*{visibility:hidden}section[data-option="theme"]{display:flex;flex-direction:column;padding:0 0 0 0}section[data-option="theme"] #theme-main{width:100%;height:100%;padding:40px 35px 40px 35px;flex:1;overflow-y:overlay}section[data-option="dock"] a-selector[data-binding-key="dock-background-type"]{margin-top:10px}section[data-option="dock"] a-selector[data-binding-key="dock-background-type"] a-option{height:34px;width:100%;white-space:nowrap}section[data-option="dock"] a-option>span{display:inline-block;min-width:130px}section[data-option="sync"] .sync-group{column-count:2;width:630px}section[data-option="sync"] .sync-group a-option{display:block;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}</style><a-selector id="menu" data-binding="location-hash" data-binding-key="settings">	<div class="mi1" data-i18n="favorites_deng" data-option="favorites"></div>	<div class="mi2" data-i18n="layout" data-option="layout"></div>	<div class="mi2" data-i18n="icons" data-option="icons"></div>	<div class="mi2" data-i18n="dock" data-option="dock"></div>	<div class="mi1" data-i18n="theme" data-option="theme"></div>	<div class="mi2" data-i18n="background" data-option="background"></div>	<div class="mi1" data-i18n="dash" data-option="dash">Dash</div>	<div class="mi1" data-i18n="search_deng" data-option="search"></div>	<div class="mi1" data-i18n="news" data-option="news"></div><!--<div class="mi1" data-i18n="popup" data-option="popup"></div>-->	<div class="mi1" data-i18n="sync" data-option="sync"></div>	<div class="mi2" data-i18n="backup" data-option="backup"></div></a-selector><a-deck id="deck" data-binding="location-hash" data-binding-key="settings"><!-- FAVORITES --><section data-option="favorites" tabindex="-1">	<h1 data-i18n="favorites_deng"></h1>	<h2 data-i18n="root_folder"></h2>	<a-bookmark-folder-selector data-binding="setting" data-binding-key="root-folder"></a-bookmark-folder-selector><br><br>	<h2 data-i18n="navigation"></h2>	<a-option data-binding="setting-json" data-binding-key="show-navigation-bar" data-i18n="show_navigation_bar"></a-option><br>	<a-option data-binding="setting-json" data-binding-key="show-last-visited-folder" data-i18n="show_last_visited_folder"></a-option><br>	<a-option data-binding="setting-json" data-binding-key="open-bookmarks-in-new-tab" data-i18n="open_bookmarks_in_new_tab"></a-option><br>	<h2 data-i18n="bookmarks_for_internal_pages"></h2>	<a-bookmarks-for-internal-pages-button data-binding="setting" data-binding-key="root-folder"></a-bookmarks-for-internal-pages-button><br>	<h2 data-i18n="extension_button"></h2>	<a-selector data-binding="setting" data-binding-key="browser-action">		<a-option data-option="default" data-i18n="show_favorites_in_current_tab"></a-option><br>		<a-option data-option="popup" data-i18n="show_favorites_in_popup"></a-option>	</a-selector></section><!-- LAYOUT --><section data-option="layout" tabindex="-1">	<h1 data-i18n="layout"></h1>	<h2 data-i18n="columns_max"></h2>	<a-rangeslider data-binding="setting-json" data-binding-key="columns-max" data-min="3" data-max="25"></a-rangeslider>	<h2 data-i18n="column_gap"></h2>	<a-rangeslider data-binding="setting-json" data-binding-key="column-gap" data-min="0" data-max="200"></a-rangeslider>	<h2 data-i18n="row_gap"></h2>	<a-rangeslider data-binding="setting-json" data-binding-key="row-gap" data-min="0" data-max="200"></a-rangeslider></section><!-- ICONS --><section data-option="icons" tabindex="-1">	<h1 data-i18n="icons"></h1>	<h2 data-i18n="size"></h2>	<a-popover-selector data-binding="setting" data-binding-key="icon-size">		<div data-option="48" data-i18n="extra_extra_small"></div>		<div data-option="60" data-i18n="extra_small"></div>		<div data-option="72" data-i18n="small"></div>		<div data-option="80" data-i18n="medium"></div>		<div data-option="100" data-i18n="large"></div>		<div data-option="120" data-i18n="extra_large"></div>	</a-popover-selector>	<h2 data-i18n="folders"></h2>	<a-option data-binding="setting-json" data-binding-key="icon-folder-thumbnails">		<span data-i18n="icon_folder_thumbnails"></span>		<div slot="ui">			<a-dialog-selector data-binding-key="icon-folder-style" title="i18n:icon_folder_style" data-binding="setting" style="margin:10px 0 0 30px">				<a-bookmark-folder-style-selector-ui></a-bookmark-folder-style-selector-ui>			</a-dialog-selector>			<span data-i18n="background" style="margin-left:20px;"></span>:			<a-colorpicker-with-alpha slot="ui" data-binding="setting" data-binding-key="icon-folder-background-color" style="margin-left:10px;"></a-colorpicker-with-alpha>		</div>	</a-option>	<h2 data-i18n="site_specific_rules"></h2>	<a-selector data-binding="setting-json" data-binding-key="icon-rules" data-multiple="true">		<a-option data-i18n="icon_rule_youtube_com" data-option="youtube.com"></a-option><br>		<a-option data-i18n="icon_rule_twitter_com" data-option="twitter.com"></a-option><br>		<a-option data-i18n="icon_rule_unsplash_com" data-option="unsplash.com"></a-option><br>		<a-option data-i18n="icon_rule_radio_net" data-option="radio.net"></a-option>	</a-selector>	<h2 data-i18n="cache">Cache</h2>	<a-button data-i18n="clear_cache" data-action="clearIconCache"></a-button>	<h2 data-i18n="url_mapping" data-advanced></h2>	<a-textarea data-binding="setting" data-binding-key="icon-url-mapping" data-max-length="32000"></a-textarea></section><!-- DOCK --><section data-option="dock" tabindex="-1">	<h1 data-i18n="dock"></h1>	<h2 data-i18n="activation"></h2>	<a-option data-i18n="show_dock" data-binding="setting-json" data-binding-key="show-dock" data-enables="siblings"></a-option><br>	<h2 data-i18n="dock_folder"></h2>	<a-bookmark-folder-selector data-binding="setting" data-binding-key="dock-folder"></a-bookmark-folder-selector>	<h2 data-i18n="behaviour"></h2>	<a-option data-i18n="dock_dblclick" data-binding="setting-json" data-binding-key="dock-dblclick"></a-option><br>	<h2 data-i18n="background"></h2>	<a-selector data-binding="setting" data-binding-key="dock-background-type">		<a-option data-i18n="from_theme" data-option="theme"></a-option><br>		<a-option data-option="color">			<span data-i18n="color"></span><a-colorpicker-with-alpha slot="ui" data-binding="setting" data-binding-key="dock-background-color"></a-colorpicker-with-alpha>		</a-option>	</a-selector>	<h2 data-i18n="bookmarks_for_internal_pages"></h2>	<a-bookmarks-for-internal-pages-button data-binding="setting" data-binding-key="dock-folder"></a-bookmarks-for-internal-pages-button><br></section><!-- THEME --><section data-option="theme" tabindex="-1">	<div id="theme-main">		<h1 data-i18n="theme"></h1>		<a-theme-selector></a-theme-selector>	</div>	<div class="bottom-bar">		<span class="link" data-i18n="chrome_theme"></span>		<span class="link" data-i18n="chrome_settings"></span>		<a-button data-i18n="reset_background"></a-button>		<a-button data-i18n="reset_dock_background"></a-button>	</div></section><!-- BACKGROUND --><section data-option="background" tabindex="-1">	<a-menu id="background-filter-preset-menu">		<a-menuitem data-action="applyBackgroundFilterPreset" data-color="rgba(255,255,255,.5)" data-blend-mode="normal">Brighter</a-menuitem>		<a-menuitem data-action="applyBackgroundFilterPreset" data-color="rgba(0,0,0,0.5)" data-blend-mode="normal">Darker</a-menuitem>		<a-menuitem data-action="applyBackgroundFilterPreset" data-color="rgba(152,23,23,0.75)" data-blend-mode="overlay">Intense</a-menuitem>		<a-menuitem data-action="applyBackgroundFilterPreset" data-color="rgba(0,56,179,0.6)" data-blend-mode="exclusion">Cozy</a-menuitem>		<a-menuitem data-action="applyBackgroundFilterPreset" data-color="rgba(107,37,219,0.4)" data-blend-mode="exclusion">Vintage</a-menuitem>		<a-menuitem data-action="applyBackgroundFilterPreset" data-color="rgba(27,229,195,0.45)" data-blend-mode="color">Bleached</a-menuitem>		<a-menuitem data-action="applyBackgroundFilterPreset" data-color="rgba(229,27,137,0.6)" data-blend-mode="screen">1970</a-menuitem>		<a-menuitem data-action="applyBackgroundFilterPreset" data-color="rgba(192,80,0,0.35)" data-blend-mode="hard-light">1980</a-menuitem>		<a-menuitem data-action="applyBackgroundFilterPreset" data-color="rgba(0,0,0,1)" data-blend-mode="color">Black &amp; White</a-menuitem>		<a-menuitem data-action="applyBackgroundFilterPreset" data-color="rgba(255,8,59,1)" data-blend-mode="darken">Dark Room</a-menuitem>		<a-menuitem data-action="applyBackgroundFilterPreset" data-color="rgba(207,176,135,1)" data-blend-mode="color">Sepia</a-menuitem>		<a-menuitem data-action="applyBackgroundFilterPreset" data-color="rgba(255,0,0,.6)" data-blend-mode="hue">Reddish</a-menuitem>		<a-menuitem data-action="applyBackgroundFilterPreset" data-color="rgba(0,255,0,.5)" data-blend-mode="hue">Greenish</a-menuitem>		<a-menuitem data-action="applyBackgroundFilterPreset" data-color="rgba(0,0,255,.7)" data-blend-mode="hue">Blueish</a-menuitem>		<a-menuitem data-action="applyBackgroundFilterPreset" data-color="rgba(255,255,255,1)" data-blend-mode="difference">Invert</a-menuitem>		<hr>		<a-menuitem data-action="applyBackgroundFilterPreset" data-color="var(--theme-background-color)" data-blend-mode="color">Theme Tint</a-menuitem>	</a-menu>	<h1 data-i18n="background"></h1>	<h2 data-i18n="background_image"></h2>	<a-selector data-binding="setting" data-binding-key="background-type">		<a-option data-option="theme" data-i18n="from_theme"></a-option>		<br>		<a-option data-option="web">			<span data-i18n="from_web"></span> <a-web-wallpaper-selector slot="ui" data-binding="setting-json" data-binding-key="background-web" data-binding-type="json"></a-web-wallpaper-selector>		</a-option>		<br>		<a-option data-option="file">			<span data-i18n="from_file"></span> <a-file-selector slot="ui" data-binding="setting-file" data-binding-key="background-file" data-binding-cache="wallpaper"></a-file-selector>		</a-option>		<br>		<a-option data-option="color">			<span data-i18n="color"></span> <a-colorpicker slot="ui" data-binding="setting" data-binding-key="background-color"></a-colorpicker>		</a-option>	</a-selector>	<h2>Filter</h2>	<a-option data-binding="setting-json" data-binding-key="background-filter-active">		<span data-i18n="filter_active"></span>		<span slot="ui">			<a-button data-menu="background-filter-preset-menu" >Preset</a-button>			<span style="margin-right:6px;">&rarr;</span>			<span data-i18n="color"></span>:			<a-colorpicker-with-alpha data-binding="setting" data-binding-key="background-filter-color" data-value="#cccccc"></a-colorpicker-with-alpha>			<a-popover-selector data-binding="setting" data-binding-key="background-filter-blend-mode">				<div data-option="normal">Normal</div>				<div data-option="multiply">Multiply</div>				<div data-option="screen">Screen</div>				<div data-option="overlay">Overlay</div>				<div data-option="darken">Darken</div>				<div data-option="lighten">Lighten</div>				<div data-option="color-dodge">Color Dodge</div>				<div data-option="color-burn">Color Burn</div>				<div data-option="hard-light">Hard Light</div>				<div data-option="soft-light">Soft Light</div>				<div data-option="difference">Difference</div>				<div data-option="exclusion">Exclusion</div>				<div data-option="hue">Hue</div>				<div data-option="saturation">Saturation</div>				<div data-option="color">Color</div>				<div data-option="luminosity">Luminosity</div>			</a-popover-selector>		</span>	</a-option>	&nbsp;</section><!-- DASH --><section data-option="dash" tabindex="-1">	<h1 data-i18n="dash"></h1>	<h2 data-i18n="activation"></h2>	<a-option data-i18n="show_dash" data-binding="setting-json" data-binding-key="show-dash" data-enables="siblings"></a-option><br>	<h2 data-i18n="clock"></h2>	<a-dialog-selector title="i18n:clock" data-binding-key="dash-clock" data-binding="setting">		<a-clock-selector-ui></a-clock-selector-ui>	</a-dialog-selector>	<br>	<h2 data-i18n="buttons"></h2>	<a-selector data-binding="setting-json" data-binding-key="dash-buttons" data-multiple="true">		<a-option data-i18n="bookmark_manager" data-option="bookmarks"></a-option><br>		<a-option data-i18n="history" data-option="history"></a-option><br>		<a-option data-i18n="downloads" data-option="downloads"></a-option><br>		<a-option data-i18n="settings" data-option="settings"></a-option><br>		<a-option data-i18n="extensions" data-option="extensions"></a-option><br>		<a-option data-i18n="apps" data-option="apps"></a-option><br>		<a-option data-i18n="games" data-option="games"></a-option><br>		<a-option data-i18n="news" data-option="news"></a-option><br>	</a-selector></section><!-- SEARCH --><section data-option="search" tabindex="-1">	<h1 data-i18n="search_deng"></h1>	<h2 data-i18n="activation"></h2>	<a-option data-i18n="search_dblclick" data-binding="setting-json" data-binding-key="search-dblclick"></a-option><br>	<h2 data-i18n="search_engine"></h2>	<a-selector data-binding="setting" data-binding-key="search-engine">		<a-option data-option="Google">Google</a-option><br>		<a-option data-option="Bing">Bing</a-option><br>		<a-option data-option="Duckduckgo">Duckduckgo</a-option>	</a-selector>	<h2 data-i18n="keyboard_shortcuts"></h2>	<a-option data-i18n="search_site_shortcut_active" data-binding="setting-json" data-binding-key="search-site-shortcut-active"></a-option><br>	<a-option data-i18n="search_open_folder_shortcut_active" data-binding="setting-json" data-binding-key="search-open-folder-shortcut-active"></a-option><br>	<div class="group">		<br><br>		<em data-i18n="search_on_website_"></em>		<br>		<h2 data-i18n="search_preferred_site"></h2>		<a-selector data-binding="setting" data-binding-key="search-preferred-site">			<a-option data-i18n="search_engine" data-option="engine"></a-option><br>			<a-option data-i18n="search_prefer_website" data-option="website"></a-option>		</a-selector>		<h2 data-i18n="cache"></h2>		<a-button data-i18n="clear_cache" data-action="clearSearchCache"></a-button>		<br>		<h2 data-i18n="url_mapping" data-advanced></h2>		<a-textarea data-binding="setting" data-binding-key="search-url-mapping" data-max-length="4000"></a-textarea>	</div></section><!-- FEEDS --><section data-option="news" tabindex="-1">	<h1 data-i18n="news"></h1>	<h2 data-i18n="subscriptions"></h2>	<a-button data-i18n="unsubscribe_all" data-action="unsubscribeAll"></a-button>	<h2 data-i18n="check_for_feed_updates"></h2>	<a-selector data-binding="setting" data-binding-key="feed-subscriptions-update">		<a-option data-option="on-startup" data-i18n="on_startup"></a-option><br>		<a-option data-option="on-newtab" data-i18n="on_new_tab"></a-option><br>		<a-option data-option="in-background" data-i18n="in_background"></a-option>	</a-selector>	<h2 data-i18n="cache"></h2>	<a-button data-i18n="clear_cache" data-action="clearFeedsCache"></a-button>	<h2 data-i18n="feeds_expiration_time"></h2>	<a-popover-selector data-binding="setting-json" data-binding-key="feeds-expiration-time">		<div data-i18n="30_minutes" data-option="30"></div>		<div data-i18n="60_minutes" data-option="60"></div>		<div data-i18n="120_minutes" data-option="120"></div>		<div data-i18n="240_minutes" data-option="240"></div>	</a-popover-selector>	<h2 data-i18n="url_mapping" data-advanced></h2>	<a-textarea data-binding="setting" data-binding-key="feeds-url-mapping" data-max-length="4000"></a-textarea></section><!-- SYNC --><section data-option="sync">	<h1 data-i18n="sync"></h1>	<a-button data-action="syncAll" data-i18n="sync_all"></a-button>	<h2 data-i18n="favorites_deng"></h2>	<div class="sync-group">		<a-option data-i18n="show_navigation_bar" data-binding="setting-json" data-binding-key="show-navigation-bar/synced"></a-option>		<a-option data-i18n="show_last_visited_folder" data-binding="setting-json" data-binding-key="show-last-visited-folder/synced"></a-option>		<a-option data-i18n="open_bookmarks_in_new_tab" data-binding="setting-json" data-binding-key="open-bookmarks-in-new-tab/synced"></a-option>		<a-option data-i18n="extension_button" data-binding="setting-json" data-binding-key="browser-action/synced"></a-option>	</div>	<h2 data-i18n="layout"></h2>	<div class="sync-group">		<a-option data-i18n="columns_max" data-binding="setting-json" data-binding-key="columns-max/synced"></a-option>		<a-option data-i18n="column_gap" data-binding="setting-json" data-binding-key="column-gap/synced"></a-option>		<a-option data-i18n="row_gap" data-binding="setting-json" data-binding-key="row-gap/synced"></a-option>	</div>	<h2 data-i18n="icons"></h2>	<div class="sync-group">		<a-option data-i18n="size" data-binding="setting-json" data-binding-key="icon-size/synced"></a-option>		<a-option data-i18n="icon_folder_thumbnails" data-binding="setting-json" data-binding-key="icon-folder-thumbnails/synced"></a-option>		<a-option data-i18n="icon_folder_style" data-binding="setting-json" data-binding-key="icon-folder-style/synced"></a-option>		<a-option data-binding="setting-json" data-binding-key="icon-folder-background-color/synced"><span data-i18n="folder"></span>: <span data-i18n="background"></span>/<span data-i18n="color"></span></a-option>		<a-option data-i18n="site_specific_rules" data-binding="setting-json" data-binding-key="icon-rules/synced"></a-option>		<a-option data-i18n="url_mapping" data-binding="setting-json" data-binding-key="icon-url-mapping/synced"></a-option>	</div>	<h2 data-i18n="dock"></h2>	<div class="sync-group">		<a-option data-i18n="show_dock" data-binding="setting-json" data-binding-key="show-dock/synced"></a-option>		<a-option data-i18n="dock_dblclick" data-binding="setting-json" data-binding-key="dock-dblclick/synced"></a-option>		<a-option data-i18n="background_type" data-binding="setting-json" data-binding-key="dock-background-type/synced"></a-option>		<a-option data-i18n="background_color" data-binding="setting-json" data-binding-key="dock-background-color/synced"></a-option>	</div>	<h2 data-i18n="theme"></h2>	<div class="sync-group">		<a-option data-i18n="theme" data-binding="setting-json" data-binding-key="theme/synced"></a-option>	</div>	<h2 data-i18n="background"></h2>	<div class="sync-group">		<a-option data-i18n="background_type" data-binding="setting-json" data-binding-key="background-type/synced"></a-option>		<a-option data-i18n="background_web" data-binding="setting-json" data-binding-key="background-web/synced"></a-option>		<a-option data-i18n="background_color" data-binding="setting-json" data-binding-key="background-color/synced"></a-option>		<a-option data-i18n="filter_active" data-binding="setting-json" data-binding-key="background-filter-active/synced"></a-option>		<a-option data-binding="setting-json" data-binding-key="background-filter-color/synced">Filter: <span data-i18n="color"></span></a-option>		<a-option data-binding="setting-json" data-binding-key="background-filter-blend-mode/synced">Filter: <span data-i18n="blend_mode"></span></a-option>	</div>	<h2 data-i18n="dash"></h2>	<div class="sync-group">		<a-option data-i18n="show_dash" data-binding="setting-json" data-binding-key="show-dash/synced"></a-option>		<a-option data-i18n="clock" data-binding="setting-json" data-binding-key="dash-clock/synced"></a-option>		<a-option data-i18n="buttons" data-binding="setting-json" data-binding-key="dash-buttons/synced"></a-option>	</div>	<h2 data-i18n="search"></h2>	<div class="sync-group">		<a-option data-i18n="search_dblclick" data-binding="setting-json" data-binding-key="search-dblclick/synced"></a-option>		<a-option data-i18n="search_engine" data-binding="setting-json" data-binding-key="search-engine/synced"></a-option>		<a-option data-i18n="search_preferred_site" data-binding="setting-json" data-binding-key="search-preferred-site/synced"></a-option>		<a-option data-i18n="url_mapping" data-binding="setting-json" data-binding-key="search-url-mapping/synced"></a-option>		<a-option data-i18n="search_site_shortcut_active" data-binding="setting-json" data-binding-key="search-site-shortcut-active/synced"></a-option>		<a-option data-i18n="search_open_folder_shortcut_active" data-binding="setting-json" data-binding-key="search-open-folder-shortcut-active/synced"></a-option>	</div>	<h2 data-i18n="news"></h2>	<div class="sync-group">		<a-option data-i18n="subscriptions" data-binding="setting-json" data-binding-key="feed-subscriptions/synced"></a-option>		<a-option data-i18n="check_for_feed_updates" data-binding="setting-json" data-binding-key="feed-subscriptions-update/synced"></a-option>		<a-option data-i18n="feeds_expiration_time" data-binding="setting-json" data-binding-key="feeds-expiration-time/synced"></a-option>		<a-option data-i18n="url_mapping" data-binding="setting-json" data-binding-key="feeds-url-mapping/synced"></a-option>	</div>	<p class="footnote" data-i18n="sync_footnote"></p></section><!-- BACKUP --><section data-option="backup" tabindex="-1">	<h1 data-i18n="backup"></h1>	<a-button data-i18n="back_up_settings" data-action="backupSettings"></a-button>	&nbsp;	<a-button data-i18n="restore_settings" data-action="restoreSettings" ></a-button>	<p class="footnote" data-i18n="backup_footnote"></p></section></a-deck>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initSettingsUI(window) {if(window.SettingsUI) return window.SettingsUI;initCustomElement(window);initAlertDialogUI(window);initConfirmDialogUI(window);initSelector(window);initDeck(window);initBookmarkFolderSelector(window);initOption(window);initBookmarksForInternalPagesButton(window);initRangeslider(window);initPopoverSelector(window);initDialogSelector(window);initBookmarkFolderStyleSelectorUI(window);initColorpickerWithAlpha(window);initButton(window);initTextarea(window);initThemeSelector(window);initMenu(window);initWebWallpaperSelector(window);initFileSelector(window);initColorpicker(window);initClockSelectorUI(window);initDataBindingLocationHash(window);initDataBindingSetting(window);initDataBindingSettingJson(window);initDataBindingSettingFile(window);with(window) {class SettingsUI extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._deck = shadowRoot.querySelector("a-deck");
		this._backgroundFilterPresetMenu = shadowRoot.getElementById("background-filter-preset-menu");
		shadowRoot.addEventListener("click", this);
		shadowRoot.addEventListener("action", this);
		let updateBackgroundFilterVisibility= () => {
			if(["web", "file"].includes(api.settings.get("background-type")))
				this.classList.remove("hide-background-filter");
			else
				this.classList.add("hide-background-filter");
		}
		addEventListener("settings/background-type", updateBackgroundFilterVisibility);
		updateBackgroundFilterVisibility();
		addEventListener("style/compile-begin", event=>{
			this.busy = true;
		});
		addEventListener("style/compile-end", event=>{
			this.busy = false;
		});
		this.initThemeSettings(shadowRoot);
	}
	handleEvent(event) {
		switch(event.type) {
			case "click":
				if(event.target.dataset.advanced != undefined) {
					if(event.target.dataset.advanced == "expanded") {
						event.target.dataset.advanced = "collapsed";
					}
					else {
						event.target.dataset.advanced = "expanded";
					}
				}
			break;
			case "action":
				if(event.detail.name == "applyBackgroundFilterPreset") {
					this.applyBackgroundFilterPreset(event.target.dataset.color, event.target.dataset.blendMode);
					event.preventDefault();
				}
			break;
		}
	}
	initThemeSettings(shadowRoot) {
		const bottomBar = shadowRoot.querySelector('[data-option="theme"] .bottom-bar');
		bottomBar.addEventListener("click", event=>{
			switch(event.target.dataset.i18n) {
				case "reset_background":
					api.settings.set("background-type", "theme");
				break;
				case "reset_dock_background":
					api.settings.set("dock-background-type", "theme");
				break;
				case "chrome_theme":
					event.preventDefault();
					api.browser.openInPopupWindow(
						"chrome-theme-popup",
						api.theme.getMatchingChromeTheme( settings.get("theme") ) || "https://chrome.google.com/webstore/category/themes",
						1100,
						700,
						"normal"
					);
				break;
				case "chrome_settings":
					event.preventDefault();
					api.browser.openInPopupWindow(
						"chrome-theme-popup",
						"chrome://settings/appearance",
						1100,
						700,
						"normal"
					);
				break;
			}
		});
		const resetBackgroundButton = bottomBar.querySelector("[data-i18n='reset_background']");
		const resetDockBackgroundButton = bottomBar.querySelector("[data-i18n='reset_dock_background']");
		const updateBottomBar = function() {
			resetBackgroundButton.style.display = (api.settings.get("background-type") == "theme") ? "none" : "inline-block";
			resetDockBackgroundButton.style.display = (api.settings.get("dock-background-type") == "theme") ? "none" : "inline-block";
		}
		addEventListener("settings/background-type", updateBottomBar);
		addEventListener("settings/dock-background-type", updateBottomBar);
		updateBottomBar();
	}
	clearIconCache() {
		api.icons.countCached()
			.then(n=>{
				if(n)
					showConfirm(chrome.i18n.getMessage("clear_cache"), chrome.i18n.getMessage("clear_cache_confirm", ""+n), ()=>api.icons.clearCache());
				else
					showAlert(chrome.i18n.getMessage("clear_cache"), chrome.i18n.getMessage("cache_empty"));
			})
			.catch(console.log)
	}
	clearFeedsCache() {
		var n = api.feeds.countCached();
		if(n)
			showConfirm(chrome.i18n.getMessage("clear_cache"), chrome.i18n.getMessage("clear_cache_confirm", ""+n), ()=>api.feeds.clearCache());
		else
			showAlert(chrome.i18n.getMessage("clear_cache"), chrome.i18n.getMessage("cache_empty"));
	}
	unsubscribeAll() {
		var n = api.feedSubscriptions.count();
		if(n)
			showConfirm(chrome.i18n.getMessage("unsubscribe_all"), chrome.i18n.getMessage("unsubscribe_all_confirm", ""+n), ()=>api.feedSubscriptions.removeAll());
		else
			showAlert(chrome.i18n.getMessage("unsubscribe_all"), chrome.i18n.getMessage("unsubscribe_none"));
	}
	clearSearchCache() {
		var n = api.search.countCached();
		if(n)
			showConfirm(chrome.i18n.getMessage("clear_cache"), chrome.i18n.getMessage("clear_cache_confirm", ""+n), ()=>api.search.clearCache());
		else
			showAlert(chrome.i18n.getMessage("clear_cache"), chrome.i18n.getMessage("cache_empty"));
	}
	applyBackgroundFilterPreset(color, blendMode) {
		api.settings.set("background-filter-color", color);
		api.settings.set("background-filter-blend-mode", blendMode);
	}
	syncAll() {
		this._deck.querySelectorAll('[data-option="sync"] a-option').forEach(option=>{
			api.settings.set(option.bindingKey, true);
		});
	}
	backupSettings() {
		var downloadLink = document.createElement("a");
		var url = "data:text/json;charset=utf-8," + encodeURIComponent(api.settings.exportToJSON());
		downloadLink.href = url;
		downloadLink.download = "favorites.settings";
		downloadLink.click();
	}
	restoreSettings() {
		let fileSelector = this._____fileSelector = document.createElement("input"); // avoid gc!!!
		fileSelector.type = "file";
		fileSelector.onchange = e => {
			api.settings.importFromFile(fileSelector.files[0])
				.then(()=>
					showAlert(chrome.i18n.getMessage("restore_settings"), chrome.i18n.getMessage("settings_successfully_restored"))
				)
				.catch(error=>
					showAlert(chrome.i18n.getMessage("error"), error)
				);
		};
		fileSelector.click();
	}
	bind() {
		super.bind();
		return Promise.all([
				document.fonts.load('300 1em Roboto'),
				document.fonts.load('normal 1em Roboto'),
				document.fonts.load('500 1em Roboto'),
				document.fonts.load('bold 1em Roboto'),
				new Promise(r=>{
					const img = new Image();
					img.onload = img.onerror = r;
					img.src = "ui/settings-ui/settings-ui_icons.svg";
				}),
				new Promise(r=>setTimeout(r, 50))
			])
			.then(()=>{
				this.classList.add("ready");
			})
	}
}
defineCustomElement("a-settings-ui", SettingsUI, t);return window.SettingsUI=SettingsUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>@keyframes slidein{to{transform:translateX(0)}}:host{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.5);overflow:hidden}:host(.-visible){display:block}#container{position:absolute;background-color:var(--sidebar-background-color, white);min-width:300px;bottom:0;top:0;left:0;animation:slidein .2s;animation-fill-mode:forwards;transform:translateX(-100%)}#container{display:flex;flex-direction:column}#header{display:block}#content{display:block;overflow-y:auto;flex:1;height:100%}::slotted(*){min-height:56px;border-bottom:1px solid var(--sidebar-border-color, #eee);font-size:13px;font-weight:500;margin:0;line-height:1.5em}::slotted(h1){font-weight:normal;font-size:16px;padding:20px 24px 10px 24px}:host-context([data-bidi=rtl]) #container{left:auto;right:0;transform:translateX(100%)}</style><div id="container"><slot id="header" name="header"></slot><slot id="content"></slot></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initSidebar(window) {if(window.Sidebar) return window.Sidebar;initCustomElement(window);with(window) {class Sidebar extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this.addEventListener("click", this._onClick.bind(this), true);
	}
	show() {
		this.classList.add("-visible");
	}
	hide() {
		this.classList.remove("-visible");
	}
	_onClick(event) {
		if(!event.defaultPrevented)
			this.hide();
	}
}
defineCustomElement("a-sidebar", Sidebar, t);return window.Sidebar=Sidebar;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:inline-block;min-width:200px;height:0}textarea{display:block;padding:10px;margin:0;width:100%;height:100%;min-height:200px;border:none;outline:none;resize:vertical;font-family:inherit;font-size:inherit;border:1px solid #e8e8e8;background-color:white}textarea::selection{background-color:#CAE2F9;color:#212B3B}span{display:block;text-align:right;margin:3px 0 0 0}</style><textarea autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea><span>1928/2093784</span>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initTextarea(window) {if(window.Textarea) return window.Textarea;initCustomElement(window);with(window) {class Textarea extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._textarea = shadowRoot.querySelector("textarea");
		this._textarea.addEventListener("change", this);
		this._textarea.addEventListener("input", this);
		this.status = shadowRoot.querySelector("span");
		if(this.dataset.value)
			this.value = this.dataset.value;
		if(this.dataset.maxLength)
			this.maxLength = parseInt(this.dataset.maxLength);
	}
	get value() {
		return this._textarea.value;
	}
	set value(value) {
		this._textarea.value = value;
		this.updateStatus();
	}
	get maxLength() {
		return this._textarea.maxLength;
	}
	set maxLength(value) {
		this._textarea.maxLength = value;
	}
	updateStatus() {
		this.status.textContent = this._textarea.value.length + ( (this.maxLength > -1) ? " / " + this.maxLength : "");
	}
	handleEvent(event) {
		switch(event.type) {
			case "change":
				this.dispatchEvent(new Event('change'));
			break;
			case "input":
				this.updateStatus();
			break;
		}
	}
}
defineCustomElement("a-textarea", Textarea, t);return window.Textarea=Textarea;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{min-width:300px;height:30px;display:inline-block;background-color:white;vertical-align:top;font-size:12px;padding:0 10px;line-height:30px;border:1px solid #ccc}input{margin:0;width:100%;height:30px;min-width:0;border:none;outline:none;background-color:transparent;font-family:inherit}input::selection{background-color:#CAE2F9;color:#212B3B}input[type=url]{direction:ltr}</style><input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></input>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initTextfield(window) {if(window.Textfield) return window.Textfield;initCustomElement(window);with(window) {class Textfield extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._input = shadowRoot.querySelector("input");
		this._input.onchange = () => {
			this.dispatchEvent(new Event('change', { bubbles : true}));
		}
		if(this.dataset.value)
			this.value = this.dataset.value;
		if(this.dataset.placeholder)
			this.placeholder = this.dataset.placeholder;
		if(this.dataset.type)
			this.type = this.dataset.type;
		if(this.dataset.required)
			this.required = this.dataset.required;
		if(this.dataset.required)
			this.required = this.dataset.required;
	}
	get placeholder() {
		return this._input.placeholder;
	}
	set placeholder(value) {
		this._input.placeholder = value;
	}
	get value() {
		return this._input.value;
	}
	set value(value) {
		this._input.value = value;
	}
	get type() {
		return this._input.type;
	}
	set type(value) {
		this._input.type = value;
	}
	set required(value) {
		this._input.required = value;
	}
	get required() {
		return this._input.required;
	}
	reportValidity() {
		return this._input.reportValidity();
	}
}
defineCustomElement("a-textfield", Textfield, t);return window.Textfield=Textfield;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host,*{box-sizing:border-box;outline:none}:host([data-disabled]){filter:grayscale(100%);pointer-events:none;opacity:.5}:host-context(.-busy),:host-context(.-busy) *,:host-context(.-busy)::slotted(*){cursor:wait !important}:host{display:block}</style><div id="list"><a-thumbshot data-name="default_white" data-title="Default – White" data-srcset="/themes/default_white/thumbshot.png 1.0x, /themes/default_white/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="default_grey" data-title="Default – Grey" data-srcset="/themes/default_grey/thumbshot.png 1.0x, /themes/default_grey/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="default_dark" data-title="Default – Dark" data-srcset="/themes/default_dark/thumbshot.png 1.0x, /themes/default_dark/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="sea_foam" data-title="Sea Foam" data-srcset="/themes/sea_foam/thumbshot.png 1.0x, /themes/sea_foam/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="rose" data-title="Rose" data-srcset="/themes/rose/thumbshot.png 1.0x, /themes/rose/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="slate" data-title="Slate" data-srcset="/themes/slate/thumbshot.png 1.0x, /themes/slate/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="high_contrast_colorful" data-title="High Contrast Colorful" data-srcset="/themes/high_contrast_colorful/thumbshot.png 1.0x, /themes/high_contrast_colorful/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="classic_blue" data-title="Classic Blue" data-srcset="/themes/classic_blue/thumbshot.png 1.0x, /themes/classic_blue/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="oceanic" data-title="Oceanic" data-srcset="/themes/oceanic/thumbshot.png 1.0x, /themes/oceanic/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="banana" data-title="Banana" data-srcset="/themes/banana/thumbshot.png 1.0x, /themes/banana/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="marsala" data-title="Marsala" data-srcset="/themes/marsala/thumbshot.png 1.0x, /themes/marsala/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="pretty-in-pink" data-title="Pretty in Pink" data-srcset="/themes/pretty-in-pink/thumbshot.png 1.0x, /themes/pretty-in-pink/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="serenity" data-title="Serenity" data-srcset="/themes/serenity/thumbshot.png 1.0x, /themes/serenity/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="ultra-violet" data-title="Ultra Violet" data-srcset="/themes/ultra-violet/thumbshot.png 1.0x, /themes/ultra-violet/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="honeysuckle" data-title="Honeysuckle" data-srcset="/themes/honeysuckle/thumbshot.png 1.0x, /themes/honeysuckle/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="just_black" data-title="Just Black" data-srcset="/themes/just_black/thumbshot.png 1.0x, /themes/just_black/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="black_indigo" data-title="Black Indigo" data-srcset="/themes/black_indigo/thumbshot.png 1.0x, /themes/black_indigo/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="camo" data-title="Camo" data-srcset="/themes/camo/thumbshot.png 1.0x, /themes/camo/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="summer_morning" data-title="Summer – Morning" data-srcset="/themes/summer_morning/thumbshot.png 1.0x, /themes/summer_morning/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="summer_noon" data-title="Summer – Noon" data-srcset="/themes/summer_noon/thumbshot.png 1.0x, /themes/summer_noon/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="summer_evening" data-title="Summer – Evening" data-srcset="/themes/summer_evening/thumbshot.png 1.0x, /themes/summer_evening/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="landscape_grey" data-title="Landscape – Grey" data-srcset="/themes/landscape_grey/thumbshot.png 1.0x, /themes/landscape_grey/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="landscape_sand" data-title="Landscape – Sand" data-srcset="/themes/landscape_sand/thumbshot.png 1.0x, /themes/landscape_sand/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="landscape_blue_grey" data-title="Landscape – Blue Grey" data-srcset="/themes/landscape_blue_grey/thumbshot.png 1.0x, /themes/landscape_blue_grey/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="sunny" data-title="Sunny" data-srcset="/themes/sunny/thumbshot.png 1.0x, /themes/sunny/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="sand" data-title="Sand" data-srcset="/themes/sand/thumbshot.png 1.0x, /themes/sand/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="soil" data-title="Soil" data-srcset="/themes/soil/thumbshot.png 1.0x, /themes/soil/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="ice_pop_orange" data-title="Ice Pop – Orange" data-srcset="/themes/ice_pop_orange/thumbshot.png 1.0x, /themes/ice_pop_orange/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="ice_pop_sour" data-title="Ice Pop – Sour" data-srcset="/themes/ice_pop_sour/thumbshot.png 1.0x, /themes/ice_pop_sour/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="ice_pop_sweet" data-title="Ice Pop – Sweet" data-srcset="/themes/ice_pop_sweet/thumbshot.png 1.0x, /themes/ice_pop_sweet/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="pastel_1" data-title="Pastel I" data-srcset="/themes/pastel_1/thumbshot.png 1.0x, /themes/pastel_1/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="pastel_2" data-title="Pastel II" data-srcset="/themes/pastel_2/thumbshot.png 1.0x, /themes/pastel_2/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="pastel_3" data-title="Pastel III" data-srcset="/themes/pastel_3/thumbshot.png 1.0x, /themes/pastel_3/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="zigzag_blue_grey" data-title="Zigzag – Blue Grey" data-srcset="/themes/zigzag_blue_grey/thumbshot.png 1.0x, /themes/zigzag_blue_grey/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="zigzag_blue" data-title="Zigzag – Blue" data-srcset="/themes/zigzag_blue/thumbshot.png 1.0x, /themes/zigzag_blue/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="zigzag_blue_dark" data-title="Zigzag – Blue Dark" data-srcset="/themes/zigzag_blue_dark/thumbshot.png 1.0x, /themes/zigzag_blue_dark/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="pop" data-title="Pop" data-srcset="/themes/pop/thumbshot.png 1.0x, /themes/pop/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="toy" data-title="Toy" data-srcset="/themes/toy/thumbshot.png 1.0x, /themes/toy/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="gadget" data-title="Gadget" data-srcset="/themes/gadget/thumbshot.png 1.0x, /themes/gadget/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="lava_yellow" data-title="Lava – Yellow" data-srcset="/themes/lava_yellow/thumbshot.png 1.0x, /themes/lava_yellow/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="lava_pink" data-title="Lava – Pink" data-srcset="/themes/lava_pink/thumbshot.png 1.0x, /themes/lava_pink/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="lava_blue" data-title="Lava – Blue" data-srcset="/themes/lava_blue/thumbshot.png 1.0x, /themes/lava_blue/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="blue_dots" data-title="Blue – Dots" data-srcset="/themes/blue_dots/thumbshot.png 1.0x, /themes/blue_dots/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="teal_dots" data-title="Teal – Dots" data-srcset="/themes/teal_dots/thumbshot.png 1.0x, /themes/teal_dots/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="grey_dots" data-title="Grey – Dots" data-srcset="/themes/grey_dots/thumbshot.png 1.0x, /themes/grey_dots/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="sunset" data-title="Sunset" data-srcset="/themes/sunset/thumbshot.png 1.0x, /themes/sunset/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="ocean" data-title="Ocean" data-srcset="/themes/ocean/thumbshot.png 1.0x, /themes/ocean/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="aurora" data-title="Aurora" data-srcset="/themes/aurora/thumbshot.png 1.0x, /themes/aurora/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="grey" data-title="Grey" data-srcset="/themes/grey/thumbshot.png 1.0x, /themes/grey/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="grey_dark" data-title="Grey – Dark" data-srcset="/themes/grey_dark/thumbshot.png 1.0x, /themes/grey_dark/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="grey_radiance" data-title="Grey – Radiance" data-srcset="/themes/grey_radiance/thumbshot.png 1.0x, /themes/grey_radiance/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="teal" data-title="Teal" data-srcset="/themes/teal/thumbshot.png 1.0x, /themes/teal/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="teal_dark" data-title="Teal – Dark" data-srcset="/themes/teal_dark/thumbshot.png 1.0x, /themes/teal_dark/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="teal_radiance" data-title="Teal – Radiance" data-srcset="/themes/teal_radiance/thumbshot.png 1.0x, /themes/teal_radiance/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="blue" data-title="Blue" data-srcset="/themes/blue/thumbshot.png 1.0x, /themes/blue/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="blue_dark" data-title="Blue – Dark" data-srcset="/themes/blue_dark/thumbshot.png 1.0x, /themes/blue_dark/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="blue_radiance" data-title="Blue – Radiance" data-srcset="/themes/blue_radiance/thumbshot.png 1.0x, /themes/blue_radiance/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="pink" data-title="Pink" data-srcset="/themes/pink/thumbshot.png 1.0x, /themes/pink/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="pink_dark" data-title="Pink – Dark" data-srcset="/themes/pink_dark/thumbshot.png 1.0x, /themes/pink_dark/thumbshot-hidpi.png 1.5x" ></a-thumbshot><a-thumbshot data-name="pink_radiance" data-title="Pink – Radiance" data-srcset="/themes/pink_radiance/thumbshot.png 1.0x, /themes/pink_radiance/thumbshot-hidpi.png 1.5x" ></a-thumbshot></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initThemeSelector(window) {if(window.ThemeSelector) return window.ThemeSelector;initCustomElement(window);initThumbshot(window);with(window) {class ThemeSelector extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._listEl = shadowRoot.querySelector("#list");
		addEventListener("settings/theme", () => this.update());
		shadowRoot.addEventListener("click", this);
		this.update();
	}
	update() {
		const selectedTheme = api.settings.get("theme");
		for(let thumbshot of this._listEl.children) {
			thumbshot.selected = (selectedTheme == thumbshot.name);
		}
	}
	handleEvent(event) {
		if(event.type == "click") {
			if(event.target instanceof Thumbshot) {
				api.settings.set("theme", event.target.name);
			}
		}
	}
}
defineCustomElement("a-theme-selector", ThemeSelector, t);return window.ThemeSelector=ThemeSelector;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host,*{box-sizing:border-box;outline:none}:host([data-disabled]){filter:grayscale(100%);pointer-events:none;opacity:.5}:host-context(.-busy),:host-context(.-busy) *,:host-context(.-busy)::slotted(*){cursor:wait !important}*{box-sizing:border-box}:host{display:inline-block;margin:0 12px 12px 0;cursor:pointer}:host(.-selected) #selected{display:block}#container{position:relative;width:200px;height:200px;overflow:hidden;box-shadow:0 0 2px 2px rgba(0,0,0,0.04)}#screenshot-container{position:absolute;top:10px;left:10px;right:10px;height:140px;width:180px;background-color:white;overflow:hidden;outline:1px solid rgba(0,0,0,0.03);outline-offset:-1px}#screenshot-container #screenshot{height:100%}#screenshot-container #screenshot:hover{float:right}#bottom-bar{position:absolute;bottom:0;width:100%;height:50px;padding:10px 90px 10px 10px;font-weight:500;background-color:white}#bottom-bar #title{color:#3367D6;font-weight:500;font-size:12px}#selected{display:none;position:absolute;right:22px;top:22px;background-image:url('ui/thumbshot/thumbshot-selected.svg');width:25px;height:25px;background-color:#3367D6;border-radius:100px;pointer-events:none}</style><div tabindex="0" id="container">	<div id="screenshot-container">		<img id="screenshot" draggable="false">	</div>	<div id="bottom-bar">		<span id="title"></span>	</div>	<div id="selected"></div></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initThumbshot(window) {if(window.Thumbshot) return window.Thumbshot;initCustomElement(window);with(window) {class Thumbshot extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._screenshot = shadowRoot.querySelector("#screenshot");
		this._title = shadowRoot.querySelector("#title");
		this._selected = shadowRoot.querySelector("#selected");
		if(this.dataset.srcset)
			this.srcset = this.dataset.srcset;
		if(this.dataset.name)
			this.name = this.dataset.name;
		if(this.dataset.title)
			this.title = this.dataset.title;
		if(this.dataset.selected)
			this.selected = (this.dataset.selected == "true");
	}
	set srcset(value) {
		this._screenshot.srcset = value;
	}
	set title(value) {
		this._title.innerHTML = value.split("–").join("<br>");
	}
	set selected(value) {
		if(value)
			this.classList.add("-selected");
		else
			this.classList.remove("-selected");
	}
}
defineCustomElement("a-thumbshot", Thumbshot, t);return window.Thumbshot=Thumbshot;}}}
{const t = document.createElement("template");t.innerHTML = `<style></style><span id="date"></span>&nbsp;–&nbsp;<span id="time"></span>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initTimestamp(window) {if(window.Timestamp) return window.Timestamp;initCustomElement(window);with(window) {class Timestamp extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this.start = this.start.bind(this);
		this._dateEl = shadowRoot.getElementById("date");
		this._timeEl = shadowRoot.getElementById("time");
	}
	start() {
		var now = new Date();
		const seconds = now.getSeconds();
		const dayOfMonth = now.getDate();
		if(this._dateEl.dayOfMonth != dayOfMonth) {
			this._dateEl.textContent = api.i18n.formatDateLong(now);
			this._dateEl.dayOfMonth = dayOfMonth;
		}
		this._timeEl.textContent = api.i18n.formatTime(now);
		this._timeout = setTimeout(this.start, (60 - seconds) * 1000);
	}
	stop() {
		clearTimeout(this._timeout);
	}
	bind() {
		super.bind();
		this.start();
	}
	unbind() {
		super.unbind();
		this.stop();
	}
}
defineCustomElement("a-timestamp", Timestamp, t);return window.Timestamp=Timestamp;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:flex;flex-direction:row;align-items:center;background-color:rgba(0,0,0,0.2);border:none;padding:0 0 0 40px;border-radius:3px;height:40px;position:relative;color:white}:host::before{content:"";width:40px;height:100%;-webkit-mask-image:url(ui/topbar-search-field/topbar-search-field-search-icon.svg);background-repeat:no-repeat;background-position:center;background-color:currentColor;top:0;left:0;opacity:.5;position:absolute;z-index:1000}:host(:focus)::before{opacity:1}input{color:inherit}input::-webkit-input-placeholder{color:inherit;opacity:.5}input::selection{background-color:rgba(150,150,150,0.5);color:white}#clear-btn{width:42px;height:100%;display:none;-webkit-mask-image:url(ui/topbar-search-field/topbar-search-field-icon-close.svg);background-repeat:no-repeat;background-position:center;background-color:currentColor;cursor:pointer;opacity:.5}#clear-btn:hover{opacity:1}#clear-btn.visible{display:inline-block}</style><span id="clear-btn"></span>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initTopbarSearchField(window) {if(window.TopbarSearchField) return window.TopbarSearchField;initTextfield(window);with(window) {class TopbarSearchField extends Textfield {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._input.addEventListener("focusin", this);
		this._input.addEventListener("change", this);
		this._input.addEventListener("input", this);
		this._clearBtn = shadowRoot.getElementById("clear-btn");
		this._clearBtn.addEventListener("click", this);
		if(this.dataset.value)
			this.value = this.dataset.value;
	}
	handleEvent(event) {
		switch(event.type) {
			case "focusin":
				this._input.select();
			break;
			case "input":
			case "change":
				this.updateClearBtn();
			break;
			case "click":
				this._input.value = "";
				this._input.dispatchEvent(new Event('change'));
			break;
		}
	}
	updateClearBtn() {
		if(this._input.value.length)
			this._clearBtn.classList.add("visible");
		else
			this._clearBtn.classList.remove("visible");
	}
	set value(value) {
		this._input.value = value;
		this.updateClearBtn();
	}
	get value() {
		return this._input.value;
	}
}
defineCustomElement("a-topbar-search-field", TopbarSearchField, t);return window.TopbarSearchField=TopbarSearchField;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{display:block;width:100%;background-color:#3367D6;color:white;overflow:hidden;display:flex;align-items:center;transition:box-shadow .25s;min-height:56px;height:56px}:host(.shadow){box-shadow:0 1px 3px 3px rgba(0,0,0,0.1)}*{white-space:nowrap}#center{overflow:hidden;text-align:center;flex:1}#left{padding-left:8px}#right{text-align:right;padding-right:5px}::slotted(h1),::slotted(.message){margin:0;font-weight:500;font-size:16px;text-overflow:ellipsis;overflow:hidden}::slotted(*){vertical-align:middle}::slotted(a-button){border:none}:host-context(dialog) ::slotted(h1){font-size:14px;margin-top:3px}:host-context(:not([data-bidi=rtl])) ::slotted(h1[slot=left]){margin-left:12px}:host-context([data-bidi=rtl]) ::slotted(h1[slot=left]){margin-right:12px}</style><div id="left">	<slot name="left"></slot></div><div id="center">	<slot name="center"></slot></div><div id="right">	<slot name="right"></slot></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initTopbar(window) {if(window.Topbar) return window.Topbar;initCustomElement(window);with(window) {class Topbar extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this.tabIndex = -1;
	}
}
defineCustomElement("a-topbar", Topbar, t);return window.Topbar=Topbar;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{width:400px;height:516px}[data-option="selection"]{display:block}[data-option="selection"]>div{display:flex;flex-direction:column;align-items:flex-start;width:100%;height:70px;background-color:white;font-size:11px;line-height:1.2em;text-align:left;vertical-align:top;background-image:linear-gradient(#eee, #f0f0f0);background-size:93px 70px;background-repeat:no-repeat;padding:12px 0 0 103px;color:black}[data-option="selection"]>div span{display:block}[data-option="selection"]>div .title{font-weight:bold}[data-option="selection"]>div .credits{font-weight:normal}[data-option="selection"]>div a{color:inherit;text-decoration:none;outline:none}[data-option="selection"]>div:hover{background-color:#f6f9fd}[data-option="selection"]>div:not(.-selected) *{pointer-events:none}[data-option="selection"]>div:not(:last-child){border-bottom:1px solid rgba(0,0,0,0.05)}[data-option="selection"]>div.-selected{background-color:#f2f5fc}[data-option="selection"]>div.-selected a{color:#2451b2;text-decoration:underline}a-textfield{display:block;width:100%}[data-option="random"] a-option{display:block}</style><a-menu id="menu">	<a-menuitem data-action="showUISelection" data-i18n="selected_photography"></a-menuitem>	<a-menuitem data-action="showUIRandom" data-i18n="random_selection"></a-menuitem>	<a-menuitem data-action="showUICustom" data-i18n="custom_url"></a-menuitem></a-menu><a-topbar>	<a-button slot="left" data-icon="menu" data-menu="menu"></a-button>	<h1 slot="center"></h1>	<a-button slot="right" data-icon="close" data-action="cancel"></a-button></a-topbar><a-deck class="content"><!-- SELECTION -->	<a-selector id="selection-url" data-option="selection"><div data-option="https://images.unsplash.com/photo-1492057201103-01c5991d4596?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=08a6ab2701e600a69aa6486218877a41" type="submit" style="background-image:url(/wallpapers/thumb-0.jpg)" ><span class="title">Grove afar</span><span class="credits">By <a href="https://unsplash.com/@anileated" target="unsplash">Anton Strogonoff</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1492428318126-dd7ead0cf184?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=b6d5d86a45494d13abacbbab2addbaa2" type="submit" style="background-image:url(/wallpapers/thumb-1.jpg)" ><span class="title">Salt towers</span><span class="credits">By <a href="https://unsplash.com/@joelfilip" target="unsplash">Joel Filipe</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1505516580118-8502b2e37c44?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=f2add8d4b948bc87147252afd5fc622f" type="submit" style="background-image:url(/wallpapers/thumb-2.jpg)" ><span class="title">Niagara’s Fury</span><span class="credits">By <a href="https://unsplash.com/@billy_huy" target="unsplash">Billy Huynh</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1438986710423-1bf13038bc14?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=9a5ade6d8c54f65699de05f87e73a216" type="submit" style="background-image:url(/wallpapers/thumb-3.jpg)" ><span class="title">Hyatt Regency Paris - Charles De Gaulle</span><span class="credits">By <a href="https://unsplash.com/@anthonydelanoix" target="unsplash">Anthony DELANOIX</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1490821957118-4ae460b4f52b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=a07756e1b710a2fefb607a9f0e66c5d2" type="submit" style="background-image:url(/wallpapers/thumb-4.jpg)" ><span class="title">White architecture concept</span><span class="credits">By <a href="https://unsplash.com/@vanschneider" target="unsplash">Tobias van Schneider</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1489537235181-fc05daed5805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=79233a2087eb97d32665cafc27a07472" type="submit" style="background-image:url(/wallpapers/thumb-5.jpg)" ><span class="title">Spring flower blossoms on branch</span><span class="credits">By <a href="https://unsplash.com/@anthonydelanoix" target="unsplash">Anthony DELANOIX</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1492188902183-629fd3bd5250?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=8ae39a7ee100cad283a30cf9bca96ff2" type="submit" style="background-image:url(/wallpapers/thumb-6.jpg)" ><span class="title">Aflutter</span><span class="credits">By <a href="https://unsplash.com/@anileated" target="unsplash">Anton Strogonoff</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1431444393712-19267bd26144?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=0af0fcaf8370ed963570d2bc885a12cc" type="submit" style="background-image:url(/wallpapers/thumb-7.jpg)" ><span class="title">White flower field</span><span class="credits">By <a href="https://unsplash.com/@andurache" target="unsplash">Alexandru Tudorache</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1514031987442-e7d5e0224e2c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=7aad5743ae0844410b8c221fff18b73c" type="submit" style="background-image:url(/wallpapers/thumb-8.jpg)" ><span class="title">St. Croix, U.S. Virgin Islands</span><span class="credits">By <a href="https://unsplash.com/@gebhartyler" target="unsplash">tyler gebhart</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1494189945456-5cf31b1167dc?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=833eafda0902fde7e34c0de6bb3ec23e" type="submit" style="background-image:url(/wallpapers/thumb-9.jpg)" ><span class="title">A moment to breathe</span><span class="credits">By <a href="https://unsplash.com/@somanydetails" target="unsplash">luigi manga</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1495620093313-9b049219e095?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=6bbdeb5f50d9054f9d4da2d275feb0a4" type="submit" style="background-image:url(/wallpapers/thumb-10.jpg)" ><span class="title">Meadow, buttercup, flower and plant</span><span class="credits">By <a href="https://unsplash.com/@jplenio" target="unsplash">Johannes Plenio</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1492185244344-91fde303149e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=3feeeec2706f23bad9ad74417f762a03" type="submit" style="background-image:url(/wallpapers/thumb-11.jpg)" ><span class="title">Nature, spring, droplet and water</span><span class="credits">By <a href="https://unsplash.com/@aaronburden" target="unsplash">Aaron Burden</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1486016006115-74a41448aea2?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=3db0771e3f5f279c79b6d338ca5d6ff5" type="submit" style="background-image:url(/wallpapers/thumb-12.jpg)" ><span class="title">It’s raining</span><span class="credits">By <a href="https://unsplash.com/@gabrielediwald" target="unsplash">Gabriele Diwald</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1499988921418-b7df40ff03f9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=9007e992868aa978d94aed421ce35834" type="submit" style="background-image:url(/wallpapers/thumb-13.jpg)" ><span class="title">Desert</span><span class="credits">By <a href="https://unsplash.com/@m______________e" target="unsplash">Mark Eder</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1476673160081-cf065607f449?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=2041cde7ca12cc6f09092a812941c4db" type="submit" style="background-image:url(/wallpapers/thumb-14.jpg)" ><span class="title">Sunrise above a sandy beach</span><span class="credits">By <a href="https://unsplash.com/@frankiefoto" target="unsplash">frank mckenna</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1515229144611-617d3ce8e108?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=3734c5bda29fab051fd15f3aa1937f74" type="submit" style="background-image:url(/wallpapers/thumb-15.jpg)" ><span class="title">Fuerteventura, Spain</span><span class="credits">By <a href="https://unsplash.com/@christoffere" target="unsplash">Christoffer Engström</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1508025522233-ed33103769f5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=370378d8d791be35267989505c83b38c" type="submit" style="background-image:url(/wallpapers/thumb-16.jpg)" ><span class="title">To The Valley Floor</span><span class="credits">By <a href="https://unsplash.com/@phsecan" target="unsplash">Peter Secan</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1487621167305-5d248087c724?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=3521979820e3f5b1774099b3bbf3fffe" type="submit" style="background-image:url(/wallpapers/thumb-17.jpg)" ><span class="title">Day 10 #unsplashdaily</span><span class="credits">By <a href="https://unsplash.com/@paulgilmore_" target="unsplash">Paul Gilmore</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1499453972551-f97502f50ed6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=bd39c3afd432a51ee4bed2a987066f41" type="submit" style="background-image:url(/wallpapers/thumb-18.jpg)" ><span class="title">Trees & fog</span><span class="credits">By <a href="https://unsplash.com/@knipszimmer" target="unsplash">Marc Zimmer</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=fb2b9d586c84227f0d10bd00f441fca5" type="submit" style="background-image:url(/wallpapers/thumb-19.jpg)" ><span class="title">Ama Dablam mountain</span><span class="credits">By <a href="https://unsplash.com/@rohittandon" target="unsplash">Rohit Tandon</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1515268064940-5150b7c29f35?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=330bed33be8fafb0e3908178950f4d6b" type="submit" style="background-image:url(/wallpapers/thumb-20.jpg)" ><span class="title">Swiss Alps</span><span class="credits">By <a href="https://unsplash.com/@nightcrawler1986" target="unsplash">John Rodenn Castillo</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1506765336936-bb05e7e06295?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=a67005a4e24a540a4c391ad5b8c273ca" type="submit" style="background-image:url(/wallpapers/thumb-21.jpg)" ><span class="title">Säntis after storm</span><span class="credits">By <a href="https://unsplash.com/@lobostudiohamburg" target="unsplash">LoboStudio Hamburg</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=5a1da7d200ac1db58ae814d4ebd04fb3" type="submit" style="background-image:url(/wallpapers/thumb-22.jpg)" ><span class="title">Pastel Bokeh Lights Wallpaper</span><span class="credits">By <a href="https://unsplash.com/@sharonmccutcheon" target="unsplash">Sharon McCutcheon</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/6/blurred_lines.jpeg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=7ad3e9e9564de818e828c5699ed33394" type="submit" style="background-image:url(/wallpapers/thumb-23.jpg)" ><span class="title">Colorful bokeh</span><span class="credits">By <a href="https://unsplash.com/@sebastianmuller" target="unsplash">Sebastian Muller</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1432847712612-926caafaa802?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=bd0a9664009cd1dfda886eca662e2b73" type="submit" style="background-image:url(/wallpapers/thumb-24.jpg)" ><span class="title">Bokeh effect</span><span class="credits">By <a href="https://unsplash.com/@gabrielssantiago" target="unsplash">Gabriel Santiago</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1516469635987-fcdf02d6017c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=4546beeec2f8a9c6a707c613285c42c9" type="submit" style="background-image:url(/wallpapers/thumb-25.jpg)" ><span class="title">Clarity</span><span class="credits">By <a href="https://unsplash.com/@shadejay" target="unsplash">Antony Xia</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1518980120692-3cfe64c152d0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=2318e307d896df63c12b790d2a1df621" type="submit" style="background-image:url(/wallpapers/thumb-26.jpg)" ><span class="title">SuperSud Highway</span><span class="credits">By <a href="https://unsplash.com/@griestprojects" target="unsplash">Mitchell Griest</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=fc67cdc3dcb57333bd65d0cea6a99eb2" type="submit" style="background-image:url(/wallpapers/thumb-27.jpg)" ><span class="title">Sea of Marble</span><span class="credits">By <a href="https://unsplash.com/@vanessaives" target="unsplash">Vanessa Ives</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1519521184284-ca2a61ae3aad?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=5d6480b45e52892cc7f1de2339190f5f" type="submit" style="background-image:url(/wallpapers/thumb-28.jpg)" ><span class="title">Frozen, cracks, ice and winter</span><span class="credits">By <a href="https://unsplash.com/@aaronburden" target="unsplash">Aaron Burden</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1507963901243-ebfaecd5f2f4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=d7491679e512e2b7cc68e128b70503d6" type="submit" style="background-image:url(/wallpapers/thumb-29.jpg)" ><span class="title">Blessed</span><span class="credits">By <a href="https://unsplash.com/@mgolsen" target="unsplash">Michael Olsen</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1498691055072-4a9a311fc197?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=9fcccddd431c30861a4fdba84e39d571" type="submit" style="background-image:url(/wallpapers/thumb-30.jpg)" ><span class="title">Blending in</span><span class="credits">By <a href="https://unsplash.com/@hansonlujx" target="unsplash">Hanson Lu</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=6ec5c7434b44c83a104eb49e74c26e91" type="submit" style="background-image:url(/wallpapers/thumb-31.jpg)" ><span class="title">Milky Way</span><span class="credits">By <a href="https://unsplash.com/@billy_huy" target="unsplash">Billy Huynh</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1504123010103-b1f3fe484a32?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=dd2bac5c1f1e979ed65ed03a4e0c9b84" type="submit" style="background-image:url(/wallpapers/thumb-32.jpg)" ><span class="title">Lightning, sky, storm and cloud</span><span class="credits">By <a href="https://unsplash.com/@jplenio" target="unsplash">Johannes Plenio</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1483347756197-71ef80e95f73?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=ddc7d9a4731caa796f9b3a95b411ac13" type="submit" style="background-image:url(/wallpapers/thumb-33.jpg)" ><span class="title">Polar lights over dark trees</span><span class="credits">By <a href="https://unsplash.com/@vingtcent" target="unsplash">Vincent Guth</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1475518845976-0fd87b7e4e5d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=8a4e1c0bb496830990ffdda4c423add2" type="submit" style="background-image:url(/wallpapers/thumb-34.jpg)" ><span class="title">Aurora boreali, northern light, sky and green</span><span class="credits">By <a href="https://unsplash.com/@oldskool2016" target="unsplash">paul morris</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1499802967035-31711ad1b1e7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=fade02ade18b1087476eb28207ed4d56" type="submit" style="background-image:url(/wallpapers/thumb-35.jpg)" ><span class="title">Grand Canyon, United States</span><span class="credits">By <a href="https://unsplash.com/@lyndseymarieee" target="unsplash">Lyndsey Marie</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1496387314164-18b0105f7553?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=9601a5a29129da8dad0214beda442a13" type="submit" style="background-image:url(/wallpapers/thumb-36.jpg)" ><span class="title">Tropicana</span><span class="credits">By <a href="https://unsplash.com/@tentides" target="unsplash">Jeremy Bishop</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1503289408281-f8314bf417c3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=c0338e2b2f39fbc3c48698354493b9b8" type="submit" style="background-image:url(/wallpapers/thumb-37.jpg)" ><span class="title">Artist’s palette</span><span class="credits">By <a href="https://unsplash.com/@davidclode" target="unsplash">David Clode</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1451438355345-6154155dcca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=c948ee624672cfabae225415862ca584" type="submit" style="background-image:url(/wallpapers/thumb-38.jpg)" ><span class="title">Asheville, United States</span><span class="credits">By <a href="https://unsplash.com/@mattgyver" target="unsplash">Matt Benson</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=383250f7ec35945504c2377689e3e59b" type="submit" style="background-image:url(/wallpapers/thumb-39.jpg)" ><span class="title">Clouds</span><span class="credits">By <a href="https://unsplash.com/@billy_huy" target="unsplash">Billy Huynh</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1424291474433-d99b520540bd?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=07c2315bb98fbbfa49d47d7df23c3f21" type="submit" style="background-image:url(/wallpapers/thumb-40.jpg)" ><span class="title">Crowder's Mountain State Park, King's Mountain, USA</span><span class="credits">By <a href="https://unsplash.com/@mattgyver" target="unsplash">Matt Benson</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div><div data-option="https://images.unsplash.com/photo-1504722754074-60e9f87d2817?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=5991bc9eff3527c72f2d2a2c8a0ce295" type="submit" style="background-image:url(/wallpapers/thumb-41.jpg)" ><span class="title">Milwaukee Bound</span><span class="credits">By <a href="https://unsplash.com/@ryanwaring" target="unsplash">Ryan Waring</a> on <a href="https://unsplash.com" target="unsplash">Unsplash</a></span></div>	</a-selector><!-- RANDOM -->	<div class="form" data-option="random">		<h2>Tags</h2>		<div id="random-tags">			<a-option>Nature</a-option>			<a-option>Landscape</a-option>			<a-option>Beach</a-option>			<a-option>Mountains</a-option>			<a-option>Flowers</a-option>			<a-option>Sky</a-option>			<a-option>Stars</a-option>		</div>		<h2>Cache</h2>		<a-popover-selector id="random-cache" data-value="5256000">			<div data-option="1440">One day</div>			<div data-option="10080">One week</div>			<div data-option="5256000">Forever</div>		</a-popover-selector>		<p class="footnote">			Photos by various photographers on <a href="https://unsplash.com" target="unsplash">Unsplash</a>		</p>	</div><!-- CUSTOM -->	<div class="form" data-option="custom">		<h2>URL</h2>		<a-textfield id="custom-url" data-placeholder="http://"></a-textfield>		<h2>Cache</h2>		<a-popover-selector id="custom-cache" data-value="5256000">			<div data-option="1440">One day</div>			<div data-option="10080">One week</div>			<div data-option="5256000">Forever</div>		</a-popover-selector>	</div></a-deck><div class="buttons">	<a-button data-action="cancel" tabindex="2"> Cancel </a-button>	<a-button data-action="ok" tabindex="1"> OK </a-button></div>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initWebWallpaperSelectorUI(window) {if(window.WebWallpaperSelectorUI) return window.WebWallpaperSelectorUI;initDialogUI(window);initMenu(window);initTopbar(window);initButton(window);initDeck(window);initSelector(window);initOption(window);initPopoverSelector(window);initTextfield(window);with(window) {const UNSPLASH_URL_RANDOM = "https://source.unsplash.com/1600x900/?Wallpaper,";
class WebWallpaperSelectorUI extends DialogUI {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._deck = shadowRoot.querySelector("a-deck");
		this._buttons = shadowRoot.querySelector(".buttons");
		this._title = shadowRoot.querySelector("h1");
		var selectionURL = this._deck.querySelector("#selection-url");
		selectionURL.addEventListener("change", ()=>{
			this.dispatchEvent(new Event('change', { bubbles : true}));
		})
		this.showUISelection();
		this._onStyleCompileBegin = this._onStyleCompileBegin.bind(this);
		this._onStyleCompileEnd = this._onStyleCompileEnd.bind(this);
	}
	_onStyleCompileBegin() {
		this.busy = true;
	}
	_onStyleCompileEnd() {
		this.busy = false;
	}
	showUISelection() {
		this._deck.value = "selection";
		this._buttons.style.display = "none";
		this._title.textContent = chrome.i18n.getMessage("selected_photography");
	}
	showUIRandom() {
		this._deck.value = "random";
		this._buttons.style.display = null;
		this._title.textContent = chrome.i18n.getMessage("random_selection");
	}
	showUICustom() {
		this._deck.value = "custom";
		this._buttons.style.display = null;
		this._title.textContent = chrome.i18n.getMessage("custom_url");
	}
	setValues(values) {
		if(values && values.url) {
			if(values.url.startsWith(UNSPLASH_URL_RANDOM)) {
				var tags = values.url.substr(UNSPLASH_URL_RANDOM.length).split(",");
				this._deck.querySelectorAll("#random-tags a-option")
					.forEach(cb=>cb.value = tags.includes(cb.textContent))
			}
			else {
				var selector = this._deck.querySelector("#selection-url");
				selector.value = values.url;
				if(selector.value != values.url) {
					this._deck.querySelector("#custom-url").value = values.url;
				}
			}
		}
	}
	getValues() {
		switch(this._deck.value) {
			case "selection":
				return {
					url : this._deck.querySelector("#selection-url").value,
					expires: 8640000000000000
				}
			break;
			case "random":
				return {
					url: UNSPLASH_URL_RANDOM + Array
						.from(this._deck.querySelectorAll("#random-tags a-option"))
						.filter(cb=>cb.value)
						.map(cb=>cb.textContent)
						.join()
					,
					expires: Date.now()+ parseInt(this._deck.querySelector("#random-cache").value) * 60 * 1000
				};
			break;
			case "custom":
				return {
					url: this._deck.querySelector("#custom-url").value,
					expires: Date.now()+ parseInt(this._deck.querySelector("#custom-cache").value) * 60 * 1000
				}
			break;
		}
		return {};
	}
	bind() {
		super.bind();
		addEventListener("style/compile-begin", this._onStyleCompileBegin);
		addEventListener("style/compile-end", this._onStyleCompileEnd);
	}
	unbind() {
		super.unbind();
		removeEventListener("style/compile-begin", this._onStyleCompileBegin);
		removeEventListener("style/compile-end", this._onStyleCompileEnd);
	}
}
defineCustomElement("a-web-wallpaper-selector-ui", WebWallpaperSelectorUI, t);return window.WebWallpaperSelectorUI=WebWallpaperSelectorUI;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{cursor:pointer;white-space:nowrap}span{vertical-align:top;display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:8px 20px;border:1px solid #e8e8e8;background-color:white;margin-left:3px;border-radius:3px;min-width:200px;font-weight:500;width:300px}*{vertical-align:top}a-button{min-width:100px}</style><a-button data-i18n="select"></a-button><span>---</span>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initWebWallpaperSelector(window) {if(window.WebWallpaperSelector) return window.WebWallpaperSelector;initCustomElement(window);initWebWallpaperSelectorUI(window);initButton(window);with(window) {class WebWallpaperSelector extends CustomElement {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._label = shadowRoot.querySelector("span");
		this._button = shadowRoot.querySelector("a-button");
		this._button.addEventListener("click", this, true);
		if(this.dataset.value)
			this.value = this.dataset.value;
	}
	get value() {
		return JSON.stringify(this._properties);
	}
	set value(value) {
		this._properties = JSON.parse(value);
		this._label.textContent = (this._properties && this._properties.url) ? this._properties.url : "---";
	}
	handleEvent(event) {
		event.stopPropagation();
		var ui = showDialog(WebWallpaperSelectorUI, api.settings.get("background-web"), values=>{
			this.value = JSON.stringify(values);
			this.dispatchEvent(new Event('change', { bubbles : true}));
		});
		ui.addEventListener("change", ()=>{
			this.value = JSON.stringify(ui.getValues());
			this.dispatchEvent(new Event('change', { bubbles : true}));
		});
	}
}
defineCustomElement("a-web-wallpaper-selector", WebWallpaperSelector, t);return window.WebWallpaperSelector=WebWallpaperSelector;}}}
{const t = document.createElement("template");t.innerHTML = `<style>:host{width:960px;height:596px}iframe{width:100%;height:100%;border:none;background-color:black}a-topbar{background-color:#111}a-topbar a-button{background-color:inherit}</style><a-topbar>	<h1 slot="left"></h1>	<a-button slot="right" title="i18n:close" data-icon="close" data-action="cancel"></a-button></a-topbar><iframe	class="content"	tabindex="1"	autofocus="true"	src=""	frameborder="0"	allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"	allowfullscreen	></iframe>`;for(const el of t.content.querySelectorAll("[data-i18n]")) el.textContent = chrome.i18n.getMessage(el.dataset.i18n) || el.dataset.i18n;for(const el of t.content.querySelectorAll('[title^="i18n:"]')) el.title = chrome.i18n.getMessage(el.title.substr(5)) || el.title.substr(5);for(const el of t.content.querySelectorAll('[data-placeholder^="i18n:"]')) el.dataset.placeholder = chrome.i18n.getMessage(el.dataset.placeholder.substr(5)) || el.dataset.placeholder.substr(5);function initYoutubePlayerUI(window) {if(window.YoutubePlayerUI) return window.YoutubePlayerUI;initDialogUI(window);initTopbar(window);initButton(window);with(window) {class YoutubePlayerUI extends DialogUI {
	init(shadowRoot) {
		super.init(shadowRoot);
		this._iframe = shadowRoot.querySelector("iframe");
		this._title = shadowRoot.querySelector("h1");
		const player = this._iframe;
	}
	setValues(values) {
		const p = api.uri.getSearchParams(values.src);
		if(!p.has("v"))
			throw "not a valid youtube link";
		let src = "https://www.youtube.com/embed/" + p.get("v");
		let ep = [];
		if(p.has("list"))
			ep.push("list=" + p.get("list"));
		if(values.autoplay)
			ep.push("autoplay=1");
		if(!values.showRelated)
			ep.push("rel=0");
		ep.push("vq=hd1080");
		this._iframe.src = src + ( ep.length ? "?"+ep.join("&") : "");
		this._title.textContent = values.title;
		setTimeout(()=>{
			this._iframe.contentWindow.focus()
		}, 1000)
	}
}
defineCustomElement("a-youtube-player-ui", YoutubePlayerUI, t);return window.YoutubePlayerUI=YoutubePlayerUI;}}}