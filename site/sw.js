self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('offline').then(function(cache) {
            return cache.addAll([
                './',
                './index.html',
                './offline.html',
                './manifest.json',
                './css/main.css',
                './img/favicon.png',
                './img/icon.png',
                './js/views/components/footer.js',
                './js/views/components/header.js',
                './js/pages/about.js',
                './js/pages/error404.js',
                './js/pages/hexagram.js',
                './js/pages/home.js',
                './js/pages/reading.js',
                './js/app.js',
                './js/ranjs.min.js',
                './sw.js'
            ])
        }).catch(function(err) { 
            console.log(err) 
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request)
        })
    )
})