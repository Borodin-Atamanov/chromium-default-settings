const NOT_FOUND = new Response(null, { status : 404 });

self.addEventListener('install', function(event) {
	console.log('Service Worker installed @ ', new Date());
	self.skipWaiting();
})

self.addEventListener('activate', function(event) {
	console.log('Service Worker activated @ ', new Date());
	event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
	if(!event.request.url.startsWith('https://cache.web-accessories.com/'))
		return;
	// console.log("serve from sw.js", event.request.url);
	const url = new URL(event.request.url);

	let cacheName;
	if(url.pathname.startsWith('/icon/'))
		cacheName = 'icon';
	else if(url.pathname.startsWith('/wallpaper/'))
		cacheName = 'wallpaper';
	else if(url.pathname.startsWith('/settings/'))
		cacheName = 'settings';

	if(cacheName) {
		event.respondWith(
			caches
				.open(cacheName)
				.then(cache => cache.match(url.href).then(response => response || NOT_FOUND))
		)
	}
});
