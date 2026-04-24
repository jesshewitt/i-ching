self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('offline').then(function(cache) {
            return cache.addAll([
                './',
                './index.html',
                './offline.html',
                './manifest.json',
                './css/main.css',
                './fonts/lora-latin.woff2',
                './fonts/lora-latin-ext.woff2',
                './fonts/noto-serif-tc-subset.woff2',
                './fonts/noto-symbols-2-hexagrams.woff2',
                './img/favicon.png',
                './img/icon.png',
                './js/views/components/footer.js',
                './js/views/components/header.js',
                './js/views/pages/about.js',
                './js/views/pages/error404.js',
                './js/views/pages/hexagram.js',
                './js/views/pages/home.js',
                './js/views/pages/reading.js',
                './js/app.js',
                './js/html.js',
                './js/rng.js',
                './js/theme.js',
                './data/hexagrams.json',
                './data/trigrams.json',
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
            // For page navigations, fall back to cached index.html so the
            // client-side router can render the requested path offline.
            if (event.request.mode === 'navigate') {
                return caches.match('./index.html')
            }
            return caches.match(event.request)
        })
    )
})